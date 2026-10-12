"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const INSIGHTS = [
  {
    name: "Rafius Islam",
    role: "Study Abroad Mentor",
    tag: "Choosing a University",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80",
    quote:
      "“Don’t just look at rankings. Choose a university where you see yourself growing, not just studying.”",
  },
  {
    name: "Maliha Ahmed",
    role: "Study Abroad Mentor",
    tag: "Scholarships",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    quote:
      "“Scholarships aren’t just about good grades — your personal story, resilience, and extracurriculars matter too.”",
  },
  {
    name: "Samiul Hasan",
    role: "Study Abroad Mentor",
    tag: "Student Life",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    quote:
      "“Be open to new cultures and experiences. Living abroad has challenges, but it’s undeniably life-changing.”",
  },
  {
    name: "Tasnim Chowdhury",
    role: "Study Abroad Mentor",
    tag: "Visa & Process",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
    quote:
      "“Start your visa process as early as possible. Small paperwork delays can cause avoidable stress later on.”",
  },
];

export function MentorInsightsSection() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-16 lg:py-20">
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] flex-col px-5 sm:px-10 lg:px-16 xl:px-24">
          
          <div className="flex flex-col justify-between gap-4 border-b border-[#E0E8E3] pb-6 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
                MENTOR INSIGHTS
              </span>
              <h2
                style={{ lineHeight: 1.2 }}
                className="mt-3 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[36px]"
              >
                Short advice. Big impact.
              </h2>
            </div>

            <Link
              href="/mentors"
              className="group inline-flex h-[44px] shrink-0 items-center justify-center gap-2 rounded-full border border-[#D5DCD7] bg-white px-6 text-[14px] font-semibold text-[#1C3E30] shadow-sm transition-all duration-200 hover:border-[#36887F] hover:bg-[#36887F] hover:text-white active:scale-95"
            >
              <span>View all insights</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INSIGHTS.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
                className="group flex flex-col justify-between rounded-3xl border border-[#E7ECE8] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#36887F]/40 hover:shadow-[0_12px_36px_rgba(54,136,127,0.08)] sm:p-7"
              >
                <div>
                  <div className="flex items-center gap-3.5">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-[#E0E8E3] transition-all group-hover:ring-[#36887F]/50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-[15px] sm:text-[16px] font-bold leading-tight text-[#0F1E17] transition-colors group-hover:text-[#36887F]">
                        {item.name}
                      </h4>
                      <p className="mt-0.5 text-[12px] font-medium text-[#708078]">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <p
                    style={{ lineHeight: 1.6 }}
                    className="mt-5 font-serif italic text-[15px] sm:text-[16px] !leading-[1.6] text-[#2F4239]"
                  >
                    {item.quote}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#E0E8E3] pt-4">
                  <span className="inline-block rounded-full bg-[#EBF4F0] px-3 py-1 text-[11px] font-semibold text-[#36887F]">
                    {item.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}