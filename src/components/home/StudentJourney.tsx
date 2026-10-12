"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import student_journey from "../../../public/images/home/student_journey.png";


const JOURNEY_STEPS = [
  {
    step: "01",
    title: "Discover",
    desc: "Explore countries, universities, and endless possibilities.",
  },
  {
    step: "02",
    title: "Prepare",
    desc: "Understand eligibility, admission tests, costs, and scholarships.",
  },
  {
    step: "03",
    title: "Apply",
    desc: "Get 1-on-1 practical review from a student who has lived it.",
  },
  {
    step: "04",
    title: "Arrive",
    desc: "Fly confidently knowing exactly what life is like on arrival.",
  },
];

export function StudentJourney() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28">
      {/* গ্লোবাল রেসপনসিভ কন্টেইনার */}
      <div className="mx-auto w-11/12 max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">

          {/* Left Column: Eyebrow, Main Heading & Timeline Steps */}
          <div className="flex flex-col justify-start lg:col-span-6 xl:col-span-5">
            {/* Header */}
            <div>
              <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase">
                THE STUDENT JOURNEY
              </span>
              {/* Main Heading with leading-[1.2] */}
              <h2 style={{ lineHeight: 1.25 }} className="mt-3.5 font-serif text-3xl font-extrabold leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[42px] xl:text-[46px]">
                From first question to first day abroad.
              </h2>
            </div>

            {/* Timeline Steps */}
            <div className="relative mt-10 space-y-9 sm:mt-12 sm:space-y-10">
              {/* Connecting Background Line */}
              <div className="absolute top-6 bottom-6 left-[23px] w-[2px] bg-[#E0E8E3]" />

              {JOURNEY_STEPS.map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.45 }}
                  className="relative flex items-start gap-5 sm:gap-6"
                >
                  {/* Step Node with White Ring & Glow */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1C3E30] text-[14px] font-bold text-white shadow-md ring-4 ring-[#FAFBF9]">
                    {item.step}
                  </div>

                  <div className="flex-1 pt-1">
                    {/* Step Title: 26px - 30px with leading-[1.2] */}
                    <h3 className="font-serif text-[24px] sm:text-[26px] lg:text-[28px] xl:text-[30px] font-bold leading-[1.2] tracking-tight text-[#0F1E17]">
                      {item.title}
                    </h3>
                    {/* Step Description: 16px with Spacing */}
                    <p className="mt-2.5 text-[15px] sm:text-[16px] leading-relaxed text-[#556960]">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Matched Visual + Testimonial Floating Card */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex h-full items-center lg:col-span-6 xl:col-span-7"
          >
            {/* Main Visual Image Container - Aspect ratio changed to 3/4 and increased height */}
            <div className="relative aspect-[3/4] w-full min-h-[500px] sm:min-h-[560px] lg:h-[620px] overflow-hidden rounded-3xl border border-[#E7ECE8] shadow-[0_12px_36px_rgba(0,0,0,0.06)]">
              <Image
                src={student_journey}
                alt="Students graduating abroad"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>

            {/* Testimonial Floating Glass Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="absolute right-4 bottom-5 left-4 max-w-md rounded-2xl border border-white/90 bg-white/95 p-5 shadow-[0_12px_36px_rgba(0,0,0,0.12)] backdrop-blur-md sm:right-6 sm:bottom-7 sm:left-auto sm:p-6"
            >
              <p className="text-[14px] sm:text-[15px] font-medium leading-relaxed text-[#14231C]">
                “Talking to someone who had already gone through the process saved me weeks of confusion.”
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-[#36887F]/30">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Student avatar"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="leading-snug">
                  <p className="text-[14px] font-bold text-[#0F1E17]">Bangladeshi Student</p>
                  <p className="text-[12px] font-medium text-[#708078]">Now at University of Bristol</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}