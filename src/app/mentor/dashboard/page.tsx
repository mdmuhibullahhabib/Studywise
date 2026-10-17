import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { NotificationService } from "@/services/notification.service";
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
        { label: "Basic information & bio", done: false },
        { label: "Education & university details", done: false },
        { label: "Mentorship specialties & subjects", done: false },
        { label: "Hourly rate & availability", done: false },
        { label: "Profile photo", done: false },
      ],
    };
  }

  const steps = [
    { label: "Basic information & bio", done: !!profile.bio && !!profile.title },
    { label: "Education & university details", done: !!profile.university },
    {
      label: "Mentorship specialties & subjects",
      done: Array.isArray(profile.expertise) && profile.expertise.length > 0,
    },
    { label: "Hourly rate & availability", done: !!profile.hourlyRate },
    { label: "Profile photo", done: !!profile.user?.avatarUrl || !!profile.user?.image },
  ];

  const doneCount = steps.filter((s) => s.done).length;
  const percentage = Math.round((doneCount / steps.length) * 100);

  return { percentage, steps };
}

export default async function MentorDashboardPage() {
  const session = await requireRole(["MENTOR", "ADMIN"]);

  // 1. Fetch mentor profile first so we can use its ID for availability
  const mentorProfile = await db.mentorProfile.findUnique({
    where: { userId: session.user.id },
    include: { user: true },
  });

  // 2. Fetch all other dashboard data in parallel
  const [
    upcomingBookings,
    pendingBookings,
    upcomingCount,
    completedSessionsCount,
    uniqueStudentsCount,
    unreadMessages,
    unreadNotifications,
    monthlyEarnings,
    totalEarnings,
    recentConversations,
    recentReviews,
    availabilitySlots,
  ] = await Promise.all([
    // Nearest confirmed upcoming session
    db.booking.findMany({
      where: {
        mentorId: session.user.id,
        status: "CONFIRMED",
        date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      },
      include: {
        student: {
          include: {
            studentProfile: true,
          },
        },
      },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
      take: 1,
    }),

    // Pending booking requests awaiting confirmation
    db.booking.findMany({
      where: {
        mentorId: session.user.id,
        status: "PENDING",
      },
      include: {
        student: {
          include: {
            studentProfile: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),

    // Total upcoming bookings count (confirmed or pending)
    db.booking.count({
      where: {
        mentorId: session.user.id,
        status: { in: ["PENDING", "CONFIRMED"] },
        date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      },
    }),

    // Completed sessions count
    db.booking.count({
      where: { mentorId: session.user.id, status: "COMPLETED" },
    }),

    // Distinct students taught
    db.booking.groupBy({
      by: ["studentId"],
      where: { mentorId: session.user.id },
    }),

    // Unread messages count
    db.message.count({
      where: {
        conversation: { mentorId: session.user.id },
        readAt: null,
        senderId: { not: session.user.id },
      },
    }),

    // Unread notifications count
    NotificationService.unreadCount(session.user.id).catch(() => 0),

    // Current month earnings
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

    // All-time total earnings
    db.payment.aggregate({
      where: {
        mentorId: session.user.id,
        status: "SUCCEEDED",
      },
      _sum: { mentorAmount: true },
    }),

    // Recent conversations with students
    db.conversation.findMany({
      where: { mentorId: session.user.id },
      include: {
        student: {
          include: {
            studentProfile: true,
          },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { updatedAt: "desc" },
      take: 4,
    }),

    // Recent published reviews
    db.review.findMany({
      where: {
        mentorId: session.user.id,
        status: "PUBLISHED",
      },
      include: {
        student: true,
      },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),

    // Mentor availability slots
    mentorProfile
      ? db.availability.findMany({
          where: { mentorId: mentorProfile.id, isActive: true },
          orderBy: { dayOfWeek: "asc" },
        })
      : Promise.resolve([]),
  ]);

  const completion = calculateProfileCompletion(mentorProfile);
  const nextSession = upcomingBookings[0] ?? null;

  return (
    <div className="-m-4 md:-m-6 min-h-[calc(100vh-4rem)] bg-[#FAFBF9] px-4 py-8 text-[#192721] sm:px-8 lg:px-12">
      {/* 1. Header with greeting, verified badge, rating, search, shortcuts, and avatar */}
      <MentorDashboardHeader
        name={session.user.name ?? "Mentor"}
        avatarUrl={session.user.image || mentorProfile?.user?.avatarUrl}
        unreadCount={unreadMessages}
        unreadNotificationsCount={unreadNotifications}
        verified={mentorProfile?.verified ?? true}
        ratingAverage={Number(mentorProfile?.ratingAverage ?? 4.9)}
        ratingCount={mentorProfile?.ratingCount ?? 0}
      />

      {/* 2. Panoramic Hero Banner */}
      <MentorHeroBanner />

      {/* 3. 5-Metric Counter Grid */}
      <MentorMetricsGrid
        upcomingCount={upcomingCount}
        totalStudents={uniqueStudentsCount.length}
        completedSessions={completedSessionsCount}
        averageRating={Number(mentorProfile?.ratingAverage ?? 4.9)}
        ratingCount={mentorProfile?.ratingCount ?? 0}
        totalEarnings={Number(totalEarnings._sum?.mentorAmount ?? 0)}
        currency={mentorProfile?.currency ?? "USD"}
      />

      {/* 4. Upcoming Hero Session Card or Empty State */}
      <UpcomingSessionCard session={nextSession} />

      {/* 5. Booking Requests Table/Cards */}
      <BookingRequestsList requests={pendingBookings} />

      {/* 6. Availability Schedule & Student Messages Feed */}
      <AvailabilityAndActivityGrid
        conversations={recentConversations}
        availabilitySlots={availabilitySlots}
        currentUserId={session.user.id}
      />

      {/* 7. Bottom Row Metrics (Reviews, Revenue Chart, Profile %) */}
      <DashboardBottomMetrics
        monthlyEarnings={Number(monthlyEarnings._sum?.mentorAmount ?? 0)}
        totalEarnings={Number(totalEarnings._sum?.mentorAmount ?? 0)}
        currency={mentorProfile?.currency ?? "USD"}
        completion={completion}
        reviews={recentReviews}
      />

      {/* 8. Impact Action CTA Banner */}
      <ImpactCtaBanner />
    </div>
  );
}
