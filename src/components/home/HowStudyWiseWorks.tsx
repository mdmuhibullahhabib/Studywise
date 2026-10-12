"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import how_studywise_work from "../../../public/images/home/why_studywise.png";


const STEPS = [
  {
    number: "01",
    title: "Tell us where you want to go",
    description: "Choose your destination, university, subject, or study goal.",
  },
  {
    number: "02",
    title: "Meet the right mentor",
    description: "Find someone with real experience that matches your journey.",
  },
  {
    number: "03",
    title: "Get real answers",
    description: "Book a session, ask questions, and make confident decisions.",
  },
];

export function HowStudyWiseWorks() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28">
      {/* গ্লোবাল রেসপনসিভ কন্টেইনার */}
      <div className="mx-auto w-11/12 max-w-7xl">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          
          {/* Left: Matched Visual Container (col-span-6 সমান স্পেসের জন্য) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:col-span-6"
          >
            <div className="relative aspect-[3/4] min-h-[500px] sm:min-h-[560px] lg:h-[620px] w-full overflow-hidden rounded-3xl border border-[#E7ECE8] shadow-[0_12px_36px_rgba(0,0,0,0.06)]">
              <Image
                src={how_studywise_work}
                alt="Students discussing study plans"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Right: Content & Steps (col-span-6 থাকায় হেডিং ২ লাইনে থাকবে) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col justify-start lg:col-span-6"
          >
            {/* Header: এক্স্যাক্ট ২ লাইন */}
            <div>
              <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase">
                HOW STUDYWISE WORKS
              </span>
              <h2
                style={{ lineHeight: 1.22 }}
                className="mt-3.5 font-serif text-3xl font-extrabold !leading-[1.22] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[38px] xl:text-[42px]"
              >
                Your journey starts with <br className="hidden sm:inline" />
                the right conversation.
              </h2>
            </div>

            {/* Steps Timeline */}
            <div className="relative mt-10 space-y-9 sm:mt-12 sm:space-y-10">
              {/* Connecting Background Line */}
              <div className="absolute top-6 bottom-6 left-[23px] w-[2px] bg-[#E0E8E3]" />

              {STEPS.map((step, idx) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.45 }}
                  className="relative flex items-start gap-5 sm:gap-6"
                >
                  {/* Step Node */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1C3E30] text-[14px] font-bold text-white shadow-md ring-4 ring-[#FAFBF9]">
                    {step.number}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pt-1">
                    <h3
                      style={{ lineHeight: 1.2 }}
                      className="font-serif text-[24px] sm:text-[26px] lg:text-[28px] xl:text-[30px] font-bold !leading-[1.2] tracking-tight text-[#0F1E17]"
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{ lineHeight: 1.6 }}
                      className="mt-2.5 text-[15px] sm:text-[16px] !leading-[1.6] text-[#556960]"
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}