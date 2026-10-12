"use client";

import Link from "next/link";
import { Globe, BookOpen, Star } from "lucide-react";

interface MentorsFilterSidebarProps {
  currentSubject?: string;
  currentRating?: string;
  currentCountry?: string;
  currentQ?: string;
  currentSort?: string;
}

export function MentorsFilterSidebar({
  currentSubject,
  currentRating,
  currentCountry,
  currentQ,
  currentSort,
}: MentorsFilterSidebarProps) {
  const hasFilters = Boolean(currentSubject || currentRating || currentCountry || currentQ);

  const submitForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.target.form?.requestSubmit();
  };

  return (
    <aside aria-label="Filters" className="w-full">
      <form
        method="get"
        action="/mentors"
        className="rounded-3xl border border-[#E7ECE8] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
      >
        <div className="flex items-center justify-between border-b border-[#EAEFEA] pb-4">
          <span className="font-serif text-[17px] font-bold text-[#0F1E17]">Filters</span>
          {hasFilters && (
            <Link
              href="/mentors"
              className="text-[12px] font-semibold text-[#36887F] hover:underline"
            >
              Reset all
            </Link>
          )}
        </div>

        {currentQ && <input type="hidden" name="q" value={currentQ} />}
        {currentSort && <input type="hidden" name="sort" value={currentSort} />}

        <div className="mt-5 space-y-5 text-[14px]">
          {/* Destination */}
          <div className="border-b border-[#EAEFEA] pb-5">
            <label className="flex items-center gap-2 font-semibold text-[#0F1E17]">
              <Globe className="h-4 w-4 text-[#36887F]" />
              <span>Destination</span>
            </label>
            <select
              name="country"
              defaultValue={currentCountry ?? ""}
              onChange={submitForm}
              className="mt-2.5 h-[42px] w-full rounded-2xl border border-[#D5DCD7] bg-[#FAFBF9] px-3 text-[14px] text-[#0F1E17] transition-all focus:border-[#36887F] focus:outline-none"
            >
              <option value="">All Destinations</option>
              <option value="UK">United Kingdom</option>
              <option value="USA">United States</option>
              <option value="Canada">Canada</option>
              <option value="Germany">Germany</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          {/* Field of Study */}
          <div className="border-b border-[#EAEFEA] pb-5">
            <label className="flex items-center gap-2 font-semibold text-[#0F1E17]">
              <BookOpen className="h-4 w-4 text-[#36887F]" />
              <span>Field of Study</span>
            </label>
            <select
              name="subject"
              defaultValue={currentSubject ?? ""}
              onChange={submitForm}
              className="mt-2.5 h-[42px] w-full rounded-2xl border border-[#D5DCD7] bg-[#FAFBF9] px-3 text-[14px] text-[#0F1E17] transition-all focus:border-[#36887F] focus:outline-none"
            >
              <option value="">All Subjects</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Data Science">Data Science</option>
              <option value="Business Analytics">Business Analytics</option>
              <option value="Engineering">Engineering</option>
              <option value="Media & Communication">Media & Communication</option>
            </select>
          </div>

          {/* Minimum Rating */}
          <div>
            <label className="flex items-center gap-2 font-semibold text-[#0F1E17]">
              <Star className="h-4 w-4 text-[#36887F]" />
              <span>Minimum Rating</span>
            </label>
            <select
              name="rating"
              defaultValue={currentRating ?? ""}
              onChange={submitForm}
              className="mt-2.5 h-[42px] w-full rounded-2xl border border-[#D5DCD7] bg-[#FAFBF9] px-3 text-[14px] text-[#0F1E17] transition-all focus:border-[#36887F] focus:outline-none"
            >
              <option value="">Any Rating</option>
              <option value="4.8">4.8+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
            </select>
          </div>
        </div>
      </form>
    </aside>
  );
}