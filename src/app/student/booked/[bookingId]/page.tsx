import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, CheckCircle2, Clock, Video, PlayCircle, Loader2 } from "lucide-react";
import { requireSession, assertOwnsResource } from "@/lib/permissions";
import { db } from "@/lib/db";
import { BookingStatusBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CancelBookingButton } from "@/components/booking/cancel-booking-button";
import { ReviewForm } from "@/components/booking/review-form";

interface PageProps {
  params: Promise<{ bookingId: string }>;
  searchParams: Promise<{ confirmed?: string; payment?: string }>;
}

export default async function StudentBookingDetailPage({ params, searchParams }: PageProps) {
  const { bookingId } = await params;
  const { confirmed, payment } = await searchParams;
  const session = await requireSession();

  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    include: { mentor: true, payment: true, meeting: { include: { recordings: true } }, review: true }
  });
  if (!booking) notFound();
  await assertOwnsResource(session, booking.studentId);

  const canJoin = booking.meeting && booking.status === "CONFIRMED" && booking.meeting.status !== "ENDED";
  const readyRecording = booking.meeting?.recordings?.find((r) => r.status === "READY");
  const processingRecording = booking.meeting?.recordings?.find((r) => r.status === "PROCESSING");

  return (
    <div className="container-content max-w-2xl py-10 md:py-14">
      <Link href="/student/booked" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Booked sessions
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={booking.mentor.name} size="lg" />
          <div>
            <h1 className="text-h1">{booking.subject}</h1>
            <p className="mt-0.5 text-sm text-ink-500">with {booking.mentor.name}</p>
          </div>
        </div>
        <BookingStatusBadge status={booking.status} />
      </div>

      {confirmed === "1" && (
        <div className="card mt-5 flex items-center gap-3 border-sage/30 bg-sage-soft/50 p-4">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-sage-text" />
          <p className="text-sm text-ink">
            {booking.status === "CONFIRMED" ? "Your session is booked and confirmed." : "Your booking request has been sent."}
          </p>
        </div>
      )}
      {payment === "success" && (
        <div className="card mt-5 flex items-center gap-3 border-sage/30 bg-sage-soft/50 p-4">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-sage-text" />
          <p className="text-sm text-ink">Payment received — your session is confirmed.</p>
        </div>
      )}
      {payment === "cancelled" && (
        <div className="card mt-5 flex items-center gap-3 border-danger/25 bg-danger-soft/60 p-4">
          <p className="text-sm text-ink">Payment was cancelled. This booking is not yet confirmed.</p>
        </div>
      )}

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
          <dt className="field-label">Price</dt>
          <dd className="mt-1.5 font-medium text-ink">{formatCurrency(Number(booking.price), booking.currency)}</dd>
        </div>
        {booking.payment && (
          <div>
            <dt className="field-label">Payment</dt>
            <dd className="mt-1.5 font-medium capitalize text-ink">{booking.payment.status.toLowerCase()}</dd>
          </div>
        )}
      </dl>

      {canJoin && (
        <Link href={`/meetings/${booking.meeting!.id}`} className="btn-primary mt-5 w-full sm:w-auto">
          <Video className="h-4 w-4" /> Join meeting
        </Link>
      )}

      {readyRecording && (
        <div className="card mt-5 flex flex-wrap items-center justify-between gap-3 p-5">
          <div>
            <p className="text-sm font-semibold text-ink">Recording available</p>
            <p className="mt-0.5 text-meta text-ink-500">Watch back anytime from this booking.</p>
          </div>
          <a href={`/api/recordings/${readyRecording.id}`} className="btn-secondary !px-4 !py-2 text-xs">
            <PlayCircle className="h-3.5 w-3.5" /> Watch recording
          </a>
        </div>
      )}
      {processingRecording && (
        <div className="card mt-5 flex items-center gap-3 p-5">
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-ink-300" />
          <div>
            <p className="text-sm font-semibold text-ink">Recording is processing</p>
            <p className="mt-0.5 text-meta text-ink-500">Check back shortly — this usually takes a few minutes.</p>
          </div>
        </div>
      )}

      {booking.status === "COMPLETED" && !booking.review && (
        <div className="mt-5">
          <ReviewForm bookingId={booking.id} mentorName={booking.mentor.name} />
        </div>
      )}

      {["PENDING", "CONFIRMED"].includes(booking.status) && (
        <div className="mt-6">
          <CancelBookingButton bookingId={booking.id} />
        </div>
      )}

      {booking.conversationId && (
        <Link
          href={`/student/messages/${booking.conversationId}`}
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-sage-text hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to conversation
        </Link>
      )}
    </div>
  );
}
