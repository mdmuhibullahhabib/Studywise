"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "How do I become a mentor on StudyWise?",
    answer:
      "To become a mentor, simply click on 'Become a Mentor' in the navigation bar. You will need to submit proof of current enrollment or graduation from an overseas institution. Our team reviews all applications within 48 hours.",
  },
  {
    question: "Is there a fee to use StudyWise?",
    answer:
      "Browsing mentors, exploring universities, and sending initial introductory questions is free. You only pay when you schedule and book a dedicated 1-on-1 video mentorship session.",
  },
  {
    question: "How do I book a mentor session?",
    answer:
      "Visit any mentor's profile, select your preferred available date and time slot from their live calendar, choose your focus topic, and complete the booking securely.",
  },
  {
    question: "Can I get a refund if I need to cancel?",
    answer:
      "Yes. Cancellations made at least 24 hours prior to the scheduled session receive a full 100% refund. If a mentor misses a call or experiences technical issues, you can reschedule immediately or request a refund.",
  },
  {
    question: "Do you offer support for specific countries or universities?",
    answer:
      "We currently support students heading to over 40+ destinations including the UK, USA, Canada, Australia, Germany, and across Europe, with hundreds of verified mentors from top global universities.",
  },
];

export function ContactFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28">
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] flex-col px-5 sm:px-10 lg:px-16 xl:px-24">
          
          <div className="flex flex-col justify-between gap-6 border-b border-[#E0E8E3] pb-8 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2
                style={{ lineHeight: 1.2 }}
                className="mt-3.5 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[40px] xl:text-[44px]"
              >
                Got questions? We have answers.
              </h2>
              <p
                style={{ lineHeight: 1.6 }}
                className="mt-3 max-w-xl text-[16px] !leading-[1.6] text-[#556960] lg:text-[18px]"
              >
                Here are some common answers. If you don’t find what you’re looking for, feel free to reach out to us directly.
              </p>
            </div>

            <Link
              href="/faqs"
              className="group inline-flex h-[44px] shrink-0 items-center justify-center gap-2 rounded-full border border-[#D5DCD7] bg-white px-6 text-[14px] font-semibold text-[#1C3E30] shadow-sm transition-all duration-200 hover:border-[#36887F] hover:bg-[#36887F] hover:text-white active:scale-95"
            >
              <span>View all FAQs</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-2 divide-y divide-[#E0E8E3]">
            {FAQ_DATA.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div key={item.question} className="py-6 sm:py-7">
                  <button
                    type="button"
                    onClick={() => toggleFAQ(idx)}
                    className="group flex w-full items-center justify-between gap-6 text-left transition-colors"
                  >
                    <span
                      style={{ lineHeight: 1.3 }}
                      className={`font-serif text-[18px] sm:text-[20px] lg:text-[22px] font-semibold !leading-[1.3] tracking-tight transition-colors duration-200 ${
                        isOpen ? "text-[#36887F]" : "text-[#0F1E17] group-hover:text-[#36887F]"
                      }`}
                    >
                      {item.question}
                    </span>

                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "border-[#36887F] bg-[#36887F] text-white"
                          : "border-[#DCE4E0] bg-white text-[#708078] group-hover:border-[#36887F] group-hover:text-[#36887F]"
                      }`}
                    >
                      <ChevronRight
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isOpen ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p
                          style={{ lineHeight: 1.6 }}
                          className="pt-4 pr-6 sm:pr-12 text-[15px] sm:text-[16px] !leading-[1.6] text-[#556960]"
                        >
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}