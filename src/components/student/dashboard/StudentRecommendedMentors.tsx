import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { MentorGridCard, type MentorCardData } from "@/components/mentor/MentorGridCard";

interface StudentRecommendedMentorsProps {
  mentors: MentorCardData[];
}

export function StudentRecommendedMentors({ mentors }: StudentRecommendedMentorsProps) {
  if (!mentors || mentors.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D5E3DB] bg-[#EBF4F0] px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1C3E30]">
            <Sparkles className="h-3 w-3 text-[#36887F]" />
            <span>Handpicked Mentors</span>
          </div>
          <h2 className="mt-2 font-serif text-2xl font-normal tracking-tight text-[#0F1E17] sm:text-3xl">
            Recommended mentors for you
          </h2>
          <p className="mt-1 text-xs text-[#5F7068] sm:text-sm">
            Top-rated students and alumni currently studying abroad, ready to guide your application.
          </p>
        </div>

        <Link
          href="/mentors"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C3E30] transition-colors hover:text-[#36887F] hover:underline"
        >
          <span>Browse all mentors</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mentors.map((mentor) => (
          <MentorGridCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </section>
  );
}

