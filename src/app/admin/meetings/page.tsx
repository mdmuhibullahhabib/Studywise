import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Meetings" };

export default async function AdminMeetingsPage() {
  await requireRole("ADMIN");

  const meetings = await db.meeting.findMany({
    include: { student: true, mentor: true },
    orderBy: { scheduledStart: "desc" },
    take: 50
  });

  return (
    <div>
      <h1 className="text-h1">Meetings</h1>
      <p className="mt-1 text-sm text-ink-500">
        Metadata only — recordings are not accessible from the admin console by default.
      </p>

      <div className="card mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="table-head">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Mentor</th>
              <th className="px-4 py-3">Scheduled</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Recording</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {meetings.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-ink-500">
                  No meetings yet.
                </td>
              </tr>
            ) : (
              meetings.map((m) => (
                <tr key={m.id} className="table-row-hover">
                  <td className="px-4 py-3 text-ink">{m.student.name}</td>
                  <td className="px-4 py-3 text-ink">{m.mentor.name}</td>
                  <td className="px-4 py-3 text-ink-500">{formatDate(m.scheduledStart)}</td>
                  <td className="px-4 py-3 text-ink-500">{m.duration ? `${m.duration} min` : "—"}</td>
                  <td className="px-4 py-3 capitalize text-ink-500">{m.status.toLowerCase()}</td>
                  <td className="px-4 py-3 capitalize text-ink-500">{m.recordingStatus.toLowerCase()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
