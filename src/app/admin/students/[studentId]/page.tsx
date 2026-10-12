import { notFound } from "next/navigation";
import Link from "next/link";
import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { setUserStatusAction } from "@/features/admin/admin-actions";
import { formatCurrency, formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ studentId: string }>;
}

export default async function AdminStudentDetailPage({ params }: PageProps) {
  await requireRole("ADMIN");
  const { studentId } = await params;

  const student = await db.user.findUnique({
    where: { id: studentId },
    include: {
      studentProfile: true,
      bookingsAsStudent: { include: { mentor: true }, orderBy: { date: "desc" }, take: 10 },
      paymentsAsStudent: true
    }
  });
  if (!student || student.role !== "STUDENT") notFound();

  const totalSpent = student.paymentsAsStudent
    .filter((p) => p.status === "SUCCEEDED")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="max-w-2xl">
      <Link href="/admin/students" className="text-sm text-sage">
        ← All students
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <h1 className="text-h1">{student.name}</h1>
          <p className="text-sm text-ink-500">{student.email}</p>
        </div>
        <form action={setUserStatusAction}>
          <input type="hidden" name="userId" value={student.id} />
          <input type="hidden" name="status" value={student.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"} />
          <button type="submit" className="btn-secondary !px-4 !py-2 text-sm">
            {student.status === "ACTIVE" ? "Suspend account" : "Reactivate account"}
          </button>
        </form>
      </div>

      <dl className="card mt-6 grid grid-cols-2 gap-4 p-5 text-sm">
        <div>
          <dt className="text-ink-300">Joined</dt>
          <dd className="mt-1 text-ink">{formatDate(student.createdAt)}</dd>
        </div>
        <div>
          <dt className="text-ink-300">Status</dt>
          <dd className="mt-1 capitalize text-ink">{student.status.toLowerCase()}</dd>
        </div>
        <div>
          <dt className="text-ink-300">Education level</dt>
          <dd className="mt-1 text-ink">{student.studentProfile?.educationLevel ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-ink-300">Total spent</dt>
          <dd className="mt-1 text-ink">{formatCurrency(totalSpent)}</dd>
        </div>
      </dl>

      <section className="mt-8">
        <h2 className="text-h2">Recent sessions</h2>
        {student.bookingsAsStudent.length === 0 ? (
          <p className="mt-2 text-sm text-ink-500">No sessions yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {student.bookingsAsStudent.map((b) => (
              <li key={b.id} className="card flex items-center justify-between p-3 text-sm">
                <span className="text-ink">{b.subject} with {b.mentor.name}</span>
                <span className="text-ink-500">{formatDate(b.date)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
