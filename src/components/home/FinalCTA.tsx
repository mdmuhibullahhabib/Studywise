"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={containerRef}
      className="relative flex h-[500px] max-h-[500px] w-full items-center justify-center overflow-hidden"
    >
      {/* Parallax Background Container */}
      <motion.div
        style={{ y }}
        className="absolute -top-[20%] left-0 h-[140%] w-full"
      >
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80"
          alt="Flight above clouds"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-[#FCFDFD]/55 backdrop-blur-[1.5px]" />
      </motion.div>

      {/* Centered Content Container */}
      <div className="relative z-10 mx-auto flex w-11/12 max-w-7xl flex-col items-center justify-center px-4 text-center">
        
        {/* max-w-3xl সরিয়ে max-w-5xl এবং w-full flex flex-col items-center করা হয়েছে */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex w-full max-w-5xl flex-col items-center justify-center text-center"
        >
          {/* Eyebrow */}
          <span className="block text-center text-[13px] font-bold tracking-[0.24em] text-[#556960] uppercase sm:text-xs">
            YOUR NEXT CHAPTER
          </span>

          {/* Main Serif Heading - Perfect Center with Single Line */}
          <h2 className="mt-3.5 w-full text-center whitespace-nowrap font-serif text-2xl font-bold tracking-tight text-[#0F1E17] sm:text-4xl md:text-5xl lg:text-[3.1rem] xl:text-[3.3rem] lg:leading-[1.12]">
            Your future deserves real experience.
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-[#4A5D54] sm:text-base lg:text-[18px]">
            Don’t navigate your study-abroad journey alone. Talk to someone who has already been there.
          </p>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5 sm:mt-8 sm:gap-4">
            <Link
              href="/mentors"
              className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[#36887F] px-7 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:border-[#C5D0CA] hover:bg-white hover:text-[#20332B] active:scale-[0.98]"
            >
              <span>Find Your Mentor</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/become-a-mentor"
              className="inline-flex items-center rounded-full border border-[#C5D0CA] bg-white/80 px-7 py-3 text-sm font-medium text-[#20332B] shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-[#36887F] hover:bg-[#36887F] hover:text-white active:scale-[0.98]"
            >
              Become a Mentor
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}