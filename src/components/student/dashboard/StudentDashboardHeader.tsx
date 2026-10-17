"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Bell, MessageSquare } from "lucide-react";

interface StudentDashboardHeaderProps {
  name: string;
  avatarUrl?: string | null;
  unreadMessagesCount: number;
  unreadNotificationsCount?: number;
}

export function StudentDashboardHeader({
  name,
  avatarUrl,
  unreadMessagesCount,
  unreadNotificationsCount = 0,
}: StudentDashboardHeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const firstName = name ? name.split(" ")[0] : "Student";

  // Dynamic greeting based on current local hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good morning", icon: "☀️" };
    if (hour < 18) return { text: "Good afternoon", icon: "🌤️" };
    return { text: "Good evening", icon: "🌙" };
  };

  const greeting = getGreeting();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/mentors?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/mentors");
    }
  };

  return (
    <header className="flex flex-col gap-4 border-b border-[#E7ECE8] pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="flex items-center gap-2 font-serif text-2xl font-normal tracking-tight text-[#0F1E17] sm:text-3xl">
          <span>
            {greeting.text}, {firstName}.
          </span>
          <span className="inline-block select-none text-xl">{greeting.icon}</span>
        </h1>
        <p className="mt-0.5 text-xs text-[#62736B] sm:text-sm">
          Here&apos;s what&apos;s happening with your study-abroad journey today.
        </p>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative hidden md:block">
          <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#86978F]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mentors, universities, subjects..."
            className="w-64 rounded-full border border-[#E1E7E3] bg-white py-2 pl-9 pr-4 text-xs text-[#192721] placeholder-[#9AA8A1] shadow-2xs transition-all focus:border-[#1C3E30] focus:outline-none lg:w-72"
          />
        </form>

        {/* Messages Shortcut */}
        <Link
          href="/student/messages"
          aria-label="Messages"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#E1E7E3] bg-white text-[#52645C] transition-colors hover:bg-[#F2F6F4]"
        >
          <MessageSquare className="h-4 w-4" />
          {unreadMessagesCount > 0 && (
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#1C3E30]" />
          )}
        </Link>

        {/* Notifications Shortcut */}
        <Link
          href="/student/notifications"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#E1E7E3] bg-white text-[#52645C] transition-colors hover:bg-[#F2F6F4]"
        >
          <Bell className="h-4 w-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#1C3E30]" />
          )}
        </Link>

        {/* User Profile Avatar */}
        <Link href="/student/profile" className="flex items-center gap-2 group">
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-[#DCE3DF] transition-transform group-hover:scale-105">
            <Image
              src={
                avatarUrl ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              }
              alt={firstName || "Student"}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
