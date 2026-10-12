"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const STORIES = [
  {
    name: "Nusrat Jahan",
    destination: "University of Toronto • Canada",
    topic: "Business Analytics",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=140&q=80",
    quote:
      "“The guidance I received helped me choose the right university and gave me real confidence in my decision.”",
  },
  {
    name: "Arif Rahman",
    destination: "University of Manchester • UK",
    topic: "Data Science",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=140&q=80",
    quote:
      "“I learned not just about academics, but also about living abroad — both the opportunities and the hurdles.”",
  },
  {
    name: "Tahmina Chowdhury",
    destination: "University of Amsterdam • Netherlands",
    topic: "Media & Communication",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=140&q=80",
    quote:
      "“The honest advice about accommodation and part-time work options made a huge difference in my first semester.”",
  },
];

export function StudentStoriesSection() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-16 lg:py-20">
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] flex-col px-5 sm:px-10 lg:px-16 xl:px-24">
          
          <div className="flex flex-col justify-between gap-4 border-b border-[#E0E8E3] pb-6 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
                STUDENT STORIES
              </span>
              <h2
                style={{ lineHeight: 1.2 }}
                className="mt-3 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[36px]"
              >
                Real journeys. Real people.
              </h2>
            </div>

            <Link
              href="/stories"
              className="group inline-flex h-[44px] shrink-0 items-center justify-center gap-2 rounded-full border border-[#D5DCD7] bg-white px-6 text-[14px] font-semibold text-[#1C3E30] shadow-sm transition-all duration-200 hover:border-[#36887F] hover:bg-[#36887F] hover:text-white active:scale-95"
            >
              <span>View all stories</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {STORIES.map((story, idx) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.45 }}
                className="group flex flex-col justify-between rounded-3xl border border-[#E7ECE8] bg-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#36887F]/40 hover:shadow-[0_12px_36px_rgba(54,136,127,0.08)] sm:p-8"
              >
                <div>
                  <span className="font-serif text-4xl font-extrabold leading-none text-[#36887F]/30">
                    “
                  </span>
                  <p
                    style={{ lineHeight: 1.6 }}
                    className="mt-2 font-serif italic text-[16px] !leading-[1.6] text-[#2F4239]"
                  >
                    {story.quote}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4 border-t border-[#E0E8E3] pt-5">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[#E0E8E3] transition-all group-hover:ring-[#36887F]/50">
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-[16px] font-bold leading-tight text-[#0F1E17] transition-colors group-hover:text-[#36887F]">
                      {story.name}
                    </h4>
                    <p className="mt-0.5 text-[13px] text-[#556960]">
                      {story.destination}
                    </p>
                    <span className="mt-1.5 inline-block rounded-full bg-[#EBF4F0] px-3 py-0.5 text-[11px] font-semibold text-[#36887F]">
                      {story.topic}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}