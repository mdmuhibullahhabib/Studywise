import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { resolveReportAction } from "@/features/admin/admin-actions";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Reports" };

export default async function AdminReportsPage() {
  await requireRole("ADMIN");

  const reports = await db.report.findMany({
    where: { status: "OPEN" },
    orderBy: { createdAt: "desc" },
    take: 50
  });

  return (
    <div>
      <h1 className="text-h1">Reports</h1>
      <p className="mt-1 text-sm text-ink-500">{reports.length} open report{reports.length === 1 ? "" : "s"}</p>

      <div className="mt-6 space-y-3">
        {reports.length === 0 ? (
          <div className="card p-10 text-center text-sm text-ink-500">
            No open reports. Reports raised against reviews, messages, or users appear here.
          </div>
        ) : (
          reports.map((report) => (
            <div key={report.id} className="card p-5">
              <p className="text-sm font-medium text-ink capitalize">{report.targetType.toLowerCase()} reported</p>
              <p className="mt-1 text-sm text-ink-500">{report.reason}</p>
              <p className="mt-2 text-xs text-ink-300">{formatDate(report.createdAt)}</p>
              <div className="mt-3 flex gap-2">
                <form action={resolveReportAction}>
                  <input type="hidden" name="reportId" value={report.id} />
                  <input type="hidden" name="status" value="RESOLVED" />
                  <button type="submit" className="text-xs font-medium text-sage hover:underline">
                    Mark resolved
                  </button>
                </form>
                <form action={resolveReportAction}>
                  <input type="hidden" name="reportId" value={report.id} />
                  <input type="hidden" name="status" value="DISMISSED" />
                  <button type="submit" className="text-xs font-medium text-ink-500 hover:underline">
                    Dismiss
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
