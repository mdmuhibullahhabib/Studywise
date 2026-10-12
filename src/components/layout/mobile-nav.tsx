"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NavList, type NavGroup } from "./nav-list";

export function MobileNav({ navGroups }: { navGroups: NavGroup[] }) {
  const [open, setOpen] = useState(false);

  // Prevent background scroll while the drawer is open.
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
        <div className="fixed inset-0 z-50 flex">
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex-1 bg-ink/30 transition-opacity"
          />
          <div className="w-72 shrink-0 overflow-y-auto bg-paper-muted shadow-raised transition-transform duration-200">
            <div className="flex h-16 items-center justify-between border-b border-line px-6">
              <Link href="/" className="font-display text-lg font-bold text-ink" onClick={() => setOpen(false)}>
                StudyWise
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded text-ink-500 hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavList navGroups={navGroups} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
