"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/permissions";
import { availabilitySlotSchema } from "@/validations/booking";

export async function addAvailabilityWindowAction(formData: FormData) {
  const session = await requireRole(["MENTOR", "ADMIN"]);
  const parsed = availabilitySlotSchema.parse({
    dayOfWeek: Number(formData.get("dayOfWeek")),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    timezone: formData.get("timezone")
  });

  const mentorProfile = await db.mentorProfile.findUniqueOrThrow({ where: { userId: session.user.id } });

  await db.availability.create({
    data: {
      mentorId: mentorProfile.id,
      dayOfWeek: parsed.dayOfWeek,
      startTime: parsed.startTime,
      endTime: parsed.endTime,
      timezone: parsed.timezone
    }
  });

  revalidatePath("/mentor/settings");
}

export async function removeAvailabilityWindowAction(formData: FormData) {
  const session = await requireRole(["MENTOR", "ADMIN"]);
  const availabilityId = String(formData.get("availabilityId"));

  const mentorProfile = await db.mentorProfile.findUniqueOrThrow({ where: { userId: session.user.id } });

  // Scoped to this mentor's own profile — can't delete another mentor's window.
  await db.availability.deleteMany({ where: { id: availabilityId, mentorId: mentorProfile.id } });

  revalidatePath("/mentor/settings");
}

export async function blockDateAction(formData: FormData) {
  const session = await requireRole(["MENTOR", "ADMIN"]);
  const date = String(formData.get("date"));
  const reason = (formData.get("reason") as string) || undefined;

  const mentorProfile = await db.mentorProfile.findUniqueOrThrow({ where: { userId: session.user.id } });

  await db.availabilityException.create({
    data: { mentorId: mentorProfile.id, date: new Date(date), isBlocked: true, reason }
  });

  revalidatePath("/mentor/settings");
}
