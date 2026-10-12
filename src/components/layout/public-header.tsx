import Link from "next/link";
import Image from "next/image";
import { Mail, Globe, User } from "lucide-react";
import { auth } from "@/lib/auth";
import { getUnreadMessageCount } from "@/lib/unread";
import { PublicMobileNav } from "./public-mobile-nav";
import { AccountMenu } from "./account-menu";
import { DesktopNav } from "./desktop-nav";
import Logo from "../../../public/images/logo/Logo.png";

const NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/mentors", label: "MENTORS" },
  { href: "/how-it-works", label: "HOW IT WORKS" },
  { href: "/resources", label: "RESOURCES" },
  { href: "/become-a-mentor", label: "BECOME A MENTOR" },
];

const ROLE_PATHS = {
  STUDENT: {
    dashboard: "/student/dashboard",
    messages: "/student/messages",
    profile: "/student/profile",
    settings: "/student/settings",
  },
  MENTOR: {
    dashboard: "/mentor/dashboard",
    messages: "/mentor/messages",
    profile: "/mentor/profile",
    settings: "/mentor/settings",
  },
  ADMIN: {
    dashboard: "/admin/dashboard",
    messages: "/admin/messages",
    profile: "/admin/profile",
    settings: "/admin/settings",
  },
} as const;

export async function PublicHeader() {
  const session = await auth();
  const user = session?.user;
  const paths = user ? ROLE_PATHS[user.role] : null;
  const unreadCount = user ? await getUnreadMessageCount(user.id, user.role) : 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#EAEFEA] bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">

      <div className="flex h-[80px] w-10/12 mx-auto items-center justify-between px-6 sm:px-12 lg:px-16 xl:px-24">
        
        {/* লোগো সেকশন - ৮০px হেডারের সাথে আনুপাতিক সাইজ */}
        <Link
          href="/"
          className="flex shrink-0 items-center bg-transparent transition-opacity duration-150 hover:opacity-90"
        >
          <Image
            src={Logo}
            alt="StudyWise Logo"
            width={260}
            height={60}
            className="h-10 sm:h-11 w-auto max-w-[200px] sm:max-w-[240px] bg-transparent object-contain shadow-none"
            priority
            unoptimized
          />
        </Link>

        {/* সেন্টার নেভিগেশন - 14px Bold & #36887F কালার */}
        <DesktopNav links={NAV_LINKS} />

        {/* রাইট সেকশন: অ্যাকশন ও বাটন */}
        <div className="flex items-center gap-3.5 lg:gap-4">
          {user && paths ? (
            <div className="hidden sm:flex items-center gap-3">
              {/* মেসেজ আইকন */}
              <Link
                href={paths.messages}
                aria-label="Messages"
                className="relative flex h-[42px] w-[42px] items-center justify-center rounded-full border border-gray-200/90 bg-white text-[#162E34] transition-all hover:border-[#36887F] hover:text-[#36887F] hover:bg-gray-50 active:scale-95"
              >
                <Mail className="h-5 w-5" strokeWidth={2} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5 rounded-full bg-[#36887F] ring-2 ring-white" />
                )}
              </Link>

              {/* প্রোফাইল মেনু */}
              <AccountMenu
                name={user.name ?? "Account"}
                avatarUrl={user.image}
                dashboardHref={paths.dashboard}
                profileHref={paths.profile}
                settingsHref={paths.settings}
              />

              {/* ড্যাশবোর্ড বাটন */}
              <Link
                href={paths.dashboard}
                className="inline-flex h-[44px] items-center justify-center gap-2 rounded-full bg-[#162E34] px-5 text-[14px] font-bold text-white transition-all duration-200 hover:bg-[#0E1E22] active:scale-[0.98] shadow-sm"
              >
                <User className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              {/* ল্যাঙ্গুয়েজ পিল বাটন */}
              <div className="flex h-[42px] items-center gap-2 rounded-full border border-gray-200 px-3.5 text-[14px] font-bold text-[#162E34]">
                <Globe className="h-4 w-4 text-gray-500" />
                <span>EN</span>
              </div>

              {/* লগইন / রেজিস্টার পিল বাটন */}
              <Link
                href="/auth/login"
                className="inline-flex h-[44px] items-center justify-center gap-2 rounded-full bg-[#162E34] px-5 text-[14px] font-bold text-white transition-all duration-200 hover:bg-[#0E1E22] active:scale-[0.98] shadow-sm"
              >
                <User className="h-4 w-4" />
                <span>Login / Register</span>
              </Link>
            </div>
          )}

          {/* মোবাইল নেভিগেশন ড্রয়ার */}
          <div className="md:hidden">
            <PublicMobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}