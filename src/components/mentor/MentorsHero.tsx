"use client";

import Image from "next/image";
import { Search, SlidersHorizontal } from "lucide-react";

interface MentorsHeroProps {
  initialSearch?: string;
}

export function MentorsHero({ initialSearch = "" }: MentorsHeroProps) {
  return (
    <section className="relative flex min-h-[480px] w-full items-center overflow-hidden border-b border-[#E8ECE9] bg-white lg:min-h-[540px]">
      
      {/* Background Image Container with Gradient Fade */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2400&q=85"
          alt="Mentors Campus Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center] lg:object-[right_center]"
        />
        {/* Left-to-Right smooth fade out */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-45% to-white/10 lg:via-white/90 lg:via-40% lg:to-transparent" />
      </div>

      {/* ================= EXACT HOME BANNER WIDTH CONTAINER ================= */}
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] items-center px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24 xl:px-24">
          
          <div className="w-full max-w-xl lg:max-w-2xl">
            {/* Eyebrow */}
            <span className="text-[14px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
              FIND YOUR GUIDE
            </span>

            {/* Serif Heading */}
            <h1
              style={{ lineHeight: 1.18 }}
              className="mt-4 font-serif text-3xl font-extrabold !leading-[1.18] tracking-tight text-[#0F1E17] sm:text-5xl lg:text-[50px] xl:text-[56px]"
            >
              Meet someone who’s <br />
              already been there.
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-xl text-[15px] sm:text-[16px] leading-relaxed text-[#556960]">
              Connect with verified students and graduates who can help you navigate your study-abroad journey with real experience.
            </p>

            {/* Mockup-Exact Capsule Search Bar with Filter Inside */}
            <form
              method="get"
              action="/mentors"
              className="relative mt-8 flex w-full max-w-xl items-center rounded-full border border-neutral-200/90 bg-white p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all focus-within:border-[#36887F] focus-within:shadow-[0_4px_24px_rgba(54,136,127,0.12)]"
            >
              <div className="flex flex-1 items-center pl-4 sm:pl-5">
                <Search className="h-5 w-5 shrink-0 text-[#8FA097]" />
                <input
                  type="text"
                  name="q"
                  defaultValue={initialSearch}
                  placeholder="Search by university, country, subject or name..."
                  className="w-full bg-transparent px-3 py-2.5 text-[14px] sm:text-[15px] text-[#0F1E17] placeholder-[#8FA097] focus:outline-none"
                />
              </div>

              {/* Filter Button */}
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full border border-neutral-200/80 bg-[#F4F6F4] px-4 py-2 text-[13px] font-bold text-[#20332B] transition-all duration-150 hover:border-[#36887F] hover:bg-white hover:text-[#36887F] active:scale-95"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Filter</span>
              </button>
            </form>
          </div>

        </div>
      </div>

    </section>
  );
}