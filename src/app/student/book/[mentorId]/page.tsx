// import { notFound } from "next/navigation";
// import { db } from "@/lib/db";
// import { AvailabilityService } from "@/features/booking/availability.service";
// import { BookSessionForm } from "@/components/booking/book-session-form";

// interface PageProps {
//   params: Promise<{ mentorId: string }>;
// }

// export default async function BookSessionPage({ params }: PageProps) {
//   const { mentorId } = await params;

//   const mentorProfile = await db.mentorProfile.findUnique({
//     where: { userId: mentorId },
//     include: { user: true }
//   });
//   if (!mentorProfile) notFound();

//   const from = new Date();
//   const to = new Date();
//   to.setDate(to.getDate() + 14);
//   const durationMinutes = 60;

//   const slots = await AvailabilityService.getAvailableSlots(mentorProfile.id, from, to, durationMinutes);

//   return (
//     <div className="container-content max-w-2xl py-14">
//       <h1 className="text-h1">Book a session with {mentorProfile.user.name}</h1>
//       <p className="mt-1 text-sm text-ink-500">
//         {slots.length === 0
//           ? "This mentor has no availability configured yet."
//           : `${slots.length} time slot${slots.length === 1 ? "" : "s"} open over the next two weeks.`}
//       </p>

//       {slots.length === 0 ? (
//         <div className="card mt-6 p-8 text-center text-sm text-ink-500">
//           Try messaging the mentor directly to arrange a time.
//         </div>
//       ) : (
//         <BookSessionForm
//           mentorProfileId={mentorProfile.id}
//           mentorHourlyRate={Number(mentorProfile.hourlyRate ?? 0)}
//           currency={mentorProfile.currency}
//           slots={slots}
//           durationMinutes={durationMinutes}
//         />
//       )}
//     </div>
//   );
// }



import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock, Check } from "lucide-react";
import { db } from "@/lib/db";
import { AvailabilityService } from "@/features/booking/availability.service";
import { BookSessionForm } from "@/components/booking/book-session-form";
import { MentorBookingSidebar } from "@/components/booking/mentor-booking-sidebar";

interface PageProps {
  params: Promise<{ mentorId: string }>;
}

export default async function BookSessionPage({ params }: PageProps) {
  const { mentorId } = await params;

  const mentorProfile = await db.mentorProfile.findUnique({
    where: { userId: mentorId },
    include: { user: true },
  });
  if (!mentorProfile) notFound();

  // Today theke next 30 days (1 month) dynamic range
  const from = new Date();
  const to = new Date();
  to.setDate(to.getDate() + 30);
  const durationMinutes = 30;

  const slots = await AvailabilityService.getAvailableSlots(
    mentorProfile.id,
    from,
    to,
    durationMinutes
  );

  // Decimal ebong date serialization fix
  const sanitizedMentor = {
    name: mentorProfile.user.name,
    image: mentorProfile.user.avatarUrl,
    university: mentorProfile.university ?? "University of Manchester",
    location: mentorProfile.country
      ? `${mentorProfile.university ?? ""}, ${mentorProfile.country}`
      : "Manchester, United Kingdom",
    headline: mentorProfile.title || "University Application Guidance",
    bio: mentorProfile.bio,
    rating: mentorProfile.ratingAverage ? Number(mentorProfile.ratingAverage) : 4.9,
    sessionCount: mentorProfile.ratingCount ?? 128,
  };

  return (
    <main className="min-h-screen w-full bg-[#FAFBF9] pb-24">
      {/* Top Navbar */}
      <header className="w-full border-b border-[#EAEFEA] bg-white">
        <div className="mx-auto flex h-16 w-full max-w-[1920px] items-center justify-between px-6 sm:px-12 lg:px-16 xl:px-24">
          <Link href="/" className="font-serif text-xl font-bold tracking-tight text-[#0F1E17]">
            StudyWise[cite: 13]
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-[#718279]">
            <Lock className="h-3.5 w-3.5" />
            <span>Secure Booking[cite: 13]</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto mt-8 w-full max-w-[1920px] px-6 sm:mt-12 sm:px-12 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          
          {/* Left Column (4 Cols) */}
          <div className="lg:col-span-4">
            <MentorBookingSidebar mentor={sanitizedMentor} />
          </div>

          {/* Right Column (8 Cols) */}
          <div className="rounded-[24px] border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.02)] sm:p-8 lg:col-span-8">
            <BookSessionForm
              mentorProfileId={mentorProfile.id}
              mentorHourlyRate={Number(mentorProfile.hourlyRate ?? 25)}
              currency={mentorProfile.currency ?? "USD"}
              slots={slots}
              durationMinutes={durationMinutes}
              mentorName={mentorProfile.user.name}
              mentorImage={mentorProfile.user.avatarUrl}
              mentorUniversity={mentorProfile.university ?? "University of Manchester"}
            />
          </div>

        </div>

        {/* Bottom Booking Confirmation Card */}
        <div className="relative mt-12 w-full overflow-hidden rounded-[24px] border border-[#DCE5DF] bg-[#F1F5F2] p-6 sm:p-8">
          <div className="pointer-events-none absolute right-0 bottom-0 opacity-15">
            <svg width="260" height="130" viewBox="0 0 240 120" fill="none">
              <path
                d="M20 120 L20 60 L30 50 L40 60 L40 120 M70 120 L70 30 L80 15 L90 30 L90 120 M130 120 L130 45 L145 25 L160 45 L160 120 M190 120 L190 55 L200 40 L210 55 L210 120"
                stroke="#1C3E30"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1C3E30] text-white shadow-sm">
                <Check className="h-5 w-5 stroke-[2.5]" />
              </div>

              <div>
                <h3 className="font-serif text-xl font-normal text-[#0F1E17] sm:text-2xl">
                  Your session is booked.[cite: 13]
                </h3>
                <p className="mt-1 text-xs text-[#52645B] sm:text-sm">
                  You&apos;ll receive a confirmation email and a reminder before the session.[cite: 13]
                </p>

                <Link
                  href="/dashboard/bookings"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#BFCFC6] bg-white px-5 py-2 text-xs font-medium text-[#1C3E30] shadow-2xs hover:bg-neutral-50"
                >
                  <span>View Booking[cite: 13]</span>
                  <span>→[cite: 13]</span>
                </Link>
              </div>
            </div>

            <div className="-rotate-6 text-right sm:pr-8 select-none">
              <p className="font-serif italic text-sm text-[#2F453B] sm:text-base">
                Good luck[cite: 13]
              </p>
              <p className="font-serif italic text-sm text-[#2F453B] sm:text-base">
                with your journey![cite: 13]
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}