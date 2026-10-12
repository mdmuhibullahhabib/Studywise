"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/permissions";

const studentProfileSchema = z.object({
  educationLevel: z.string().max(120).optional(),
  institution: z.string().max(160).optional(),
  subjects: z.string().max(300).optional(), // comma-separated in the form, split below
  goals: z.string().max(1000).optional(),
  bio: z.string().max(1000).optional()
});

export async function updateStudentProfileAction(formData: FormData) {
  const session = await requireRole(["STUDENT", "ADMIN"]);
  const parsed = studentProfileSchema.parse({
    educationLevel: formData.get("educationLevel") || undefined,
    institution: formData.get("institution") || undefined,
    subjects: formData.get("subjects") || undefined,
    goals: formData.get("goals") || undefined,
    bio: formData.get("bio") || undefined
  });

  await db.studentProfile.update({
    where: { userId: session.user.id },
    data: {
      educationLevel: parsed.educationLevel,
      institution: parsed.institution,
      subjects: parsed.subjects ? parsed.subjects.split(",").map((s) => s.trim()).filter(Boolean) : [],
      goals: parsed.goals,
      bio: parsed.bio,
      onboardedAt: new Date()
    }
  });

  revalidatePath("/student/profile");
}

const mentorProfileSchema = z.object({
  title: z.string().max(160).optional(),
  country: z.string().max(100).optional(),
  university: z.string().max(160).optional(),
  studyLevel: z.string().max(60).optional(),
  bio: z.string().max(2000).optional(),
  expertise: z.string().max(300).optional(),
  subjects: z.string().max(300).optional(),
  teachingApproach: z.string().max(1000).optional(),
  hourlyRate: z.coerce.number().min(0).max(10000).optional()
});

export async function updateMentorProfileAction(formData: FormData) {
  const session = await requireRole(["MENTOR", "ADMIN"]);
  const parsed = mentorProfileSchema.parse({
    title: formData.get("title") || undefined,
    country: formData.get("country") || undefined,
    university: formData.get("university") || undefined,
    studyLevel: formData.get("studyLevel") || undefined,
    bio: formData.get("bio") || undefined,
    expertise: formData.get("expertise") || undefined,
    subjects: formData.get("subjects") || undefined,
    teachingApproach: formData.get("teachingApproach") || undefined,
    hourlyRate: formData.get("hourlyRate") || undefined
  });

  await db.mentorProfile.update({
    where: { userId: session.user.id },
    data: {
      title: parsed.title,
      country: parsed.country,
      university: parsed.university,
      studyLevel: parsed.studyLevel,
      bio: parsed.bio,
      expertise: parsed.expertise ? parsed.expertise.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
      subjects: parsed.subjects ? parsed.subjects.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
      teachingApproach: parsed.teachingApproach,
      hourlyRate: parsed.hourlyRate
    }
  });

  revalidatePath("/mentor/profile");
}
