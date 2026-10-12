"use client";

import { motion } from "framer-motion";
import { Search, MessagesSquare, Video, PiIcon } from "lucide-react";

interface StepItem {
  stage: string;
  description: string;
}

const STEP_ICONS = [Search, MessagesSquare, Video];

export function HowItWorks({ process }: { process: StepItem[] }) {
  return (
    <section className="w-full border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-[100px]">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="text-center">
          <span className="text-[11px] font-bold tracking-[0.22em] text-[#2F5243] uppercase">
            HOW IT WORKS
          </span>
          <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[42px]">
            Three steps to real guidance
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-[#55635D]">
            Simple steps to connect with experienced Bangladeshi mentors abroad.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {process.map((step, idx) => {
            const Icon = STEP_ICONS[idx % STEP_ICONS.length];
            return (
              <motion.div
                key={step.stage}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="relative flex flex-col items-center rounded-2xl border border-[#E7ECE8] bg-white p-8 text-center shadow-sm"
              >
                <span className="absolute top-5 right-6 font-serif text-2xl font-normal text-[#D5DCD7]">
                  0{idx + 1}
                </span>

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EBF4F0] text-[#1C3E30]">
                  <PiIcon className="h-6 w-6" />
                </div>

                <h3 className="mt-6 font-serif text-xl font-normal text-[#0F1E17]">
                  {step.stage}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#55635D]">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}