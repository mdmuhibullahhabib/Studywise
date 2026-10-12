"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

export function NewsletterSubscribeBox() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-12 lg:py-16">
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] items-center px-5 sm:px-10 lg:px-16 xl:px-24">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex w-full flex-col justify-between gap-6 rounded-3xl border border-[#E0E8E3] bg-[#F4F7F5] p-7 sm:p-9 lg:flex-row lg:items-center xl:p-10"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#36887F] shadow-[0_2px_10px_rgba(0,0,0,0.04)] ring-1 ring-[#E0E8E3]">
                <Mail className="h-6 w-6" />
              </div>

              <div>
                <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
                  NEWSLETTER
                </span>
                
                <h3
                  style={{ lineHeight: 1.25 }}
                  className="mt-1 font-serif text-[20px] sm:text-[22px] lg:text-[24px] font-bold !leading-[1.25] tracking-tight text-[#0F1E17]"
                >
                  Get useful study-abroad insights in your inbox.
                </h3>
                
                <p
                  style={{ lineHeight: 1.6 }}
                  className="mt-1.5 text-[15px] sm:text-[16px] !leading-[1.6] text-[#556960]"
                >
                  Actionable guides, deadlines, and real stories — delivered directly to you.
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:max-w-md"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="h-[48px] w-full rounded-full border border-[#D5DCD7] bg-white px-5 text-[15px] text-[#1B2923] placeholder-[#8A9B93] shadow-xs transition-all focus:border-[#36887F] focus:ring-2 focus:ring-[#36887F]/15 focus:outline-none"
              />

              <button
                type="submit"
                className="inline-flex h-[48px] shrink-0 items-center justify-center gap-2 rounded-full border border-transparent bg-[#1C3E30] px-7 text-[15px] font-medium text-white shadow-sm transition-all duration-200 hover:border-[#36887F] hover:bg-white hover:text-[#1C3E30] active:scale-[0.98]"
              >
                <span>Subscribe</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}