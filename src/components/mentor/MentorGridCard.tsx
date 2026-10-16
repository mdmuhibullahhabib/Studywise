"use client";

import Image from "next/image";
import Link from "next/link";
import { Building2, MapPin, Star, CheckCircle2, GraduationCap } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export interface MentorCardData {
  id: string;
  name: string;
  title: string;
  avatarUrl?: string | null;
  country?: string | null;
  university?: string | null;
  expertise: string[];
  ratingAverage: number;
  ratingCount: number;
  sessionCount?: number;
  verified: boolean;
  hourlyRate: number;
  currency: string;
}

export function MentorGridCard({ mentor }: { mentor: MentorCardData }) {
  const photoUrl =
    mentor.avatarUrl ||
    `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80`;

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#E7ECE8] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#36887F]/40 hover:shadow-[0_16px_40px_rgba(54,136,127,0.12)]">
      <div>
        {/* Cover Photo with Floating Badges */}
        <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#F0F4F2]">
          <Image
            src={photoUrl}
            alt={mentor.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
          />

          {/* Country Pill */}
          {mentor.country && (
            <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-xs">
              <MapPin className="h-3 w-3 text-white" />
              <span>{mentor.country}</span>
            </div>
          )}

          {/* Verified Badge */}
          {mentor.verified && (
            <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#1C3E30] shadow-sm backdrop-blur-xs">
              <CheckCircle2 className="h-3.5 w-3.5 fill-[#36887F] text-white" />
              <span>Verified</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6">
          <h3 className="font-serif text-[19px] font-bold text-[#0F1E17] transition-colors duration-200 group-hover:text-[#36887F] sm:text-[20px]">
            {mentor.name}
          </h3>

          <div className="mt-2.5 space-y-1.5 text-[13px] text-[#556960]">
            {mentor.university && (
              <p className="flex items-center gap-2 truncate">
                <Building2 className="h-4 w-4 shrink-0 text-[#36887F]" />
                <span className="truncate">{mentor.university}</span>
              </p>
            )}
            {mentor.title && (
              <p className="flex items-center gap-2 truncate">
                <GraduationCap className="h-4 w-4 shrink-0 text-[#36887F]" />
                <span className="truncate">{mentor.title}</span>
              </p>
            )}
          </div>

          {/* Expertise Tags */}
          {mentor.expertise && mentor.expertise.length > 0 && (
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {mentor.expertise.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-[#F2F6F4] px-2 py-0.5 text-[11px] font-semibold text-[#2D453A]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p
            style={{ lineHeight: 1.6 }}
            className="mt-3 line-clamp-2 text-[13.5px] !leading-[1.6] text-[#556960]"
          >
            {mentor.expertise && mentor.expertise.length > 0
              ? `Guidance on ${mentor.expertise.join(", ")} and living abroad.`
              : "Experienced alumni helping students navigate applications, student visas, and relocation challenges."}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="border-t border-[#EAEFEA] px-6 pb-6 pt-4">
        <div className="flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-bold text-[#0F1E17]">
              {mentor.ratingAverage.toFixed(1)}
            </span>
            <span className="text-[#708078]">
              ({mentor.ratingCount ?? mentor.sessionCount ?? 12} sessions)
            </span>
          </div>
          <span className="text-[15px] font-bold text-[#0F1E17]">
            {formatCurrency(mentor.hourlyRate, mentor.currency)}
            <span className="text-[12px] font-normal text-[#708078]">/hr</span>
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2.5">
          <Link
            href={`/mentors/${mentor.id}`}
            className="flex-1 rounded-full border border-[#D5DCD7] bg-white py-2.5 text-center text-[13px] font-semibold text-[#20332B] transition-colors hover:border-[#1C3E30] hover:text-[#1C3E30]"
          >
            View Profile
          </Link>
          <Link
            href={`/student/book/${mentor.id}`}
            className="flex-1 rounded-full bg-[#1C3E30] py-2.5 text-center text-[13px] font-semibold text-white shadow-xs transition-all hover:bg-[#36887F]"
          >
            Book Session
          </Link>
        </div>
      </div>
    </div>
  );
}