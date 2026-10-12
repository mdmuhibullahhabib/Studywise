import Link from "next/link";
import { Search, MessageSquare, CalendarCheck, User, Calendar, Clock } from "lucide-react";
import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { MentorCard } from "@/components/mentor/mentor-card";
import { Avatar } from "@/components/ui/avatar";
import { MentorService } from "@/features/mentors/mentor.service";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

const QUICK_ACTIONS = [
  { href: "/mentors", label: "Find a Mentor", icon: Search },
  { href: "/student/messages", label: "Messages", icon: MessageSquare },
  { href: "/student/booked", label: "Bookings", icon: CalendarCheck },
  { href: "/student/profile", label: "Profile", icon: User }
];

export default async function StudentDashboardPage() {
  const session = await requireRole(["STUDENT", "ADMIN"]);

  const [nextBooking, upcomingCount, unreadMessages, recentConversations, recommended] = await Promise.all([
    db.booking.findFirst({
      where: { studentId: session.user.id, status: { in: ["PENDING", "CONFIRMED"] }, date: { gte: new Date() } },
      orderBy: { date: "asc" },
      include: { mentor: true }
    }),
    db.booking.count({
      where: { studentId: session.user.id, status: { in: ["PENDING", "CONFIRMED"] } }
    }),
    db.message.count({
      where: { conversation: { studentId: session.user.id }, readAt: null, senderId: { not: session.user.id } }
    }),
    db.conversation.findMany({
      where: { studentId: session.user.id },
      include: { mentor: true, messages: { orderBy: { createdAt: "desc" }, take: 1 } },
      orderBy: { updatedAt: "desc" },
      take: 3
    }),
    MentorService.featured(3)
  ]);

  return (
    <div className="max-w-5xl">
      <h1 className="text-h1">
        Welcome back{session.user.name ? `, ${session.user.name.split(" ")[0]}` : ""}
      </h1>
      <p className="mt-1 text-sm text-ink-500">Here&apos;s what&apos;s happening with your study-abroad journey.</p>

      {/* Quick actions */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {QUICK_ACTIONS.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="card-interactive flex flex-col items-center gap-2 p-4 text-center"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-sage-soft">
              <action.icon className="h-4 w-4 text-sage-text" />
            </div>
            <p className="text-sm font-medium text-ink">{action.label}</p>
          </Link>
        ))}
      </div>

      {/* Next session — the single most important thing on the page */}
      <section className="mt-10">
        <h2 className="text-h2">Next session</h2>
        {nextBooking ? (
          <div className="card mt-3 flex flex-wrap items-center justify-between gap-4 border-sage/25 p-5">
            <div className="flex items-center gap-3">
              <Avatar name={nextBooking.mentor.name} size="md" />
              <div>
                <p className="font-display font-semibold text-ink">{nextBooking.subject}</p>
                <p className="mt-0.5 flex items-center gap-3 text-sm text-ink-500">
                  <span>with {nextBooking.mentor.name}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {formatDate(nextBooking.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {nextBooking.startTime}
                  </span>
                </p>
              </div>
            </div>
            <Link href={`/student/booked/${nextBooking.id}`} className="btn-secondary !px-4 !py-2 text-sm">
              View session
            </Link>
          </div>
        ) : (
          <div className="card mt-3 p-10 text-center">
            <p className="text-sm text-ink-500">No upcoming sessions yet.</p>
            <Link href="/mentors" className="mt-3 inline-block text-sm font-semibold text-sage-text hover:text-ink">
              Find a mentor →
            </Link>
          </div>
        )}
      </section>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {/* Recent messages */}
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-h2">Recent messages</h2>
            {unreadMessages > 0 && <span className="badge-warning">{unreadMessages} unread</span>}
          </div>
          {recentConversations.length === 0 ? (
            <div className="card mt-3 p-6 text-center text-sm text-ink-500">No conversations yet.</div>
          ) : (
            <ul className="card mt-3 divide-y divide-line">
              {recentConversations.map((c) => (
                <li key={c.id}>
                  <Link href={`/student/messages/${c.id}`} className="flex items-center gap-3 p-3.5 hover:bg-paper-muted">
                    <Avatar name={c.mentor.name} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">{c.mentor.name}</p>
                      <p className="truncate text-meta text-ink-500">
                        {c.messages[0]?.content ?? "No messages yet"}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Upcoming sessions summary */}
        <section>
          <h2 className="text-h2">Your sessions</h2>
          <div className="card mt-3 p-6">
            <p className="font-display text-3xl font-bold text-ink">{upcomingCount}</p>
            <p className="mt-1 text-sm text-ink-500">upcoming session{upcomingCount === 1 ? "" : "s"}</p>
            <Link href="/student/booked" className="mt-4 inline-block text-sm font-semibold text-sage-text hover:text-ink">
              View all bookings →
            </Link>
          </div>
        </section>
      </div>

      {/* Recommended mentors */}
      {recommended.length > 0 && (
        <section className="mt-10">
          <div className="flex items-end justify-between">
            <h2 className="text-h2">Recommended mentors</h2>
            <Link href="/mentors" className="text-sm font-semibold text-sage-text hover:text-ink">
              Browse all →
            </Link>
          </div>
          <div className="mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
