import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, CalendarCheck, Wallet, Sparkles } from "lucide-react";

export function MentorHeroBanner() {
  return (
    <section className="relative mt-8 min-h-[260px] w-full overflow-hidden rounded-3xl border border-[#E7ECE8] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.02)] sm:min-h-[290px]">
      {/* Background Graphic & High-Res Panoramic Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/mentor-dashboard/mentor_dashboard_banner.png"
          alt="Mentor Skyline"
          fill
          priority
          className="object-cover object-[80%_center] opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFBF9] via-[#FAFBF9]/92 to-transparent sm:via-[#FAFBF9]/85 lg:via-[#FAFBF9]/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-9 lg:p-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div className="max-w-xl">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D5E3DB] bg-[#EBF4F0] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1C3E30]">
              <Sparkles className="h-3 w-3 text-[#36887F]" />
              <span>Mentor Community & Impact</span>
            </div>

            <h2 className="mt-3.5 font-serif text-3xl font-normal leading-[1.15] tracking-tight text-[#0F1E17] sm:text-4xl">
              Empower the next generation <br className="hidden sm:inline" /> of global scholars.
            </h2>
            <p className="mt-2.5 max-w-lg text-xs leading-relaxed text-[#5F7068] sm:text-sm">
              Manage your schedule, conduct 1-on-1 consultations, and share your firsthand experience to help ambitious students gain admission abroad.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="/mentor/booked"
                className="inline-flex items-center gap-2 rounded-full bg-[#1C3E30] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#36887F]"
              >
                <span>View Bookings</span>
                <CalendarCheck className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/mentor/settings"
                className="inline-flex items-center gap-2 rounded-full border border-[#D0DCD5] bg-white/90 px-4 py-2.5 text-xs font-medium text-[#20332B] backdrop-blur-xs transition-colors hover:border-[#1C3E30] hover:bg-white"
              >
                <Calendar className="h-3.5 w-3.5 text-[#36887F]" />
                <span>Manage Availability</span>
              </Link>
              <Link
                href="/mentor/earnings"
                className="inline-flex items-center gap-2 rounded-full border border-[#D0DCD5] bg-white/90 px-4 py-2.5 text-xs font-medium text-[#20332B] backdrop-blur-xs transition-colors hover:border-[#1C3E30] hover:bg-white"
              >
                <Wallet className="h-3.5 w-3.5 text-[#36887F]" />
                <span>Earnings</span>
              </Link>
            </div>
          </div>

          {/* Decorative Inspirational Tagline */}
          <div className="hidden -rotate-6 select-none text-right lg:block lg:pr-8">
            <p className="font-serif text-base italic leading-tight text-[#2B3E35] sm:text-lg">
              Real experience.
            </p>
            <p className="font-serif text-base italic leading-tight text-[#2B3E35] sm:text-lg">
              Real impact.
            </p>
          </div>
        </div>

        {/* Quick Tips / Status */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[#E5EDE7]/80 pt-4 text-[11px] text-[#556960]">
          <span className="font-semibold text-[#1C3E30]">Pro Tip:</span>
          <span>Mentors with at least 5 weekly availability slots receive 3× more booking requests.</span>
          <Link href="/mentor/settings" className="font-semibold text-[#1C3E30] hover:underline ml-1">
            Update schedule →
          </Link>
        </div>
      </div>
    </section>
  );
}