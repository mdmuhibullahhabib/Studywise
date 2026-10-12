import "server-only";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import type { MeetingProvider } from "@/providers/meeting/meeting-provider";
import { WebRTCMeetingProvider } from "@/providers/meeting/webrtc-provider";
import { ZoomMeetingProvider } from "@/providers/meeting/zoom-provider";
import { NotificationService } from "./notification.service";

function resolveProvider(): MeetingProvider {
  switch (process.env.MEETING_PROVIDER) {
    case "zoom":
      return new ZoomMeetingProvider();
    case "webrtc":
    default:
      return new WebRTCMeetingProvider();
  }
}

const provider = resolveProvider();

export const MeetingService = {
  provider,

  /** Creates the Meeting record for a confirmed booking and reserves a room with the provider. */
  async scheduleForBooking(bookingId: string) {
    const booking = await db.booking.findUniqueOrThrow({
      where: { id: bookingId },
      include: { student: true, mentor: true }
    });

    if (!booking.conversationId) {
      throw new Error("Booking has no associated conversation to attach the meeting to.");
    }

    const scheduledStart = new Date(`${booking.date.toISOString().slice(0, 10)}T${booking.startTime}:00`);

    const created = await provider.createMeeting({
      bookingId: booking.id,
      scheduledStart,
      durationMinutes: booking.duration,
      hostName: booking.mentor.name,
      guestName: booking.student.name
    });

    return db.meeting.create({
      data: {
        bookingId: booking.id,
        conversationId: booking.conversationId,
        studentId: booking.studentId,
        mentorId: booking.mentorId,
        provider: provider.name,
        providerMeetingId: created.providerMeetingId,
        joinUrl: created.joinUrl,
        scheduledStart,
        status: "SCHEDULED"
      }
    });
  },

  async endMeeting(meetingId: string) {
    const meeting = await db.meeting.findUniqueOrThrow({ where: { id: meetingId } });
    if (meeting.providerMeetingId) {
      await provider.endMeeting(meeting.providerMeetingId);
    }

    const endedAt = new Date();
    const duration = meeting.startedAt
      ? Math.round((endedAt.getTime() - meeting.startedAt.getTime()) / 60000)
      : null;

    const updated = await db.meeting.update({
      where: { id: meetingId },
      data: { status: "ENDED", endedAt, duration, recordingStatus: "PROCESSING" }
    });

    logger.info("meeting.ended", { meetingId, duration });
    return updated;
  },

  /** Polls the provider for a finished recording and persists it. Intended to be called from a background job / webhook. */
  async syncRecording(meetingId: string) {
    const meeting = await db.meeting.findUniqueOrThrow({ where: { id: meetingId } });
    if (!meeting.providerMeetingId) return null;

    const result = await provider.getRecording(meeting.providerMeetingId);
    if (!result) return null;

    const recording = await db.recording.upsert({
      where: { id: `${meeting.id}-recording` },
      create: {
        id: `${meeting.id}-recording`,
        meetingId: meeting.id,
        bookingId: meeting.bookingId,
        storageKey: result.storageKey ?? "",
        duration: result.durationSeconds,
        status: result.status
      },
      update: {
        status: result.status,
        storageKey: result.storageKey ?? "",
        duration: result.durationSeconds
      }
    });

    await db.meeting.update({
      where: { id: meeting.id },
      data: { recordingStatus: result.status }
    });

    if (result.status === "READY") {
      const durationMinutes = result.durationSeconds ? Math.round(result.durationSeconds / 60) : meeting.duration;
      await db.message.create({
        data: {
          conversationId: meeting.conversationId,
          senderId: meeting.mentorId,
          type: "RECORDING",
          content: `Mentoring session${durationMinutes ? ` — ${durationMinutes} minutes` : ""}`,
          relatedId: recording.id
        }
      });

      const booking = await db.booking.findUnique({ where: { id: meeting.bookingId } });
      if (booking) {
        await NotificationService.create(
          booking.studentId,
          "RECORDING_READY",
          "Recording ready",
          "Your session recording is ready to watch.",
          recording.id
        );
      }
    }

    return recording;
  }
};
