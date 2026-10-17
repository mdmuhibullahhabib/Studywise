import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, MapPin, Building2, Video, MessageSquare, ArrowRight, CalendarCheck } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface UpcomingSessionCardProps {
  session: {
    id: string;
    subject: string;
    date: Date | string;
    startTime: string;
    endTime: string;
    duration?: number;
    timezone?: string;
    status: string;
    student: {
      id: string;
      name: string;
      avatarUrl?: string | null;
      image?: string | null;
      email?: string;
      studentProfile?: {
        institution?: string | null;
        educationLevel?: string | null;
      } | null;
    };
  } | null;
}

export function UpcomingSessionCard({ session }: UpcomingSessionCardProps) {
  const isConfirmed = session?.status === "CONFIRMED";
  const studentPhoto =
    session?.student?.image ||
    session?.student?.avatarUrl ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";

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
          className="flex items-center gap-1 text-xs font-semibold text-[#1C3E30] transition-colors hover:text-[#36887F] hover:underline"
        >
          <span>View all bookings</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-2 rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_14px_rgba(0,0,0,0.02)]">
        {session ? (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {/* Student Cover / Avatar */}
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-[#F2F5F3] sm:w-44">
                <Image
                  src={studentPhoto}
                  alt={session.student?.name || "Student"}
                  fill
                  className="object-cover"
                />
                <span
                  className={`absolute top-2 left-2 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide ${
                    isConfirmed
                      ? "bg-[#1C3E30] text-white"
                      : "bg-[#B8862E] text-white"
                  }`}
                >
                  {isConfirmed ? "Confirmed" : "Pending Confirmation"}
                </span>
              </div>

              {/* Session Information */}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-serif text-lg font-semibold text-[#0F1E17]">
                    {session.student?.name || "Student Applicant"}
                  </h3>
                  {session.student?.studentProfile?.educationLevel && (
                    <span className="rounded-md bg-[#F2F6F4] px-2 py-0.5 text-[11px] font-medium text-[#36887F]">
                      {session.student.studentProfile.educationLevel}
                    </span>
                  )}
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#6F8178]">
                  {session.student?.studentProfile?.institution ? (
                    <p className="flex items-center gap-1">
                      <Building2 className="h-3 w-3 text-[#8D9E95]" />
                      <span>{session.student.studentProfile.institution}</span>
                    </p>
                  ) : (
                    <p className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-[#8D9E95]" />
                      <span>Study-Abroad Applicant</span>
                    </p>
                  )}
                </div>

                <h4 className="mt-2.5 text-sm font-semibold text-[#0F1E17]">
                  {session.subject || "1-on-1 Mentorship Session"}
                </h4>
                <p className="mt-0.5 line-clamp-1 max-w-lg text-xs text-[#63746C]">
                  Personalized consultation covering admissions strategy, university selection, SOP feedback, and visa requirements.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#4F6158]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-[#36887F]" />
                    <span>{formatDate(session.date)}</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="h-3.5 w-3.5 text-[#36887F]" />
                    <span>
                      {session.startTime} - {session.endTime} ({session.duration || 60} min)
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row lg:flex-col">
              <Link
                href={`/mentor/booked/${session.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1C3E30] px-6 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#36887F]"
              >
                <Video className="h-3.5 w-3.5" />
                <span>Join / View Session</span>
              </Link>
              <Link
                href="/mentor/messages"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#DCE4E0] bg-white px-6 py-2.5 text-xs font-medium text-[#2C3F35] shadow-2xs transition-colors hover:bg-[#FAFBF9]"
              >
                <MessageSquare className="h-3.5 w-3.5 text-[#36887F]" />
                <span>Message Student</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0F5F2] text-[#1C3E30]">
              <CalendarCheck className="h-6 w-6 text-[#36887F]" />
            </div>
            <h3 className="mt-3.5 font-serif text-lg font-semibold text-[#0F1E17]">
              No upcoming sessions on your schedule
            </h3>
            <p className="mt-1 max-w-md text-xs leading-relaxed text-[#687971]">
              Students can book available slots from your calendar. Keep your weekly availability up to date so students can find convenient consultation times.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Link
                href="/mentor/settings"
                className="inline-flex items-center gap-2 rounded-full bg-[#1C3E30] px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#36887F]"
              >
                <span>Manage Availability</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/mentor/booked?tab=completed"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#D5DED9] bg-white px-4 py-2.5 text-xs font-medium text-[#2A3F34] transition-colors hover:bg-[#F2F6F4]"
              >
                <span>Past Sessions</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}