import "server-only";
import type { NotificationType } from "@prisma/client";
import { db } from "@/lib/db";

export const NotificationService = {
  async create(userId: string, type: NotificationType, title: string, body: string, relatedId?: string) {
    return db.notification.create({ data: { userId, type, title, body, relatedId } });
  },

  async markRead(notificationId: string, userId: string) {
    return db.notification.updateMany({
      where: { id: notificationId, userId },
      data: { readAt: new Date() }
    });
  },

  async markAllRead(userId: string) {
    return db.notification.updateMany({
      where: { userId, readAt: null },
      data: { readAt: new Date() }
    });
  },

  async unreadCount(userId: string) {
    return db.notification.count({ where: { userId, readAt: null } });
  }
};
