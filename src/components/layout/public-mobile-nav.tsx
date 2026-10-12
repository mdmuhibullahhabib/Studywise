"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, LayoutDashboard, User, Settings, LogOut, MessageSquare } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

const NAV_LINKS = [
  { href: "/mentors", label: "Find a mentor" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/become-a-mentor", label: "Become a mentor" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" }
];

const ROLE_PATHS = {
  STUDENT: { dashboard: "/student/dashboard", messages: "/student/messages", profile: "/student/profile", settings: "/student/settings" },
  MENTOR: { dashboard: "/mentor/dashboard", messages: "/mentor/messages", profile: "/mentor/profile", settings: "/mentor/settings" },
  // ADMIN: { dashboard: "/admin/dashboard", messages: "/admin/dashboard", profile: "/admin/settings", settings: "/admin/settings" }
  ADMIN: { dashboard: "/admin/dashboard", messages: "/admin/messages", profile: "/admin/profile", settings: "/admin/settings" }
} as const;

export function PublicMobileNav() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const paths = user ? ROLE_PATHS[user.role] : null;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded text-ink-500 hover:bg-ink/5"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button aria-label="Close menu" onClick={() => setOpen(false)} className="flex-1 bg-ink/30" />
          <div className="w-72 shrink-0 bg-paper shadow-raised">
            <div className="flex h-16 items-center justify-between border-b border-line px-6">
              <span className="font-display text-lg font-bold text-ink">Menu</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded text-ink-500 hover:bg-paper-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {user && paths && (
              <div className="flex items-center gap-3 border-b border-line px-6 py-4">
                <Avatar name={user.name ?? "Account"} src={user.image} size="md" />
                <p className="truncate text-sm font-medium text-ink">{user.name}</p>
              </div>
            )}

            <nav className="flex flex-col gap-1 px-4 py-6" aria-label="Primary">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded px-2.5 py-2.5 text-sm font-medium text-ink-500 hover:bg-paper-muted hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}

              {user && paths ? (
                <div className="mt-4 flex flex-col gap-1 border-t border-line pt-4">
                  <Link
                    href={paths.dashboard}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 rounded px-2.5 py-2.5 text-sm font-medium text-ink-500 hover:bg-paper-muted hover:text-ink"
                  >
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  {user.role !== "ADMIN" && (
                    <Link
                      href={paths.messages}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 rounded px-2.5 py-2.5 text-sm font-medium text-ink-500 hover:bg-paper-muted hover:text-ink"
                    >
                      <MessageSquare className="h-4 w-4" /> Messages
                    </Link>
                  )}
                  <Link
                    href={paths.profile}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 rounded px-2.5 py-2.5 text-sm font-medium text-ink-500 hover:bg-paper-muted hover:text-ink"
                  >
                    <User className="h-4 w-4" /> Profile
                  </Link>
                  <Link
                    href={paths.settings}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 rounded px-2.5 py-2.5 text-sm font-medium text-ink-500 hover:bg-paper-muted hover:text-ink"
                  >
                    <Settings className="h-4 w-4" /> Settings
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-2.5 rounded px-2.5 py-2.5 text-left text-sm font-medium text-danger hover:bg-danger-soft"
                  >
                    <LogOut className="h-4 w-4" /> Log out
                  </button>
                </div>
              ) : (
                <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4">
                  <Link href="/auth/login" onClick={() => setOpen(false)} className="btn-secondary w-full">
                    Log in
                  </Link>
                  <Link href="/auth/register" onClick={() => setOpen(false)} className="btn-primary w-full">
                    Get started
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
