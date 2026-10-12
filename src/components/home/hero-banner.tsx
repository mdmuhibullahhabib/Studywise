"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Users, Globe, Calendar, ArrowRight } from "lucide-react";
import HERO_BANNER_IMAGE from "../../../public/images/home/home_banner.png";

export function HeroBanner() {
  return (
    <section className="relative flex h-[100dvh] min-h-[640px] w-full items-center overflow-hidden">
      <div className="w-10/12 mx-auto">
        {/* ================= FULL BLEED BACKGROUND IMAGE ================= */}
        <div className="absolute inset-0 h-full w-full">
          <Image
            src={HERO_BANNER_IMAGE}
            alt="Study Abroad Mentorship"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[78%_center] sm:object-[70%_center] lg:object-right"
          />
        </div>

        {/* ================= INNER CONTAINER ================= */}
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] items-center px-5 sm:px-10 lg:px-16 xl:px-24">

          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="z-10 flex w-full max-w-xl flex-col justify-center lg:max-w-2xl"
          >
            {/* Tagline */}
            <span className="text-[14px] font-bold tracking-[0.22em] text-[#2F5243] uppercase sm:text-xs">
              REAL EXPERIENCE. REAL GUIDANCE.
            </span>

            {/* Headline */}
            <h1 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-[#0F1E17] sm:text-5xl lg:text-6xl xl:text-[4rem] xl:leading-[1.12]">
              Find someone who’s <br />
              already been there.
            </h1>

            {/* Subtitle */}
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#333030] sm:text-base lg:text-[20px]">

              Connect with students from Bangladesh who are already studying abroad and
              get honest, practical guidance from people who have lived the journey.
            </p>

            {/* CTA Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
              <a
                href="/mentors"
                className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[#36887F] px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:border-[#D5DCD7] hover:bg-white hover:text-[#20332B] active:scale-[0.98]"
              >
                <span>Find a Mentor</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="/become-mentor"
                className="inline-flex items-center rounded-full border border-[#D5DCD7] bg-white px-6 py-3 text-sm font-medium text-[#20332B] shadow-sm transition-all duration-200 hover:border-[#36887F] hover:bg-[#36887F] hover:text-white active:scale-[0.98]"
              >
                Become a Mentor
              </a>
            </div>

            {/* Search Box */}
            <div className="mt-8 w-full max-w-md sm:mt-10">
              <label
                htmlFor="hero-search"
                className="block text-[11] font-semibold tracking-wide text-[#33463E]"
              >
                Where do you want to study?
              </label>

              <form
                action="/mentors"
                method="get"
                className="mt-2.5 flex items-center rounded-full border border-[#E3E8E5] bg-white px-4 py-2.5 shadow-sm transition-all focus-within:border-[#1C3E30] focus-within:ring-2 focus-within:ring-[#1C3E30]/10"
              > 
                <Search className="h-6 w-4 shrink-0 text-[#8C9B94]" />
                <input
                  id="hero-search"
                  name="q"
                  type="text"
                  placeholder="Search country, university, subject..."
                  className="ml-3 w-full bg-transparent text-sm text-[#1B2923] placeholder-[#9AA6A0] focus:outline-none"
                />
              </form>
            </div>
          </motion.div>

          {/* ================= FLOATING BADGES ================= */}
          <div className="pointer-events-none absolute inset-0 mx-auto">

            {/* Badge 1: 500+ Verified Mentors  */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="pointer-events-auto absolute top-[-200px] right-[50%] hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-md lg:flex"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EBF4F0] text-[#1C3E30]">
                <Users className="h-4 w-4" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold text-[#14231C]">500+</p>
                <p className="text-[11px] text-[#6E7E77]">Verified Mentors</p>
              </div>
            </motion.div>

            {/* Badge 2: 40+ Destinations (Middle-Right - অপরিবর্তিত) */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="pointer-events-auto absolute top-[36%] right-5 hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-md sm:flex md:right-10 lg:right-16"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EBF4F0] text-[#1C3E30]">
                <Globe className="h-4 w-4" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold text-[#14231C]">40+</p>
                <p className="text-[11px] text-[#6E7E77]">Destinations</p>
              </div>
            </motion.div>

            {/* Badge 3: 2,000+ Sessions  */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="pointer-events-auto absolute bottom-2.5 right-5 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-md md:right-10 lg:bottom-[-100px] lg:right-16"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EBF4F0] text-[#1C3E30]">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold text-[#14231C]">2,000+</p>
                <p className="text-[11px] text-[#6E7E77]">Sessions</p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>

    </section>
  );
}