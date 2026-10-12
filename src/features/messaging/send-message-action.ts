"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireSession, assertOwnsResource, NotFoundError } from "@/lib/permissions";
import { NotificationService } from "@/services/notification.service";

const sendMessageSchema = z.object({
  conversationId: z.string().cuid(),
  content: z.string().min(1).max(4000)
});

export async function sendMessageAction(input: { conversationId: string; content: string }) {
  const session = await requireSession();
  const parsed = sendMessageSchema.parse(input);

  const conversation = await db.conversation.findUnique({ where: { id: parsed.conversationId } });
  if (!conversation) throw new NotFoundError("Conversation not found.");
  await assertOwnsResource(session, conversation.studentId, conversation.mentorId);

  const message = await db.message.create({
    data: {
      conversationId: parsed.conversationId,
      senderId: session.user.id,
      type: "TEXT",
      content: parsed.content
    }
  });

  await db.conversation.update({ where: { id: parsed.conversationId }, data: { updatedAt: new Date() } });

  const recipientId =
    session.user.id === conversation.studentId ? conversation.mentorId : conversation.studentId;
  await NotificationService.create(
    recipientId,
    "NEW_MESSAGE",
    "New message",
    parsed.content.slice(0, 120),
    conversation.id
  );

  revalidatePath(`/student/messages/${parsed.conversationId}`);
  revalidatePath(`/mentor/messages/${parsed.conversationId}`);

  return message;
}
