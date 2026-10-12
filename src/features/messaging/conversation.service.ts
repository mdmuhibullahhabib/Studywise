import "server-only";
import { db } from "@/lib/db";
import { requireSession, assertOwnsResource, NotFoundError } from "@/lib/permissions";

export const ConversationService = {
  /**
   * Returns the existing student↔mentor conversation or creates one.
   * The unique([studentId, mentorId]) constraint on Conversation makes
   * this safe under concurrent calls — a race just hits the constraint
   * and we re-fetch.
   */
  async getOrCreate(studentId: string, mentorId: string) {
    const existing = await db.conversation.findUnique({
      where: { studentId_mentorId: { studentId, mentorId } }
    });
    if (existing) return existing;

    try {
      return await db.conversation.create({ data: { studentId, mentorId } });
    } catch {
      const raceWinner = await db.conversation.findUnique({
        where: { studentId_mentorId: { studentId, mentorId } }
      });
      if (!raceWinner) throw new Error("Failed to create or find conversation.");
      return raceWinner;
    }
  },

  async listForCurrentUser() {
    const session = await requireSession();
    const isMentor = session.user.role === "MENTOR";

    const conversations = await db.conversation.findMany({
      where: isMentor ? { mentorId: session.user.id } : { studentId: session.user.id },
      include: {
        student: { select: { id: true, name: true, avatarUrl: true } },
        mentor: { select: { id: true, name: true, avatarUrl: true } },
        messages: { orderBy: { createdAt: "desc" }, take: 1 }
      },
      orderBy: { updatedAt: "desc" }
    });

    const unreadCounts = await db.message.groupBy({
      by: ["conversationId"],
      where: {
        conversationId: { in: conversations.map((c) => c.id) },
        senderId: { not: session.user.id },
        readAt: null
      },
      _count: true
    });
    const unreadByConversation = new Set(unreadCounts.map((row) => row.conversationId));

    return conversations.map((c) => ({ ...c, unread: unreadByConversation.has(c.id) }));
  },

  async getWithMessages(conversationId: string) {
    const session = await requireSession();
    const conversation = await db.conversation.findUnique({
      where: { id: conversationId },
      include: {
        student: { select: { id: true, name: true, avatarUrl: true } },
        mentor: { select: { id: true, name: true, avatarUrl: true } },
        messages: { orderBy: { createdAt: "asc" } }
      }
    });
    if (!conversation) throw new NotFoundError("Conversation not found.");
    await assertOwnsResource(session, conversation.studentId, conversation.mentorId);

    // Mark the other participant's messages as read.
    await db.message.updateMany({
      where: { conversationId, senderId: { not: session.user.id }, readAt: null },
      data: { readAt: new Date() }
    });

    return conversation;
  }
};
