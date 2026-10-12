import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import {
  addAvailabilityWindowAction,
  removeAvailabilityWindowAction,
  blockDateAction
} from "@/features/availability/availability-actions";
import { deactivateOwnAccountAction } from "@/features/profile/deactivate-account-action";
import { updateAvatarUrlAction } from "@/features/profile/update-avatar-action";
import { Avatar } from "@/components/ui/avatar";
import { SubmitButton } from "@/components/ui/submit-button";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Settings" };

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default async function MentorSettingsPage() {
  const session = await requireRole(["MENTOR", "ADMIN"]);
  const user = await db.user.findUniqueOrThrow({ where: { id: session.user.id } });
  const mentorProfile = await db.mentorProfile.findUniqueOrThrow({ where: { userId: session.user.id } });

  const [windows, exceptions] = await Promise.all([
    db.availability.findMany({ where: { mentorId: mentorProfile.id }, orderBy: { dayOfWeek: "asc" } }),
    db.availabilityException.findMany({
      where: { mentorId: mentorProfile.id, isBlocked: true, date: { gte: new Date() } },
      orderBy: { date: "asc" }
    })
  ]);

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-h1">Settings</h1>
        <p className="mt-1 text-sm text-ink-500">Manage your profile photo, weekly availability, and blocked dates.</p>
      </div>

      <section>
        <h2 className="text-h2">Profile photo</h2>
        <div className="card mt-3 flex items-center gap-4 p-5">
          <Avatar name={user.name} src={user.avatarUrl} size="lg" />
          <form action={updateAvatarUrlAction} className="flex flex-1 gap-2">
            <input
              name="avatarUrl"
              type="url"
              defaultValue={user.avatarUrl ?? ""}
              placeholder="https://…"
              className="input flex-1"
            />
            <SubmitButton variant="secondary" pendingLabel="Saving…" className="text-sm">
              Save
            </SubmitButton>
          </form>
        </div>
        <p className="mt-2 text-meta text-ink-300">
          A clear photo builds trust with students. Direct upload isn&apos;t available yet — paste a link
          to an image you already have hosted.
        </p>
      </section>

      <section>
        <h2 className="text-h2">Weekly availability</h2>
        <div className="card mt-3 divide-y divide-line">
          {windows.length === 0 ? (
            <p className="p-5 text-sm text-ink-500">No availability set — students won&apos;t be able to book you yet.</p>
          ) : (
            windows.map((w) => (
              <div key={w.id} className="flex items-center justify-between p-4 text-sm">
                <span className="text-ink">
                  {DAYS[w.dayOfWeek]} · {w.startTime}–{w.endTime} ({w.timezone})
                </span>
                <form action={removeAvailabilityWindowAction}>
                  <input type="hidden" name="availabilityId" value={w.id} />
                  <SubmitButton variant="ghost" pendingLabel="…" className="!text-danger text-xs">
                    Remove
                  </SubmitButton>
                </form>
              </div>
            ))
          )}
        </div>

        <form action={addAvailabilityWindowAction} className="card mt-3 flex flex-wrap items-end gap-3 p-4">
          <div>
            <label className="field-label">Day</label>
            <select name="dayOfWeek" className="input mt-1 !py-1.5">
              {DAYS.map((d, i) => (
                <option key={d} value={i}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label">Start</label>
            <input type="time" name="startTime" required defaultValue="09:00" className="input mt-1 !py-1.5" />
          </div>
          <div>
            <label className="field-label">End</label>
            <input type="time" name="endTime" required defaultValue="17:00" className="input mt-1 !py-1.5" />
          </div>
          <input type="hidden" name="timezone" value="UTC" />
          <SubmitButton variant="secondary" pendingLabel="Adding…" className="!px-4 !py-1.5 text-sm">
            Add window
          </SubmitButton>
        </form>
      </section>

      <section>
        <h2 className="text-h2">Blocked dates</h2>
        <div className="card mt-3 divide-y divide-line">
          {exceptions.length === 0 ? (
            <p className="p-5 text-sm text-ink-500">No upcoming blocked dates.</p>
          ) : (
            exceptions.map((e) => (
              <div key={e.id} className="flex items-center justify-between p-4 text-sm">
                <span className="text-ink">
                  {formatDate(e.date)} {e.reason && `— ${e.reason}`}
                </span>
              </div>
            ))
          )}
        </div>

        <form action={blockDateAction} className="card mt-3 flex flex-wrap items-end gap-3 p-4">
          <div>
            <label className="field-label">Date</label>
            <input type="date" name="date" required className="input mt-1 !py-1.5" />
          </div>
          <div className="flex-1">
            <label className="field-label">Reason (optional)</label>
            <input name="reason" className="input mt-1 !py-1.5" />
          </div>
          <SubmitButton variant="secondary" pendingLabel="Blocking…" className="!px-4 !py-1.5 text-sm">
            Block date
          </SubmitButton>
        </form>
      </section>

      <section>
        <h2 className="text-h2">Danger zone</h2>
        <div className="card mt-3 p-6">
          <p className="text-sm text-ink-500">
            Deactivating removes you from mentor discovery and signs you out.
          </p>
          <form action={deactivateOwnAccountAction} className="mt-3">
            <SubmitButton variant="danger" pendingLabel="Deactivating…" className="!border-0 !bg-transparent !px-0 hover:!bg-transparent hover:underline">
              Deactivate account
            </SubmitButton>
          </form>
        </div>
      </section>
    </div>
  );
}
