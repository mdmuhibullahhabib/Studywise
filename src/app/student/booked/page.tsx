
import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { BookingCard } from "@/components/booking/booking-card";
import { Prisma } from "@prisma/client";

export const metadata = { title: "Booked sessions" };

interface PageProps {
  searchParams: Promise<{
    tab?: "upcoming" | "completed" | "cancelled";
  }>;
}

const TABS = ["upcoming", "completed", "cancelled"] as const;

export default async function StudentBookedPage({
  searchParams,
}: PageProps) {
  const session = await requireRole(["STUDENT", "ADMIN"]);
  const { tab = "upcoming" } = await searchParams;

  const statusFilter: Prisma.EnumBookingStatusFilter<"Booking"> =
    tab === "upcoming"
      ? { in: ["PENDING", "CONFIRMED"] }
      : tab === "completed"
        ? { in: ["COMPLETED"] }
        : { in: ["CANCELLED", "NO_SHOW"] };

  const bookings = await db.booking.findMany({
    where: {
      studentId: session.user.id,
      status: statusFilter,
    },
    include: {
      mentor: true,
      meeting: true,
    },
    orderBy: {
      date: tab === "upcoming" ? "asc" : "desc",
    },
  });

  return (
    <div className="max-w-3xl">
      <h1 className="text-h1">Booked sessions</h1>

      <div className="mt-4 flex gap-1 border-b border-line">
        {TABS.map((t) => (
          <a
            key={t}
            href={`/student/booked?tab=${t}`}
            className={
              t === tab
                ? "tab-link-active capitalize"
                : "tab-link capitalize"
            }
          >
            {t}
          </a>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {bookings.length === 0 ? (
          <div className="card p-10 text-center text-sm text-ink-500">
            No {tab} sessions yet.
          </div>
        ) : (
          bookings.map((b) => (
            <BookingCard
              key={b.id}
              detailBasePath="/student/booked"
              booking={{
                id: b.id,
                subject: b.subject,
                counterpartName: b.mentor.name,
                date: b.date,
                startTime: b.startTime,
                duration: b.duration,
                status: b.status,
                meetingId: b.meeting?.id,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
