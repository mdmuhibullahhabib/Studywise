import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Video } from "lucide-react";
import { requireSession, assertOwnsResource } from "@/lib/permissions";
import { db } from "@/lib/db";
import { BookingStatusBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CancelBookingButton } from "@/components/booking/cancel-booking-button";

interface PageProps {
  params: Promise<{ bookingId: string }>;
}

export default async function MentorBookingDetailPage({ params }: PageProps) {
  const { bookingId } = await params;
  const session = await requireSession();

  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    include: { student: true, payment: true, meeting: { include: { recordings: true } } }
  });
  if (!booking) notFound();
  await assertOwnsResource(session, booking.mentorId);

  return (
    <div className="container-content max-w-2xl py-10 md:py-14">
      <Link href="/mentor/booked" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Bookings
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={booking.student.name} size="lg" />
          <div>
            <h1 className="text-h1">{booking.subject}</h1>
            <p className="mt-0.5 text-sm text-ink-500">with {booking.student.name}</p>
          </div>
        </div>
        <BookingStatusBadge status={booking.status} />
      </div>

      <dl className="card mt-6 grid grid-cols-2 gap-5 p-5 text-sm md:p-6">
        <div>
          <dt className="field-label flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> Date
          </dt>
          <dd className="mt-1.5 font-medium text-ink">{formatDate(booking.date)}</dd>
        </div>
        <div>
          <dt className="field-label flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> Time
          </dt>
          <dd className="mt-1.5 font-medium text-ink">
            {booking.startTime}–{booking.endTime}{" "}
            <span className="font-normal text-ink-300">({booking.timezone})</span>
          </dd>
        </div>
        <div>
          <dt className="field-label">You&apos;ll earn</dt>
          <dd className="mt-1.5 font-medium text-ink">{formatCurrency(Number(booking.price), booking.currency)}</dd>
        </div>
        {booking.payment && (
          <div>
            <dt className="field-label">Payment</dt>
            <dd className="mt-1.5 font-medium capitalize text-ink">{booking.payment.status.toLowerCase()}</dd>
          </div>
        )}
      </dl>

      {booking.meeting && booking.status === "CONFIRMED" && (
        <Link href={`/meetings/${booking.meeting.id}`} className="btn-primary mt-5 w-full sm:w-auto">
          <Video className="h-4 w-4" /> Join meeting
        </Link>
      )}

      {["PENDING", "CONFIRMED"].includes(booking.status) && (
        <div className="mt-6">
          <CancelBookingButton bookingId={booking.id} />
        </div>
      )}

      {booking.conversationId && (
        <Link
          href={`/mentor/messages/${booking.conversationId}`}
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-sage-text hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to conversation
        </Link>
      )}
    </div>
  );
}
