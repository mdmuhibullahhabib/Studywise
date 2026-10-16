"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import BANNER_IMAGE from"../../../../public/images/mentor/mentor_cta.png"


interface BookConversationBottomBannerProps {
  mentorId: string;
  mentorName: string;
}

export function BookConversationBottomBanner({
  mentorId,
  mentorName,
}: BookConversationBottomBannerProps) {
  const firstName = mentorName ? mentorName.split(" ")[0] : "Mentor";

  return (
    <section className="relative mt-16 sm:mt-20 overflow-hidden rounded-3xl border border-[#E7ECE8] shadow-[0_12px_36px_rgba(0,0,0,0.04)] min-h-[340px] sm:min-h-[380px]">
      {/* Background Image & Gradient */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={BANNER_IMAGE}
          alt="cta banner background"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-[70%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFBF9]/95 via-[#FAFBF9]/85 via-45% to-transparent lg:w-[65%]" />
      </div>

      <div className="relative z-10 flex min-h-[340px] sm:min-h-[380px] w-full flex-col justify-center p-8 sm:p-12 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-xl lg:max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D5E3DB] bg-[#EBF4F0] px-3.5 py-1 text-[11px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#36887F]" />
            READY TO GET REAL ANSWERS?
          </span>

          <h2
            style={{ lineHeight: 1.2 }}
            className="mt-3.5 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[40px]"
          >
            Book a conversation with {firstName}.
          </h2>

          <p
            style={{ lineHeight: 1.6 }}
            className="mt-3 max-w-lg text-[15px] sm:text-[16px] !leading-[1.6] text-[#556960]"
          >
            Get personalized guidance, ask your honest questions about studying abroad, and map out your next steps with clarity.
          </p>

          {/* Highlights */}
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#42544B]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#36887F]" />
              <span>1-on-1 private video session</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#36887F]" />
              <span>Flexible live scheduling</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#36887F]" />
              <span>Verified student advice</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:mt-9">
            <Link
              href={`/student/book/${mentorId}`}
              className="inline-flex h-[48px] items-center justify-center gap-2 rounded-full border border-transparent bg-[#1C3E30] px-7 text-[15px] font-medium text-white shadow-sm transition-all duration-200 hover:border-[#36887F] hover:bg-white hover:text-[#1C3E30] active:scale-[0.98]"
            >
              <span>Book a Session</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/mentors"
              className="inline-flex h-[48px] items-center justify-center rounded-full border border-[#D5DCD7] bg-white px-7 text-[15px] font-medium text-[#20332B] shadow-sm transition-all duration-200 hover:border-[#1C3E30] hover:bg-[#1C3E30] hover:text-white active:scale-[0.98]"
            >
              Explore All Mentors
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}