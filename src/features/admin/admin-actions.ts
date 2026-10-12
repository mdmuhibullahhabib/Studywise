"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/permissions";
import { NotificationService } from "@/services/notification.service";

// ── Mentor applications ────────────────────────────────────────────────

const decisionSchema = z.object({
  applicationId: z.string().cuid(),
  reason: z.string().max(500).optional()
});

export async function approveApplicationAction(formData: FormData) {
  const session = await requireRole("ADMIN");
  const { applicationId } = decisionSchema.parse({ applicationId: formData.get("applicationId") });

  const application = await db.mentorApplication.update({
    where: { id: applicationId },
    data: { status: "APPROVED", reviewedAt: new Date(), reviewerId: session.user.id }
  });

  await db.mentorProfile.update({
    where: { userId: application.userId },
    data: { verified: true, verificationStatus: "APPROVED", isDiscoverable: true }
  });

  await NotificationService.create(
    application.userId,
    "BOOKING_CONFIRMED", // closest existing type; a MENTOR_APPROVED type would be a natural future addition
    "Application approved",
    "You're verified and now discoverable to students.",
    application.id
  );

  revalidatePath("/admin/applications");
  revalidatePath("/admin/mentors");
}

export async function rejectApplicationAction(formData: FormData) {
  const session = await requireRole("ADMIN");
  const { applicationId, reason } = decisionSchema.parse({
    applicationId: formData.get("applicationId"),
    reason: formData.get("reason") ?? undefined
  });

  const application = await db.mentorApplication.update({
    where: { id: applicationId },
    data: {
      status: "REJECTED",
      reviewedAt: new Date(),
      reviewerId: session.user.id,
      rejectionReason: reason
    }
  });

  await db.mentorProfile.update({
    where: { userId: application.userId },
    data: { verificationStatus: "REJECTED", verified: false, isDiscoverable: false }
  });

  revalidatePath("/admin/applications");
}

export async function requestMoreInfoAction(formData: FormData) {
  const session = await requireRole("ADMIN");
  const { applicationId, reason } = decisionSchema.parse({
    applicationId: formData.get("applicationId"),
    reason: formData.get("reason") ?? undefined
  });

  await db.mentorApplication.update({
    where: { id: applicationId },
    data: {
      status: "MORE_INFO_REQUIRED",
      reviewedAt: new Date(),
      reviewerId: session.user.id,
      notesForReviewer: reason
    }
  });

  revalidatePath("/admin/applications");
}

// ── User status (students / mentors) ────────────────────────────────────

const userStatusSchema = z.object({
  userId: z.string().cuid(),
  status: z.enum(["ACTIVE", "SUSPENDED", "DEACTIVATED"])
});

export async function setUserStatusAction(formData: FormData) {
  await requireRole("ADMIN");
  const { userId, status } = userStatusSchema.parse({
    userId: formData.get("userId"),
    status: formData.get("status")
  });

  await db.user.update({ where: { id: userId }, data: { status } });

  // Suspending a mentor also pulls them from discovery immediately.
  if (status !== "ACTIVE") {
    await db.mentorProfile.updateMany({ where: { userId }, data: { isDiscoverable: false } });
  }

  revalidatePath("/admin/students");
  revalidatePath("/admin/mentors");
}

// ── Review moderation ────────────────────────────────────────────────────

const reviewModerationSchema = z.object({
  reviewId: z.string().cuid(),
  status: z.enum(["PUBLISHED", "HIDDEN"])
});

export async function moderateReviewAction(formData: FormData) {
  await requireRole("ADMIN");
  const { reviewId, status } = reviewModerationSchema.parse({
    reviewId: formData.get("reviewId"),
    status: formData.get("status")
  });

  await db.review.update({ where: { id: reviewId }, data: { status } });
  revalidatePath("/admin/reviews");
}

// ── Reports ───────────────────────────────────────────────────────────

const reportDecisionSchema = z.object({
  reportId: z.string().cuid(),
  status: z.enum(["RESOLVED", "DISMISSED"])
});

export async function resolveReportAction(formData: FormData) {
  const session = await requireRole("ADMIN");
  const { reportId, status } = reportDecisionSchema.parse({
    reportId: formData.get("reportId"),
    status: formData.get("status")
  });

  await db.report.update({
    where: { id: reportId },
    data: { status, resolvedAt: new Date(), resolvedBy: session.user.id }
  });

  revalidatePath("/admin/reports");
  revalidatePath("/admin/dashboard");
}
