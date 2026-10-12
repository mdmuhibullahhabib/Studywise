import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { approveApplicationAction, rejectApplicationAction, requestMoreInfoAction } from "@/features/admin/admin-actions";
import { Avatar } from "@/components/ui/avatar";
import { VerificationBadge } from "@/components/ui/badge";
import { SubmitButton } from "@/components/ui/submit-button";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Applications" };

export default async function AdminApplicationsPage() {
  await requireRole("ADMIN");

  const applications = await db.mentorApplication.findMany({
    where: { status: { in: ["PENDING", "UNDER_REVIEW", "MORE_INFO_REQUIRED"] } },
    include: { user: { include: { mentorProfile: true } } },
    orderBy: { submittedAt: "asc" }
  });

  return (
    <div>
      <h1 className="text-h1">Mentor applications</h1>
      <p className="mt-1 text-sm text-ink-500">{applications.length} awaiting review</p>

      <div className="mt-6 space-y-4">
        {applications.length === 0 ? (
          <div className="card p-10 text-center text-sm text-ink-500">No applications pending review.</div>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar name={app.user.name} size="md" />
                  <div>
                    <p className="font-medium text-ink">{app.user.name}</p>
                    <p className="text-sm text-ink-500">{app.user.email}</p>
                    <p className="mt-0.5 text-meta text-ink-300">Submitted {formatDate(app.submittedAt)}</p>
                  </div>
                </div>
                <VerificationBadge status={app.status} />
              </div>

              {app.user.mentorProfile && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {app.user.mentorProfile.expertise.map((item) => (
                    <span key={item} className="rounded-sm bg-paper-muted px-2 py-1 text-xs text-ink-500">
                      {item}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                <form action={approveApplicationAction}>
                  <input type="hidden" name="applicationId" value={app.id} />
                  <SubmitButton variant="primary" pendingLabel="Approving…" className="!px-4 !py-2 text-xs">
                    Approve
                  </SubmitButton>
                </form>
                <form action={rejectApplicationAction}>
                  <input type="hidden" name="applicationId" value={app.id} />
                  <input type="hidden" name="reason" value="Did not meet verification criteria" />
                  <SubmitButton variant="secondary" pendingLabel="Rejecting…" className="!px-4 !py-2 text-xs">
                    Reject
                  </SubmitButton>
                </form>
                <form action={requestMoreInfoAction}>
                  <input type="hidden" name="applicationId" value={app.id} />
                  <input type="hidden" name="reason" value="Please provide additional experience detail" />
                  <SubmitButton variant="ghost" pendingLabel="Sending…" className="text-xs">
                    Request more info
                  </SubmitButton>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
