"use server";

import { signOut } from "@/lib/auth";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/permissions";

export async function deactivateOwnAccountAction() {
  const session = await requireSession();
  await db.user.update({ where: { id: session.user.id }, data: { status: "DEACTIVATED" } });
  await db.mentorProfile.updateMany({ where: { userId: session.user.id }, data: { isDiscoverable: false } });
  await signOut({ redirectTo: "/" });
}
