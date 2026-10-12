"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

interface Destination {
  name: string;
  flag: string;
}

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const DESTINATIONS: Destination[] = [
  { name: "UK", flag: "https://flagcdn.com/w80/gb.png" },
  { name: "USA", flag: "https://flagcdn.com/w80/us.png" },
  { name: "Canada", flag: "https://flagcdn.com/w80/ca.png" },
  { name: "Australia", flag: "https://flagcdn.com/w80/au.png" },
  { name: "Germany", flag: "https://flagcdn.com/w80/de.png" },
  { name: "Europe", flag: "https://flagcdn.com/w80/eu.png" },
];

const STATS: StatItem[] = [
  { value: 500, suffix: "+", label: "Mentors" },
  { value: 40, suffix: "+", label: "Destinations" },
  { value: 2000, suffix: "+", label: "Sessions" },
];

function Counter({
  target,
  suffix,
  onComplete,
}: {
  target: number;
  suffix: string;
  onComplete?: () => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (latest) =>
    Math.floor(latest).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionVal, target, {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1], // Super smooth cubic-bezier
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });
      return controls.stop;
    }
  }, [isInView, motionVal, target, onComplete]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function UniversityBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    if (isInView) {
      setIsCounting(true);
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden border-y border-[#EAEFEA] bg-gradient-to-b from-[#FCFDFD] to-[#FAFBF9] py-14 lg:py-16 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.02)]"
    >
      {/* Background Soft Glow Accents */}
      <div className="pointer-events-none absolute -left-20 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-[#36887F]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-[#36887F]/5 blur-3xl" />

      {/* ================= EXACT FIXED LAYOUT CONTAINER ================= */}
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] flex-col items-center justify-between gap-10 px-5 sm:px-10 lg:flex-row lg:gap-8 lg:px-16 xl:px-24">
          
          {/* 1. Left Title */}
          <div className="shrink-0 text-center lg:text-left">
            <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
              GLOBAL REACH
            </span>
            <h3
              style={{ lineHeight: 1.2 }}
              className="mt-2 font-serif text-[24px] sm:text-[26px] lg:text-[28px] font-bold !leading-[1.2] tracking-tight text-[#0F1E17]"
            >
              Students connecting <br className="hidden sm:inline" />
              across the world.
            </h3>
          </div>

          {/* Vertical Divider for Desktop */}
          <div className="hidden h-16 w-px shrink-0 bg-gradient-to-b from-transparent via-[#DDE5E1] to-transparent lg:block" />

          {/* 2. Middle Flag Badges with Countdown Flutter/Wiggle Effect */}
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-5 sm:gap-7 lg:gap-6 xl:gap-7">
            {DESTINATIONS.map((item, idx) => (
              <motion.div
                key={item.name}
                animate={
                  isCounting
                    ? {
                        y: [0, -3.5, 2, -1.5, 0],
                        rotate: [0, -4, 4, -2, 0],
                        scale: [1, 1.05, 0.98, 1.03, 1],
                      }
                    : { y: 0, rotate: 0, scale: 1 }
                }
                transition={
                  isCounting
                    ? {
                        duration: 0.45,
                        repeat: 4, // কাঁপতে থাকবে কাউন্টিং চলাকালীন (প্রায় ২ সেকেন্ড)
                        delay: idx * 0.08, // ওয়েভ স্টাইলে একটার পর একটা কাঁপবে
                        ease: "easeInOut",
                      }
                    : { duration: 0.3 }
                }
                className="group flex flex-col items-center gap-2 cursor-pointer"
              >
                {/* Flag Icon */}
                <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] ring-1 ring-[#E0E8E3] transition-all duration-300 group-hover:scale-115 group-hover:ring-2 group-hover:ring-[#36887F] group-hover:shadow-[0_8px_20px_rgba(54,136,127,0.2)]">
                  <Image
                    src={item.flag}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                  {/* Subtle glass reflection effect */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/30" />
                </div>

                {/* Country Name */}
                <span className="text-[13px] font-semibold text-[#556960] transition-colors group-hover:text-[#0F1E17]">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Vertical Divider for Desktop */}
          <div className="hidden h-16 w-px shrink-0 bg-gradient-to-b from-transparent via-[#DDE5E1] to-transparent lg:block" />

          {/* 3. Right Animated Stats */}
          <div className="flex shrink-0 items-center justify-center divide-x divide-[#E0E8E3]">
            {STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className="px-5 text-center first:pl-0 last:pr-0 sm:px-7 lg:px-6 xl:px-8"
              >
                <p className="font-serif text-2xl font-bold tracking-tight text-[#0F1E17] sm:text-3xl lg:text-[34px]">
                  <Counter
                    target={stat.value}
                    suffix={stat.suffix}
                    onComplete={
                      idx === 0 ? () => setIsCounting(false) : undefined
                    }
                  />
                </p>
                <p className="mt-1 text-[13px] sm:text-[14px] font-medium text-[#556960]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}