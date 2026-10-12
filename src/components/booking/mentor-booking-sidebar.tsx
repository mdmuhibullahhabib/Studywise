"use client";

import Image from "next/image";
import { 
  Building2, 
  MapPin, 
  Star, 
  BookOpen, 
  Clock, 
  Globe2, 
  CalendarDays, 
  GraduationCap, 
  CheckCircle2 
} from "lucide-react";

interface MentorBookingSidebarProps {
  mentor: {
    name?: string | null;
    image?: string | null;
    university?: string | null;
    location?: string | null;
    headline?: string | null;
    bio?: string | null;
    rating?: number | null;
    sessionCount?: number | null;
  };
}

export function MentorBookingSidebar({ mentor }: MentorBookingSidebarProps) {
  const mentorName = mentor?.name || "Arif Rahman";
  const mentorImage =
    mentor?.image ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80";
  const university = mentor?.university || "University of Manchester";
  const location = mentor?.location || "Manchester, United Kingdom";

  return (
    <aside className="w-full rounded-[24px] border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.02)] sm:p-7">
      {/* Mentor Image Card with Verified Badge */}
      <div className="relative aspect-[1.28/1] w-full overflow-hidden rounded-2xl bg-[#F4F6F5]">
        <Image
          src={mentorImage}
          alt={mentorName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover object-top"
        />
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-[#1C3E30] px-3 py-1.5 text-[11px] font-medium text-white shadow-sm">
          <CheckCircle2 className="h-3.5 w-3.5 fill-white text-[#1C3E30]" />
          <span>Verified Mentor</span>
        </div>
      </div>

      {/* Mentor Info */}
      <div className="mt-5">
        <h2 className="font-serif text-[28px] font-normal leading-tight text-[#0F1E17]">
          {mentorName}
        </h2>

        <div className="mt-2.5 space-y-1.5 text-xs text-[#55635D]">
          <div className="flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5 shrink-0 text-[#8C9B94]" />
            <span className="text-[13px] text-[#4A5C53]">{university}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#8C9B94]" />
            <span className="text-[13px] text-[#4A5C53]">{location}</span>
          </div>
        </div>

        {/* Rating & Sessions */}
        <div className="mt-3.5 flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1 text-[#E5A023]">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-[13px] font-bold text-[#0F1E17]">{mentor?.rating ?? 4.9}</span>
          </div>
          <span className="text-[12px] text-[#6D7D76]">({mentor?.sessionCount ?? 128} sessions)</span>
        </div>
      </div>

      {/* Selected Guidance Session Box */}
      <div className="mt-6 border-t border-[#F0F3F1] pt-5">
        <span className="text-[11px] font-semibold tracking-wider text-[#7C8D85] uppercase">
          Session
        </span>
        <div className="mt-2.5 rounded-xl border border-[#E7ECE8] bg-[#FAFBF9] p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white border border-[#E2E8E4] text-[#1C3E30]">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-[13px] font-semibold text-[#0F1E17]">
                {mentor?.headline || "University Application Guidance"}
              </h4>
              <p className="mt-1 text-[12px] leading-relaxed text-[#5F7068]">
                Get practical advice on choosing the right university, application process, scholarships and more.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="mt-5 rounded-xl border-l-[3px] border-[#1C3E30] bg-[#FAFBF9] p-4 text-[13px] italic leading-relaxed text-[#4A5D54]">
        &ldquo;{mentor?.bio || "I help Bangladeshi students understand what studying and living abroad is really like."}&rdquo;
      </div>

      {/* Meta 2x2 Grid */}
      <div className="mt-6 grid grid-cols-2 gap-y-5 gap-x-4 border-t border-[#F0F3F1] pt-5">
        <div className="flex items-start gap-2.5">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#8C9B94]" />
          <div>
            <p className="text-xs font-semibold text-[#0F1E17]">Response time</p>
            <p className="mt-0.5 text-[11px] text-[#73847C]">Within 12 hours</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-[#8C9B94]" />
          <div>
            <p className="text-xs font-semibold text-[#0F1E17]">Languages</p>
            <p className="mt-0.5 text-[11px] text-[#73847C]">English, Bengali</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#8C9B94]" />
          <div>
            <p className="text-xs font-semibold text-[#0F1E17]">Years abroad</p>
            <p className="mt-0.5 text-[11px] text-[#73847C]">5+ years</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-[#8C9B94]" />
          <div>
            <p className="text-xs font-semibold text-[#0F1E17]">Specialties</p>
            <p className="mt-0.5 text-[11px] leading-tight text-[#73847C]">
              University applications, Scholarships, Student life
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}