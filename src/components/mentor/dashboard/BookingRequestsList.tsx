import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BookingRequestsListProps {
  requests: any[];
}

export function BookingRequestsList({ requests }: BookingRequestsListProps) {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#1C3E30]" />
          <h2 className="font-serif text-lg font-normal text-[#0F1E17]">
            Booking Requests
          </h2>
        </div>
        <Link
          href="/mentor/booked?tab=upcoming"
          className="flex items-center gap-1 text-xs font-semibold text-[#1C3E30] hover:underline"
        >
          <span>View all</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-2 space-y-3">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request.id}
              className="flex flex-col gap-4 rounded-2xl border border-[#E7ECE8] bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.01)] sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#E4ECE7]">
                  <Image
                    src={
                      request.student?.image ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                    }
                    alt={request.student?.name || "Student"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#0F1E17] sm:text-sm">
                    {request.student?.name}
                  </h4>
                  <p className="flex items-center gap-1 text-[11px] text-[#76867F]">
                    <MapPin className="h-3 w-3" />
                    <span>Dhaka, Bangladesh</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-left text-xs">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#8A9B93]">Goal</p>
                  <p className="font-medium text-[#1E2E27] mt-0.5 truncate max-w-[120px]">
                    {request.subject || "University Prep"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#8A9B93]">Requested Time</p>
                  <p className="font-medium text-[#1E2E27] mt-0.5">
                    {formatDate(request.date)} · {request.startTime}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#8A9B93]">Duration</p>
                  <p className="font-medium text-[#1E2E27] mt-0.5">
                    {request.durationMinutes || 60} min
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <Link
                  href={`/mentor/booked?action=accept&id=${request.id}`}
                  className="rounded-full bg-[#1C3E30] px-5 py-2 text-xs font-medium text-white shadow-2xs hover:bg-[#142e23]"
                >
                  Accept
                </Link>
                <Link
                  href={`/mentor/booked?action=decline&id=${request.id}`}
                  className="rounded-full border border-[#DCE4E0] bg-white px-4 py-2 text-xs font-medium text-[#62736B] hover:bg-[#F7FAF8]"
                >
                  Decline
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-[#E7ECE8] bg-white p-6 text-center text-xs text-[#6A7B73]">
            No pending booking requests right now.
          </div>
        )}
      </div>
    </section>
  );
}