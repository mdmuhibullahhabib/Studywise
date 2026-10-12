"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ABOUT_HERO_IMAGE from "../../../public/images/about/about_banner.png";

export function AboutHeroBanner() {
  return (
    <section className="relative flex min-h-[480px] w-full items-center overflow-hidden border-b border-[#E8ECE9] bg-[#0F1E17] lg:min-h-[540px]">
      {/* ================= FULL BLEED BACKGROUND IMAGE ================= */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={ABOUT_HERO_IMAGE}
          alt="Students discussing on campus"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center] sm:object-[60%_center] lg:object-center"
        />
        {/* Shudhu left side-e text-er pichone olpo shadow/opacity, baki sob clear transparent */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent w-full lg:w-[65%]" />
      </div>

      {/* ================= EXACT FIXED LAYOUT CONTAINER ================= */}
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] items-center px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24 xl:px-24">
          
          {/* Left Column: Heading & Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="z-10 flex w-full max-w-xl flex-col justify-center lg:max-w-2xl"
          >
            {/* Eyebrow */}
            <span className="text-[14px] font-bold tracking-[0.25em] text-[#4EAEA3] uppercase sm:text-xs">
              ABOUT STUDYWISE
            </span>

            {/* Serif Heading with Guaranteed 1.18 Line-Height */}
            <h1
              style={{ lineHeight: 1.18 }}
              className="mt-4 font-serif text-3xl font-extrabold !leading-[1.18] tracking-tight text-white sm:text-5xl lg:text-[50px] xl:text-[56px]"
            >
              You Don’t Have to Figure It Out Alone.
            </h1>

            {/* Description */}
            <p
              style={{ lineHeight: 1.6 }}
              className="mt-4 max-w-xl text-[18px] lg:text-[18px]  sm:text-[14px] !leading-[1.6] text-white/90"
            >
              StudyWise connects aspiring students with people who have already experienced studying abroad.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}