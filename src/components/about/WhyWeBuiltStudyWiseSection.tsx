"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function WhyWeBuiltStudyWiseSection() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28">
      {/* ================= EXACT FIXED LAYOUT CONTAINER ================= */}
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] items-center px-5 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20 w-full">
            
            {/* ================= LEFT COLUMN: PROBLEM & SOLUTION ================= */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col justify-center lg:col-span-6 xl:col-span-5"
            >
              {/* Eyebrow */}
              <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
                WHY WE BUILT STUDYWISE
              </span>

              {/* Main Heading with leading-[1.2] */}
              <h2
                style={{ lineHeight: 1.2 }}
                className="mt-3.5 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[42px] xl:text-[46px]"
              >
                The problem is real.
              </h2>

              {/* Problem Description (16px base) */}
              <p
                style={{ lineHeight: 1.6 }}
                className="mt-4 max-w-xl text-[15px] sm:text-[16px] !leading-[1.6] text-[#556960]"
              >
                Students often depend on scattered information, agencies, Facebook groups, relatives, and random online advice. It&apos;s confusing, overwhelming, and often misleading.
              </p>

              {/* Subtle Divider Line */}
              <div className="my-8 h-[2px] w-16 bg-[#E0E8E3] sm:my-9" />

              {/* Solution Subheading: 26px to 30px */}
              <h3
                style={{ lineHeight: 1.2 }}
                className="font-serif text-[24px] sm:text-[26px] lg:text-[28px] font-bold !leading-[1.2] tracking-tight text-[#0F1E17]"
              >
                Our solution is simple.
              </h3>

              {/* Solution Points with Clean Aesthetic Checkmarks */}
              <div className="mt-5 space-y-3">
                {[
                  "Real people with authentic stories",
                  "Real, lived international experiences",
                  "Real conversations that drive confident decisions",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#36887F]" />
                    <span className="text-[15px] sm:text-[16px] font-medium text-[#20332B]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ================= RIGHT COLUMN: MATCHER PORTRAIT VISUAL ================= */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative flex items-center lg:col-span-6 xl:col-span-7"
            >
              {/* Image Container with Long Portrait Balance */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] xl:aspect-[16/11] min-h-[440px] sm:min-h-[500px] lg:h-[580px] w-full overflow-hidden rounded-3xl border border-[#E7ECE8] shadow-[0_12px_36px_rgba(0,0,0,0.06)]">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1500&q=80"
                  alt="Student studying with laptop looking outside window"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}