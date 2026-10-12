import Link from "next/link";
import { Users } from "lucide-react";
import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { Avatar } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Students" };

export default async function MentorStudentsPage() {
  const session = await requireRole(["MENTOR", "ADMIN"]);

  const conversations = await db.conversation.findMany({
    where: { mentorId: session.user.id },
    include: {
      student: true,
      bookings: { orderBy: { date: "desc" } }
    },
    orderBy: { updatedAt: "desc" }
  });

  return (
    <div className="max-w-3xl">
      <h1 className="text-h1">Students</h1>

      {conversations.length === 0 ? (
        <div className="card mt-6 flex flex-col items-center gap-2 p-10 text-center">
          <Users className="h-7 w-7 text-ink-300" />
          <p className="text-sm text-ink-500">Students you&apos;ve messaged or taught will show up here.</p>
        </div>
      ) : (
        <div className="card mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="table-head">
              <tr>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Sessions</th>
                <th className="px-4 py-3">Last active</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {conversations.map((c) => (
                <tr key={c.id} className="table-row-hover">
                  <td className="px-4 py-3">
                    <Link href={`/mentor/students/${c.studentId}`} className="flex items-center gap-2.5 font-medium text-ink hover:underline">
                      <Avatar name={c.student.name} size="sm" />
                      {c.student.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-ink-500">{c.bookings.length}</td>
                  <td className="px-4 py-3 text-ink-500">{formatDate(c.updatedAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/mentor/students/${c.studentId}`} className="text-xs font-semibold text-sage-text hover:text-ink">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
