// import { notFound } from "next/navigation";
// import { BadgeCheck, Star, MapPin, GraduationCap, Briefcase, Calendar } from "lucide-react";
// import type { Metadata } from "next";
// import { auth } from "@/lib/auth";
// import { MentorService } from "@/features/mentors/mentor.service";
// import { DEMO_MENTORS } from "@/constants/demo-mentors";
// import { startConversationAction } from "@/features/messaging/start-conversation-action";
// import { Avatar } from "@/components/ui/avatar";
// import { SubmitButton } from "@/components/ui/submit-button";
// import { StudyJourney } from "@/components/mentor/study-journey";
// import { formatCurrency, formatDate } from "@/lib/utils";

// interface MentorProfilePageProps {
//   params: Promise<{ mentorId: string }>;
// }

// interface EducationEntry {
//   institution?: string;
//   degree?: string;
//   field?: string;
//   startYear?: number;
//   endYear?: number;
// }

// interface ExperienceEntry {
//   organization?: string;
//   role?: string;
//   startYear?: number;
//   endYear?: number;
//   description?: string;
// }

// export async function generateMetadata({ params }: MentorProfilePageProps): Promise<Metadata> {
//   const { mentorId } = await params;
//   const result = await MentorService.getByUserId(mentorId);
//   if (!result) return {};
//   return {
//     title: result.profile.user.name,
//     description: `${result.profile.title ?? "Mentor"} — book a session on StudyWise.`,
//     openGraph: { title: `${result.profile.user.name} · StudyWise`, description: result.profile.title ?? undefined }
//   };
// }

// export default async function MentorProfilePage({ params }: MentorProfilePageProps) {
//   const { mentorId } = await params;
//   const result = await MentorService.getByUserId(mentorId);

//   // Demo mentors (shown when the DB has no approved mentors yet) render a
//   // read-only profile — they have no real userId/MentorProfile row to
//   // message or book against.
//   const demo = !result ? DEMO_MENTORS.find((m) => m.id === mentorId) : null;
//   if (!result && !demo) notFound();

//   const session = await auth();
//   const isStudent = session?.user.role === "STUDENT";

//   const name = result ? result.profile.user.name : demo!.name;
//   const title = result ? result.profile.title ?? "Mentor" : demo!.title;
//   const country = result ? result.profile.country : demo!.country;
//   const university = result ? result.profile.university : demo!.university;
//   const studyLevel = result?.profile.studyLevel;
//   const verified = result ? result.profile.verified : demo!.verified;
//   const ratingAverage = result ? Number(result.profile.ratingAverage) : demo!.ratingAverage;
//   const ratingCount = result ? result.profile.ratingCount : demo!.ratingCount;
//   const sessionCount = result ? result.sessionCount : demo!.sessionCount;
//   const expertise = result ? result.profile.expertise : demo!.expertise;
//   const hourlyRate = result ? Number(result.profile.hourlyRate ?? 0) : demo!.hourlyRate;
//   const currency = result ? result.profile.currency : demo!.currency;
//   const bio = result?.profile.bio;
//   const teachingApproach = result?.profile.teachingApproach;
//   const education = (result?.profile.education ?? []) as EducationEntry[];
//   const experience = (result?.profile.experience ?? []) as ExperienceEntry[];
//   const reviews = result?.reviews ?? [];

//   const actions = (
//     <MentorActions
//       hasResult={!!result}
//       isStudent={isStudent}
//       isAuthenticated={!!session?.user}
//       mentorProfileId={result?.profile.id}
//       mentorId={mentorId}
//     />
//   );

//   return (
//     <div className="container-content py-14">
//       {/* ── Profile header ─────────────────────────────────────────── */}
//       <div className="card p-6 md:p-8">
//         <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
//           <div className="flex items-start gap-4">
//             <Avatar name={name} size="xl" />
//             <div>
//               <div className="flex items-center gap-2">
//                 <h1 className="text-h1">{name}</h1>
//                 {verified && (
//                   <span className="badge-success">
//                     <BadgeCheck className="h-3.5 w-3.5" /> Verified
//                   </span>
//                 )}
//               </div>
//               <p className="mt-1 text-ink-500">{title}</p>

//               <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-ink-500">
//                 {(university || country) && (
//                   <span className="flex items-center gap-1.5">
//                     <MapPin className="h-4 w-4 text-sky-text" />
//                     {[university, country].filter(Boolean).join(", ")}
//                   </span>
//                 )}
//                 {studyLevel && (
//                   <span className="flex items-center gap-1.5">
//                     <GraduationCap className="h-4 w-4 text-sky-text" />
//                     {studyLevel}
//                   </span>
//                 )}
//                 <span className="flex items-center gap-1">
//                   <Star className="h-4 w-4 fill-gold text-gold" />
//                   <span className="font-semibold text-ink">{ratingAverage.toFixed(1)}</span>({ratingCount} reviews)
//                 </span>
//                 {typeof sessionCount === "number" && <span>{sessionCount} sessions completed</span>}
//               </div>
//             </div>
//           </div>

//           {/* Primary actions — visible immediately, not just on scroll. */}
//           <div className="flex shrink-0 gap-3 md:flex-col md:items-stretch">{actions}</div>
//         </div>
//       </div>

//       <div className="mt-8 grid gap-10 md:grid-cols-[1fr_300px]">
//         <div className="space-y-10">
//           <section>
//             <h2 className="text-h2">About</h2>
//             <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
//               {bio ||
//                 `${name.split(" ")[0]} brings hands-on, first-hand study-abroad experience to every session — sessions are tailored to where you are, not a fixed curriculum.`}
//             </p>
//             {teachingApproach && (
//               <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{teachingApproach}</p>
//             )}
//           </section>

//           <section>
//             <h2 className="text-h2">Expertise</h2>
//             <div className="mt-3 flex flex-wrap gap-2">
//               {expertise.length === 0 ? (
//                 <p className="text-sm text-ink-500">Not added yet.</p>
//               ) : (
//                 expertise.map((item) => (
//                   <span key={item} className="rounded-full bg-paper-muted px-3 py-1 text-sm text-ink-500">
//                     {item}
//                   </span>
//                 ))
//               )}
//             </div>
//           </section>

//           {result && (
//             <section>
//               <h2 className="text-h2">My journey</h2>
//               <p className="mt-1 text-meta text-ink-300">This mentor has already lived the journey you&apos;re about to start.</p>
//               <div className="mt-4">
//                 <StudyJourney
//                   university={university}
//                   country={country}
//                   studyLevel={studyLevel}
//                   currentRole={title}
//                 />
//               </div>
//             </section>
//           )}

//           {education.length > 0 && (
//             <section>
//               <h2 className="text-h2">Education</h2>
//               <ul className="mt-3 space-y-4">
//                 {education.map((entry, i) => (
//                   <li key={i} className="flex gap-3">
//                     <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-sky-text" />
//                     <div className="text-sm">
//                       <p className="font-medium text-ink">
//                         {entry.degree}
//                         {entry.field ? `, ${entry.field}` : ""}
//                       </p>
//                       <p className="text-ink-500">
//                         {entry.institution}
//                         {entry.startYear ? ` · ${entry.startYear}–${entry.endYear ?? "present"}` : ""}
//                       </p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </section>
//           )}

//           {experience.length > 0 && (
//             <section>
//               <h2 className="text-h2">Experience</h2>
//               <ul className="mt-3 space-y-4">
//                 {experience.map((entry, i) => (
//                   <li key={i} className="flex gap-3">
//                     <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-sky-text" />
//                     <div className="text-sm">
//                       <p className="font-medium text-ink">
//                         {entry.role}
//                         {entry.organization ? ` · ${entry.organization}` : ""}
//                       </p>
//                       {entry.description && <p className="mt-0.5 text-ink-500">{entry.description}</p>}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </section>
//           )}

//           <section>
//             <h2 className="text-h2">Availability</h2>
//             <p className="mt-3 flex items-center gap-2 text-sm text-ink-500">
//               <Calendar className="h-4 w-4 text-sky-text" />
//               See open times on the booking page — updated from {name.split(" ")[0]}&apos;s live schedule.
//             </p>
//           </section>

//           <section>
//             <h2 className="text-h2">Reviews</h2>
//             {reviews.length === 0 ? (
//               <p className="mt-2 text-sm text-ink-500">No reviews yet.</p>
//             ) : (
//               <ul className="mt-3 space-y-3">
//                 {reviews.map((r) => (
//                   <li key={r.id} className="card p-4">
//                     <div className="flex items-center gap-1">
//                       {Array.from({ length: 5 }).map((_, i) => (
//                         <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-gold text-gold" : "text-ink-300"}`} />
//                       ))}
//                       <span className="ml-2 text-meta text-ink-300">{formatDate(r.createdAt)}</span>
//                     </div>
//                     {r.review && <p className="mt-2 text-sm text-ink-500">{r.review}</p>}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </section>
//         </div>

//         {/* Sticky booking sidebar — repeats the primary actions so they're
//             always reachable without scrolling back up. */}
//         <aside className="card sticky top-24 h-fit p-6">
//           <p className="text-2xl font-display font-semibold text-ink">
//             {formatCurrency(hourlyRate, currency)}
//             <span className="text-sm font-normal text-ink-300"> / hour</span>
//           </p>
//           <div className="mt-5 flex flex-col gap-3">{actions}</div>
//           <p className="mt-4 text-meta text-ink-300">
//             Messaging reuses your existing conversation with this mentor — you&apos;ll never end up with duplicates.
//           </p>
//         </aside>
//       </div>
//     </div>
//   );
// }

// function MentorActions({
//   hasResult,
//   isStudent,
//   isAuthenticated,
//   mentorProfileId,
//   mentorId
// }: {
//   hasResult: boolean;
//   isStudent: boolean;
//   isAuthenticated: boolean;
//   mentorProfileId?: string;
//   mentorId: string;
// }) {
//   if (!hasResult) {
//     return <p className="text-sm text-ink-500">Demo profile — booking isn&apos;t available for this mentor.</p>;
//   }

//   if (isStudent && mentorProfileId) {
//     return (
//       <>
//         <form action={startConversationAction.bind(null, mentorProfileId)}>
//           <SubmitButton variant="primary" pendingLabel="Opening…" className="w-full">
//             Message Mentor
//           </SubmitButton>
//         </form>
//         <a href={`/student/book/${mentorId}`} className="btn-secondary w-full">
//           Book a Session
//         </a>
//       </>
//     );
//   }

//   if (isAuthenticated) {
//     // Signed in as a mentor or admin — messaging/booking is a student action.
//     return <p className="text-sm text-ink-500">Sign in as a student to message or book this mentor.</p>;
//   }

//   return (
//     <>
//       <a href={`/auth/login?callbackUrl=/mentors/${mentorId}`} className="btn-primary w-full">
//         Message Mentor
//       </a>
//       <a href={`/auth/login?callbackUrl=/student/book/${mentorId}`} className="btn-secondary w-full">
//         Book a Session
//       </a>
//     </>
//   );
// }




import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { MentorService } from "@/features/mentors/mentor.service";
import { DEMO_MENTORS } from "@/constants/demo-mentors";
import { MentorProfileHeaderCard } from "@/components/mentor/mentor-profile/MentorProfileHeaderCard";
import { MentorQuickBookWidget } from "@/components/mentor/mentor-profile/MentorQuickBookWidget";
import { MentorThreeColumnDetails } from "@/components/mentor/mentor-profile/MentorThreeColumnDetails";
import { StudentReviewsSection } from "@/components/mentor/mentor-profile/StudentReviewsSection";
import { RelatedMentorsSection } from "@/components/mentor/mentor-profile/RelatedMentorsSection";
import { BookConversationBottomBanner } from "@/components/mentor/mentor-profile/BookConversationBottomBanner";
import { MentorProfileFooter } from "@/components/mentor/mentor-profile/MentorProfileFooter";

interface MentorProfilePageProps {
  params: Promise<{ mentorId: string }>;
}

export async function generateMetadata({ params }: MentorProfilePageProps): Promise<Metadata> {
  const { mentorId } = await params;
  const result = await MentorService.getByUserId(mentorId);
  if (!result) return {};
  return {
    title: `${result.profile.user.name} | StudyWise Mentor`,
    description: `${result.profile.title ?? "Mentor"} — book a session on StudyWise.`,
  };
}

export default async function MentorProfilePage({ params }: MentorProfilePageProps) {
  const { mentorId } = await params;
  const result = await MentorService.getByUserId(mentorId);

  const demo = !result ? DEMO_MENTORS.find((m) => m.id === mentorId) : null;
  if (!result && !demo) notFound();

  const session = await auth();
  const isStudent = session?.user.role === "STUDENT";

  const name = result ? result.profile.user.name : demo!.name;
  const title = result ? result.profile.title ?? "Mentor" : demo!.title;
  const country = result ? result.profile.country : demo!.country;
  const university = result ? result.profile.university : demo!.university;
  const studyLevel = result?.profile.studyLevel ?? "MSc Data Science";
  const verified = result ? result.profile.verified : demo!.verified;
  const ratingAverage = result ? Number(result.profile.ratingAverage) : demo!.ratingAverage;
  const ratingCount = result ? result.profile.ratingCount : demo!.ratingCount;
  const sessionCount = result ? result.sessionCount : demo!.sessionCount;
  const expertise = result ? result.profile.expertise : demo!.expertise;
  const hourlyRate = result ? Number(result.profile.hourlyRate ?? 25) : demo!.hourlyRate;
  const currency = result ? result.profile.currency : demo!.currency;
  const bio = result?.profile.bio;
  const teachingApproach = result?.profile.teachingApproach;
  const avatarUrl = result ? result.profile.user?.avatarUrl : demo!.avatarUrl;
  const reviews = result?.reviews ?? [];

  return (
    <main className="min-h-screen w-full bg-[#FAFBF9] text-[#192721]">
      <div className="mx-auto w-full max-w-[1920px] px-6 pt-10 sm:px-12 lg:px-16 xl:px-24">
        
        {/* Top 2-Column Hero: Left Profile (8 cols) + Right Quick-Book (4 cols) */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <MentorProfileHeaderCard
              mentorId={mentorId}
              mentorProfileId={result?.profile.id}
              name={name}
              title={title}
              avatarUrl={avatarUrl}
              university={university}
              country={country}
              bio={bio}
              ratingAverage={ratingAverage}
              ratingCount={ratingCount}
              sessionCount={sessionCount}
              verified={verified}
              isStudent={isStudent}
              isAuthenticated={!!session?.user}
              hasResult={!!result}
            />
          </div>

          <div className="lg:col-span-4">
            <MentorQuickBookWidget
              mentorId={mentorId}
              hourlyRate={hourlyRate}
              currency={currency}
            />
          </div>
        </div>

        {/* Middle: 3-Column Info (About, Experience, Specialties) */}
        <MentorThreeColumnDetails
          mentorName={name}
          bio={bio}
          teachingApproach={teachingApproach}
          university={university}
          country={country}
          studyLevel={studyLevel}
          expertise={expertise}
        />

        {/* Student Reviews 4-Column Grid */}
        <StudentReviewsSection reviews={reviews} />

        {/* Related Mentors Carousel Grid */}
        <RelatedMentorsSection />

        {/* Bottom Skyline CTA Banner */}
        <BookConversationBottomBanner mentorId={mentorId} mentorName={name} />

      </div>

      {/* Footer */}
      <MentorProfileFooter />
    </main>
  );
}