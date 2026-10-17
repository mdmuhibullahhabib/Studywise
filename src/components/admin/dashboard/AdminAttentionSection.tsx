import Link from "next/link";
import {
  AlertTriangle,
  FileCheck,
  Flag,
  CalendarCheck,
  Star,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface AdminAttentionSectionProps {
  pendingApplicationsCount: number;
  openReportsCount: number;
  pendingBookingsCount: number;
  lowRatingsCount?: number;
}

export function AdminAttentionSection({
  pendingApplicationsCount,
  openReportsCount,
  pendingBookingsCount,
  lowRatingsCount = 0,
}: AdminAttentionSectionProps) {
  const items = [
    {
      title: "Mentor Applications",
      count: pendingApplicationsCount,
      desc: "Applicants awaiting document & credential verification.",
      actionLabel: "Review Applications",
      href: "/admin/applications",
      icon: FileCheck,
      badgeColor:
        pendingApplicationsCount > 0
          ? "bg-[#FEF3C7] text-[#92400E]"
          : "bg-[#EBF4F0] text-[#38897D]",
    },
    {
      title: "Trust & Safety Reports",
      count: openReportsCount,
      desc: "Open flags, student complaints, or session disputes.",
      actionLabel: "Resolve Reports",
      href: "/admin/reports",
      icon: Flag,
      badgeColor:
        openReportsCount > 0
          ? "bg-[#FEE2E2] text-[#991B1B]"
          : "bg-[#EBF4F0] text-[#38897D]",
    },
    {
      title: "Pending Session Bookings",
      count: pendingBookingsCount,
      desc: "Requested bookings awaiting mentor confirmation.",
      actionLabel: "View All Bookings",
      href: "/admin/sessions",
      icon: CalendarCheck,
      badgeColor:
        pendingBookingsCount > 0
          ? "bg-[#E0E7FF] text-[#3730A3]"
          : "bg-[#EBF4F0] text-[#38897D]",
    },
    {
      title: "Ratings & Quality Reviews",
      count: lowRatingsCount,
      desc: "Published student reviews and satisfaction scores.",
      actionLabel: "Inspect Reviews",
      href: "/admin/reviews",
      icon: Star,
      badgeColor: "bg-[#EBF4F0] text-[#38897D]",
    },
  ];

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#38897D]" />
          <h2 className="font-serif text-lg font-bold text-[#15282E]">
            Operational Action Queue & Alerts
          </h2>
        </div>
        <span className="text-xs text-[#7A8A82]">
          Items requiring administrator attention
        </span>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="group flex flex-col justify-between rounded-2xl border border-[#E7ECE8] bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#38897D]/40 hover:shadow-[0_8px_20px_rgba(56,137,125,0.06)]"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0F5F2] text-[#15282E] transition-colors group-hover:bg-[#E5ECE7]">
                  <item.icon className="h-4.5 w-4.5 text-[#38897D]" />
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${item.badgeColor}`}
                >
                  {item.count}
                </span>
              </div>

              <h4 className="mt-3.5 font-serif text-base font-bold text-[#15282E] group-hover:text-[#38897D] transition-colors">
                {item.title}
              </h4>
              <p className="mt-1 text-[11.5px] leading-relaxed text-[#667870]">
                {item.desc}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#F2F5F3] pt-3 text-xs font-semibold text-[#38897D]">
              <span>{item.actionLabel}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

