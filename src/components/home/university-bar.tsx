
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

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
}: {
  target: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-40px",
  });

  const motionValue = useMotionValue(0);

  const rounded = useTransform(motionValue, (value) =>
    Math.floor(value).toLocaleString("en-US")
  );

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionValue, target, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [isInView, motionValue, target]);

  return (
    <span ref={ref} className="inline-flex tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function UniversityBar() {
  return (
    <section className="relative isolate w-full overflow-hidden border-y border-[#E7EDE9] bg-[#FAFBF8] py-12 sm:py-14 lg:py-16">
      {/* Soft background accents */}
      <div className="pointer-events-none absolute -left-24 top-1/2 -z-10 h-64 w-64 -translate-y-1/2 rounded-full bg-[#38897D]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/2 -z-10 h-64 w-64 -translate-y-1/2 rounded-full bg-[#38897D]/[0.05] blur-3xl" />

      <div className="mx-auto w-[90%] max-w-[1440px]">
        <div className="grid grid-cols-1 items-center gap-9 lg:grid-cols-[1fr_auto_1.25fr_auto_1fr] lg:gap-8 xl:gap-10">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#38897D]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#38897D]" />
              Global Reach
            </span>

            <h3 className="mx-auto mt-3 max-w-[360px] font-sans text-[25px] font-semibold leading-[1.4] tracking-[-0.035em] text-[#15282E] sm:text-[29px] lg:mx-0 lg:text-[30px]">
              Students connecting across the world.
            </h3>
          </motion.div>

          {/* Desktop divider */}
          <div className="hidden h-16 w-px bg-[#DFE7E2] lg:block" />

          {/* Static destination flags */}
          <div className="flex flex-wrap items-start justify-center gap-x-5 gap-y-5 sm:gap-x-7 lg:gap-x-5 xl:gap-x-6">
            {DESTINATIONS.map((item) => (
              <div
                key={item.name}
                className="group flex min-w-[48px] cursor-default flex-col items-center gap-2.5"
              >
                <div className="relative h-11 w-11 overflow-hidden rounded-full border border-[#DFE8E3] bg-white shadow-[0_3px_10px_rgba(21,40,46,0.05)] transition-[border-color,box-shadow] duration-200 group-hover:border-[#38897D]/60 group-hover:shadow-[0_5px_14px_rgba(56,137,125,0.13)] sm:h-12 sm:w-12">
                  <Image
                    src={item.flag}
                    alt={`${item.name} flag`}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>

                <span className="text-xs font-medium text-[#64736D] transition-colors duration-200 group-hover:text-[#15282E]">
                  {item.name}
                </span>
              </div>
            ))}
          </div>

          {/* Desktop divider */}
          <div className="hidden h-16 w-px bg-[#DFE7E2] lg:block" />

          {/* Animated stats */}
          <div className="grid grid-cols-3 divide-x divide-[#DFE7E2] border-t border-[#E7EDE9] pt-7 lg:border-t-0 lg:pt-0">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="px-3 text-center first:pl-0 last:pr-0 sm:px-5 lg:px-4 xl:px-5"
              >
                <p className="font-sans text-[25px] font-semibold leading-tight tracking-[-0.04em] text-[#15282E] sm:text-[29px] xl:text-[32px]">
                  <Counter
                    target={stat.value}
                    suffix={stat.suffix}
                  />
                </p>

                <p className="mt-2 text-[11px] font-medium text-[#73817B] sm:text-xs">
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