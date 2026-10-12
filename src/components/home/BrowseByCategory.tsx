"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FileText, 
  DollarSign, 
  Compass, 
  Briefcase, 
  Home, 
  GraduationCap 
} from "lucide-react";

const CATEGORIES_DATA = [
  {
    icon: FileText,
    title: "Application & SOP Review",
    desc: "Craft standout personal statements and university essays.",
    count: "120+ Mentors",
    slug: "Applications",
  },
  {
    icon: DollarSign,
    title: "Scholarship & Funding",
    desc: "Discover grants, assistantships, and financial aid paths.",
    count: "85+ Mentors",
    slug: "Scholarships",
  },
  {
    icon: Compass,
    title: "Visa & Embassy Prep",
    desc: "Mock interviews and document verification checklists.",
    count: "95+ Mentors",
    slug: "Visa",
  },
  {
    icon: Briefcase,
    title: "Part-time Jobs & Career",
    desc: "Work rights, campus jobs, and post-study work permits.",
    count: "110+ Mentors",
    slug: "Career",
  },
  {
    icon: Home,
    title: "Accommodation & Arrival",
    desc: "Find safe rentals, flight bookings, and initial setup tips.",
    count: "70+ Mentors",
    slug: "Accommodation",
  },
  {
    icon: GraduationCap,
    title: "Major & Program Choice",
    desc: "Pick courses matching your long-term career ambition.",
    count: "140+ Mentors",
    slug: "Academics",
  },
];

export function BrowseByCategory() {
  return (
    <section className="w-full bg-[#FCFDFD] py-20 lg:py-[100px]">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="text-center">
          <span className="text-[11px] font-bold tracking-[0.22em] text-[#2F5243] uppercase">
            EXPLORE TOPICS
          </span>
          <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[42px]">
            Browse by category
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] text-[#55635D]">
            Get targeted 1-on-1 advice for every critical step of your application and settling phase.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES_DATA.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
              >
                <Link
                  href={`/mentors?category=${encodeURIComponent(cat.slug)}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-[#E7ECE8] bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#2F5243]/30 hover:shadow-md"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EBF4F0] text-[#1C3E30] transition-colors group-hover:bg-[#1C3E30] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-serif text-xl font-normal text-[#0F1E17]">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#55635D]">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-[#F0F3F1] pt-4 text-xs font-semibold text-[#2F5243]">
                    {cat.count}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}