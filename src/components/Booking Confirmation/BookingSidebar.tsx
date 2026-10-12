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

export function BookingSidebar() {
  return (
    <aside className="w-full rounded-2xl border border-[#E7ECE8] bg-white p-5 shadow-[0_2px_14px_rgba(0,0,0,0.02)]">
      {/* Mentor Image Card with Verified Badge */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#F4F6F5]">
        <Image
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
          alt="Arif Rahman"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 30vw"
          className="object-cover object-top"
        />
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 rounded-full bg-[#1C3E30] px-2.5 py-1 text-[11px] font-medium text-white shadow-sm">
          <CheckCircle2 className="h-3.5 w-3.5 fill-white text-[#1C3E30]" />
          <span>Verified Mentor</span>
        </div>
      </div>

      {/* Mentor Identity */}
      <div className="mt-4">
        <h2 className="font-serif text-2xl font-normal text-[#0F1E17]">
          Arif Rahman
        </h2>

        <div className="mt-2 space-y-1.5 text-xs text-[#55635D]">
          <div className="flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 shrink-0 text-[#8C9B94]" />
            <span>University of Manchester</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#8C9B94]" />
            <span>Manchester, United Kingdom</span>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <div className="flex items-center gap-1 text-[#E5A023]">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="font-bold text-[#0F1E17]">4.9</span>
          </div>
          <span className="text-[#6D7D76]">(128 sessions)</span>
        </div>
      </div>

      {/* Selected Session Guidance Box */}
      <div className="mt-6 border-t border-[#F0F3F1] pt-5">
        <span className="text-[11px] font-medium tracking-wide text-[#7C8D85] uppercase">
          Session
        </span>
        <div className="mt-2 rounded-xl border border-[#E7ECE8] bg-[#FAFBF9] p-3.5">
          <div className="flex items-start gap-2.5">
            <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-[#1C3E30]" />
            <div>
              <h4 className="text-xs font-semibold text-[#0F1E17]">
                University Application Guidance
              </h4>
              <p className="mt-1 text-[11px] leading-relaxed text-[#5F7068]">
                Get practical advice on choosing the right university, application process, scholarships and more.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mentor Quote */}
      <div className="mt-5 rounded-xl border-l-2 border-[#1C3E30] bg-[#FAFBF9] p-3.5 text-xs italic leading-relaxed text-[#4A5D54]">
        &ldquo;I help Bangladeshi students understand what studying and living in the UK is really like.&rdquo;
      </div>

      {/* Meta Grid Information */}
      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#F0F3F1] pt-5 text-xs text-[#52645B]">
        {/* Response Time */}
        <div className="flex items-start gap-2">
          <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8C9B94]" />
          <div>
            <p className="font-medium text-[#0F1E17]">Response time</p>
            <p className="text-[11px] text-[#73847C]">Within 12 hours</p>
          </div>
        </div>

        {/* Languages */}
        <div className="flex items-start gap-2">
          <Globe2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8C9B94]" />
          <div>
            <p className="font-medium text-[#0F1E17]">Languages</p>
            <p className="text-[11px] text-[#73847C]">English, Bengali</p>
          </div>
        </div>

        {/* Years Abroad */}
        <div className="flex items-start gap-2">
          <CalendarDays className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8C9B94]" />
          <div>
            <p className="font-medium text-[#0F1E17]">Years abroad</p>
            <p className="text-[11px] text-[#73847C]">5+ years</p>
          </div>
        </div>

        {/* Specialties */}
        <div className="flex items-start gap-2">
          <GraduationCap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8C9B94]" />
          <div>
            <p className="font-medium text-[#0F1E17]">Specialties</p>
            <p className="text-[11px] leading-tight text-[#73847C]">
              University applications, Scholarships, Student life
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}