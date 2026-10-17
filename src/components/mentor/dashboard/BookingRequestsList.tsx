import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Building2, Clock, Check, ArrowRight, UserCheck } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";

interface BookingRequestItem {
  id: string;
  subject: string;
  date: Date | string;
  startTime: string;
  endTime: string;
  duration?: number;
  price?: unknown;
  currency?: string;
  student: {
    id: string;
    name: string;
    image?: string | null;
    avatarUrl?: string | null;
    studentProfile?: {
      institution?: string | null;
      educationLevel?: string | null;
    } | null;
  };
}

interface BookingRequestsListProps {
  requests: BookingRequestItem[];
}

export function BookingRequestsList({ requests }: BookingRequestsListProps) {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2.5">
          <Calendar className="h-4 w-4 text-[#1C3E30]" />
          <h2 className="font-serif text-lg font-normal text-[#0F1E17]">
            Pending Booking Requests
          </h2>
          {requests.length > 0 && (
            <span className="rounded-full bg-[#EBF4F0] px-2.5 py-0.5 text-[10px] font-bold text-[#1C3E30]">
              {requests.length} awaiting response
            </span>
          )}
        </div>
        <Link
          href="/mentor/booked?tab=upcoming"
          className="flex items-center gap-1 text-xs font-semibold text-[#1C3E30] transition-colors hover:text-[#36887F] hover:underline"
        >
          <span>View all bookings</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-2 space-y-3">
        {requests.length > 0 ? (
          requests.map((request) => {
            const photoUrl =
              request.student?.image ||
              request.student?.avatarUrl ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

            return (
              <div
                key={request.id}
                className="group flex flex-col gap-4 rounded-2xl border border-[#E7ECE8] bg-white p-4.5 shadow-[0_2px_10px_rgba(0,0,0,0.01)] transition-all duration-200 hover:border-[#36887F]/30 hover:shadow-[0_6px_18px_rgba(0,0,0,0.03)] sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Student Info */}
                <div className="flex items-center gap-3.5 min-w-[200px]">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#E4ECE7] bg-[#F2F6F4]">
                    <Image
                      src={photoUrl}
                      alt={request.student?.name || "Student"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#0F1E17] group-hover:text-[#36887F] sm:text-sm">
                      {request.student?.name}
                    </h4>
                    <p className="flex items-center gap-1 text-[11px] text-[#76867F] mt-0.5">
                      {request.student?.studentProfile?.institution ? (
                        <>
                          <Building2 className="h-3 w-3 text-[#8D9E95]" />
                          <span className="truncate max-w-[140px]">
                            {request.student.studentProfile.institution}
                          </span>
                        </>
                      ) : (
                        <>
                          <MapPin className="h-3 w-3 text-[#8D9E95]" />
                          <span>Applicant</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Session Details */}
                <div className="grid grid-cols-3 gap-4 text-left text-xs">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A9B93]">Topic</p>
                    <p className="font-medium text-[#1E2E27] mt-0.5 truncate max-w-[130px]">
                      {request.subject || "Application Guidance"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A9B93]">Date & Time</p>
                    <p className="font-medium text-[#1E2E27] mt-0.5">
                      {formatDate(request.date, { month: "short", day: "numeric" })} · {request.startTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8A9B93]">Session Fee</p>
                    <p className="font-medium text-[#1C3E30] mt-0.5">
                      {formatCurrency(Number(request.price ?? 45), request.currency || "USD")}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <Link
                    href={`/mentor/booked/${request.id}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1C3E30] px-4 py-2 text-xs font-semibold text-white shadow-2xs transition-all hover:bg-[#36887F]"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>Review & Accept</span>
                  </Link>
                  <Link
                    href={`/mentor/booked/${request.id}`}
                    className="rounded-full border border-[#DCE4E0] bg-white px-3.5 py-2 text-xs font-medium text-[#62736B] transition-colors hover:bg-[#F7FAF8]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E7ECE8] bg-white p-8 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F5F2] text-[#1C3E30]">
              <UserCheck className="h-5 w-5 text-[#36887F]" />
            </div>
            <p className="mt-3 text-xs font-semibold text-[#0F1E17]">
              No pending booking requests
            </p>
            <p className="mt-1 text-[11px] text-[#7A8A82]">
              You&apos;re all caught up! New student consultation requests will appear here for your review and confirmation.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}