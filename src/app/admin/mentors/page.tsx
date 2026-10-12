import { BadgeCheck } from "lucide-react";
import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { setUserStatusAction } from "@/features/admin/admin-actions";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SubmitButton } from "@/components/ui/submit-button";
import { formatCurrency } from "@/lib/utils";

export const metadata = { title: "Mentors" };

interface PageProps {
  searchParams: Promise<{ q?: string; verified?: string }>;
}

export default async function AdminMentorsPage({ searchParams }: PageProps) {
  await requireRole("ADMIN");
  const { q, verified } = await searchParams;

  const mentors = await db.mentorProfile.findMany({
    where: {
      user: q ? { name: { contains: q, mode: "insensitive" } } : undefined,
      ...(verified ? { verified: verified === "true" } : {})
    },
    include: { user: true, _count: { select: { bookings: true } } },
    orderBy: { createdAt: "desc" },
    take: 50
  });

  return (
    <div>
      <h1 className="text-h1">Mentors</h1>

      <form method="get" className="mt-4 flex flex-wrap gap-3">
        <input name="q" defaultValue={q} placeholder="Search by name…" className="input w-full sm:w-64" />
        <select name="verified" defaultValue={verified ?? ""} className="input w-full sm:w-48">
          <option value="">Any verification</option>
          <option value="true">Verified</option>
          <option value="false">Unverified</option>
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
              <th className="px-4 py-3">Rate</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Sessions</th>
              <th className="px-4 py-3">Verified</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {mentors.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-ink-500">
                  No mentors match those filters.
                </td>
              </tr>
            ) : (
              mentors.map((mentor) => (
                <tr key={mentor.id} className="table-row-hover">
                  <td className="px-4 py-3">
                    <a href={`/admin/mentors/${mentor.user.id}`} className="flex items-center gap-2.5 font-medium text-ink hover:underline">
                      <Avatar name={mentor.user.name} size="sm" />
                      {mentor.user.name}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-ink-500">
                    {mentor.hourlyRate ? formatCurrency(Number(mentor.hourlyRate), mentor.currency) : "—"}
                  </td>
                  <td className="px-4 py-3 text-ink-500">
                    {Number(mentor.ratingAverage).toFixed(1)} ({mentor.ratingCount})
                  </td>
                  <td className="px-4 py-3 text-ink-500">{mentor._count.bookings}</td>
                  <td className="px-4 py-3">
                    {mentor.verified ? (
                      <Badge variant="warning">
                        <BadgeCheck className="h-3 w-3" /> Verified
                      </Badge>
                    ) : (
                      <span className="text-meta text-ink-300">Unverified</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={mentor.user.status === "ACTIVE" ? "success" : "danger"}>
                      {mentor.user.status.toLowerCase()}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <form action={setUserStatusAction}>
                      <input type="hidden" name="userId" value={mentor.user.id} />
                      <input type="hidden" name="status" value={mentor.user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"} />
                      <SubmitButton variant="ghost" pendingLabel="…" className="text-xs">
                        {mentor.user.status === "ACTIVE" ? "Suspend" : "Reactivate"}
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
