"use client";

import Link from "next/link";
import Image from "next/image";
import { Building2, MapPin, GraduationCap, Star, CheckCircle2 } from "lucide-react";

export function FeaturedMentorWideCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#E7ECE8] bg-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] sm:p-8">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        
        {/* Left Avatar Showcase */}
        <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-[#F0F4F2] lg:col-span-4">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
            alt="Imtiaz Ahmed"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover object-top"
          />
          <span className="absolute top-3.5 left-3.5 rounded-full bg-[#1C3E30] px-3 py-1 text-[11px] font-bold text-white shadow-xs">
            Featured Mentor
          </span>
        </div>

        {/* Profile Bio Details */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-2xl font-bold text-[#0F1E17]">
              Imtiaz Ahmed
            </h3>
            <CheckCircle2 className="h-5 w-5 fill-[#36887F] text-white" />
          </div>

          <div className="mt-2 space-y-1.5 text-[13px] text-[#556960]">
            <p className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#36887F]" />
              <span>University of Edinburgh</span>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#36887F]" />
              <span>United Kingdom</span>
            </p>
            <p className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-[#36887F]" />
              <span>MSc Computer Science</span>
            </p>
          </div>

          <p
            style={{ lineHeight: 1.6 }}
            className="mt-3.5 text-[14px] !leading-[1.6] text-[#556960]"
          >
            Currently pursuing research at Edinburgh. I have navigated the entire pipeline — from competitive scholarship documentation to visa approval and accommodation setup.
          </p>

          <div className="mt-5 flex items-center justify-between border-t border-[#EAEFEA] pt-4 text-[13px]">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-[#0F1E17]">4.8</span>
              <span className="text-[#708078]">(103 sessions)</span>
            </div>
            <span className="font-bold text-[#0F1E17]">$28 / session</span>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <Link
              href="/student/book/imtiaz-ahmed"
              className="inline-flex h-[42px] items-center justify-center rounded-full bg-[#1C3E30] px-6 text-[13px] font-semibold text-white shadow-xs transition-all hover:bg-[#36887F]"
            >
              Book Session
            </Link>
            <Link
              href="/mentors/imtiaz-ahmed"
              className="inline-flex h-[42px] items-center justify-center rounded-full border border-[#D5DCD7] bg-white px-6 text-[13px] font-semibold text-[#20332B] transition-colors hover:border-[#1C3E30] hover:text-[#1C3E30]"
            >
              View Profile
            </Link>
          </div>
        </div>

        {/* Pull Quote Callout */}
        <div className="flex flex-col justify-center rounded-2xl border border-[#E0E8E3] bg-[#FAFBF9] p-6 lg:col-span-3">
          <span className="font-serif text-4xl font-extrabold leading-none text-[#36887F]/35">
            “
          </span>
          <p
            style={{ lineHeight: 1.6 }}
            className="mt-2 font-serif italic text-[14px] !leading-[1.6] text-[#2F4239]"
          >
            The right guidance saves months of confusion. I am here to help you make informed, confident choices.
          </p>
          <span className="mt-4 text-[12px] font-bold text-[#36887F] uppercase tracking-wider">
            — Imtiaz Ahmed
          </span>
        </div>

      </div>
    </div>
  );
}