"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, GraduationCap, MapPin, BookOpen, CheckCircle2 } from "lucide-react";
import type { MentorCardData } from "@/components/mentor/mentor-card";

interface RailProps {
  title: string;
  subject: string;
  mentors: MentorCardData[];
}

export function MentorDiscoveryRails({ rails }: { rails: RailProps[] }) {
  return (
    <section className="w-full bg-[#FAFBF9] py-20 lg:py-[100px]">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="text-[11px] font-bold tracking-[0.22em] text-[#2F5243] uppercase">
            FEATURED MENTORS
          </span>
          <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[42px] lg:leading-[1.18]">
            Talk to someone who’s been there.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#55635D]">
            Get answers from students who understand the application process, university life, costs, culture, and everything in between.
          </p>
        </div>

        {/* Rails List */}
        <div className="mt-14 space-y-16">
          {rails.map((rail) => (
            <div key={rail.subject} className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E7ECE8] pb-4">
                <h3 className="font-serif text-2xl font-normal text-[#0F1E17]">
                  {rail.title}
                </h3>
                <Link
                  href={`/mentors?subject=${encodeURIComponent(rail.subject)}`}
                  className="text-xs font-semibold text-[#1C3E30] hover:underline"
                >
                  See all
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {rail.mentors.slice(0, 4).map((mentor, idx) => (
                  <motion.div
                    key={mentor.id ?? idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    className="flex flex-col overflow-hidden rounded-2xl border border-[#E7ECE8] bg-white p-3.5 shadow-sm transition-all duration-200 hover:shadow-md"
                  >
                    {/* Portrait Frame */}
                    <div className="relative h-60 w-full overflow-hidden rounded-xl bg-neutral-100">
                      <Image
                        src={mentor.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"}
                        alt={mentor.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover"
                      />
                      <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#1C3E30] shadow-sm backdrop-blur">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#1C3E30]" />
                        Verified
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="mt-4 flex flex-1 flex-col">
                      <h4 className="font-serif text-lg font-normal text-[#0F1E17]">
                        {mentor.name}
                      </h4>

                      <div className="mt-1 flex items-center gap-1.5 text-xs text-[#55635D]">
                        <div className="flex items-center gap-1 text-[#E5A023]">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          <span className="font-bold">{mentor?.rating ?? 4.9}</span>
                        </div>
                        <span>({mentor.sessionCount ?? 100} sessions)</span>
                      </div>

                      <div className="mt-4 space-y-2 border-t border-[#F0F3F1] pt-3 text-xs text-[#52645B]">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-3.5 w-3.5 shrink-0 text-[#8C9B94]" />
                          <span className="truncate">{mentor.university || "University"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#8C9B94]" />
                          <span>{mentor.country || "Global"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-3.5 w-3.5 shrink-0 text-[#8C9B94]" />
                          <span className="truncate">{mentor.expertise?.[0] || mentor?.headline || rail.subject}</span>
                        </div>
                      </div>

                      <div className="mt-5 border-t border-[#F0F3F1] pt-3.5">
                        <p className="text-xs font-semibold text-[#0F1E17]">
                          ${mentor.hourlyRate ?? 25} <span className="font-normal text-[#7B8B84]">/ session</span>
                        </p>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <Link
                            href={`/mentors/${mentor.id}`}
                            className="inline-flex items-center justify-center rounded-full border border-[#D5DCD7] bg-white py-2 text-xs font-medium text-[#20332B] hover:bg-neutral-50"
                          >
                            View Profile
                          </Link>
                          <Link
                            href={`/mentors/${mentor.id}/book`}
                            className="inline-flex items-center justify-center rounded-full bg-[#1C3E30] py-2 text-xs font-medium text-white hover:bg-[#142e23]"
                          >
                            Book Session
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}