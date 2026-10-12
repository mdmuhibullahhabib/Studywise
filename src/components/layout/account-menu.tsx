"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LayoutDashboard, User, Settings, LogOut } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

export function AccountMenu({
  name,
  avatarUrl,
  dashboardHref,
  profileHref,
  settingsHref
}: {
  name: string;
  avatarUrl?: string | null;
  dashboardHref: string;
  profileHref: string;
  settingsHref: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const items = [
    { href: dashboardHref, label: "Dashboard", icon: LayoutDashboard },
    { href: profileHref, label: "Profile", icon: User },
    { href: settingsHref, label: "Settings", icon: Settings }
  ];

  return (
    <div ref={rootRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        aria-expanded={open}
        className="rounded-full transition-opacity hover:opacity-80"
      >
        <Avatar name={name} src={avatarUrl} size="sm" />
      </button>

      {open && (
        <div className="absolute right-0 top-11 w-52 rounded-md border border-line bg-white py-1.5 shadow-raised">
          <p className="truncate px-3.5 py-2 text-sm font-medium text-ink">{name}</p>
          <div className="my-1 border-t border-line" />
          {/*           
          {items.map((item) => ( */}
          {items
            .filter((item, index, arr) => arr.findIndex((i) => i.href === item.href) === index)
            .map((item) => (
              
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-ink-500 hover:bg-paper-muted hover:text-ink"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          <div className="my-1 border-t border-line" />
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm text-danger hover:bg-danger-soft"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
