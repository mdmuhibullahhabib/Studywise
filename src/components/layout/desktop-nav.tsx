"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
}

export function DesktopNav({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-7 lg:gap-9" aria-label="Primary">
      {links.map((link) => {
        const isActive =
          pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`group relative py-2 text-[14px] font-bold tracking-tight transition-colors duration-200 ${
              isActive
                ? "text-[#36887F]"
                : "text-[#162E34] hover:text-[#36887F]"
            }`}
          >
            {link.label}
            <span
              className={`absolute bottom-0 left-0 h-[3px] rounded-full bg-[#36887F] transition-all duration-200 ease-out ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}