"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  GraduationCap,
  Award,
  Building2,
  Users,
  FileText,
  Briefcase,
  Compass,
} from "lucide-react";

import HERO_BANNER_IMAGE from "../../../public/images/resources/resources_banner.png";



const CATEGORY_PILLS = [
  { label: "All Guides", icon: Compass },
  { label: "Applications", icon: GraduationCap },
  { label: "Scholarships", icon: Award },
  { label: "Universities", icon: Building2 },
  { label: "Student Life", icon: Users },
  { label: "Visa Process", icon: FileText },
  { label: "Career & Jobs", icon: Briefcase },
];

export function ResourcesHero() {
  return (
    <section className="relative flex min-h-[520px] w-full items-center overflow-hidden border-b border-[#E8ECE9] bg-[#FAFBF9] lg:min-h-[600px]">
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={HERO_BANNER_IMAGE}
          alt="Students learning together"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[78%_center] lg:object-[82%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFBF9]/95 via-[#FAFBF9]/55 via-50% to-transparent lg:w-[70%]" />
      </div>

      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] flex-col justify-center px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-xl lg:max-w-2xl"
          >
            <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
              RESOURCES & GUIDES
            </span>

            <h1
              style={{ lineHeight: 1.18 }}
              className="mt-3.5 font-serif text-3xl font-extrabold !leading-[1.18] tracking-tight text-[#0F1E17] sm:text-5xl lg:text-[50px] xl:text-[56px]"
            >
              Everything you need <br />
              to move forward.
            </h1>

            <p
              style={{ lineHeight: 1.6 }}
              className="mt-4 max-w-lg text-[16px] !leading-[1.6] text-[#556960] lg:text-[18px]"
            >
              Practical step-by-step guides, student experiences, and verified resources curated for your study-abroad journey.
            </p>

            <div className="relative mt-8 max-w-md sm:max-w-lg">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#36887F]" />
              <input
                type="text"
                placeholder="Search guides, universities, scholarships..."
                className="h-[48px] w-full rounded-full border border-[#D5DCD7] bg-white/95 pl-12 pr-6 text-[15px] text-[#1B2923] placeholder-[#8A9B93] shadow-[0_4px_16px_rgba(0,0,0,0.04)] backdrop-blur-xs transition-all focus:border-[#36887F] focus:bg-white focus:ring-2 focus:ring-[#36887F]/15 focus:outline-none"
              />
            </div>
          </motion.div>

          <div className="mt-10 flex items-center gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CATEGORY_PILLS.map((item, idx) => (
              <button
                key={item.label}
                type="button"
                className={`inline-flex h-[42px] shrink-0 items-center gap-2 rounded-full border px-5 text-[14px] font-semibold transition-all duration-200 active:scale-95 ${
                  idx === 0
                    ? "border-[#1C3E30] bg-[#1C3E30] text-white shadow-sm hover:border-[#36887F] hover:bg-[#36887F]"
                    : "border-[#D5DCD7] bg-white/90 text-[#33463E] shadow-xs backdrop-blur-xs hover:border-[#36887F] hover:bg-white hover:text-[#36887F]"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}