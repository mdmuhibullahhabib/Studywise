import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata = { title: "Earnings" };

export default async function MentorEarningsPage() {
  const session = await requireRole(["MENTOR", "ADMIN"]);

  const [totalAgg, monthlyAgg, payments] = await Promise.all([
    db.payment.aggregate({
      where: { mentorId: session.user.id, status: "SUCCEEDED" },
      _sum: { mentorAmount: true }
    }),
    db.payment.aggregate({
      where: {
        mentorId: session.user.id,
        status: "SUCCEEDED",
        createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
      },
      _sum: { mentorAmount: true }
    }),
    db.payment.findMany({
      where: { mentorId: session.user.id },
      include: { student: true },
      orderBy: { createdAt: "desc" },
      take: 30
    })
  ]);

  // No payout model yet — "available balance" is total earned to date.
  // A real payout integration would subtract amounts already paid out.
  const availableBalance = Number(totalAgg._sum.mentorAmount ?? 0);

  return (
    <div className="max-w-3xl">
      <h1 className="text-h1">Earnings</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <p className="font-display text-h1">{formatCurrency(availableBalance)}</p>
          <p className="mt-1 text-sm text-ink-500">Available balance</p>
        </div>
        <div className="card p-5">
          <p className="font-display text-h1">{formatCurrency(Number(monthlyAgg._sum.mentorAmount ?? 0))}</p>
          <p className="mt-1 text-sm text-ink-500">This month</p>
        </div>
        <div className="card p-5">
          <p className="font-display text-h1">{formatCurrency(availableBalance)}</p>
          <p className="mt-1 text-sm text-ink-500">Total earned</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-ink-300">
        Payouts are not yet wired to a banking provider — see PAYMENT_PROVIDER in .env.example. Balances
        reflect completed, paid sessions only.
      </p>

      <section className="mt-8">
        <h2 className="text-h2">Transactions</h2>
        {payments.length === 0 ? (
          <div className="card mt-3 p-10 text-center text-sm text-ink-500">No transactions yet.</div>
        ) : (
          <div className="card mt-3 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="table-head">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {payments.map((p) => (
                  <tr key={p.id} className="table-row-hover">
                    <td className="px-4 py-3 text-ink">{p.student.name}</td>
                    <td className="px-4 py-3 text-ink-500">{formatCurrency(Number(p.mentorAmount), p.currency)}</td>
                    <td className="px-4 py-3 capitalize text-ink-500">{p.status.toLowerCase()}</td>
                    <td className="px-4 py-3 text-ink-500">{formatDate(p.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
