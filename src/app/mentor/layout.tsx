import { LayoutDashboard, Users, CalendarCheck, MessageSquare, Bell, User, Settings, Wallet } from "lucide-react";
import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { NotificationService } from "@/services/notification.service";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const ICON_CLASS = "h-4 w-4";

export default async function MentorLayout({ children }: { children: React.ReactNode }) {
  const session = await requireRole(["MENTOR", "ADMIN"]);

  const [unreadMessages, unreadNotifications] = await Promise.all([
    db.message.count({
      where: { conversation: { mentorId: session.user.id }, readAt: null, senderId: { not: session.user.id } }
    }),
    NotificationService.unreadCount(session.user.id)
  ]);

  // Icons must be rendered here (JSX), not passed as bare component
  // references — DashboardShell forwards navGroups into a Client Component
  // (MobileNav), and only rendered React elements can cross that boundary.
  const navGroups = [
    { items: [{ href: "/mentor/dashboard", label: "Dashboard", icon: <LayoutDashboard className={ICON_CLASS} /> }] },
    {
      label: "Teaching",
      items: [
        { href: "/mentor/students", label: "Students", icon: <Users className={ICON_CLASS} /> },
        { href: "/mentor/booked", label: "Bookings", icon: <CalendarCheck className={ICON_CLASS} /> },
        { href: "/mentor/earnings", label: "Earnings", icon: <Wallet className={ICON_CLASS} /> }
      ]
    },
    {
      label: "Communication",
      items: [
        { href: "/mentor/messages", label: "Messages", icon: <MessageSquare className={ICON_CLASS} />, badge: unreadMessages },
        { href: "/mentor/notifications", label: "Notifications", icon: <Bell className={ICON_CLASS} />, badge: unreadNotifications }
      ]
    },
    {
      label: "Account",
      items: [
        { href: "/mentor/profile", label: "Profile", icon: <User className={ICON_CLASS} /> },
        { href: "/mentor/settings", label: "Settings", icon: <Settings className={ICON_CLASS} /> }
      ]
    }
  ];

  return (
    <DashboardShell navGroups={navGroups} userName={session.user.name ?? "Mentor"} roleLabel="Mentor">
      {children}
    </DashboardShell>
  );
}
