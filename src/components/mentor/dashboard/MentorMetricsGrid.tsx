import Link from "next/link";
import { Calendar, Users, CheckCircle2, Star, Wallet, ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface MentorMetricsGridProps {
  upcomingCount: number;
  totalStudents: number;
  completedSessions: number;
  averageRating: number;
  ratingCount?: number;
  totalEarnings: number;
  currency?: string;
}

export function MentorMetricsGrid({
  upcomingCount,
  totalStudents,
  completedSessions,
  averageRating,
  ratingCount = 0,
  totalEarnings,
  currency = "USD",
}: MentorMetricsGridProps) {
  const metrics = [
    {
      label: "Upcoming Sessions",
      value: upcomingCount,
      subtext: upcomingCount === 1 ? "1 session scheduled" : `${upcomingCount} sessions scheduled`,
      icon: Calendar,
      href: "/mentor/booked",
    },
    {
      label: "Total Students",
      value: totalStudents,
      subtext: totalStudents === 1 ? "1 student guided" : `${totalStudents} students guided`,
      icon: Users,
      href: "/mentor/students",
    },
    {
      label: "Sessions Completed",
      value: completedSessions,
      subtext: completedSessions === 1 ? "1 session delivered" : `${completedSessions} sessions delivered`,
      icon: CheckCircle2,
      href: "/mentor/booked?tab=completed",
    },
    {
      label: "Average Rating",
      value: averageRating > 0 ? averageRating.toFixed(1) : "5.0",
      subtext: ratingCount > 0 ? `Based on ${ratingCount} reviews` : "Top rated mentor",
      icon: Star,
      iconClass: "fill-[#E5A023] text-[#E5A023]",
      href: "/mentor/reviews",
    },
    {
      label: "Total Earnings",
      value: formatCurrency(totalEarnings || 0, currency),
      subtext: "All-time earnings",
      icon: Wallet,
      colSpan: "col-span-2 sm:col-span-1",
      href: "/mentor/earnings",
    },
  ];

  return (
    <section className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {metrics.map((item, idx) => (
        <Link
          key={idx}
          href={item.href}
          className={`group relative flex flex-col justify-between rounded-2xl border border-[#E7ECE8] bg-white p-4.5 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#36887F]/40 hover:shadow-[0_8px_20px_rgba(54,136,127,0.06)] ${
            item.colSpan || ""
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F2] text-[#1C3E30] transition-colors group-hover:bg-[#E4ECE7]">
              <item.icon className={`h-4.5 w-4.5 ${item.iconClass || ""}`} />
            </div>
            <ArrowUpRight className="h-4 w-4 text-[#A1B1A9] opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          <div className="mt-4">
            <p className="font-serif text-2xl font-normal text-[#0F1E17] sm:text-3xl">
              {item.value}
            </p>
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