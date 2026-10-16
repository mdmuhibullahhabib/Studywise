"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, GraduationCap, MapPin, BookOpen, CheckCircle2, ArrowRight } from "lucide-react";
import type { MentorCardData } from "@/components/mentor/mentor-card";
import { formatCurrency } from "@/lib/utils";

export function FeaturedMentors({ mentors }: { mentors: MentorCardData[] }) {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28">
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] flex-col px-5 sm:px-10 lg:px-16 xl:px-24">
          
          {/* Header Section */}
          <div className="flex flex-col justify-between gap-6 border-b border-[#E0E8E3] pb-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
                FEATURED MENTORS
              </span>
              <h2
                style={{ lineHeight: 1.18 }}
                className="mt-3 font-serif text-3xl font-extrabold !leading-[1.18] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[42px]"
              >
                Talk to someone who’s been there.
              </h2>
              <p
                style={{ lineHeight: 1.6 }}
                className="mt-3 text-[15px] sm:text-[16px] !leading-[1.6] text-[#556960]"
              >
                Get direct answers from verified students who navigate the admission process, campus life, living expenses, and cultural transitions daily.
              </p>
            </div>

            <Link
              href="/mentors"
              className="group inline-flex h-[44px] shrink-0 items-center justify-center gap-2 rounded-full border border-[#D5DCD7] bg-white px-6 text-[14px] font-semibold text-[#1C3E30] shadow-sm transition-all duration-200 hover:border-[#36887F] hover:bg-[#36887F] hover:text-white active:scale-95"
            >
              <span>Explore all mentors</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mentors.slice(0, 4).map((mentor, idx) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
              >
                <div className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[#E7ECE8] bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#36887F]/40 hover:shadow-[0_12px_36px_rgba(54,136,127,0.08)] sm:p-5">
                  <div>
                    {/* Mentor Portrait */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#F0F4F2]">
                      <Image
                        src={
                          mentor.avatarUrl ||
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                        }
                        alt={mentor.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      {mentor.verified && (
                        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#1C3E30] shadow-xs backdrop-blur-xs">
                          <CheckCircle2 className="h-3.5 w-3.5 fill-[#36887F] text-white" />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>

                    {/* Mentor Info */}
                    <div className="mt-4 px-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-serif text-[18px] font-bold text-[#0F1E17] transition-colors group-hover:text-[#36887F] truncate">
                          {mentor.name}
                        </h3>
                        <div className="flex items-center gap-1 shrink-0 text-[12px] font-bold text-[#0F1E17]">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span>{mentor.ratingAverage.toFixed(1)}</span>
                        </div>
                      </div>

                      <p className="mt-0.5 text-[12px] text-[#708078]">
                        {mentor.sessionCount ?? 0} sessions completed
                      </p>

                      <div className="mt-4 space-y-2 border-t border-[#EAEFEA] pt-3.5 text-[13px] text-[#556960]">
                        <div className="flex items-center gap-2 truncate">
                          <GraduationCap className="h-4 w-4 shrink-0 text-[#36887F]" />
                          <span className="truncate">{mentor.university || "University"}</span>
                        </div>
                        <div className="flex items-center gap-2 truncate">
                          <MapPin className="h-4 w-4 shrink-0 text-[#36887F]" />
                          <span className="truncate">{mentor.country || "Global"}</span>
                        </div>
                        <div className="flex items-center gap-2 truncate">
                          <BookOpen className="h-4 w-4 shrink-0 text-[#36887F]" />
                          <span className="truncate">{mentor.expertise?.[0] || mentor.title}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="mt-5 border-t border-[#EAEFEA] px-1 pt-4">
                    <p className="text-[14px] font-bold text-[#0F1E17]">
                      {formatCurrency(mentor.hourlyRate, mentor.currency)}{" "}
                      <span className="text-[12px] font-normal text-[#708078]">/ hour</span>
                    </p>
                    
                    <div className="mt-3.5 grid grid-cols-2 gap-2">
                      <Link
                        href={`/mentors/${mentor.id}`}
                        className="inline-flex h-[38px] items-center justify-center rounded-full border border-[#D5DCD7] bg-white text-[12px] font-semibold text-[#20332B] transition-colors hover:border-[#1C3E30] hover:text-[#1C3E30]"
                      >
                        Profile
                      </Link>
                      <Link
                        href={`/mentors/${mentor.id}/book`}
                        className="inline-flex h-[38px] items-center justify-center rounded-full bg-[#1C3E30] text-[12px] font-semibold text-white shadow-xs transition-all hover:bg-[#36887F]"
                      >
                        Book
                      </Link>
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