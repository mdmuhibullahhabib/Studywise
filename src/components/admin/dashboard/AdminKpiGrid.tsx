import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  CheckCircle2,
  Users,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { DashboardMetricsSummary, DateRangeKey } from "./types";

interface AdminKpiGridProps {
  metrics: DashboardMetricsSummary;
  rangeKey: DateRangeKey;
}

export function AdminKpiGrid({ metrics, rangeKey }: AdminKpiGridProps) {
  const getPeriodLabel = () => {
    switch (rangeKey) {
      case "7d":
        return "vs prior 7 days";
      case "30d":
        return "vs prior 30 days";
      case "90d":
        return "vs prior 3 months";
      case "1y":
        return "vs prior year";
      default:
        return "all time total";
    }
  };

  const periodLabel = getPeriodLabel();

  const cards = [
    {
      title: "Platform Revenue",
      value: formatCurrency(metrics.platformRevenue),
      subtext: "Net commission earned",
      growth: metrics.revenueGrowth,
      icon: DollarSign,
      iconColor: "text-[#38897D]",
      iconBg: "bg-[#38897D]/10",
      accentBorder: "hover:border-[#38897D]/40",
      href: "/admin/payments",
      sparklinePoints: [20, 25, 22, 38, 45, 42, 60],
    },
    {
      title: "Gross Volume (GMV)",
      value: formatCurrency(metrics.grossVolume),
      subtext: `Avg Order: ${formatCurrency(metrics.avgOrderValue)}`,
      growth: metrics.grossVolumeGrowth,
      icon: CreditCard,
      iconColor: "text-[#15282E]",
      iconBg: "bg-[#15282E]/10",
      accentBorder: "hover:border-[#15282E]/40",
      href: "/admin/payments",
      sparklinePoints: [40, 48, 42, 65, 78, 70, 95],
    },
    {
      title: "Completed Sessions",
      value: metrics.completedBookingsCount,
      subtext: `${metrics.completionRate}% completion rate (${metrics.totalBookingsCount} booked)`,
      growth: metrics.completedBookingsGrowth,
      icon: CheckCircle2,
      iconColor: "text-[#38897D]",
      iconBg: "bg-[#EBF4F0]",
      accentBorder: "hover:border-[#38897D]/40",
      href: "/admin/sessions",
      sparklinePoints: [10, 15, 22, 28, 32, 40, 52],
    },
    {
      title: "New Students",
      value: metrics.newStudentsCount,
      subtext: `${metrics.totalStudentsCount} all-time registered students`,
      growth: metrics.studentsGrowth,
      icon: Users,
      iconColor: "text-[#15282E]",
      iconBg: "bg-[#F0F5F2]",
      accentBorder: "hover:border-[#38897D]/40",
      href: "/admin/students",
      sparklinePoints: [12, 18, 15, 25, 30, 28, 42],
    },
    {
      title: "Mentor Community",
      value: metrics.activeMentorsCount,
      subtext: `${metrics.totalMentorsCount} total mentors · ${metrics.pendingApplicationsCount} pending`,
      growth: metrics.mentorsGrowth,
      icon: GraduationCap,
      iconColor: "text-[#38897D]",
      iconBg: "bg-[#38897D]/10",
      accentBorder: "hover:border-[#38897D]/40",
      colSpan: "col-span-2 sm:col-span-1 lg:col-span-1",
      href: "/admin/mentors",
      sparklinePoints: [8, 10, 12, 15, 18, 20, 25],
    },
  ];

  return (
    <section className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {cards.map((card, idx) => {
        const isPositive = card.growth.isPositive;

        return (
          <Link
            key={idx}
            href={card.href}
            className={`group relative flex flex-col justify-between rounded-2xl border border-[#E7ECE8] bg-white p-4.5 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(56,137,125,0.07)] ${card.accentBorder} ${card.colSpan || ""}`}
          >
            {/* Top row: Icon and link indicator */}
            <div className="flex items-center justify-between">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor}`}
              >
                <card.icon className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-[#A1B1A9] opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            {/* Middle: Value and label */}
            <div className="mt-4">
              <p className="font-serif text-2xl font-bold tracking-tight text-[#15282E] sm:text-[26px]">
                {card.value}
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-[#73847D]">
                {card.title}
              </p>
              <p className="mt-0.5 text-[12px] text-[#86978F] line-clamp-1">
                {card.subtext}
              </p>
            </div>

            {/* Bottom: Growth Badge and period indicator */}
            <div className="mt-3.5 flex items-center justify-between border-t border-[#F2F5F3] pt-2.5 text-[11px]">
              {rangeKey !== "all" ? (
                <div
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${
                    isPositive
                      ? "bg-[#EBF7F1] text-[#1B6F49]"
                      : "bg-[#FDEDEC] text-[#B83227]"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>{card.growth.label}</span>
                </div>
              ) : (
                <span className="text-[10.5px] font-medium text-[#7A8A82]">
                  Historical
                </span>
              )}
              <span className="text-[10px] text-[#9AA8A1] truncate max-w-[90px]">
                {periodLabel}
              </span>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

