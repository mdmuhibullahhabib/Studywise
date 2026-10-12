import "server-only";
import { db } from "@/lib/db";

/**
 * Admins aren't a participant type on Conversation (only student/mentor
 * are), so they have no personal inbox — this always returns 0 for them
 * rather than faking a count that isn't backed by real data.
 */
export async function getUnreadMessageCount(userId: string, role: "STUDENT" | "MENTOR" | "ADMIN") {
  if (role === "ADMIN") return 0;

  return db.message.count({
    where: {
      conversation: role === "MENTOR" ? { mentorId: userId } : { studentId: userId },
      readAt: null,
      senderId: { not: userId }
    }
  });
}
