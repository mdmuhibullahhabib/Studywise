import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, MapPin, Video, MessageSquare, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface UpcomingSessionCardProps {
  session: any | null;
}

export function UpcomingSessionCard({ session }: UpcomingSessionCardProps) {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#1C3E30]" />
          <h2 className="font-serif text-lg font-normal text-[#0F1E17]">
            Upcoming Session
          </h2>
        </div>
        <Link
          href="/mentor/booked"
          className="flex items-center gap-1 text-xs font-semibold text-[#1C3E30] hover:underline"
        >
          <span>View all</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-2 rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_14px_rgba(0,0,0,0.02)]">
        {session ? (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl sm:w-44 bg-[#F2F5F3]">
                <Image
                  src={
                    session.student?.image ||
                    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
                  }
                  alt={session.student?.name || "Student"}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 rounded-full bg-[#1C3E30] px-2.5 py-0.5 text-[10px] font-medium text-white">
                  Upcoming
                </span>
              </div>

              <div>
                <h3 className="font-serif text-lg font-semibold text-[#0F1E17]">
                  {session.student?.name || "Rahim Ahmed"}
                </h3>
                <p className="flex items-center gap-1 text-xs text-[#6F8178] mt-0.5">
                  <MapPin className="h-3 w-3 text-[#8D9E95]" />
                  <span>Dhaka, Bangladesh</span>
                </p>

                <h4 className="mt-2.5 text-sm font-semibold text-[#0F1E17]">
                  {session.subject || "University Application Guidance"}
                </h4>
                <p className="text-xs text-[#63746C] line-clamp-1 max-w-lg mt-0.5">
                  Help with university selection, application process, statement of purpose and scholarships.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#4F6158]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[#8D9E95]" />
                    <span>{formatDate(session.date)}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#8D9E95]" />
                    <span>
                      {session.startTime} - {session.endTime} (60 min)
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col shrink-0">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1C3E30] px-6 py-2.5 text-xs font-medium text-white shadow-sm hover:bg-[#142e23] transition-all"
              >
                <Video className="h-3.5 w-3.5" />
                <span>Join Meeting</span>
              </button>
              <Link
                href="/mentor/messages"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#DCE4E0] bg-white px-6 py-2.5 text-xs font-medium text-[#2C3F35] shadow-2xs hover:bg-[#FAFBF9]"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Message Student</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-[#6A7B73]">
            No upcoming sessions scheduled.
          </div>
        )}
      </div>
    </section>
  );
}