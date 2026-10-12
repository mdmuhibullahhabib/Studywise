import { notFound } from "next/navigation";
import Link from "next/link";
import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ studentId: string }>;
}

export default async function MentorStudentDetailPage({ params }: PageProps) {
  const session = await requireRole(["MENTOR", "ADMIN"]);
  const { studentId } = await params;

  const conversation = await db.conversation.findUnique({
    where: { studentId_mentorId: { studentId, mentorId: session.user.id } },
    include: {
      student: { include: { studentProfile: true } },
      bookings: { orderBy: { date: "desc" } }
    }
  });
  // A mentor may only view students they actually have a conversation with —
  // this is the ownership boundary, not just role.
  if (!conversation) notFound();

  const upcoming = conversation.bookings.filter((b) => ["PENDING", "CONFIRMED"].includes(b.status));
  const past = conversation.bookings.filter((b) => !["PENDING", "CONFIRMED"].includes(b.status));

  return (
    <div className="max-w-2xl">
      <h1 className="text-h1">{conversation.student.name}</h1>

      <section className="card mt-6 grid grid-cols-2 gap-4 p-5 text-sm">
        <div>
          <p className="text-ink-300">Education level</p>
          <p className="mt-1 text-ink">{conversation.student.studentProfile?.educationLevel ?? "Not shared"}</p>
        </div>
        <div>
          <p className="text-ink-300">Subjects</p>
          <p className="mt-1 text-ink">{conversation.student.studentProfile?.subjects.join(", ") || "Not shared"}</p>
        </div>
        <div className="col-span-2">
          <p className="text-ink-300">Learning goals</p>
          <p className="mt-1 text-ink">{conversation.student.studentProfile?.goals ?? "Not shared"}</p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-h2">Upcoming sessions</h2>
        {upcoming.length === 0 ? (
          <p className="mt-2 text-sm text-ink-500">None scheduled.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {upcoming.map((b) => (
              <li key={b.id} className="card p-3 text-sm">
                {b.subject} — {formatDate(b.date)} at {b.startTime}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-h2">Session history</h2>
        {past.length === 0 ? (
          <p className="mt-2 text-sm text-ink-500">No past sessions.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {past.map((b) => (
              <li key={b.id} className="card flex items-center justify-between p-3 text-sm">
                <span>
                  {b.subject} — {formatDate(b.date)}
                </span>
                <span className="capitalize text-ink-500">{b.status.toLowerCase()}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Link href={`/mentor/messages/${conversation.id}`} className="mt-8 inline-block text-sm font-medium text-sage">
        Go to conversation →
      </Link>
    </div>
  );
}
