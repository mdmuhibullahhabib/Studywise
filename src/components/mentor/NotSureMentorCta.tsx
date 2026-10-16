"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import MENTOR_CTA_IMAGE from "../../../public/images/mentor/mentor_cta.png";

export function NotSureMentorCta() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-16 lg:py-20">
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] items-center px-5 sm:px-10 lg:px-16 xl:px-24">
          
          <div className="relative flex min-h-[360px] w-full items-center overflow-hidden rounded-3xl border border-[#E7ECE8] shadow-[0_12px_36px_rgba(0,0,0,0.04)] sm:min-h-[400px] lg:min-h-[430px]">
            
            {/* Background Panorama Image - 100% Clear, No Opacity / Fog Wash */}
            <div className="absolute inset-0 h-full w-full">
              <Image
                src={MENTOR_CTA_IMAGE}
                alt="University campus skyline at sunset"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[75%_center] sm:object-center"
              />
            </div>

            {/* Floating Glassmorphic Content Card */}
            <div className="relative z-10 flex w-full p-5 sm:p-8 lg:p-12">
              <div className="w-full max-w-xl rounded-3xl border border-white/80 bg-white/95 p-7 shadow-[0_16px_40px_rgba(0,0,0,0.08)] backdrop-blur-md sm:p-9">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D5E3DB] bg-[#EBF4F0] px-3.5 py-1 text-[11px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#36887F]" />
                  PERSONALIZED MATCHING
                </span>

                <h2
                  style={{ lineHeight: 1.2 }}
                  className="mt-3.5 font-serif text-2xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-3xl lg:text-[34px]"
                >
                  Not sure who to choose?
                </h2>

                <p
                  style={{ lineHeight: 1.6 }}
                  className="mt-3 text-[14px] !leading-[1.6] text-[#556960] sm:text-[15px]"
                >
                  Tell us your target destination, intended degree, and timeline, and we’ll match you with the right verified mentor for your goals.
                </p>

                {/* Trust Highlights */}
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] font-medium text-[#40544B]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#36887F]" />
                    <span>100% Free Matching</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#36887F]" />
                    <span>Verified Students & Alumni</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#36887F]" />
                    <span>Tailored Suggestions</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
                  <Link
                    href="/contact?topic=matching"
                    className="inline-flex h-[46px] items-center justify-center gap-2 rounded-full border border-transparent bg-[#1C3E30] px-7 text-[14px] font-medium text-white shadow-sm transition-all duration-200 hover:border-[#36887F] hover:bg-white hover:text-[#1C3E30] active:scale-[0.98] sm:h-[48px] sm:text-[15px]"
                  >
                    <span>Find My Mentor</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="#mentors"
                    className="inline-flex h-[46px] items-center justify-center rounded-full border border-[#D5DCD7] bg-white px-6 text-[14px] font-medium text-[#20332B] shadow-sm transition-all duration-200 hover:border-[#1C3E30] hover:bg-[#1C3E30] hover:text-white active:scale-[0.98] sm:h-[48px] sm:text-[15px]"
                  >
                    Browse All Mentors
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}