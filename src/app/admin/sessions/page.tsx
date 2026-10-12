import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata = { title: "Sessions" };

export default async function AdminSessionsPage() {
  await requireRole("ADMIN");

  const bookings = await db.booking.findMany({
    include: { student: true, mentor: true, payment: true, meeting: true },
    orderBy: { date: "desc" },
    take: 50
  });

  return (
    <div>
      <h1 className="text-h1">Sessions</h1>

      <div className="card mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="table-head">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Mentor</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Meeting</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-ink-500">
                  No sessions yet.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id} className="table-row-hover">
                  <td className="px-4 py-3 text-ink">{b.student.name}</td>
                  <td className="px-4 py-3 text-ink">{b.mentor.name}</td>
                  <td className="px-4 py-3 text-ink-500">{formatDate(b.date)}</td>
                  <td className="px-4 py-3 text-ink-500">{b.duration} min</td>
                  <td className="px-4 py-3 capitalize text-ink-500">{b.status.toLowerCase()}</td>
                  <td className="px-4 py-3 text-ink-500">
                    {b.payment ? `${b.payment.status.toLowerCase()} · ${formatCurrency(Number(b.payment.amount), b.payment.currency)}` : "—"}
                  </td>
                  <td className="px-4 py-3 capitalize text-ink-500">{b.meeting?.status.toLowerCase() ?? "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
