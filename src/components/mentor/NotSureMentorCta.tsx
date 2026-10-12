"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CLOUD_IMAGE =
  "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=2000&q=85";

export function NotSureMentorCta() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-16 lg:py-20">
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] items-center px-5 sm:px-10 lg:px-16 xl:px-24">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative flex min-h-[260px] w-full items-center justify-center overflow-hidden rounded-3xl border border-[#E7ECE8] shadow-[0_12px_36px_rgba(0,0,0,0.04)] sm:min-h-[290px]"
          >
            <div className="absolute inset-0 h-full w-full">
              <Image
                src={CLOUD_IMAGE}
                alt="Clouds outside airplane window"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[#FAFBF9]/88 backdrop-blur-[2px] sm:bg-[#FAFBF9]/80" />
            </div>

            <div className="relative z-10 flex w-full max-w-2xl flex-col items-center justify-center p-8 text-center sm:p-12">
              <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
                PERSONALIZED MATCHING
              </span>

              <h2
                style={{ lineHeight: 1.2 }}
                className="mt-3 font-serif text-2xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-3xl lg:text-[34px]"
              >
                Not sure who to choose?
              </h2>

              <p
                style={{ lineHeight: 1.6 }}
                className="mt-3 max-w-lg text-[15px] sm:text-[16px] !leading-[1.6] text-[#556960]"
              >
                Tell us your target destination, intended degree, and timeline, and we’ll match you with the right mentor for your goals.
              </p>

              <div className="mt-7 sm:mt-8">
                <Link
                  href="/find-match"
                  className="inline-flex h-[46px] items-center justify-center gap-2 rounded-full border border-transparent bg-[#1C3E30] px-7 text-[14px] font-medium text-white shadow-sm transition-all duration-200 hover:border-[#36887F] hover:bg-white hover:text-[#1C3E30] active:scale-[0.98] sm:h-[48px] sm:text-[15px]"
                >
                  <span>Find My Mentor</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}