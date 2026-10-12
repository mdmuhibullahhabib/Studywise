import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { BookingCard } from "@/components/booking/booking-card";

export const metadata = { title: "Bookings" };

interface PageProps {
  searchParams: Promise<{ tab?: "today" | "upcoming" | "completed" | "cancelled" }>;
}

const TABS = ["today", "upcoming", "completed", "cancelled"] as const;

export default async function MentorBookedPage({ searchParams }: PageProps) {
  const session = await requireRole(["MENTOR", "ADMIN"]);
  const { tab = "today" } = await searchParams;

  const startOfToday = new Date(new Date().setHours(0, 0, 0, 0));
  const endOfToday = new Date(new Date().setHours(23, 59, 59, 999));

  const where =
    tab === "today"
      ? { mentorId: session.user.id, date: { gte: startOfToday, lte: endOfToday }, status: { in: ["CONFIRMED", "PENDING"] as const } }
      : tab === "upcoming"
        ? { mentorId: session.user.id, status: { in: ["PENDING", "CONFIRMED"] as const }, date: { gt: endOfToday } }
        : tab === "completed"
          ? { mentorId: session.user.id, status: "COMPLETED" as const }
          : { mentorId: session.user.id, status: { in: ["CANCELLED", "NO_SHOW"] as const } };

  const bookings = await db.booking.findMany({
    where,
    include: { student: true, meeting: true },
    orderBy: { date: "asc" }
  });

  return (
    <div className="max-w-3xl">
      <h1 className="text-h1">Bookings</h1>

      <div className="mt-4 flex gap-1 border-b border-line">
        {TABS.map((t) => (
          <a
            key={t}
            href={`/mentor/booked?tab=${t}`}
            className={t === tab ? "tab-link-active capitalize" : "tab-link capitalize"}
          >
            {t}
          </a>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {bookings.length === 0 ? (
          <div className="card p-10 text-center text-sm text-ink-500">No {tab} sessions yet.</div>
        ) : (
          bookings.map((b) => (
            <BookingCard
              key={b.id}
              detailBasePath="/mentor/booked"
              booking={{
                id: b.id,
                subject: b.subject,
                counterpartName: b.student.name,
                date: b.date,
                startTime: b.startTime,
                duration: b.duration,
                status: b.status,
                meetingId: b.meeting?.id
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
