import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { setUserStatusAction } from "@/features/admin/admin-actions";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SubmitButton } from "@/components/ui/submit-button";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Students" };

interface PageProps {
  searchParams: Promise<{ q?: string; status?: string }>;
}

export default async function AdminStudentsPage({ searchParams }: PageProps) {
  await requireRole("ADMIN");
  const { q, status } = await searchParams;

  const students = await db.user.findMany({
    where: {
      role: "STUDENT",
      ...(q ? { name: { contains: q, mode: "insensitive" } } : {}),
      ...(status ? { status: status as "ACTIVE" | "SUSPENDED" | "DEACTIVATED" } : {})
    },
    include: { studentProfile: true, _count: { select: { bookingsAsStudent: true } } },
    orderBy: { createdAt: "desc" },
    take: 50
  });

  return (
    <div>
      <h1 className="text-h1">Students</h1>

      <form method="get" className="mt-4 flex flex-wrap gap-3">
        <input name="q" defaultValue={q} placeholder="Search by name…" className="input w-full sm:w-64" />
        <select name="status" defaultValue={status ?? ""} className="input w-full sm:w-48">
          <option value="">Any status</option>
          <option value="ACTIVE">Active</option>
          <option value="SUSPENDED">Suspended</option>
          <option value="DEACTIVATED">Deactivated</option>
        </select>
        <button type="submit" className="btn-secondary !px-4 !py-2 text-sm">
          Filter
        </button>
      </form>

      <div className="card mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="table-head">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Sessions</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {students.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-ink-500">
                  No students match those filters.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id} className="table-row-hover">
                  <td className="px-4 py-3">
                    <a href={`/admin/students/${student.id}`} className="flex items-center gap-2.5 font-medium text-ink hover:underline">
                      <Avatar name={student.name} size="sm" />
                      {student.name}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-ink-500">{formatDate(student.createdAt)}</td>
                  <td className="px-4 py-3 text-ink-500">{student._count.bookingsAsStudent}</td>
                  <td className="px-4 py-3">
                    <Badge variant={student.status === "ACTIVE" ? "success" : "danger"}>
                      {student.status.toLowerCase()}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <form action={setUserStatusAction}>
                      <input type="hidden" name="userId" value={student.id} />
                      <input type="hidden" name="status" value={student.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"} />
                      <SubmitButton variant="ghost" pendingLabel="…" className="text-xs">
                        {student.status === "ACTIVE" ? "Suspend" : "Reactivate"}
                      </SubmitButton>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
