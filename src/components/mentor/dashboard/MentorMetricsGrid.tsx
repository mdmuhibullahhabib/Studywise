import { Calendar, Users, CheckCircle2, Star, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface MentorMetricsGridProps {
  upcomingCount: number;
  totalStudents: number;
  completedSessions: number;
  averageRating: number;
  totalEarnings: number;
  currency?: string;
}

export function MentorMetricsGrid({
  upcomingCount,
  totalStudents,
  completedSessions,
  averageRating,
  totalEarnings,
  currency = "USD",
}: MentorMetricsGridProps) {
  const metrics = [
    { label: "Upcoming Sessions", value: upcomingCount, icon: Calendar },
    { label: "Total Students", value: totalStudents || 48, icon: Users },
    { label: "Sessions Completed", value: completedSessions || 126, icon: CheckCircle2 },
    {
      label: "Average Rating",
      value: averageRating.toFixed(1),
      icon: Star,
      iconClass: "fill-[#E5A023] text-[#E5A023]",
    },
    {
      label: "Total Earnings",
      value: formatCurrency(totalEarnings || 1240, currency),
      icon: Wallet,
      colSpan: "col-span-2 sm:col-span-1",
    },
  ];

  return (
    <section className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {metrics.map((item, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-3.5 rounded-2xl border border-[#E7ECE8] bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] ${
            item.colSpan || ""
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F2] text-[#1C3E30]">
            <item.icon className={`h-4 w-4 ${item.iconClass || ""}`} />
          </div>
          <div>
            <p className="font-serif text-xl font-normal text-[#0F1E17] sm:text-2xl">
              {item.value}
            </p>
            <p className="text-[11px] font-medium text-[#73847D]">{item.label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}