import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function ImpactCtaBanner() {
  return (
    <section className="relative mt-12 overflow-hidden rounded-3xl border border-[#DCE5DF] bg-[#F1F5F2] p-8 sm:p-10">
      {/* City Architecture Vector Line Graphic */}
      <div className="pointer-events-none absolute right-0 bottom-0 opacity-15">
        <svg width="260" height="130" viewBox="0 0 240 120" fill="none">
          <path
            d="M20 120 L20 60 L30 50 L40 60 L40 120 M70 120 L70 30 L80 15 L90 30 L90 120 M130 120 L130 45 L145 25 L160 45 L160 120 M190 120 L190 55 L200 40 L210 55 L210 120"
            stroke="#1C3E30"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#36887F]">
            <Sparkles className="h-3 w-3" />
            <span>Expand Your Impact</span>
          </div>
          <h3 className="mt-1.5 font-serif text-2xl font-normal text-[#0F1E17] sm:text-3xl">
            Keep making a difference for future students.
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-[#52645B] sm:text-sm">
            Thousands of applicants are searching for mentors at your university. Keep your weekly schedule active, enrich your bio, and add your latest achievements to attract ambitious mentees.
          </p>
        </div>

        <Link
          href="/mentor/profile"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1C3E30] px-6 py-3 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#36887F]"
        >
          <span>Update Mentor Profile</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}