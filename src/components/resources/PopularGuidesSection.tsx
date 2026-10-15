"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

const GUIDES = [
  {
    title: "How to choose the right university",
    category: "Universities",
    readTime: "5 min read",
    author: "Nusrat Jahan",
    authorImage:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    href: "/resources/how-to-choose-the-right-university",
  },
  {
    title: "Scholarships Bangladeshi students should know",
    category: "Scholarships",
    readTime: "7 min read",
    author: "Samiul Hasan",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    href: "/resources/scholarships-bangladeshi-students",
  },
  {
    title: "What nobody tells you about student life abroad",
    category: "Student Life",
    readTime: "6 min read",
    author: "Maliha Ahmed",
    authorImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    href: "/resources/student-life-abroad-truths",
  },
  {
    title: "Your first 30 days after arriving",
    category: "Visa & Arrival",
    readTime: "8 min read",
    author: "Rafius Islam",
    authorImage:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    href: "/resources/first-30-days-after-arriving",
  },
];

export function PopularGuidesSection() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-16 lg:py-20">
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] flex-col px-5 sm:px-10 lg:px-16 xl:px-24">
          
          <div className="flex flex-col justify-between gap-4 border-b border-[#E0E8E3] pb-6 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
                POPULAR GUIDES
              </span>
              <h2
                style={{ lineHeight: 1.2 }}
                className="mt-3 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[36px]"
              >
                Quick answers to your biggest questions.
              </h2>
            </div>

            <Link
              href="/resources/guides"
              className="group inline-flex h-[44px] shrink-0 items-center justify-center gap-2 rounded-full border border-[#D5DCD7] bg-white px-6 text-[14px] font-semibold text-[#1C3E30] shadow-sm transition-all duration-200 hover:border-[#36887F] hover:bg-[#36887F] hover:text-white active:scale-95"
            >
              <span>View all guides</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {GUIDES.map((guide, idx) => (
              <motion.div
                key={guide.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
              >
                <Link
                  href={guide.href}
                  className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[#E7ECE8] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#36887F]/40 hover:shadow-[0_12px_36px_rgba(54,136,127,0.08)]"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F0F4F2]">
                      <Image
                        src={guide.image}
                        alt={guide.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3.5 left-3.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#1C3E30] shadow-xs backdrop-blur-xs">
                        {guide.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3
                        style={{ lineHeight: 1.35 }}
                        className="font-serif text-[17px] sm:text-[18px] font-bold !leading-[1.35] text-[#0F1E17] transition-colors group-hover:text-[#36887F]"
                      >
                        {guide.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#EAEFEA] px-6 py-4 text-[12px] font-medium text-[#708078]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#36887F]" />
                      <span>{guide.readTime}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full ring-1 ring-[#E0E8E3]">
                        <Image
                          src={guide.authorImage}
                          alt={guide.author}
                          fill
                          sizes="20px"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-[#2F4239]">{guide.author}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}