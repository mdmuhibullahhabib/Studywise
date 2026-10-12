import Link from "next/link";
import Image from "next/image";
import { Search, Bell } from "lucide-react";

interface MentorDashboardHeaderProps {
  name: string;
  avatarUrl?: string | null;
  unreadCount: number;
}

export function MentorDashboardHeader({
  name,
  avatarUrl,
  unreadCount,
}: MentorDashboardHeaderProps) {
  const firstName = name ? name.split(" ")[0] : "Mentor";

  return (
    <header className="flex flex-col gap-4 border-b border-[#E7ECE8] pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-serif text-2xl font-normal tracking-tight text-[#0F1E17] sm:text-3xl flex items-center gap-2">
          <span>Good morning, {firstName}.</span>
          <span className="text-amber-500 text-xl inline-block select-none">☀️</span>
        </h1>
        <p className="text-xs text-[#62736B] sm:text-sm mt-0.5">
          Here&apos;s what&apos;s happening with your mentorship today.
        </p>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#86978F]" />
          <input
            type="text"
            placeholder="Search students, topics, or messages..."
            className="w-64 lg:w-72 rounded-full border border-[#E1E7E3] bg-white py-2 pl-9 pr-4 text-xs text-[#192721] placeholder-[#9AA8A1] shadow-2xs focus:border-[#1C3E30] focus:outline-none"
          />
        </div>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#E1E7E3] bg-white text-[#52645C] hover:bg-[#F2F6F4]"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#1C3E30]" />
          )}
        </button>

        {/* User Avatar */}
        <Link href="/mentor/profile" className="flex items-center gap-2">
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-[#DCE3DF]">
            <Image
              src={
                avatarUrl ||
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
              }
              alt={"firstName"}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}