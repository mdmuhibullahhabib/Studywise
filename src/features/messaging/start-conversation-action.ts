"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/permissions";
import { ConversationService } from "./conversation.service";

/** Called from the mentor profile "Message" button once the user is signed in as a student. */
export async function startConversationAction(mentorProfileId: string) {
  const session = await requireRole("STUDENT");

  const mentorProfile = await db.mentorProfile.findUniqueOrThrow({
    where: { id: mentorProfileId },
    select: { userId: true }
  });

  const conversation = await ConversationService.getOrCreate(session.user.id, mentorProfile.userId);
  redirect(`/student/messages/${conversation.id}`);
}
