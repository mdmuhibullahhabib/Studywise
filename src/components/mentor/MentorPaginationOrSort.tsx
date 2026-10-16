"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Briefcase, Star, ArrowDownWideNarrow, SearchX } from "lucide-react";
import { MentorGridCard, MentorCardData } from "@/components/mentor/MentorGridCard";

interface MentorsGridWithSortProps {
  initialMentors: MentorCardData[];
  initialSort?: string;
}

export function MentorsGridWithSort({
  initialMentors,
  initialSort = "recommended",
}: MentorsGridWithSortProps) {
  const [currentSort, setCurrentSort] = useState(initialSort || "recommended");

  // Instant in-memory sort with zero page reload and zero scroll jump
  const sortedMentors = useMemo(() => {
    const list = [...initialMentors];
    switch (currentSort) {
      case "rating":
        return list.sort((a, b) => (b.ratingAverage ?? 0) - (a.ratingAverage ?? 0));
      case "price":
      case "price-asc":
        return list.sort((a, b) => (a.hourlyRate ?? 0) - (b.hourlyRate ?? 0));
      case "experience":
        return list.sort((a, b) => (b.sessionCount ?? 0) - (a.sessionCount ?? 0));
      case "recommended":
      case "popularity":
      default:
        return list.sort((a, b) => {
          const scoreA = (a.ratingAverage ?? 0) * 10 + (a.sessionCount ?? 0);
          const scoreB = (b.ratingAverage ?? 0) * 10 + (b.sessionCount ?? 0);
          return scoreB - scoreA;
        });
    }
  }, [initialMentors, currentSort]);

  const handleSortChange = (sortKey: string) => {
    if (sortKey === currentSort) return;
    setCurrentSort(sortKey);

    // Silently update the URL query parameter without Next.js server navigation or scroll jumping
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (sortKey === "recommended") {
        url.searchParams.delete("sort");
      } else {
        url.searchParams.set("sort", sortKey);
      }
      window.history.replaceState(window.history.state, "", url.toString());
    }
  };

  const sortOptions = [
    { key: "recommended", label: "Popularity", icon: Sparkles },
    { key: "rating", label: "Highest Rated", icon: Star },
    { key: "price", label: "Lowest Price", icon: ArrowDownWideNarrow },
    { key: "experience", label: "Most Experienced", icon: Briefcase },
  ];

  return (
    <div>
      {/* Sorter Header Bar */}
      <div className="flex flex-col gap-4 border-b border-[#E0E8E3] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-[14px] text-[#556960]">
          <span>Showing</span>
          <strong className="inline-flex items-center rounded-lg bg-[#EBF4F0] px-2.5 py-0.5 font-bold text-[#1C3E30]">
            {sortedMentors.length}
          </strong>
          <span>verified mentors</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[13px] font-medium text-[#708078]">Sort by:</span>

          <div className="flex flex-wrap items-center gap-1 rounded-full border border-[#DCE4DF] bg-[#F2F6F4] p-1">
            {sortOptions.map((item) => {
              const active = currentSort === item.key;
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleSortChange(item.key)}
                  className={`flex h-[34px] items-center gap-1.5 rounded-full px-3.5 text-[12.5px] font-semibold transition-all duration-200 active:scale-95 ${
                    active
                      ? "bg-[#1C3E30] text-white shadow-xs"
                      : "text-[#556960] hover:text-[#0F1E17]"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${active ? "text-white" : "text-[#708078]"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid or Empty State with Smooth Motion Layout Animation */}
      {sortedMentors.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-[#E0E8E3] bg-white py-20 text-center shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EBF4F0] text-[#36887F]">
            <SearchX className="h-7 w-7" />
          </div>
          <h3 className="mt-4 font-serif text-2xl font-bold text-[#0F1E17]">
            No mentors found
          </h3>
          <p className="mt-2 text-[15px] text-[#556960]">
            Try adjusting your search criteria, clearing filters, or checking back later.
          </p>
        </div>
      ) : (
        <motion.div
          layout
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {sortedMentors.map((mentor) => (
            <motion.div
              key={mentor.id}
              layout
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <MentorGridCard mentor={mentor} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export function MentorPaginationOrSort({ totalCount }: { totalCount: number }) {
  return null;
}