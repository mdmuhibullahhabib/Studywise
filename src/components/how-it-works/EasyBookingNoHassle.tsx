"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, Star } from "lucide-react";

export function EasyBookingNoHassle() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28">
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] flex-col px-5 sm:px-10 lg:px-16 xl:px-24">
          
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
              BOOKING EXPERIENCE
            </span>
            <h2
              style={{ lineHeight: 1.2 }}
              className="mt-3.5 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[40px] xl:text-[44px]"
            >
              Easy booking. No hassle.
            </h2>
            <p
              style={{ lineHeight: 1.6 }}
              className="mt-3 max-w-xl text-[16px] !leading-[1.6] text-[#556960] lg:text-[18px]"
            >
              Choose your verified mentor, pick an available slot that suits your schedule, and confirm your session in just three steps.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
            
            {/* Step 1: Mentor Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="group flex flex-col justify-between rounded-3xl border border-[#E7ECE8] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#36887F]/40 hover:shadow-[0_12px_36px_rgba(54,136,127,0.08)] sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#EAEFEA] pb-3">
                  <span className="text-[11px] font-bold tracking-widest text-[#36887F] uppercase">
                    1. Choose Mentor
                  </span>
                  <div className="flex items-center gap-1 text-[12px] font-bold text-[#0F1E17]">
                    <Star className="h-3.5 w-3.5 fill-[#36887F] text-[#36887F]" />
                    <span>4.9</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3.5">
                  <div className="relative h-13 w-13 shrink-0 overflow-hidden rounded-full ring-2 ring-[#E0E8E3]">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                      alt="Arif Rahman"
                      fill
                      sizes="52px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-[18px] font-bold leading-tight text-[#0F1E17] group-hover:text-[#36887F] transition-colors">
                      Arif Rahman
                    </h4>
                    <p className="mt-0.5 text-[12px] text-[#556960]">
                      MSc Data Science • Univ. of Manchester
                    </p>
                  </div>
                </div>

                <p
                  style={{ lineHeight: 1.6 }}
                  className="mt-4 text-[14px] !leading-[1.6] text-[#556960] sm:text-[15px]"
                >
                  I help Bangladeshi students understand what studying and living in the UK is truly like, from scholarships to housing.
                </p>
              </div>

              <div className="mt-7 flex gap-2.5 pt-4 border-t border-[#EAEFEA]">
                <button
                  type="button"
                  className="flex-1 rounded-full border border-[#D5DCD7] bg-white py-2.5 text-center text-[13px] font-medium text-[#20332B] transition-colors hover:border-[#1C3E30] hover:text-[#1C3E30]"
                >
                  Profile
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-full bg-[#1C3E30] py-2.5 text-center text-[13px] font-medium text-white transition-all hover:bg-[#36887F]"
                >
                  Select Mentor
                </button>
              </div>
            </motion.div>

            {/* Step 2: Date & Time Picker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.45 }}
              className="group flex flex-col justify-between rounded-3xl border border-[#E7ECE8] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#36887F]/40 hover:shadow-[0_12px_36px_rgba(54,136,127,0.08)] sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#EAEFEA] pb-3">
                  <span className="text-[11px] font-bold tracking-widest text-[#36887F] uppercase">
                    2. Pick Date & Time
                  </span>
                  <div className="flex items-center gap-1.5 text-[#556960]">
                    <ChevronLeft className="h-4 w-4 cursor-pointer hover:text-[#0F1E17]" />
                    <ChevronRight className="h-4 w-4 cursor-pointer hover:text-[#0F1E17]" />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-serif text-[15px] font-bold text-[#0F1E17]">
                    October 2026
                  </span>
                  <span className="text-[11px] font-semibold text-[#36887F]">Timezone: BST</span>
                </div>

                <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-[#8C9B94]">
                  <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                </div>

                <div className="mt-1.5 grid grid-cols-7 gap-1 text-center text-[13px]">
                  {[...Array(31)].map((_, i) => {
                    const isSelected = i === 14;
                    return (
                      <div
                        key={i}
                        className={`flex h-7 w-7 items-center justify-center mx-auto rounded-full text-[12px] transition-colors ${
                          isSelected
                            ? "bg-[#1C3E30] text-white font-bold shadow-xs"
                            : i > 12 && i < 24
                            ? "text-[#0F1E17] hover:bg-[#EBF4F0] cursor-pointer"
                            : "text-[#B4C0BA]"
                        }`}
                      >
                        {i + 1}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-1.5 border-t border-[#EAEFEA] pt-4">
                <span className="rounded-full bg-[#1C3E30] px-3.5 py-1.5 text-center text-[12px] font-semibold text-white shadow-xs">
                  10:30 AM
                </span>
                <span className="rounded-full border border-[#D5DCD7] px-3 py-1.5 text-center text-[12px] font-medium text-[#556960] hover:border-[#36887F]">
                  12:00 PM
                </span>
                <span className="rounded-full border border-[#D5DCD7] px-3 py-1.5 text-center text-[12px] font-medium text-[#556960] hover:border-[#36887F]">
                  04:30 PM
                </span>
              </div>
            </motion.div>

            {/* Step 3: Confirmation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="group flex flex-col justify-between rounded-3xl border border-[#E7ECE8] bg-white p-6 text-center shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#36887F]/40 hover:shadow-[0_12px_36px_rgba(54,136,127,0.08)] sm:p-7"
            >
              <div className="flex items-center justify-between border-b border-[#EAEFEA] pb-3">
                <span className="text-[11px] font-bold tracking-widest text-[#36887F] uppercase">
                  3. Instant Confirmation
                </span>
                <span className="text-[11px] font-semibold text-[#1C3E30] bg-[#EBF4F0] px-2 py-0.5 rounded-full">
                  Step complete
                </span>
              </div>

              <div className="my-auto py-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EBF4F0] text-[#36887F] shadow-sm">
                  <CheckCircle2 className="h-7 w-7" />
                </div>

                <h4
                  style={{ lineHeight: 1.25 }}
                  className="mt-4 font-serif text-[20px] font-bold !leading-[1.25] tracking-tight text-[#0F1E17]"
                >
                  Booking Confirmed!
                </h4>

                <p
                  style={{ lineHeight: 1.5 }}
                  className="mt-2 text-[14px] !leading-[1.5] text-[#556960]"
                >
                  Session with Arif Rahman <br />
                  <span className="font-semibold text-[#0F1E17]">Thu, Oct 15 • 10:30 AM (BST)</span>
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAEFEA]">
                <button
                  type="button"
                  className="w-full rounded-full bg-[#1C3E30] py-2.5 text-center text-[13px] font-medium text-white transition-all hover:bg-[#36887F]"
                >
                  View My Sessions
                </button>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}