import Link from "next/link";
import { NavList, type NavGroup } from "./nav-list";
import { MobileNav } from "./mobile-nav";
import { Avatar } from "@/components/ui/avatar";

export type { NavGroup };

export function DashboardShell({
  navGroups,
  userName,
  roleLabel,
  children
}: {
  navGroups: NavGroup[];
  userName: string;
  roleLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 border-r border-line bg-paper-muted md:block">
        <div className="flex h-16 items-center border-b border-line px-6">
          <Link href="/" className="font-display text-lg font-bold text-ink">
            StudyWise
          </Link>
        </div>
        <NavList navGroups={navGroups} />
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex h-16 items-center justify-between border-b border-line bg-white px-4 md:px-6">
          <div className="flex items-center gap-3">
            <MobileNav navGroups={navGroups} />
            <p className="text-sm text-ink-500">{roleLabel}</p>
          </div>
          <div className="flex items-center gap-2.5">
            <p className="hidden text-sm font-medium text-ink sm:block">{userName}</p>
            <Avatar name={userName} size="sm" />
          </div>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
