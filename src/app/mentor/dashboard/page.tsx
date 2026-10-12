// import Link from "next/link";
// import { Calendar, CalendarCheck, MessageSquare, User, Wallet, Star, AlertCircle } from "lucide-react";
// import { requireRole } from "@/lib/permissions";
// import { db } from "@/lib/db";
// import { Avatar } from "@/components/ui/avatar";
// import { VerificationBadge } from "@/components/ui/badge";
// import { formatCurrency, formatDate } from "@/lib/utils";

// export const metadata = { title: "Mentor dashboard" };

// const QUICK_ACTIONS = [
//   { href: "/mentor/settings", label: "Manage Availability", icon: Calendar },
//   { href: "/mentor/booked", label: "View Bookings", icon: CalendarCheck },
//   { href: "/mentor/messages", label: "Messages", icon: MessageSquare },
//   { href: "/mentor/profile", label: "Edit Profile", icon: User },
//   { href: "/mentor/earnings", label: "Earnings", icon: Wallet }
// ];

// function profileCompletion(profile: {
//   title: string | null;
//   bio: string | null;
//   expertise: string[];
//   hourlyRate: unknown;
//   university: string | null;
// } | null) {
//   if (!profile) return 0;
//   const checks = [!!profile.title, !!profile.bio, profile.expertise.length > 0, !!profile.hourlyRate, !!profile.university];
//   return Math.round((checks.filter(Boolean).length / checks.length) * 100);
// }

// export default async function MentorDashboardPage() {
//   const session = await requireRole(["MENTOR", "ADMIN"]);

//   const [todaysSessions, upcomingCount, pendingCount, unreadMessages, monthlyEarnings, profile] = await Promise.all([
//     db.booking.findMany({
//       where: {
//         mentorId: session.user.id,
//         status: "CONFIRMED",
//         date: {
//           gte: new Date(new Date().setHours(0, 0, 0, 0)),
//           lt: new Date(new Date().setHours(23, 59, 59, 999))
//         }
//       },
//       include: { student: true },
//       orderBy: { startTime: "asc" }
//     }),
//     db.booking.count({ where: { mentorId: session.user.id, status: { in: ["PENDING", "CONFIRMED"] } } }),
//     db.booking.count({ where: { mentorId: session.user.id, status: "PENDING" } }),
//     db.message.count({
//       where: { conversation: { mentorId: session.user.id }, readAt: null, senderId: { not: session.user.id } }
//     }),
//     db.payment.aggregate({
//       where: {
//         mentorId: session.user.id,
//         status: "SUCCEEDED",
//         createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
//       },
//       _sum: { mentorAmount: true }
//     }),
//     db.mentorProfile.findUnique({ where: { userId: session.user.id } })
//   ]);

//   const completion = profileCompletion(profile);

//   return (
//     <div className="max-w-5xl">
//       <div className="flex flex-wrap items-start justify-between gap-3">
//         <div>
//           <h1 className="text-h1">
//             Welcome back{session.user.name ? `, ${session.user.name.split(" ")[0]}` : ""}
//           </h1>
//           <div className="mt-2 flex items-center gap-3 text-sm text-ink-500">
//             {profile && <VerificationBadge status={profile.verificationStatus} />}
//             {profile && profile.ratingCount > 0 && (
//               <span className="flex items-center gap-1">
//                 <Star className="h-3.5 w-3.5 fill-gold text-gold" />
//                 <span className="font-semibold text-ink">{Number(profile.ratingAverage).toFixed(1)}</span>
//                 <span className="text-meta">({profile.ratingCount})</span>
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {completion < 100 && (
//         <div className="card mt-4 flex items-center gap-3 border-gold/30 bg-gold-soft/40 p-4">
//           <AlertCircle className="h-5 w-5 shrink-0 text-gold-text" />
//           <div className="flex-1">
//             <p className="text-sm font-medium text-ink">Your profile is {completion}% complete</p>
//             <div className="mt-1.5 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white">
//               <div className="h-full rounded-full bg-gold" style={{ width: `${completion}%` }} />
//             </div>
//           </div>
//           <Link href="/mentor/profile" className="btn-secondary shrink-0 !px-3 !py-1.5 text-xs">
//             Complete it
//           </Link>
//         </div>
//       )}

//       {/* Quick actions */}
//       <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
//         {QUICK_ACTIONS.map((action) => (
//           <Link
//             key={action.href}
//             href={action.href}
//             className="card-interactive flex flex-col items-center gap-2 p-4 text-center"
//           >
//             <div className="flex h-9 w-9 items-center justify-center rounded-md bg-sage-soft">
//               <action.icon className="h-4 w-4 text-sage-text" />
//             </div>
//             <p className="text-sm font-medium text-ink">{action.label}</p>
//           </Link>
//         ))}
//       </div>

//       <div className="mt-8 grid gap-4 sm:grid-cols-3">
//         <div className="card p-5">
//           <p className="font-display text-3xl font-bold text-ink">{upcomingCount}</p>
//           <p className="mt-1 text-sm text-ink-500">Upcoming sessions</p>
//         </div>
//         <div className="card p-5">
//           <p className="font-display text-3xl font-bold text-ink">{unreadMessages}</p>
//           <p className="mt-1 text-sm text-ink-500">Unread messages</p>
//         </div>
//         <div className="card p-5">
//           <p className="font-display text-3xl font-bold text-ink">
//             {formatCurrency(Number(monthlyEarnings._sum.mentorAmount ?? 0))}
//           </p>
//           <p className="mt-1 text-sm text-ink-500">Earnings this month</p>
//         </div>
//       </div>

//       {pendingCount > 0 && (
//         <div className="card mt-6 flex items-center justify-between border-sky/25 bg-sky-soft/40 p-4">
//           <p className="text-sm text-ink">
//             <span className="font-semibold">{pendingCount}</span> booking request{pendingCount === 1 ? "" : "s"} awaiting confirmation
//           </p>
//           <Link href="/mentor/booked?tab=upcoming" className="btn-secondary !px-3 !py-1.5 text-xs">
//             Review
//           </Link>
//         </div>
//       )}

//       <section className="mt-10">
//         <h2 className="text-h2">Today&apos;s schedule</h2>
//         {todaysSessions.length === 0 ? (
//           <div className="card mt-3 p-8 text-center text-sm text-ink-500">Nothing scheduled today.</div>
//         ) : (
//           <ul className="mt-3 space-y-3">
//             {todaysSessions.map((booking) => (
//               <li key={booking.id} className="card flex items-center gap-3 p-4">
//                 <Avatar name={booking.student.name} size="sm" />
//                 <div>
//                   <p className="font-medium text-ink">{booking.subject}</p>
//                   <p className="text-sm text-ink-500">
//                     {booking.student.name} · {formatDate(booking.date)} at {booking.startTime}
//                   </p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>
//     </div>
//   );
// }


import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { MentorDashboardHeader } from "@/components/mentor/dashboard/MentorDashboardHeader";
import { MentorHeroBanner } from "@/components/mentor/dashboard/MentorHeroBanner";
import { MentorMetricsGrid } from "@/components/mentor/dashboard/MentorMetricsGrid";
import { UpcomingSessionCard } from "@/components/mentor/dashboard/UpcomingSessionCard";
import { BookingRequestsList } from "@/components/mentor/dashboard/BookingRequestsList";
import { AvailabilityAndActivityGrid } from "@/components/mentor/dashboard/AvailabilityAndActivityGrid";
import { DashboardBottomMetrics } from "@/components/mentor/dashboard/DashboardBottomMetrics";
import { ImpactCtaBanner } from "@/components/mentor/dashboard/ImpactCtaBanner";

export const metadata = { title: "Mentor Dashboard | StudyWise" };

function calculateProfileCompletion(profile: any) {
  if (!profile) {
    return {
      percentage: 20,
      steps: [
        { label: "Basic information", done: false },
        { label: "Education & experience", done: false },
        { label: "Specialties", done: false },
        { label: "Availability", done: false },
        { label: "Profile photo", done: false },
      ],
    };
  }

  const steps = [
    { label: "Basic information", done: !!profile.bio && !!profile.title },
    { label: "Education & experience", done: !!profile.university },
    {
      label: "Specialties",
      done: Array.isArray(profile.expertise) && profile.expertise.length > 0,
    },
    { label: "Availability", done: !!profile.hourlyRate },
    { label: "Profile photo", done: !!profile.user?.image },
  ];

  const doneCount = steps.filter((s) => s.done).length;
  const percentage = Math.round((doneCount / steps.length) * 100);

  return { percentage, steps };
}

export default async function MentorDashboardPage() {
  const session = await requireRole(["MENTOR", "ADMIN"]);

  const [
    mentorProfile,
    upcomingBookings,
    pendingBookings,
    completedSessionsCount,
    uniqueStudentsCount,
    unreadMessages,
    monthlyEarnings,
    totalEarnings,
  ] = await Promise.all([
    db.mentorProfile.findUnique({
      where: { userId: session.user.id },
      include: { user: true },
    }),

    db.booking.findMany({
      where: {
        mentorId: session.user.id,
        status: "CONFIRMED",
        date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      },
      include: { student: true },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
      take: 1,
    }),

    db.booking.findMany({
      where: {
        mentorId: session.user.id,
        status: "PENDING",
      },
      include: { student: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),

    db.booking.count({
      where: { mentorId: session.user.id, status: "COMPLETED" },
    }),

    db.booking.groupBy({
      by: ["studentId"],
      where: { mentorId: session.user.id },
    }),

    db.message.count({
      where: {
        conversation: { mentorId: session.user.id },
        readAt: null,
        senderId: { not: session.user.id },
      },
    }),

    db.payment.aggregate({
      where: {
        mentorId: session.user.id,
        status: "SUCCEEDED",
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
      _sum: { mentorAmount: true },
    }),

    db.payment.aggregate({
      where: {
        mentorId: session.user.id,
        status: "SUCCEEDED",
      },
      _sum: { mentorAmount: true },
    }),
  ]);

  const completion = calculateProfileCompletion(mentorProfile);
  const nextSession = upcomingBookings[0] ?? null;

  return (
    <div className="min-h-screen w-full bg-[#FAFBF9] px-4 py-8 text-[#192721] sm:px-8 lg:px-12">
      {/* 1. Header */}
      <MentorDashboardHeader
        name={session.user.name ?? "Mentor"}
        avatarUrl={session.user.image}
        unreadCount={unreadMessages}
      />

      {/* 2. Panoramic Banner */}
      <MentorHeroBanner />

      {/* 3. 5-Metric Counter Grid */}
      <MentorMetricsGrid
        upcomingCount={upcomingBookings.length}
        totalStudents={uniqueStudentsCount.length}
        completedSessions={completedSessionsCount}
        averageRating={Number(mentorProfile?.ratingAverage ?? 4.9)}
        totalEarnings={Number(totalEarnings._sum?.mentorAmount ?? 1240)}
        currency={mentorProfile?.currency ?? "USD"}
      />

      {/* 4. Upcoming Hero Card */}
      <UpcomingSessionCard session={nextSession} />

      {/* 5. Booking Requests Table/Cards */}
      <BookingRequestsList requests={pendingBookings} />

      {/* 6. Availability Heatmap & Message Feed */}
      <AvailabilityAndActivityGrid />

      {/* 7. Bottom Row Metrics (Reviews, Revenue Chart, Profile %) */}
      <DashboardBottomMetrics
        monthlyEarnings={Number(monthlyEarnings._sum?.mentorAmount ?? 420)}
        totalEarnings={Number(totalEarnings._sum?.mentorAmount ?? 1240)}
        currency={mentorProfile?.currency ?? "USD"}
        completion={completion}
      />

      {/* 8. Impact Action CTA Banner */}
      <ImpactCtaBanner />
    </div>
  );
}
