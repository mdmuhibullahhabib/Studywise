import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata = { title: "Payments" };

export default async function AdminPaymentsPage() {
  await requireRole("ADMIN");

  const payments = await db.payment.findMany({
    include: { student: true, mentor: true },
    orderBy: { createdAt: "desc" },
    take: 50
  });

  const totals = await db.payment.aggregate({
    where: { status: "SUCCEEDED" },
    _sum: { amount: true, platformFee: true }
  });

  return (
    <div>
      <h1 className="text-h1">Payments</h1>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="card p-5">
          <p className="font-display text-h1">{formatCurrency(Number(totals._sum.amount ?? 0))}</p>
          <p className="mt-1 text-sm text-ink-500">Total processed</p>
        </div>
        <div className="card p-5">
          <p className="font-display text-h1">{formatCurrency(Number(totals._sum.platformFee ?? 0))}</p>
          <p className="mt-1 text-sm text-ink-500">Platform revenue</p>
        </div>
      </div>

      <div className="card mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="table-head">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Mentor</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Platform fee</th>
              <th className="px-4 py-3">Mentor amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {payments.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-ink-500">
                  No payments yet.
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr key={p.id} className="table-row-hover">
                  <td className="px-4 py-3 text-ink">{p.student.name}</td>
                  <td className="px-4 py-3 text-ink">{p.mentor.name}</td>
                  <td className="px-4 py-3 text-ink-500">{formatCurrency(Number(p.amount), p.currency)}</td>
                  <td className="px-4 py-3 text-ink-500">{formatCurrency(Number(p.platformFee), p.currency)}</td>
                  <td className="px-4 py-3 text-ink-500">{formatCurrency(Number(p.mentorAmount), p.currency)}</td>
                  <td className="px-4 py-3 capitalize text-ink-500">{p.status.toLowerCase()}</td>
                  <td className="px-4 py-3 text-ink-500">{formatDate(p.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
