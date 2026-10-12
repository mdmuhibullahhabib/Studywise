"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/permissions";
import { NotificationService } from "@/services/notification.service";

export async function markNotificationReadAction(formData: FormData) {
  const session = await requireSession();
  const notificationId = String(formData.get("notificationId"));
  await NotificationService.markRead(notificationId, session.user.id);
  revalidatePath("/student/notifications");
  revalidatePath("/mentor/notifications");
}

export async function markAllNotificationsReadAction() {
  const session = await requireSession();
  await NotificationService.markAllRead(session.user.id);
  revalidatePath("/student/notifications");
  revalidatePath("/mentor/notifications");
}
