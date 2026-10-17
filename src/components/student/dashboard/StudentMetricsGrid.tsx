import Link from "next/link";
import { Calendar, Users, CheckCircle2, MessageSquare, ArrowUpRight } from "lucide-react";

interface StudentMetricsGridProps {
  upcomingCount: number;
  connectedMentorsCount: number;
  completedCount: number;
  unreadMessagesCount: number;
}

export function StudentMetricsGrid({
  upcomingCount,
  connectedMentorsCount,
  completedCount,
  unreadMessagesCount,
}: StudentMetricsGridProps) {
  const metrics = [
    {
      label: "Upcoming Sessions",
      value: upcomingCount,
      subtext: upcomingCount === 1 ? "1 session scheduled" : `${upcomingCount} sessions scheduled`,
      icon: Calendar,
      href: "/student/booked",
    },
    {
      label: "Mentors Connected",
      value: connectedMentorsCount,
      subtext: connectedMentorsCount === 1 ? "1 mentor guiding you" : `${connectedMentorsCount} mentors in network`,
      icon: Users,
      href: "/mentors",
    },
    {
      label: "Sessions Completed",
      value: completedCount,
      subtext: completedCount === 1 ? "1 session completed" : `${completedCount} sessions completed`,
      icon: CheckCircle2,
      href: "/student/booked",
    },
    {
      label: "Unread Messages",
      value: unreadMessagesCount,
      subtext: unreadMessagesCount > 0 ? "Responses awaiting" : "All messages read",
      icon: MessageSquare,
      iconClass: unreadMessagesCount > 0 ? "text-[#36887F]" : "",
      badge: unreadMessagesCount > 0,
      href: "/student/messages",
    },
  ];

  return (
    <section className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((item, idx) => (
        <Link
          key={idx}
          href={item.href}
          className="group relative flex flex-col justify-between rounded-2xl border border-[#E7ECE8] bg-white p-4.5 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#36887F]/40 hover:shadow-[0_8px_20px_rgba(54,136,127,0.06)]"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F2] text-[#1C3E30] transition-colors group-hover:bg-[#E4ECE7]">
              <item.icon className={`h-4.5 w-4.5 ${item.iconClass || ""}`} />
            </div>
            <ArrowUpRight className="h-4 w-4 text-[#A1B1A9] opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <p className="font-serif text-2xl font-normal text-[#0F1E17] sm:text-3xl">
                {item.value}
              </p>
              {item.badge && (
                <span className="rounded-full bg-[#1C3E30] px-2 py-0.5 text-[10px] font-semibold text-white">
                  New
                </span>
              )}
            </div>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-[#73847D]">
              {item.label}
            </p>
            <p className="mt-0.5 text-[12px] text-[#86978F]">
              {item.subtext}
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
}

