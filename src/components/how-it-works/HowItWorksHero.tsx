"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HERO_IMAGE from "../../../public/images/how-it-works/Hopeful Student at a Historic Campus.png";


export function HowItWorksHero() {
  return (
    <section className="relative flex min-h-[480px] w-full items-center overflow-hidden border-b border-[#E8ECE9] bg-[#FAFBF9] lg:min-h-[560px]">
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={HERO_IMAGE}
          alt="Student looking forward"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center] lg:object-[82%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFBF9]/95 via-[#FAFBF9]/60 via-45% to-transparent lg:w-[65%]" />
      </div>

      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] items-center px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex w-full max-w-xl flex-col justify-center lg:max-w-2xl"
          >
            <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
              HOW STUDYWISE WORKS
            </span>

            <h1
              style={{ lineHeight: 1.18 }}
              className="mt-3.5 font-serif text-3xl font-extrabold !leading-[1.18] tracking-tight text-[#0F1E17] sm:text-5xl lg:text-[50px] xl:text-[56px]"
            >
              Studying abroad starts <br /> with a conversation.
            </h1>

            <p
              style={{ lineHeight: 1.6 }}
              className="mt-4 max-w-lg text-[16px] !leading-[1.6] text-[#556960] lg:text-[18px]"
            >
              Get practical, honest guidance from someone who has already navigated the admissions, visas, and international campus journey.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-9">
              <Link
                href="/mentors"
                className="inline-flex h-[48px] items-center justify-center gap-2 rounded-full border border-transparent bg-[#1C3E30] px-7 text-[15px] font-medium text-white shadow-sm transition-all duration-200 hover:border-[#36887F] hover:bg-white hover:text-[#1C3E30] active:scale-[0.98]"
              >
                <span>Find a Mentor</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="#steps"
                className="inline-flex h-[48px] items-center justify-center rounded-full border border-[#D5DCD7] bg-white px-7 text-[15px] font-medium text-[#20332B] shadow-sm transition-all duration-200 hover:border-[#1C3E30] hover:bg-[#1C3E30] hover:text-white active:scale-[0.98]"
              >
                See the Process
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}