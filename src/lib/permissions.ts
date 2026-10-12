import "server-only";
import type { UserRole } from "@prisma/client";
import { auth } from "@/lib/auth";

export class UnauthorizedError extends Error {
  constructor(message = "You don't have permission to view this.") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class NotFoundError extends Error {
  constructor(message = "Not found.") {
    super(message);
    this.name = "NotFoundError";
  }
}

/**
 * Every server action / route handler that touches user data should start
 * by calling one of these. Never trust a role or user id passed from the
 * client — always re-derive it from the server session.
 */
export async function requireSession() {
  const session = await auth();
  if (!session?.user) throw new UnauthorizedError("You must be signed in.");
  return session;
}

export async function requireRole(role: UserRole | UserRole[]) {
  const session = await requireSession();
  const allowed = Array.isArray(role) ? role : [role];
  if (!allowed.includes(session.user.role)) {
    throw new UnauthorizedError();
  }
  return session;
}

/**
 * Resource-ownership guard. Pass the id(s) that own a resource; throws
 * unless the current session user matches one of them (or is an admin).
 *
 * Example: assertOwnsResource(session, booking.studentId, booking.mentorId)
 */
export async function assertOwnsResource(
  session: Awaited<ReturnType<typeof requireSession>>,
  ...ownerIds: Array<string | null | undefined>
) {
  if (session.user.role === "ADMIN") return;
  if (!ownerIds.includes(session.user.id)) {
    throw new UnauthorizedError();
  }
}
