import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { NotificationService } from "@/services/notification.service";
import { MentorService } from "@/features/mentors/mentor.service";
import { StudentDashboardHeader } from "@/components/student/dashboard/StudentDashboardHeader";
import { StudentHeroBanner } from "@/components/student/dashboard/StudentHeroBanner";
import { StudentMetricsGrid } from "@/components/student/dashboard/StudentMetricsGrid";
import { StudentNextSessionCard } from "@/components/student/dashboard/StudentNextSessionCard";
import { StudentActivityAndChecklistGrid } from "@/components/student/dashboard/StudentActivityAndChecklistGrid";
import { StudentRecommendedMentors } from "@/components/student/dashboard/StudentRecommendedMentors";
import { StudentCtaBanner } from "@/components/student/dashboard/StudentCtaBanner";

export const metadata = { title: "Student Dashboard | StudyWise" };

export default async function StudentDashboardPage() {
  const session = await requireRole(["STUDENT", "ADMIN"]);

  const [
    nextBooking,
    upcomingCount,
    completedCount,
    connectedMentors,
    unreadMessages,
    unreadNotifications,
    recentConversations,
    recommended,
  ] = await Promise.all([
    // Nearest upcoming booking (confirmed or pending)
    db.booking.findFirst({
      where: {
        studentId: session.user.id,
        status: { in: ["PENDING", "CONFIRMED"] },
        date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
      include: {
        mentor: true,
        mentorProfile: true,
      },
    }),

    // Total upcoming sessions count
    db.booking.count({
      where: {
        studentId: session.user.id,
        status: { in: ["PENDING", "CONFIRMED"] },
      },
    }),

    // Completed sessions count
    db.booking.count({
      where: {
        studentId: session.user.id,
        status: "COMPLETED",
      },
    }),

    // Distinct mentors the student has booked
    db.booking.groupBy({
      by: ["mentorId"],
      where: { studentId: session.user.id },
    }),

    // Unread messages count
    db.message.count({
      where: {
        conversation: { studentId: session.user.id },
        readAt: null,
        senderId: { not: session.user.id },
      },
    }),

    // Unread notifications count
    NotificationService.unreadCount(session.user.id).catch(() => 0),

    // Recent conversations with mentor details and last message
    db.conversation.findMany({
      where: { studentId: session.user.id },
      include: {
        mentor: {
          include: {
            mentorProfile: true,
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

    // Top recommended mentors (card data)
    MentorService.featured(3),
  ]);

  return (
    <div className="-m-4 md:-m-6 min-h-[calc(100vh-4rem)] bg-[#FAFBF9] px-4 py-8 text-[#192721] sm:px-8 lg:px-12">
      {/* 1. Header with greeting, search, shortcuts, and avatar */}
      <StudentDashboardHeader
        name={session.user.name ?? "Student"}
        avatarUrl={session.user.image}
        unreadMessagesCount={unreadMessages}
        unreadNotificationsCount={unreadNotifications}
      />

      {/* 2. Panoramic Hero Banner */}
      <StudentHeroBanner />

      {/* 3. Metrics Grid (Upcoming, Mentors, Completed, Messages) */}
      <StudentMetricsGrid
        upcomingCount={upcomingCount}
        connectedMentorsCount={connectedMentors.length}
        completedCount={completedCount}
        unreadMessagesCount={unreadMessages}
      />

      {/* 4. Upcoming Session Card or Empty State */}
      <StudentNextSessionCard session={nextBooking} />

      {/* 5. Messages Feed & Study-Abroad Roadmap Grid */}
      <StudentActivityAndChecklistGrid
        conversations={recentConversations}
        currentUserId={session.user.id}
      />

      {/* 6. Handpicked Recommended Mentors */}
      <StudentRecommendedMentors mentors={recommended} />

      {/* 7. Bottom Impact Action CTA Banner */}
      <StudentCtaBanner />
    </div>
  );
}
