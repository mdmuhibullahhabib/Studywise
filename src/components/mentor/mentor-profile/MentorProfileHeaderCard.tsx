import Image from "next/image";
import Link from "next/link";
import { 
  Building2, 
  MapPin, 
  Star, 
  Clock, 
  Globe2, 
  CalendarDays, 
  GraduationCap, 
  CheckCircle2, 
  MessageSquare, 
  ArrowRight 
} from "lucide-react";
import { startConversationAction } from "@/features/messaging/start-conversation-action";
import { SubmitButton } from "@/components/ui/submit-button";

interface MentorProfileHeaderCardProps {
  mentorId: string;
  mentorProfileId?: string;
  name: string;
  title: string;
  avatarUrl?: string | null;
  university?: string | null;
  country?: string | null;
  bio?: string | null;
  ratingAverage: number;
  ratingCount: number;
  sessionCount?: number;
  verified: boolean;
  isStudent: boolean;
  isAuthenticated: boolean;
  hasResult: boolean;
}

export function MentorProfileHeaderCard({
  mentorId,
  mentorProfileId,
  name,
  title,
  avatarUrl,
  university,
  country,
  bio,
  ratingAverage,
  sessionCount = 128,
  verified,
  isStudent,
  isAuthenticated,
  hasResult,
}: MentorProfileHeaderCardProps) {
  const photo =
    avatarUrl ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="flex flex-col gap-6 rounded-[24px] border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_14px_rgba(0,0,0,0.02)] sm:p-7 md:flex-row md:items-start">
      {/* Mentor Portrait with Verified Tag */}
      <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-2xl bg-[#F4F6F5] md:w-64">
        <Image
          src={photo}
          alt={name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 260px"
          className="object-cover object-top"
        />
        {verified && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-[#1C3E30] px-3 py-1.5 text-[11px] font-medium text-white shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5 fill-white text-[#1C3E30]" />
            <span>Verified Mentor</span>
          </div>
        )}
      </div>

      {/* Main Info */}
      <div className="flex flex-1 flex-col justify-between self-stretch">
        <div>
          <h1 className="font-serif text-3xl font-normal tracking-tight text-[#0F1E17] sm:text-4xl">
            {name}
          </h1>

          <div className="mt-2 text-xs text-[#52645B] sm:text-sm">
            <p className="font-medium text-[#1B2B23]">
              {title} • {university || "University of Manchester"}
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[#71827A]">
              <MapPin className="h-3.5 w-3.5 text-[#8D9E96]" />
              <span>{country || "Manchester, United Kingdom"}</span>
            </p>
          </div>

          <p className="mt-4 text-xs italic leading-relaxed text-[#4A5D54] sm:text-[13px]">
            &ldquo;{bio || "I help Bangladeshi students understand what studying and living in the UK is really like."}&rdquo;
          </p>

          {/* Rating */}
          <div className="mt-4 flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1 text-[#E5A023]">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span className="font-bold text-[#0F1E17]">{ratingAverage.toFixed(1)}</span>
            </div>
            <span className="text-[#6D7D76]">({sessionCount} sessions)</span>
          </div>

          {/* Meta 4-Item Grid */}
          <div className="mt-6 grid grid-cols-2 gap-y-4 gap-x-6 border-t border-[#F0F3F1] pt-5 text-xs text-[#52645B] sm:grid-cols-4">
            <div>
              <p className="flex items-center gap-1.5 font-medium text-[#0F1E17]">
                <Clock className="h-3.5 w-3.5 text-[#8C9B94]" />
                <span>Response time</span>
              </p>
              <p className="mt-1 text-[11px] text-[#73847C]">Within 12 hours</p>
            </div>

            <div>
              <p className="flex items-center gap-1.5 font-medium text-[#0F1E17]">
                <Globe2 className="h-3.5 w-3.5 text-[#8C9B94]" />
                <span>Languages</span>
              </p>
              <p className="mt-1 text-[11px] text-[#73847C]">English, Bangla</p>
            </div>

            <div>
              <p className="flex items-center gap-1.5 font-medium text-[#0F1E17]">
                <CalendarDays className="h-3.5 w-3.5 text-[#8C9B94]" />
                <span>Years abroad</span>
              </p>
              <p className="mt-1 text-[11px] text-[#73847C]">4+ years</p>
            </div>

            <div>
              <p className="flex items-center gap-1.5 font-medium text-[#0F1E17]">
                <GraduationCap className="h-3.5 w-3.5 text-[#8C9B94]" />
                <span>Specialties</span>
              </p>
              <p className="mt-1 truncate text-[11px] text-[#73847C]">
                Data Science, Analytics, Machine Learning
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#F0F3F1] pt-5">
          <Link
            href={`/student/book/${mentorId}`}
            className="flex items-center gap-2 rounded-full bg-[#1C3E30] px-6 py-2.5 text-xs font-medium text-white shadow-2xs transition-all hover:bg-[#142e23]"
          >
            <span>Book a Session</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          {hasResult && isStudent && mentorProfileId ? (
            <form action={startConversationAction.bind(null, mentorProfileId)}>
              <SubmitButton
                variant="secondary"
                pendingLabel="Opening…"
                className="rounded-full border border-[#DCE4E0] bg-white px-5 py-2.5 text-xs font-medium text-[#2E4037] shadow-2xs hover:bg-[#FAFBF9]"
              >
                <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                Message Mentor
              </SubmitButton>
            </form>
          ) : (
            <Link
              href={isAuthenticated ? "#" : `/auth/login?callbackUrl=/mentors/${mentorId}`}
              className="flex items-center gap-1.5 rounded-full border border-[#DCE4E0] bg-white px-5 py-2.5 text-xs font-medium text-[#2E4037] shadow-2xs hover:bg-[#FAFBF9]"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Message Mentor</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}