import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { flagFor } from "@/lib/country-flag";
import type { MentorCardData } from "./mentor-card";

/**
 * Falls back to a seeded placeholder photo (Lorem Picsum) when a mentor
 * hasn't set a real avatarUrl, so rails still read as a photo-led
 * marketplace rather than a wall of initials. Swap for real profile
 * photos as mentors add them via settings.
 */
function photoFor(mentor: MentorCardData) {
  return mentor.avatarUrl ?? `https://picsum.photos/seed/studywise-mentor-${mentor.id}/400/500`;
}

export function MentorRailCard({ mentor }: { mentor: MentorCardData }) {
  const topRated = mentor.ratingAverage >= 4.7 && mentor.ratingCount >= 5;

  return (
    <Link
      href={`/mentors/${mentor.id}`}
      className="group w-[190px] shrink-0 snap-start overflow-hidden rounded-md border border-line bg-white transition-shadow duration-150 hover:shadow-raised"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-muted">
        <Image
          src={photoFor(mentor)}
          alt=""
          fill
          sizes="190px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {topRated && (
          <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-ink shadow-card">
            Top rated
          </span>
        )}
        {mentor.verified && (
          <span className="absolute right-2 top-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-semibold text-white shadow-card">
            Verified
          </span>
        )}
      </div>

      <div className="p-3">
        <p className="truncate text-sm font-semibold text-ink">
          {mentor.name} <span aria-hidden="true">{flagFor(mentor.country)}</span>
        </p>
        <div className="mt-0.5 flex items-center gap-1 text-meta text-ink-500">
          <Star className={mentor.ratingCount > 0 ? "h-3 w-3 fill-gold text-gold" : "h-3 w-3 text-ink-300"} />
          <span className="font-semibold text-ink">{mentor.ratingAverage.toFixed(1)}</span>
        </div>
        <p className="mt-1 truncate text-meta text-ink-500">{mentor.title}</p>
        {mentor.university && <p className="truncate text-meta text-sky-text">{mentor.university}</p>}
        {typeof mentor.sessionCount === "number" && (
          <p className="mt-1 text-meta text-ink-300">{mentor.sessionCount} sessions</p>
        )}
      </div>
    </Link>
  );
}
