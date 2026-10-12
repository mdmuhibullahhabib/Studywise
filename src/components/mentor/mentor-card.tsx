import Link from "next/link";
import { BadgeCheck, Star, MapPin } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
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


export function MentorCard({ mentor }: { mentor: MentorCardData }) {
  return (
    <div className="card-interactive flex flex-col gap-4 p-5">
      <Link href={`/mentors/${mentor.id}`} className="flex items-start gap-3">
        <Avatar name={mentor.name} src={mentor.avatarUrl} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate font-display text-[15px] font-semibold text-ink">{mentor.name}</p>
            {mentor.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-gold" aria-label="Verified mentor" />}
          </div>
          <p className="truncate text-meta text-ink-500">{mentor.title}</p>
          {(mentor.university || mentor.country) && (
            <p className="mt-0.5 flex items-center gap-1 truncate text-meta text-sky-text">
              <MapPin className="h-3 w-3 shrink-0" />
              {[mentor.university, mentor.country].filter(Boolean).join(", ")}
            </p>
          )}
        </div>
      </Link>

      <Link href={`/mentors/${mentor.id}`} className="flex flex-wrap gap-1.5">
        {mentor.expertise.slice(0, 3).map((item) => (
          <span key={item} className="rounded-sm bg-paper-muted px-2 py-1 text-xs font-medium text-ink-500">
            {item}
          </span>
        ))}
      </Link>

      <Link href={`/mentors/${mentor.id}`} className="flex items-center justify-between border-t border-line pt-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1 text-sm text-ink-500">
            <Star className={mentor.ratingCount > 0 ? "h-4 w-4 fill-gold text-gold" : "h-4 w-4 text-ink-300"} />
            <span className="font-semibold text-ink">{mentor.ratingAverage.toFixed(1)}</span>
            <span className="text-meta">({mentor.ratingCount})</span>
          </div>
          {typeof mentor.sessionCount === "number" && (
            <p className="text-meta text-ink-300">{mentor.sessionCount} sessions completed</p>
          )}
        </div>
        <p className="text-sm font-semibold text-ink">
          {formatCurrency(mentor.hourlyRate, mentor.currency)}
          <span className="font-normal text-ink-300">/hr</span>
        </p>
      </Link>

      {/* Explicit, discrete CTAs — siblings of the profile-navigation links
          above, not nested inside them (nested <a> tags are invalid HTML). */}
      <div className="flex gap-2">
        <Link href={`/mentors/${mentor.id}`} className="btn-secondary flex-1 !py-2 text-xs">
          View Profile
        </Link>
        <Link href={`/mentors/${mentor.id}`} className="btn-primary flex-1 !py-2 text-xs">
          Book
        </Link>
      </div>
    </div>
  );
}
