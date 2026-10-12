"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
}

export function Testimonials({ testimonials }: { testimonials: TestimonialItem[] }) {
  return (
    <section className="w-full border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-[100px]">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="text-center">
          <span className="text-[11px] font-bold tracking-[0.22em] text-[#2F5243] uppercase">
            SUCCESS STORIES
          </span>
          <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[42px]">
            Loved by students everywhere
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-[#55635D]">
            Real questions answered by verified peers across top universities.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.quote}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.5 }}
              className="flex flex-col justify-between rounded-2xl border border-[#E7ECE8] bg-white p-7 shadow-sm"
            >
              <div>
                <div className="flex items-center gap-1 text-[#E5A023]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <Quote className="mt-4 h-6 w-6 text-[#1C3E30]/20" />
                <p className="mt-2 text-sm leading-relaxed text-[#44544D]">
                  “{t.quote}”
                </p>
              </div>

              <div className="mt-6 border-t border-[#F0F3F1] pt-4">
                <p className="text-sm font-semibold text-[#0F1E17]">{t.name}</p>
                <p className="text-xs text-[#7B8B84]">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}