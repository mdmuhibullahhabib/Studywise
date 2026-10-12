"use server";

import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/permissions";
import { createBookingSchema } from "@/validations/booking";
import { ConversationService } from "@/features/messaging/conversation.service";
import { PaymentService } from "@/services/payment.service";
import { MeetingService } from "@/services/meeting.service";
import { NotificationService } from "@/services/notification.service";

export interface CreateBookingFormState {
  error?: string;
}

export async function createBookingAction(
  _prev: CreateBookingFormState,
  formData: FormData
): Promise<CreateBookingFormState> {
  const session = await requireRole("STUDENT");

  const parsed = createBookingSchema.safeParse({
    mentorProfileId: formData.get("mentorProfileId"),
    subject: formData.get("subject"),
    date: formData.get("date"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    timezone: formData.get("timezone"),
    duration: Number(formData.get("duration"))
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the booking details." };
  }

  const mentorProfile = await db.mentorProfile.findUniqueOrThrow({
    where: { id: parsed.data.mentorProfileId }
  });

  const conversation = await ConversationService.getOrCreate(session.user.id, mentorProfile.userId);

  let bookingId: string;
  try {
    // Booking uniqueness on [mentorId, date, startTime] means a concurrent
    // double-booking attempt fails at the DB layer, not just in app logic.
    const booking = await db.booking.create({
      data: {
        studentId: session.user.id,
        mentorId: mentorProfile.userId,
        mentorProfileId: mentorProfile.id,
        conversationId: conversation.id,
        subject: parsed.data.subject,
        date: new Date(parsed.data.date),
        startTime: parsed.data.startTime,
        endTime: parsed.data.endTime,
        timezone: parsed.data.timezone,
        duration: parsed.data.duration,
        price: mentorProfile.hourlyRate ? (Number(mentorProfile.hourlyRate) * parsed.data.duration) / 60 : 0,
        currency: mentorProfile.currency,
        status: "PENDING"
      }
    });
    bookingId = booking.id;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { error: "That time was just booked by someone else. Please pick another slot." };
    }
    throw err;
  }

  await db.message.create({
    data: {
      conversationId: conversation.id,
      senderId: session.user.id,
      type: "SYSTEM",
      content: `Session booked: ${parsed.data.subject} on ${parsed.data.date} at ${parsed.data.startTime}.`,
      relatedId: bookingId
    }
  });

  const { checkoutUrl } = await PaymentService.initiateForBooking(bookingId);

  const refreshedBooking = await db.booking.findUniqueOrThrow({ where: { id: bookingId } });
  if (refreshedBooking.status === "CONFIRMED") {
    // No payment provider configured — schedule the meeting immediately.
    const meeting = await MeetingService.scheduleForBooking(bookingId);
    await db.message.create({
      data: {
        conversationId: conversation.id,
        senderId: session.user.id,
        type: "MEETING",
        content: `Meeting scheduled for ${parsed.data.date} at ${parsed.data.startTime}.`,
        relatedId: meeting.id
      }
    });
    await NotificationService.create(
      mentorProfile.userId,
      "BOOKING_CREATED",
      "New booking",
      `${session.user.name} booked a session: ${parsed.data.subject}`,
      bookingId
    );
  }

  if (checkoutUrl) {
    redirect(checkoutUrl);
  }

  redirect(`/student/booked/${bookingId}?confirmed=1`);
}
