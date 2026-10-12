import { LayoutDashboard, Search, Users, CalendarCheck, MessageSquare, Bell, User, Settings } from "lucide-react";
import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { NotificationService } from "@/services/notification.service";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const ICON_CLASS = "h-4 w-4";

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const session = await requireRole(["STUDENT", "ADMIN"]);

  const [unreadMessages, unreadNotifications] = await Promise.all([
    db.message.count({
      where: { conversation: { studentId: session.user.id }, readAt: null, senderId: { not: session.user.id } }
    }),
    NotificationService.unreadCount(session.user.id)
  ]);

  // Icons must be rendered here (JSX), not passed as bare component
  // references — DashboardShell forwards navGroups into a Client Component
  // (MobileNav), and only rendered React elements can cross that boundary.
  const navGroups = [
    { items: [{ href: "/student/dashboard", label: "Dashboard", icon: <LayoutDashboard className={ICON_CLASS} /> }] },
    { label: "Discover", items: [{ href: "/mentors", label: "Find mentors", icon: <Search className={ICON_CLASS} /> }] },
    {
      label: "My learning",
      items: [
        { href: "/student/messages", label: "My mentors", icon: <Users className={ICON_CLASS} /> },
        { href: "/student/booked", label: "Booked sessions", icon: <CalendarCheck className={ICON_CLASS} /> }
      ]
    },
    {
      label: "Communication",
      items: [
        { href: "/student/messages", label: "Messages", icon: <MessageSquare className={ICON_CLASS} />, badge: unreadMessages },
        { href: "/student/notifications", label: "Notifications", icon: <Bell className={ICON_CLASS} />, badge: unreadNotifications }
      ]
    },
    {
      label: "Account",
      items: [
        { href: "/student/profile", label: "Profile", icon: <User className={ICON_CLASS} /> },
        { href: "/student/settings", label: "Settings", icon: <Settings className={ICON_CLASS} /> }
      ]
    }
  ];

  return (
    <DashboardShell navGroups={navGroups} userName={session.user.name ?? "Student"} roleLabel="Student">
      {children}
    </DashboardShell>
  );
}
