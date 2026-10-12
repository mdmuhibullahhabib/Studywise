"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Globe2, MessagesSquare, Video } from "lucide-react";

const BENEFITS = [
  {
    icon: BadgeCheck,
    title: "Verified mentors only",
    body: "Every mentor is reviewed against their enrollment and experience before they can be booked — no anonymous advice.",
  },
  {
    icon: Globe2,
    title: "Guidance from people who've done it",
    body: "Mentors are current or recent students at the universities you're applying to — not consultants reading from a script.",
  },
  {
    icon: MessagesSquare,
    title: "Talk before you commit",
    body: "Message a mentor first, ask questions, and get a feel for their approach before booking a paid session.",
  },
  {
    icon: Video,
    title: "Sessions you can revisit",
    body: "Recordings land back in your conversation, so nothing about visas, courses, or scholarships gets lost.",
  },
];

export function WhyStudyWise() {
  return (
    <section className="w-full bg-[#FCFDFD] py-20 lg:py-[100px]">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="text-center">
          <span className="text-[11px] font-bold tracking-[0.22em] text-[#2F5243] uppercase">
            WHY STUDYWISE
          </span>
          <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[42px]">
            Built for students going abroad
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] text-[#55635D]">
            We replace outdated consultancy methods with authentic, peer-led mentorship.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex flex-col items-start rounded-2xl border border-[#E7ECE8] bg-white p-7 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EBF4F0] text-[#1C3E30]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-serif text-lg font-normal text-[#0F1E17]">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#55635D]">
                  {benefit.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}