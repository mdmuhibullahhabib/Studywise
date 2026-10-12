"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireSession, assertOwnsResource, NotFoundError } from "@/lib/permissions";
import { cancelBookingSchema } from "@/validations/booking";
import { NotificationService } from "@/services/notification.service";

export interface CancelBookingState {
  error?: string;
  success?: boolean;
}

/** A booking is only cancellable while it hasn't started and isn't already resolved. */
function isCancellable(booking: { status: string; date: Date; startTime: string }) {
  if (!["PENDING", "CONFIRMED"].includes(booking.status)) return false;
  const start = new Date(`${booking.date.toISOString().slice(0, 10)}T${booking.startTime}:00`);
  return start.getTime() > Date.now();
}

export async function cancelBookingAction(
  _prev: CancelBookingState,
  formData: FormData
): Promise<CancelBookingState> {
  const session = await requireSession();
  const parsed = cancelBookingSchema.safeParse({
    bookingId: formData.get("bookingId"),
    reason: formData.get("reason") || undefined
  });
  if (!parsed.success) return { error: "Invalid request." };

  const booking = await db.booking.findUnique({ where: { id: parsed.data.bookingId } });
  if (!booking) throw new NotFoundError("Booking not found.");
  await assertOwnsResource(session, booking.studentId, booking.mentorId);

  if (!isCancellable(booking)) {
    return { error: "This session can no longer be cancelled." };
  }

  await db.booking.update({
    where: { id: booking.id },
    data: {
      status: "CANCELLED",
      cancelledBy: session.user.id,
      cancellationReason: parsed.data.reason,
      cancelledAt: new Date()
    }
  });

  if (booking.conversationId) {
    await db.message.create({
      data: {
        conversationId: booking.conversationId,
        senderId: session.user.id,
        type: "SYSTEM",
        content: `Session on ${booking.date.toISOString().slice(0, 10)} was cancelled.`
      }
    });
  }

  const otherPartyId = session.user.id === booking.studentId ? booking.mentorId : booking.studentId;
  await NotificationService.create(
    otherPartyId,
    "BOOKING_CANCELLED",
    "Session cancelled",
    `${booking.subject} on ${booking.date.toISOString().slice(0, 10)} was cancelled.`,
    booking.id
  );

  revalidatePath(`/student/booked/${booking.id}`);
  revalidatePath(`/mentor/booked/${booking.id}`);
  revalidatePath("/student/booked");
  revalidatePath("/mentor/booked");

  return { success: true };
}
