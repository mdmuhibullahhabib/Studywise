import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { deactivateOwnAccountAction } from "@/features/profile/deactivate-account-action";
import { updateAvatarUrlAction } from "@/features/profile/update-avatar-action";
import { Avatar } from "@/components/ui/avatar";
import { SubmitButton } from "@/components/ui/submit-button";

export const metadata = { title: "Settings" };

export default async function StudentSettingsPage() {
  const session = await requireRole(["STUDENT", "ADMIN"]);
  const user = await db.user.findUniqueOrThrow({ where: { id: session.user.id } });

  return (
    <div className="max-w-lg">
      <h1 className="text-h1">Settings</h1>

      <section className="card mt-6 p-6">
        <h2 className="text-sm font-semibold text-ink">Account</h2>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-500">Name</dt>
            <dd className="text-ink">{user.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-500">Email</dt>
            <dd className="text-ink">{user.email}</dd>
          </div>
        </dl>
      </section>

      <section className="card mt-4 p-6">
        <h2 className="text-sm font-semibold text-ink">Profile photo</h2>
        <div className="mt-3 flex items-center gap-4">
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
          Paste a link to an image you already have hosted somewhere. Direct upload isn&apos;t available yet.
        </p>
      </section>

      <section className="card mt-4 p-6">
        <h2 className="text-sm font-semibold text-ink">Danger zone</h2>
        <p className="mt-1 text-sm text-ink-500">
          Deactivating your account signs you out and hides your profile. You can contact support to
          reactivate.
        </p>
        <form action={deactivateOwnAccountAction} className="mt-3">
          <SubmitButton variant="danger" pendingLabel="Deactivating…" className="!border-0 !bg-transparent !px-0 hover:!bg-transparent hover:underline">
            Deactivate account
          </SubmitButton>
        </form>
      </section>
    </div>
  );
}
