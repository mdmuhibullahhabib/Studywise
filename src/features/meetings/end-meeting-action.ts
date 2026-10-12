"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireSession, assertOwnsResource, NotFoundError } from "@/lib/permissions";
import { MeetingService } from "@/services/meeting.service";

export async function endMeetingAction(meetingId: string) {
  const session = await requireSession();

  const meeting = await db.meeting.findUnique({ where: { id: meetingId } });
  if (!meeting) throw new NotFoundError("Meeting not found.");
  await assertOwnsResource(session, meeting.studentId, meeting.mentorId);

  const updated = await MeetingService.endMeeting(meetingId);

  await db.message.create({
    data: {
      conversationId: meeting.conversationId,
      senderId: session.user.id,
      type: "SYSTEM",
      content: `Meeting ended${updated.duration ? ` — ${updated.duration} min` : ""}. Recording is processing.`
    }
  });

  await db.booking.update({ where: { id: meeting.bookingId }, data: { status: "COMPLETED" } });

  revalidatePath(`/meetings/${meetingId}`);
  return updated;
}
