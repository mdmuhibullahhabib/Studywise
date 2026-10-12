import { notFound } from "next/navigation";
import Link from "next/link";
import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { setUserStatusAction } from "@/features/admin/admin-actions";
import { formatCurrency, formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ mentorId: string }>;
}

export default async function AdminMentorDetailPage({ params }: PageProps) {
  await requireRole("ADMIN");
  const { mentorId } = await params;

  const mentor = await db.user.findUnique({
    where: { id: mentorId },
    include: {
      mentorProfile: true,
      mentorApplication: true,
      bookingsAsMentor: { include: { student: true }, orderBy: { date: "desc" }, take: 10 },
      paymentsAsMentor: true,
      reviewsReceived: { where: { status: "PUBLISHED" }, take: 5, orderBy: { createdAt: "desc" } }
    }
  });
  if (!mentor || mentor.role !== "MENTOR") notFound();

  const totalEarned = mentor.paymentsAsMentor
    .filter((p) => p.status === "SUCCEEDED")
    .reduce((sum, p) => sum + Number(p.mentorAmount), 0);

  return (
    <div className="max-w-2xl">
      <Link href="/admin/mentors" className="text-sm text-sage">
        ← All mentors
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <h1 className="text-h1">{mentor.name}</h1>
          <p className="text-sm text-ink-500">{mentor.email}</p>
        </div>
        <form action={setUserStatusAction}>
          <input type="hidden" name="userId" value={mentor.id} />
          <input type="hidden" name="status" value={mentor.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"} />
          <button type="submit" className="btn-secondary !px-4 !py-2 text-sm">
            {mentor.status === "ACTIVE" ? "Suspend account" : "Reactivate account"}
          </button>
        </form>
      </div>

      <dl className="card mt-6 grid grid-cols-2 gap-4 p-5 text-sm">
        <div>
          <dt className="text-ink-300">Verification</dt>
          <dd className="mt-1 capitalize text-ink">
            {mentor.mentorProfile?.verificationStatus.toLowerCase().replace(/_/g, " ") ?? "—"}
          </dd>
        </div>
        <div>
          <dt className="text-ink-300">Application submitted</dt>
          <dd className="mt-1 text-ink">
            {mentor.mentorApplication ? formatDate(mentor.mentorApplication.submittedAt) : "—"}
          </dd>
        </div>
        <div>
          <dt className="text-ink-300">Rating</dt>
          <dd className="mt-1 text-ink">
            {mentor.mentorProfile ? `${Number(mentor.mentorProfile.ratingAverage).toFixed(1)} (${mentor.mentorProfile.ratingCount})` : "—"}
          </dd>
        </div>
        <div>
          <dt className="text-ink-300">Total earned</dt>
          <dd className="mt-1 text-ink">{formatCurrency(totalEarned)}</dd>
        </div>
      </dl>

      <section className="mt-8">
        <h2 className="text-h2">Recent sessions</h2>
        {mentor.bookingsAsMentor.length === 0 ? (
          <p className="mt-2 text-sm text-ink-500">No sessions yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {mentor.bookingsAsMentor.map((b) => (
              <li key={b.id} className="card flex items-center justify-between p-3 text-sm">
                <span className="text-ink">{b.subject} with {b.student.name}</span>
                <span className="text-ink-500">{formatDate(b.date)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-h2">Recent reviews</h2>
        {mentor.reviewsReceived.length === 0 ? (
          <p className="mt-2 text-sm text-ink-500">No reviews yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {mentor.reviewsReceived.map((r) => (
              <li key={r.id} className="card p-3 text-sm">
                <p className="text-ink">Rating: {r.rating}/5</p>
                {r.review && <p className="mt-1 text-ink-500">{r.review}</p>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
