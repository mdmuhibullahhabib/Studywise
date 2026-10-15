"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  UserCheck,
  CalendarClock,
  Users2,
  Video,
  Award,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const STEPS = [
  {
    num: "01",
    stepLabel: "Step 01",
    tag: "Quick Setup",
    highlight: "5 mins setup",
    title: "Create your profile",
    desc: "Tell us about your background, university journey, degree, and mentoring expertise.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    icon: UserCheck,
    bulletPoints: ["Degree & institution", "Areas of advice"],
  },
  {
    num: "02",
    stepLabel: "Step 02",
    tag: "Flexibility",
    highlight: "Your schedule",
    title: "Set your availability",
    desc: "Choose your own schedule, session pricing, and available topics on your live calendar.",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
    icon: CalendarClock,
    bulletPoints: ["Custom time slots", "Set your own rates"],
  },
  {
    num: "03",
    stepLabel: "Step 03",
    tag: "Matching",
    highlight: "Targeted peers",
    title: "Meet students",
    desc: "Connect with matched aspiring applicants seeking verified destination and course advice.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    icon: Users2,
    bulletPoints: ["Verified student queries", "Direct chat sync"],
  },
  {
    num: "04",
    stepLabel: "Step 04",
    tag: "1-on-1 Calls",
    highlight: "Live video",
    title: "Share your experience",
    desc: "Deliver 1-on-1 video mentorship sessions and provide honest answers to their questions.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    icon: Video,
    bulletPoints: ["HD 1-on-1 calls", "In-call note sharing"],
  },
  {
    num: "05",
    stepLabel: "Step 05",
    tag: "Reputation",
    highlight: "Earn & inspire",
    title: "Grow your reputation",
    desc: "Collect verified student reviews, build authority, and unlock global career opportunities.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    icon: Award,
    bulletPoints: ["5-star student ratings", "Direct secure payouts"],
  },
];

export function HowMentoringWorksSteps() {
  return (
    <section
      id="how-it-works"
      className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28"
    >
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] flex-col px-5 sm:px-10 lg:px-16 xl:px-24">
          
          {/* Section Header */}
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D5E3DB] bg-[#EBF4F0] px-3.5 py-1 text-[11px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#36887F]" />
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
                Getting started is straightforward. Complete your onboarding in five simple steps and begin guiding prospective students.
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-2xl border border-[#E2EAE4] bg-white px-4 py-2.5 shadow-sm md:flex">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EBF4F0] text-[#36887F]">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-[13px] font-medium text-[#40544B]">
                5 Simple Steps to Start
              </span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {STEPS.map((s, idx) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: "easeOut" }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#E7ECE8] bg-white p-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-2 hover:border-[#36887F]/50 hover:shadow-[0_16px_40px_rgba(54,136,127,0.12)] sm:p-4"
              >
                <div>
                  {/* Image Card with Floating Badges */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-black/5 bg-[#F0F4F2]">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    
                    {/* Dark gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/20 opacity-70 transition-opacity duration-300 group-hover:opacity-50" />

                    {/* Step Number Badge */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold tracking-wider text-[#1C3E30] shadow-sm backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#36887F]" />
                      <span>{s.stepLabel}</span>
                    </div>

                    {/* Step Icon */}
                    <div className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-[#36887F] group-hover:scale-110">
                      <s.icon className="h-4 w-4" />
                    </div>

                    {/* Bottom overlay pills */}
                    <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between">
                      <span className="rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#1C3E30] uppercase shadow-sm backdrop-blur-sm">
                        {s.tag}
                      </span>
                      <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/95 backdrop-blur-sm">
                        {s.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="p-1 pt-4 sm:p-2 sm:pt-4">
                    <h3
                      style={{ lineHeight: 1.25 }}
                      className="font-serif text-[18px] font-bold !leading-[1.25] tracking-tight text-[#0F1E17] transition-colors duration-200 group-hover:text-[#36887F] sm:text-[19px]"
                    >
                      {s.title}
                    </h3>

                    <p
                      style={{ lineHeight: 1.55 }}
                      className="mt-2 text-[13px] !leading-[1.55] text-[#556960] sm:text-[14px]"
                    >
                      {s.desc}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="mt-3.5 space-y-1.5 border-t border-[#F2F5F3] pt-3">
                      {s.bulletPoints.map((pt) => (
                        <div key={pt} className="flex items-center gap-1.5 text-[12px] text-[#4A5D54]">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#36887F]" />
                          <span className="line-clamp-1">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Progress Link */}
                <div className="mt-4 flex items-center justify-between border-t border-[#EAEFEA] p-1 pt-3 text-[12px] font-semibold text-[#7E9187] transition-colors group-hover:text-[#36887F] sm:p-2 sm:pt-3">
                  <span>Phase {s.num} of 05</span>
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
                  Ready to start your mentorship journey?
                </h4>
                <p className="mt-0.5 text-[13px] text-[#556960] sm:text-[14px]">
                  It takes less than 5 minutes to submit your details and get verified.
                </p>
              </div>
            </div>

            <Link
              href="/mentor/register"
              className="inline-flex h-[46px] shrink-0 items-center justify-center gap-2 rounded-full bg-[#1C3E30] px-7 text-[14px] font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#36887F] active:scale-[0.98]"
            >
              <span>Apply to Mentor</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}