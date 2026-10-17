"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Bell, MessageSquare, Star, CheckCircle2 } from "lucide-react";

interface MentorDashboardHeaderProps {
  name: string;
  avatarUrl?: string | null;
  unreadCount: number;
  unreadNotificationsCount?: number;
  verified?: boolean;
  ratingAverage?: number;
  ratingCount?: number;
}

export function MentorDashboardHeader({
  name,
  avatarUrl,
  unreadCount,
  unreadNotificationsCount = 0,
  verified = true,
  ratingAverage = 4.9,
  ratingCount = 0,
}: MentorDashboardHeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const firstName = name ? name.split(" ")[0] : "Mentor";

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
      router.push(`/mentor/booked?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/mentor/booked");
    }
  };

  return (
    <header className="flex flex-col gap-4 border-b border-[#E7ECE8] pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="flex items-center gap-2 font-serif text-2xl font-normal tracking-tight text-[#0F1E17] sm:text-3xl">
            <span>
              {greeting.text}, {firstName}.
            </span>
            <span className="inline-block select-none text-xl">{greeting.icon}</span>
          </h1>

          {/* Verification Badge */}
          {verified && (
            <span className="inline-flex items-center gap-1 rounded-full border border-[#D5E3DB] bg-[#EBF4F0] px-2.5 py-0.5 text-[11px] font-semibold text-[#1C3E30]">
              <CheckCircle2 className="h-3.5 w-3.5 fill-[#36887F] text-white" />
              <span>Verified Mentor</span>
            </span>
          )}

          {/* Rating Summary */}
          {ratingAverage > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full border border-[#F2E7CA] bg-[#FFFBF0] px-2.5 py-0.5 text-[11px] font-medium text-[#7A5612]">
              <Star className="h-3 w-3 fill-[#E5A023] text-[#E5A023]" />
              <span className="font-semibold text-[#1E2E27]">{ratingAverage.toFixed(1)}</span>
              {ratingCount > 0 && <span className="text-[#8C9C94]">({ratingCount})</span>}
            </span>
          )}
        </div>

        <p className="mt-1 text-xs text-[#62736B] sm:text-sm">
          Here&apos;s your mentorship overview, student bookings, and daily activity.
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
            placeholder="Search students, bookings, topics..."
            className="w-64 rounded-full border border-[#E1E7E3] bg-white py-2 pl-9 pr-4 text-xs text-[#192721] placeholder-[#9AA8A1] shadow-2xs transition-all focus:border-[#1C3E30] focus:outline-none lg:w-72"
          />
        </form>

        {/* Messages Shortcut */}
        <Link
          href="/mentor/messages"
          aria-label="Messages"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#E1E7E3] bg-white text-[#52645C] transition-colors hover:bg-[#F2F6F4]"
        >
          <MessageSquare className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#1C3E30]" />
          )}
        </Link>

        {/* Notifications Shortcut */}
        <Link
          href="/mentor/notifications"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#E1E7E3] bg-white text-[#52645C] transition-colors hover:bg-[#F2F6F4]"
        >
          <Bell className="h-4 w-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#1C3E30]" />
          )}
        </Link>

        {/* Mentor Profile Avatar */}
        <Link href="/mentor/profile" className="group flex items-center gap-2">
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-[#DCE3DF] transition-transform group-hover:scale-105">
            <Image
              src={
                avatarUrl ||
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
              }
              alt={firstName || "Mentor"}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}