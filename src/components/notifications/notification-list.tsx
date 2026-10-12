import { BellOff } from "lucide-react";
import type { Notification } from "@prisma/client";
import { markNotificationReadAction, markAllNotificationsReadAction } from "@/features/notifications/notification-actions";
import { SubmitButton } from "@/components/ui/submit-button";
import { formatDate } from "@/lib/utils";

export function NotificationList({ notifications }: { notifications: Notification[] }) {
  if (notifications.length === 0) {
    return (
      <div className="card flex flex-col items-center gap-2 p-10 text-center">
        <BellOff className="h-7 w-7 text-ink-300" />
        <p className="text-sm text-ink-500">You&apos;re all caught up.</p>
      </div>
    );
  }

  const hasUnread = notifications.some((n) => !n.readAt);

  return (
    <div>
      {hasUnread && (
        <form action={markAllNotificationsReadAction} className="mb-4 flex justify-end">
          <SubmitButton variant="ghost" pendingLabel="…" className="text-xs">
            Mark all as read
          </SubmitButton>
        </form>
      )}
      <ul className="card divide-y divide-line">
        {notifications.map((n) => (
          <li key={n.id} className={`flex items-start justify-between gap-4 p-4 ${n.readAt ? "" : "bg-sage-soft/30"}`}>
            <div className="flex items-start gap-3">
              {!n.readAt && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sage" aria-hidden="true" />}
              <div className={!n.readAt ? "" : "pl-5"}>
                <p className="text-sm font-medium text-ink">{n.title}</p>
                <p className="mt-0.5 text-sm text-ink-500">{n.body}</p>
                <p className="mt-1 text-meta text-ink-300">{formatDate(n.createdAt)}</p>
              </div>
            </div>
            {!n.readAt && (
              <form action={markNotificationReadAction}>
                <input type="hidden" name="notificationId" value={n.id} />
                <SubmitButton variant="ghost" pendingLabel="…" className="shrink-0 text-xs">
                  Mark read
                </SubmitButton>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
