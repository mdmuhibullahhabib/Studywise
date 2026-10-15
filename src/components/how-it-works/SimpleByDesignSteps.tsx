"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  Search,
  CalendarCheck,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const STEPS = [
  {
    num: "01",
    stepLabel: "Step 01",
    tag: "Personal Goals",
    highlight: "Start here",
    title: "Tell us your goal",
    desc: "Share your target destination, intended program of study, and where you need direction.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    icon: Compass,
    bulletPoints: ["Target country & degree", "Application pain points"],
  },
  {
    num: "02",
    stepLabel: "Step 02",
    tag: "Smart Search",
    highlight: "Verified alumni",
    title: "Find your mentor",
    desc: "Browse verified mentors who matched your academic goals, budget, and desired universities.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    icon: Search,
    bulletPoints: ["Current students & grads", "Filter by fees & uni"],
  },
  {
    num: "03",
    stepLabel: "Step 03",
    tag: "Scheduling",
    highlight: "Direct sync",
    title: "Book a conversation",
    desc: "Select a convenient time slot from their live schedule and lock in your 1-on-1 session.",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
    icon: CalendarCheck,
    bulletPoints: ["Real-time calendar", "Instant video invite"],
  },
  {
    num: "04",
    stepLabel: "Step 04",
    tag: "Next Steps",
    highlight: "Clear path",
    title: "Move with confidence",
    desc: "Receive actionable guidance, clarify doubts, and plan your application steps accurately.",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    icon: GraduationCap,
    bulletPoints: ["Honest admissions advice", "Clear next milestones"],
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
          
          {/* Section Header */}
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D5E3DB] bg-[#EBF4F0] px-3.5 py-1 text-[11px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#36887F]" />
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

            <div className="hidden items-center gap-2.5 rounded-2xl border border-[#E2EAE4] bg-white px-4 py-2.5 shadow-sm md:flex">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EBF4F0] text-[#36887F]">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-[13px] font-medium text-[#40544B]">
                4-Step Guided Student Journey
              </span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.09, duration: 0.5, ease: "easeOut" }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#E7ECE8] bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-2 hover:border-[#36887F]/50 hover:shadow-[0_16px_40px_rgba(54,136,127,0.12)] sm:p-5"
              >
                <div>
                  {/* Image Card with Floating Badges */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-black/5 bg-[#F0F4F2]">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Dark gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/20 opacity-70 transition-opacity duration-300 group-hover:opacity-50" />

                    {/* Step Number Badge */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold tracking-wider text-[#1C3E30] shadow-sm backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#36887F]" />
                      <span>{step.stepLabel}</span>
                    </div>

                    {/* Step Icon */}
                    <div className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-[#36887F] group-hover:scale-110">
                      <step.icon className="h-4 w-4" />
                    </div>

                    {/* Bottom overlay pills */}
                    <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between">
                      <span className="rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#1C3E30] uppercase shadow-sm backdrop-blur-sm">
                        {step.tag}
                      </span>
                      <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/95 backdrop-blur-sm">
                        {step.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="p-1 pt-4 sm:p-1.5 sm:pt-4">
                    <h3
                      style={{ lineHeight: 1.25 }}
                      className="font-serif text-[19px] sm:text-[20px] font-bold !leading-[1.25] tracking-tight text-[#0F1E17] transition-colors duration-200 group-hover:text-[#36887F]"
                    >
                      {step.title}
                    </h3>

                    <p
                      style={{ lineHeight: 1.55 }}
                      className="mt-2 text-[13px] !leading-[1.55] text-[#556960] sm:text-[14px]"
                    >
                      {step.desc}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="mt-3.5 space-y-1.5 border-t border-[#F2F5F3] pt-3">
                      {step.bulletPoints.map((pt) => (
                        <div key={pt} className="flex items-center gap-1.5 text-[12px] text-[#4A5D54]">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#36887F]" />
                          <span className="line-clamp-1">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Progress Link */}
                <div className="mt-4 flex items-center justify-between border-t border-[#EAEFEA] p-1 pt-3 text-[12px] font-semibold text-[#7E9187] transition-colors group-hover:text-[#36887F] sm:p-1.5 sm:pt-3">
                  <span>Phase {step.num} of 04</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F0F5F2] text-[#36887F] transition-all duration-300 group-hover:bg-[#36887F] group-hover:text-white">
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Interactive Callout Banner */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-12 flex flex-col items-center justify-between gap-5 rounded-3xl border border-[#DCE6E0] bg-[#F3F7F5] p-6 text-center sm:flex-row sm:px-8 sm:py-6 sm:text-left"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#36887F] text-white shadow-sm">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-serif text-[17px] font-bold text-[#0F1E17] sm:text-[18px]">
                  Ready to talk to someone who’s been there?
                </h4>
                <p className="mt-0.5 text-[13px] text-[#556960] sm:text-[14px]">
                  Find mentors studying at top universities worldwide and book a session today.
                </p>
              </div>
            </div>

            <Link
              href="/mentors"
              className="inline-flex h-[46px] shrink-0 items-center justify-center gap-2 rounded-full bg-[#1C3E30] px-7 text-[14px] font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#36887F] active:scale-[0.98]"
            >
              <span>Find Your Mentor</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}