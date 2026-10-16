"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  CheckCircle2,
  Building2,
  GraduationCap,
  MapPin,
  ArrowRight,
} from "lucide-react";

const RELATED = [
  {
    id: "maliha-ahmed",
    name: "Maliha Ahmed",
    university: "Technical University of Munich",
    country: "Germany",
    degree: "MSc Mechanical Engineering",
    rating: "4.8",
    sessions: 76,
    price: "$18",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Guiding students through DAAD scholarships, German university admissions, and student life in Bavaria.",
  },
  {
    id: "samiul-hasan",
    name: "Samiul Hasan",
    university: "University of Melbourne",
    country: "Australia",
    degree: "Master of Computer Science",
    rating: "4.9",
    sessions: 112,
    price: "$22",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    bio: "Helping students with Australian student visas, tech career internships, and university course choices.",
  },
  {
    id: "nusrat-jahan",
    name: "Nusrat Jahan",
    university: "University of Toronto",
    country: "Canada",
    degree: "Master of Business Analytics",
    rating: "4.8",
    sessions: 98,
    price: "$20",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    bio: "Experienced mentor advising on Canadian study permits, scholarship applications, and post-study opportunities.",
  },
];

export function RelatedMentorsSection() {
  return (
    <section className="mt-16 border-t border-[#E7ECE8] pt-12 sm:mt-20 sm:pt-14">
      {/* Header */}
      <div className="flex flex-col gap-4 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D5E3DB] bg-[#EBF4F0] px-3.5 py-1 text-[11px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#36887F]" />
            RELATED MENTORS
          </span>
          <h2
            style={{ lineHeight: 1.2 }}
            className="mt-3.5 font-serif text-2xl font-bold tracking-tight text-[#0F1E17] sm:text-3xl lg:text-[34px]"
          >
            You might also like
          </h2>
          <p
            style={{ lineHeight: 1.6 }}
            className="mt-2 text-[14px] !leading-[1.6] text-[#556960] sm:text-[16px]"
          >
            Explore verified mentors across top international destinations and fields of study.
          </p>
        </div>

        <Link
          href="/mentors"
          className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#1C3E30] transition-colors hover:text-[#36887F]"
        >
          <span>Browse all mentors</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {RELATED.map((m, idx) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.45 }}
            className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#E7ECE8] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#36887F]/40 hover:shadow-[0_16px_40px_rgba(54,136,127,0.12)]"
          >
            <div>
              {/* Image Container with Badges */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#F0F4F2]">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Country Badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-xs">
                  <MapPin className="h-3 w-3 text-white" />
                  <span>{m.country}</span>
                </div>

                {/* Verified Badge */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#1C3E30] shadow-sm backdrop-blur-xs">
                  <CheckCircle2 className="h-3.5 w-3.5 fill-[#36887F] text-white" />
                  <span>Verified</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-[19px] font-bold text-[#0F1E17] transition-colors duration-200 group-hover:text-[#36887F] sm:text-[20px]">
                  {m.name}
                </h3>

                <div className="mt-2.5 space-y-1.5 text-[13px] text-[#556960]">
                  <p className="flex items-center gap-2 truncate">
                    <Building2 className="h-4 w-4 shrink-0 text-[#36887F]" />
                    <span className="truncate">{m.university}</span>
                  </p>
                  <p className="flex items-center gap-2 truncate">
                    <GraduationCap className="h-4 w-4 shrink-0 text-[#36887F]" />
                    <span className="truncate">{m.degree}</span>
                  </p>
                </div>

                <p
                  style={{ lineHeight: 1.6 }}
                  className="mt-3.5 line-clamp-2 text-[13.5px] !leading-[1.6] text-[#556960]"
                >
                  {m.bio}
                </p>
              </div>
            </div>

            {/* Footer with Rating & Action Buttons */}
            <div className="border-t border-[#EAEFEA] px-6 pb-6 pt-4">
              <div className="flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-[#0F1E17]">{m.rating}</span>
                  <span className="text-[#708078]">({m.sessions} sessions)</span>
                </div>
                <span className="text-[15px] font-bold text-[#0F1E17]">
                  {m.price}
                  <span className="text-[12px] font-normal text-[#708078]"> / session</span>
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2.5">
                <Link
                  href={`/mentors/${m.id}`}
                  className="flex-1 rounded-full border border-[#D5DCD7] bg-white py-2.5 text-center text-[13px] font-semibold text-[#20332B] transition-colors hover:border-[#1C3E30] hover:text-[#1C3E30]"
                >
                  View Profile
                </Link>
                <Link
                  href={`/student/book/${m.id}`}
                  className="flex-1 rounded-full bg-[#1C3E30] py-2.5 text-center text-[13px] font-semibold text-white shadow-xs transition-all hover:bg-[#36887F]"
                >
                  Book Session
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}