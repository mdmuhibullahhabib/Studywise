"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, Users, GraduationCap, Star } from "lucide-react";
import BANNER_IMAGE from "../../../public/images/mentor/mentor_banner.png";

interface MentorsHeroProps {
  initialSearch?: string;
}

export function MentorsHero({ initialSearch = "" }: MentorsHeroProps) {
  const popularTags = [
    "Computer Science",
    "United Kingdom",
    "Canada",
    "Scholarships",
    "Germany",
    "Australia",
  ];

  return (
    <section className="relative flex min-h-[500px] w-full items-center overflow-hidden border-b border-[#E8ECE9] bg-[#FAFBF9] lg:min-h-[560px]">
      
      {/* Background Image Container - 100% Opacity, No White Overlay / Gradient */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={BANNER_IMAGE}
          alt="Mentors Campus Background"
          fill
          priority
          sizes="100vw"
          style={{ opacity: 1 }}
          className="object-cover object-right opacity-100 lg:object-[right_center]"
        />
      </div>

      {/* Container */}
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] items-center px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24 xl:px-24">
          
          <div className="w-full max-w-xl lg:max-w-2xl">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D5E3DB] bg-[#EBF4F0] px-3.5 py-1 text-[11px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#36887F]" />
              FIND YOUR GUIDE
            </span>

            {/* Serif Heading */}
            <h1
              style={{ lineHeight: 1.16 }}
              className="mt-4 font-serif text-3xl font-extrabold !leading-[1.16] tracking-tight text-[#0F1E17] sm:text-5xl lg:text-[50px] xl:text-[56px]"
            >
              Meet someone who’s <br />
              already been there.
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#556960] sm:text-[16px] lg:text-[18px]">
              Connect with verified students and graduates from top global universities who can guide your study-abroad journey with real, honest experience.
            </p>

            {/* Modern Search Bar */}
            <form
              method="get"
              action="/mentors"
              className="relative mt-7 flex w-full max-w-xl items-center rounded-full border border-neutral-200/90 bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all focus-within:border-[#36887F] focus-within:shadow-[0_8px_30px_rgba(54,136,127,0.14)]"
            >
              <div className="flex flex-1 items-center pl-4 sm:pl-5">
                <Search className="h-5 w-5 shrink-0 text-[#8FA097]" />
                <input
                  type="text"
                  name="q"
                  defaultValue={initialSearch}
                  placeholder="Search by university, country, subject or name..."
                  className="w-full bg-transparent px-3 py-2.5 text-[14px] text-[#0F1E17] placeholder-[#8FA097] focus:outline-none sm:text-[15px]"
                />
              </div>

              {/* Submit Search Button */}
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full bg-[#1C3E30] px-5 py-2.5 text-[13px] font-semibold text-white shadow-xs transition-all duration-200 hover:bg-[#36887F] active:scale-95 sm:px-6"
              >
                <Search className="h-3.5 w-3.5" />
                <span>Search</span>
              </button>
            </form>

            {/* Popular Quick Tags */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px]">
              <span className="font-medium text-[#708078]">Popular:</span>
              {popularTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/mentors?q=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-[#DCE4DF] bg-white/80 px-2.5 py-0.5 text-[12px] font-medium text-[#384C42] transition-colors hover:border-[#36887F] hover:bg-[#EBF4F0] hover:text-[#1C3E30]"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Trust Stats Bar */}
            <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-[#E8ECE9] pt-6 text-[13px] text-[#42544B]">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EBF4F0] text-[#36887F]">
                  <Users className="h-3.5 w-3.5" />
                </div>
                <span>
                  <strong className="font-bold text-[#0F1E17]">500+</strong> Verified Mentors
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EBF4F0] text-[#36887F]">
                  <GraduationCap className="h-3.5 w-3.5" />
                </div>
                <span>
                  <strong className="font-bold text-[#0F1E17]">30+</strong> Destinations
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EBF4F0] text-[#E5A023]">
                  <Star className="h-3.5 w-3.5 fill-current" />
                </div>
                <span>
                  <strong className="font-bold text-[#0F1E17]">4.9/5</strong> Rating
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}