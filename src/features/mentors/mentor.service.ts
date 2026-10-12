import "server-only";
import { db } from "@/lib/db";
import type { MentorCardData } from "@/components/mentor/mentor-card";

export interface MentorSearchFilters {
  subject?: string;
  minRating?: number;
  q?: string;
}

function toCardData(profile: {
  id: string;
  userId: string;
  title: string | null;
  country: string | null;
  university: string | null;
  expertise: string[];
  ratingAverage: unknown;
  ratingCount: number;
  verified: boolean;
  hourlyRate: unknown;
  currency: string;
  user: { name: string; avatarUrl: string | null };
  _count?: { bookings: number };
}): MentorCardData {
  return {
    id: profile.userId, // public-facing mentor id is the user id, used consistently in booking/messaging routes
    name: profile.user.name,
    title: profile.title ?? "Mentor",
    avatarUrl: profile.user.avatarUrl,
    country: profile.country,
    university: profile.university,
    expertise: profile.expertise,
    ratingAverage: Number(profile.ratingAverage),
    ratingCount: profile.ratingCount,
    sessionCount: profile._count?.bookings,
    verified: profile.verified,
    hourlyRate: Number(profile.hourlyRate ?? 0),
    currency: profile.currency
  };
}

const CARD_INCLUDE = {
  user: { select: { name: true, avatarUrl: true } },
  _count: { select: { bookings: { where: { status: "COMPLETED" as const } } } }
};

export const MentorService = {
  /** Only mentors approved by an admin (isDiscoverable) are ever returned here. */
  async search(filters: MentorSearchFilters = {}): Promise<MentorCardData[]> {
    const profiles = await db.mentorProfile.findMany({
      where: {
        isDiscoverable: true,
        ...(filters.subject
          ? { OR: [{ expertise: { has: filters.subject } }, { subjects: { has: filters.subject } }] }
          : {}),
        ...(filters.minRating ? { ratingAverage: { gte: filters.minRating } } : {}),
        ...(filters.q ? { user: { name: { contains: filters.q, mode: "insensitive" } } } : {})
      },
      include: CARD_INCLUDE,
      orderBy: { ratingAverage: "desc" },
      take: 30
    });

    return profiles.map(toCardData);
  },

  async getByUserId(userId: string) {
    const profile = await db.mentorProfile.findUnique({
      where: { userId },
      include: {
        user: { select: { id: true, name: true, avatarUrl: true } },
        _count: { select: { bookings: { where: { status: "COMPLETED" } } } }
      }
    });
    if (!profile || !profile.isDiscoverable) return null;

    const reviews = await db.review.findMany({
      where: { mentorId: userId, status: "PUBLISHED" },
      include: { student: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 10
    });

    return { profile, reviews, sessionCount: profile._count.bookings };
  },

  async featured(limit = 4): Promise<MentorCardData[]> {
    const profiles = await db.mentorProfile.findMany({
      where: { isDiscoverable: true },
      include: CARD_INCLUDE,
      orderBy: { ratingAverage: "desc" },
      take: limit
    });
    return profiles.map(toCardData);
  }
};
