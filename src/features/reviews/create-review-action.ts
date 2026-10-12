"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireRole, assertOwnsResource, NotFoundError } from "@/lib/permissions";
import { NotificationService } from "@/services/notification.service";

export interface ReviewFormState {
  error?: string;
  success?: boolean;
}

const reviewSchema = z.object({
  bookingId: z.string().cuid(),
  rating: z.coerce.number().int().min(1).max(5),
  review: z.string().max(2000).optional()
});

export async function createReviewAction(_prev: ReviewFormState, formData: FormData): Promise<ReviewFormState> {
  const session = await requireRole(["STUDENT", "ADMIN"]);
  const parsed = reviewSchema.safeParse({
    bookingId: formData.get("bookingId"),
    rating: formData.get("rating"),
    review: formData.get("review") || undefined
  });
  if (!parsed.success) return { error: "Please choose a rating." };

  const booking = await db.booking.findUnique({ where: { id: parsed.data.bookingId }, include: { review: true } });
  if (!booking) throw new NotFoundError("Booking not found.");
  await assertOwnsResource(session, booking.studentId);

  if (booking.status !== "COMPLETED") {
    return { error: "You can only review completed sessions." };
  }
  if (booking.review) {
    return { error: "You've already reviewed this session." };
  }

  await db.$transaction(async (tx) => {
    await tx.review.create({
      data: {
        bookingId: booking.id,
        studentId: booking.studentId,
        mentorId: booking.mentorId,
        rating: parsed.data.rating,
        review: parsed.data.review
      }
    });

    const mentorProfile = await tx.mentorProfile.findUniqueOrThrow({ where: { userId: booking.mentorId } });
    const newCount = mentorProfile.ratingCount + 1;
    const newAverage =
      (Number(mentorProfile.ratingAverage) * mentorProfile.ratingCount + parsed.data.rating) / newCount;

    await tx.mentorProfile.update({
      where: { id: mentorProfile.id },
      data: { ratingCount: newCount, ratingAverage: newAverage }
    });
  });

  await NotificationService.create(
    booking.mentorId,
    "REVIEW_RECEIVED",
    "New review",
    `You received a ${parsed.data.rating}-star review.`,
    booking.id
  );

  revalidatePath(`/student/booked/${booking.id}`);
  revalidatePath(`/mentors/${booking.mentorId}`);

  return { success: true };
}
