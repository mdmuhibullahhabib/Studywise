import Link from "next/link";
import type { ReactNode } from "react";

export interface NavGroup {
  label?: string;
  // `icon` is a pre-rendered element (e.g. <LayoutDashboard className="h-4 w-4" />),
  // not a component reference. Server Components can only pass rendered React
  // elements — not raw component functions — across the boundary into a
  // Client Component (MobileNav), so it must already be JSX by the time it
  // gets here.
  items: { href: string; label: string; icon: ReactNode; badge?: number }[];
}

export function NavList({ navGroups, onNavigate }: { navGroups: NavGroup[]; onNavigate?: () => void }) {
  return (
    <nav className="space-y-6 px-4 py-6">
      {navGroups.map((group, i) => (
        <div key={group.label ?? i}>
          {group.label && <p className="px-2 field-label">{group.label}</p>}
          <ul className="mt-2 space-y-1">
            {group.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="flex items-center gap-2.5 rounded px-2.5 py-2 text-sm font-medium text-ink-500 transition-colors duration-150 hover:bg-white hover:text-ink"
                >
                  {item.icon}
                  <span className="flex-1">{item.label}</span>
                  {!!item.badge && (
                    <span className="rounded-full bg-gold px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
