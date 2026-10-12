"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2400&q=85";

export function QuestionsRealAnswersBanner() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-16 lg:py-20">
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] items-center px-5 sm:px-10 lg:px-16 xl:px-24">
          
          <div className="relative flex min-h-[340px] w-full items-center overflow-hidden rounded-3xl border border-[#E7ECE8] shadow-[0_12px_36px_rgba(0,0,0,0.04)] sm:min-h-[380px]">
            <div className="absolute inset-0 h-full w-full">
              <Image
                src={BANNER_IMAGE}
                alt="Sunset skyline"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[70%_center] sm:object-[68%_center] lg:object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAFBF9]/95 via-[#FAFBF9]/55 via-45% to-transparent lg:w-[65%]" />
            </div>

            <div className="relative z-10 flex w-full flex-col justify-center p-8 sm:p-12 lg:p-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-xl lg:max-w-2xl"
              >
                <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
                  GET CLARITY TODAY
                </span>

                <h2
                  style={{ lineHeight: 1.2 }}
                  className="mt-3 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[38px] xl:text-[42px]"
                >
                  Your questions deserve <br />
                  real answers.
                </h2>

                <p
                  style={{ lineHeight: 1.6 }}
                  className="mt-3.5 max-w-lg text-[16px] !leading-[1.6] text-[#556960] lg:text-[18px]"
                >
                  Connect with a mentor today and take the next confident step towards your study-abroad dream.
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
                    href="/become-a-mentor"
                    className="inline-flex h-[48px] items-center justify-center rounded-full border border-[#D5DCD7] bg-white px-7 text-[15px] font-medium text-[#20332B] shadow-sm transition-all duration-200 hover:border-[#1C3E30] hover:bg-[#1C3E30] hover:text-white active:scale-[0.98]"
                  >
                    Become a Mentor
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}