import {
  LayoutDashboard,
  Users,
  GraduationCap,
  FileCheck,
  CalendarCheck,
  Video,
  CreditCard,
  Star,
  Flag,
  Settings
} from "lucide-react";
import { requireRole } from "@/lib/permissions";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const ICON_CLASS = "h-4 w-4";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireRole("ADMIN");

  // Icons must be rendered here (JSX), not passed as bare component
  // references — DashboardShell forwards navGroups into a Client Component
  // (MobileNav), and only rendered React elements can cross that boundary.
  const navGroups = [
    { items: [{ href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard className={ICON_CLASS} /> }] },
    {
      label: "People",
      items: [
        { href: "/admin/students", label: "Students", icon: <Users className={ICON_CLASS} /> },
        { href: "/admin/mentors", label: "Mentors", icon: <GraduationCap className={ICON_CLASS} /> },
        { href: "/admin/applications", label: "Applications", icon: <FileCheck className={ICON_CLASS} /> }
      ]
    },
    {
      label: "Platform",
      items: [
        { href: "/admin/sessions", label: "Sessions", icon: <CalendarCheck className={ICON_CLASS} /> },
        { href: "/admin/meetings", label: "Meetings", icon: <Video className={ICON_CLASS} /> },
        { href: "/admin/payments", label: "Payments", icon: <CreditCard className={ICON_CLASS} /> },
        { href: "/admin/reviews", label: "Reviews", icon: <Star className={ICON_CLASS} /> },
        { href: "/admin/reports", label: "Reports", icon: <Flag className={ICON_CLASS} /> }
      ]
    },
    { items: [{ href: "/admin/settings", label: "Settings", icon: <Settings className={ICON_CLASS} /> }] }
  ];

  return (
    <DashboardShell navGroups={navGroups} userName={session.user.name ?? "Admin"} roleLabel="Admin">
      {children}
    </DashboardShell>
  );
}
