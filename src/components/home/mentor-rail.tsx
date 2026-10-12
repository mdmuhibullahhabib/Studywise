"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MentorRailCard } from "@/components/mentor/mentor-rail-card";
import type { MentorCardData } from "@/components/mentor/mentor-card";

export function MentorRail({
  title,
  mentors,
  seeAllHref
}: {
  title: string;
  mentors: MentorCardData[];
  seeAllHref: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(amount: number) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  if (mentors.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-h3">{title}</h3>
        <div className="flex items-center gap-3">
          <Link href={seeAllHref} className="text-sm font-semibold text-sage-text hover:text-ink">
            Show all
          </Link>
          <div className="hidden gap-1 sm:flex">
            <button
              onClick={() => scrollBy(-420)}
              aria-label="Scroll left"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-ink-500 transition-colors hover:border-ink/30 hover:text-ink"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => scrollBy(420)}
              aria-label="Scroll right"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-ink-500 transition-colors hover:border-ink/30 hover:text-ink"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div ref={scrollerRef} className="mt-4 flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {mentors.map((mentor) => (
          <MentorRailCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </div>
  );
}
