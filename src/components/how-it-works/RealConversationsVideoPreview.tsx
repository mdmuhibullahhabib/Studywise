"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, FileText, Table, Mic, Video as VideoIcon, PhoneOff } from "lucide-react";

export function RealConversationsVideoPreview() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28">
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] flex-col px-5 sm:px-10 lg:px-16 xl:px-24">
          
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
              THE CONVERSATION
            </span>
            <h2
              style={{ lineHeight: 1.2 }}
              className="mt-3.5 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[40px] xl:text-[44px]"
            >
              Real conversations. <br />
              Real insights.
            </h2>
            <p
              style={{ lineHeight: 1.6 }}
              className="mt-3 max-w-xl text-[16px] !leading-[1.6] text-[#556960] lg:text-[18px]"
            >
              Meet face-to-face, discuss your specific questions, and receive candid, verified advice directly from mentors who have succeeded on the same journey.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-[#E7ECE8] bg-[#0F1E17] shadow-[0_12px_36px_rgba(0,0,0,0.06)] lg:col-span-7 lg:aspect-auto lg:min-h-[460px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
                alt="Live video call with mentor"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-top"
              />

              <div className="absolute top-5 left-5 rounded-full bg-black/55 px-3.5 py-1.5 backdrop-blur-md">
                <span className="text-[12px] font-medium text-white/90">
                  Nusrat Jahan (Mentor)
                </span>
              </div>

              <div className="absolute top-5 right-5 h-28 w-40 overflow-hidden rounded-2xl border-2 border-white/80 bg-[#0F1E17] shadow-xl sm:h-32 sm:w-44">
                <Image
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
                  alt="Student participant"
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </div>

              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-full bg-black/65 px-5 py-2.5 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#36887F] animate-pulse" />
                  <span className="text-[12px] font-semibold text-white">45:12</span>
                </div>
                <div className="h-4 w-px bg-white/20" />
                <div className="flex items-center gap-2 text-white/90">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                    <Mic className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                    <VideoIcon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-600 text-white">
                    <PhoneOff className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
              className="flex flex-col justify-between rounded-3xl border border-[#E7ECE8] bg-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] sm:p-9 lg:col-span-5"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#E0E8E3] pb-4">
                  <div>
                    <h3
                      style={{ lineHeight: 1.25 }}
                      className="font-serif text-[18px] sm:text-[20px] font-bold !leading-[1.25] tracking-tight text-[#0F1E17]"
                    >
                      Active Session Workspace
                    </h3>
                    <p className="mt-0.5 text-[13px] text-[#556960]">
                      Shared notes, guides &amp; resources
                    </p>
                  </div>
                  <span className="rounded-full bg-[#EBF4F0] px-3 py-1 text-[11px] font-semibold text-[#36887F]">
                    Live
                  </span>
                </div>

                <div className="mt-6 space-y-3.5">
                  {[
                    {
                      icon: FileText,
                      title: "UK Tier 4 Visa Checklist 2026",
                      meta: "PDF • 2.4 MB • Reviewed by Mentor",
                    },
                    {
                      icon: FileText,
                      title: "Statement of Purpose Framework",
                      meta: "Doc • 1.1 MB • Personalized Template",
                    },
                    {
                      icon: Table,
                      title: "Monthly Living Expenses Breakdown",
                      meta: "Spreadsheet • London & Manchester",
                    },
                  ].map((res) => (
                    <div
                      key={res.title}
                      className="group flex items-center gap-3.5 rounded-2xl border border-[#E7ECE8] bg-[#FAFBF9] p-3.5 transition-all duration-200 hover:border-[#36887F]/40 hover:bg-white"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#36887F] shadow-xs ring-1 ring-[#E0E8E3] group-hover:bg-[#36887F] group-hover:text-white group-hover:ring-[#36887F] transition-colors">
                        <res.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-[15px] font-bold text-[#0F1E17] group-hover:text-[#36887F] transition-colors">
                          {res.title}
                        </h4>
                        <p className="text-[12px] text-[#708078]">{res.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-[#E0E8E3] pt-5">
                <div className="flex items-center gap-2.5 text-[14px] font-medium text-[#2F4239]">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#36887F] text-white">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span>All shared resources are permanently saved in your dashboard.</span>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}