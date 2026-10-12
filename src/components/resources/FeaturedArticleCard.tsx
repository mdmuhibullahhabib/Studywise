"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, GraduationCap, ArrowRight } from "lucide-react";
import CARD_IMAGE from "../../../public/images/resources//article.png";


export function FeaturedArticleCard() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-12 lg:py-16">
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] items-center px-5 sm:px-10 lg:px-16 xl:px-24">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid w-full grid-cols-1 overflow-hidden rounded-3xl border border-[#E7ECE8] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)] lg:grid-cols-12"
          >
            {/* Left Image: Maintained original compact aspect & min-h */}
            <div className="relative aspect-[16/10] w-full lg:col-span-7 lg:aspect-auto lg:min-h-[380px]">
              <Image
                src={CARD_IMAGE}
                alt="The real cost of studying abroad in 2026"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-[center_35%]"
              />
            </div>

            {/* Right: Content Area */}
            <div className="flex flex-col justify-between p-7 sm:p-9 lg:col-span-5 lg:p-10">
              <div>
                <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
                  FEATURED ARTICLE
                </span>

                <h2
                  style={{ lineHeight: 1.2 }}
                  className="mt-3 font-serif text-2xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-3xl lg:text-[32px] xl:text-[36px]"
                >
                  The real cost of studying abroad in 2026.
                </h2>

                <div className="mt-3.5 flex flex-wrap items-center gap-4 text-[13px] sm:text-[14px] font-medium text-[#556960]">
                  <span className="inline-flex items-center gap-1.5">
                    <GraduationCap className="h-4 w-4 text-[#36887F]" />
                    <span>Applications</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-[#36887F]" />
                    <span>6 min read</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <div className="relative h-5 w-5 overflow-hidden rounded-full ring-1 ring-[#DCE4E0]">
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                        alt="Author Arif Rahman"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[#0F1E17]">By Arif Rahman</span>
                  </span>
                </div>

                <p
                  style={{ lineHeight: 1.6 }}
                  className="mt-4 text-[15px] sm:text-[16px] !leading-[1.6] text-[#556960]"
                >
                  From tuition fees to living expenses, here&apos;s what you really need to know about the realistic budget for studying abroad in 2026 — and how to prepare without surprises.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EAEFEA]">
                <Link
                  href="/resources/real-cost-of-studying-abroad-2026"
                  className="inline-flex h-[44px] items-center justify-center gap-2 rounded-full border border-transparent bg-[#1C3E30] px-6 text-[14px] font-medium text-white shadow-sm transition-all duration-200 hover:border-[#36887F] hover:bg-white hover:text-[#1C3E30] active:scale-[0.98]"
                >
                  <span>Read article</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}