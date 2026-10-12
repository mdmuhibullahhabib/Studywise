import Link from "next/link";
import { Video } from "lucide-react";
import { BookingStatusBadge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export interface BookingCardData {
  id: string;
  subject: string;
  counterpartName: string;
  date: Date;
  startTime: string;
  duration: number;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
  meetingId?: string | null;
}

export function BookingCard({ booking, detailBasePath }: { booking: BookingCardData; detailBasePath: string }) {
  const isUpcoming = booking.status === "PENDING" || booking.status === "CONFIRMED";

  return (
    <div className={`card flex flex-wrap items-center justify-between gap-3 p-4 ${isUpcoming ? "border-sage/25" : ""}`}>
      <div>
        <div className="flex items-center gap-2">
          <p className="font-display font-semibold text-ink">{booking.subject}</p>
          <BookingStatusBadge status={booking.status} />
        </div>
        <p className="mt-0.5 text-sm text-ink-500">
          {booking.counterpartName} · {formatDate(booking.date)} at {booking.startTime} · {booking.duration} min
        </p>
      </div>
      <div className="flex gap-2">
        {booking.status === "CONFIRMED" && booking.meetingId && (
          <Link href={`/meetings/${booking.meetingId}`} className="btn-primary !px-3 !py-1.5 text-xs">
            <Video className="h-3.5 w-3.5" /> Join meeting
          </Link>
        )}
        <Link href={`${detailBasePath}/${booking.id}`} className="btn-secondary !px-3 !py-1.5 text-xs">
          View details
        </Link>
      </div>
    </div>
  );
}
