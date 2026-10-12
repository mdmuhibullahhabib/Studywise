import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { NotificationList } from "@/components/notifications/notification-list";

export const metadata = { title: "Notifications" };

export default async function StudentNotificationsPage() {
  const session = await requireRole(["STUDENT", "ADMIN"]);
  const notifications = await db.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50
  });

  return (
    <div className="max-w-2xl">
      <h1 className="text-h1">Notifications</h1>
      <div className="mt-6">
        <NotificationList notifications={notifications} />
      </div>
    </div>
  );
}
