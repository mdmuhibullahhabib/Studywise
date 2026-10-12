"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface StepItem {
  image: string;
  title: string;
  caption: string;
}

const STEPS: StepItem[] = [
  {
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    title: "Student",
    caption: "You have a dream.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80",
    title: "Experience",
    caption: "You go, learn, grow.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    title: "Mentor",
    caption: "You share what you know.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80",
    title: "Next Student",
    caption: "You help someone else.",
  },
];

export function ExperienceToGuidanceSection() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28">
      
      {/* ================= EXACT FIXED LAYOUT CONTAINER ================= */}
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] flex-col px-5 sm:px-10 lg:px-16 xl:px-24">
          
          {/* Section Header */}
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
              THE CYCLE OF SUPPORT
            </span>
            <h2
              style={{ lineHeight: 1.2 }}
              className="mt-3.5 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[42px] xl:text-[46px]"
            >
              From experience to guidance.
            </h2>
          </div>

          {/* 4-Step Connected Horizontal Timeline */}
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:flex lg:items-center lg:justify-between lg:gap-4">
            {STEPS.map((step, idx) => (
              <div
                key={step.title}
                className="flex flex-1 items-center justify-between w-full"
              >
                {/* Node Card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.45 }}
                  className="flex flex-1 flex-col items-center text-center group"
                >
                  {/* Circular Portrait Image with Brand Ring */}
                  <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-white bg-[#EDF2EE] shadow-[0_8px_24px_rgba(0,0,0,0.06)] ring-4 ring-[#EAEFEA] transition-all duration-300 group-hover:scale-105 group-hover:ring-[#36887F]/30 sm:h-32 sm:w-32 lg:h-36 lg:w-36">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 112px, 144px"
                      className="object-cover"
                    />
                  </div>

                  {/* Title: 26px to 30px with leading-[1.2] */}
                  <h3
                    style={{ lineHeight: 1.2 }}
                    className="mt-6 font-serif text-[24px] sm:text-[26px] lg:text-[28px] font-bold !leading-[1.2] tracking-tight text-[#0F1E17]"
                  >
                    {step.title}
                  </h3>

                  {/* Caption / Description: 16px with Spacing */}
                  <p
                    style={{ lineHeight: 1.6 }}
                    className="mt-2 text-[15px] sm:text-[16px] !leading-[1.6] text-[#556960]"
                  >
                    {step.caption}
                  </p>
                </motion.div>

                {/* Connecting Arrow between items (desktop view) */}
                {idx < STEPS.length - 1 && (
                  <div className="hidden shrink-0 px-2 text-[#36887F]/40 lg:block lg:px-4">
                    <ArrowRight className="h-5 w-5 stroke-[2]" />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}