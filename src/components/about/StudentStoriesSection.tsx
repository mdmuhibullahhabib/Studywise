"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";

interface StoryItem {
  id: string;
  name: string;
  journey: string;
  image: string;
  quote: string;
  rating: number;
}

const STUDENT_STORIES: StoryItem[] = [
  {
    id: "1",
    name: "Rahim Ahmed",
    journey: "University of Dhaka → University of Manchester",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
    quote:
      "Arif helped me understand the entire UK application process. His advice was practical, honest and super helpful.",
    rating: 5.0,
  },
  {
    id: "2",
    name: "Nusrat Jahan",
    journey: "Independent University, Bangladesh → Canada",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    quote:
      "Nusrat’s guidance on scholarships and student life was exactly what I needed. I felt so much more confident after our session.",
    rating: 5.0,
  },
  {
    id: "3",
    name: "Samiul Hasan",
    journey: "University of Rajshahi → Australia",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    quote:
      "The conversation was so natural and helpful. I got clear answers to all my questions about part-time work and accommodation.",
    rating: 5.0,
  },
];

export function StudentStoriesSection() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28">
      {/* ================= EXACT FIXED LAYOUT CONTAINER ================= */}
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] flex-col px-5 sm:px-10 lg:px-16 xl:px-24">
          
          {/* ================= HEADER ================= */}
          <div className="flex flex-col justify-between gap-6 border-b border-[#E0E8E3] pb-8 md:flex-row md:items-end">
            <div>
              <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
                STUDENT STORIES
              </span>
              <h2
                style={{ lineHeight: 1.2 }}
                className="mt-3.5 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[42px] xl:text-[46px]"
              >
                Real people. Real impact.
              </h2>
            </div>

            <Link
              href="/stories"
              className="group inline-flex items-center gap-2 rounded-full border border-[#D5DCD7] bg-white px-5 py-2.5 text-[14px] font-semibold text-[#1C3E30] shadow-sm transition-all duration-200 hover:border-[#36887F] hover:bg-[#36887F] hover:text-white active:scale-95"
            >
              <span>Explore all stories</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* ================= CARDS GRID ================= */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {STUDENT_STORIES.map((story, idx) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.45 }}
                className="group flex flex-col justify-between rounded-3xl border border-[#E7ECE8] bg-white p-7 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#36887F]/40 hover:shadow-[0_12px_36px_rgba(54,136,127,0.08)]"
              >
                {/* Quote Text: 16px with Relaxed Line-Height */}
                <p
                  style={{ lineHeight: 1.6 }}
                  className="text-[15px] sm:text-[16px] !leading-[1.6] text-[#4A5D54]"
                >
                  “{story.quote}”
                </p>

                {/* Profile Bottom Info */}
                <div className="mt-8 border-t border-[#F0F4F2] pt-6 flex items-center gap-4">
                  {/* Avatar with Subtle Ring */}
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-[#E0E8E3] transition-transform duration-300 group-hover:ring-[#36887F]/40">
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 overflow-hidden">
                    {/* Student Name: 20-22px Bold Serif */}
                    <h3
                      style={{ lineHeight: 1.2 }}
                      className="truncate font-serif text-[18px] sm:text-[20px] font-bold !leading-[1.2] text-[#0F1E17]"
                    >
                      {story.name}
                    </h3>

                    {/* Journey Pathway */}
                    <p className="mt-1 truncate text-[13px] text-[#708078]">
                      {story.journey}
                    </p>

                    {/* Star Ratings */}
                    <div className="mt-2 flex items-center gap-1.5">
                      <div className="flex text-[#F5A623]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[12px] font-bold text-[#14231C]">
                        {story.rating.toFixed(1)}
                      </span>
                    </div>
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