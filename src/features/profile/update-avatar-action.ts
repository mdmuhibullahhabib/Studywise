"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/permissions";

const avatarSchema = z.object({
  avatarUrl: z.string().url().max(2000).optional().or(z.literal(""))
});

/**
 * Interim solution: the user pastes a URL to an image already hosted
 * elsewhere. There's no file-upload pipeline wired to a storage provider
 * yet (see StorageService) — that's the real fix once STORAGE_PROVIDER is
 * configured, and this action can then be swapped for direct upload.
 */
export async function updateAvatarUrlAction(formData: FormData) {
  const session = await requireSession();
  const parsed = avatarSchema.parse({ avatarUrl: formData.get("avatarUrl") || "" });

  await db.user.update({
    where: { id: session.user.id },
    data: { avatarUrl: parsed.avatarUrl || null }
  });

  revalidatePath("/student/profile");
  revalidatePath("/student/settings");
  revalidatePath("/mentor/profile");
  revalidatePath("/mentor/settings");
}
