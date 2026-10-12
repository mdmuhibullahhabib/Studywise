import Link from "next/link";
import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";

export const metadata = { title: "Admin dashboard" };

export default async function AdminDashboardPage() {
  await requireRole("ADMIN");

  const [
    totalStudents,
    totalMentors,
    pendingApplications,
    totalSessions,
    openReports,
    monthlyRevenue
  ] = await Promise.all([
    db.user.count({ where: { role: "STUDENT" } }),
    db.user.count({ where: { role: "MENTOR" } }),
    db.mentorApplication.count({ where: { status: { in: ["PENDING", "UNDER_REVIEW"] } } }),
    db.booking.count({ where: { status: "COMPLETED" } }),
    db.report.count({ where: { status: "OPEN" } }),
    db.payment.aggregate({
      where: { status: "SUCCEEDED", createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } },
      _sum: { platformFee: true }
    })
  ]);

  const stats = [
    { label: "Students", value: totalStudents },
    { label: "Mentors", value: totalMentors },
    { label: "Completed sessions", value: totalSessions },
    { label: "Platform revenue (month)", value: formatCurrency(Number(monthlyRevenue._sum.platformFee ?? 0)) }
  ];

  const attentionItems = [
    {
      label: "Pending mentor applications",
      count: pendingApplications,
      href: "/admin/applications"
    },
    { label: "Open reports", count: openReports, href: "/admin/reports" }
  ];

  return (
    <div className="max-w-4xl">
      <h1 className="text-h1">Platform overview</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-5">
            <p className="font-display text-3xl text-ink">{stat.value}</p>
            <p className="mt-1 text-sm text-ink-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-h2">Needs attention</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {attentionItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="card flex items-center justify-between p-5 hover:border-ink/20"
            >
              <p className="text-sm text-ink-500">{item.label}</p>
              <p className={`font-display text-2xl ${item.count > 0 ? "text-gold" : "text-ink-300"}`}>
                {item.count}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
