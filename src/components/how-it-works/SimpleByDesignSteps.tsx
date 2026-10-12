"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Tell us your goal",
    desc: "Share your target destination, intended program of study, and where you need direction.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
  },
  {
    num: "02",
    title: "Find your mentor",
    desc: "Browse verified mentors who matched your academic goals, budget, and desired universities.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  },
  {
    num: "03",
    title: "Book a conversation",
    desc: "Select a convenient time slot from their live schedule and lock in your 1-on-1 session.",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80",
  },
  {
    num: "04",
    title: "Move with confidence",
    desc: "Receive actionable guidance, clarify doubts, and plan your application steps accurately.",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80",
  },
];

export function SimpleByDesignSteps() {
  return (
    <section
      id="steps"
      className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28"
    >
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] flex-col px-5 sm:px-10 lg:px-16 xl:px-24">
          
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
              THE JOURNEY
            </span>
            <h2
              style={{ lineHeight: 1.2 }}
              className="mt-3.5 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[40px] xl:text-[44px]"
            >
              Simple by design.
            </h2>
            <p
              style={{ lineHeight: 1.6 }}
              className="mt-3 max-w-xl text-[16px] !leading-[1.6] text-[#556960] lg:text-[18px]"
            >
              From your initial query to your booked video session, we make every step seamless, personal, and transparent.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.45 }}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#E7ECE8] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#36887F]/40 hover:shadow-[0_12px_36px_rgba(54,136,127,0.08)] sm:p-7"
              >
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-3xl font-extrabold tracking-tight text-[#36887F] sm:text-4xl">
                      {step.num}
                    </span>
                    <span className="text-[11px] font-bold tracking-widest text-[#94A39B] uppercase group-hover:text-[#36887F]">
                      Step {idx + 1}
                    </span>
                  </div>

                  <h3
                    style={{ lineHeight: 1.25 }}
                    className="mt-4 font-serif text-[18px] sm:text-[20px] font-bold !leading-[1.25] tracking-tight text-[#0F1E17] transition-colors group-hover:text-[#36887F]"
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{ lineHeight: 1.6 }}
                    className="mt-2 text-[14px] !leading-[1.6] text-[#556960] sm:text-[15px]"
                  >
                    {step.desc}
                  </p>
                </div>

                <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-black/5 bg-[#F0F4F2]">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}