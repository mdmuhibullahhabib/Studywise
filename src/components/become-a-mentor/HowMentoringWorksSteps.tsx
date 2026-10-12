"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Create your profile",
    desc: "Tell us about your background, university journey, and mentoring expertise.",
  },
  {
    num: "02",
    title: "Set your availability",
    desc: "Choose your own schedule, session pricing, and topics on your live calendar.",
  },
  {
    num: "03",
    title: "Meet students",
    desc: "Connect with matched aspiring applicants seeking verified destination advice.",
  },
  {
    num: "04",
    title: "Share your experience",
    desc: "Deliver 1-on-1 video mentorship sessions and provide honest answers.",
  },
  {
    num: "05",
    title: "Grow your reputation",
    desc: "Collect verified student reviews, build authority, and unlock opportunities.",
  },
];

export function HowMentoringWorksSteps() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28">
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] flex-col px-5 sm:px-10 lg:px-16 xl:px-24">
          
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
              THE PROCESS
            </span>
            <h2
              style={{ lineHeight: 1.2 }}
              className="mt-3.5 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[40px] xl:text-[44px]"
            >
              How mentoring works
            </h2>
            <p
              style={{ lineHeight: 1.6 }}
              className="mt-3 max-w-xl text-[16px] !leading-[1.6] text-[#556960] lg:text-[18px]"
            >
              Getting started is straightforward. Complete your onboarding in five simple steps and begin mentoring.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6 xl:gap-8">
            {STEPS.map((s, idx) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
                className="group relative flex flex-col justify-start border-t-2 border-[#E0E8E3] pt-6 transition-colors duration-300 hover:border-[#36887F]"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-3xl font-extrabold tracking-tight text-[#36887F] sm:text-4xl">
                    {s.num}
                  </span>
                  <span className="text-[11px] font-bold tracking-widest text-[#94A39B] uppercase group-hover:text-[#36887F]">
                    Step {idx + 1}
                  </span>
                </div>

                <h3
                  style={{ lineHeight: 1.25 }}
                  className="mt-4 font-serif text-[18px] sm:text-[20px] font-bold !leading-[1.25] tracking-tight text-[#0F1E17] transition-colors group-hover:text-[#36887F]"
                >
                  {s.title}
                </h3>

                <p
                  style={{ lineHeight: 1.6 }}
                  className="mt-2.5 text-[14px] !leading-[1.6] text-[#556960] sm:text-[15px]"
                >
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}