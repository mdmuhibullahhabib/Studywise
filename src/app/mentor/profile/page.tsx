import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { updateMentorProfileAction } from "@/features/profile/update-profile-actions";
import { SubmitButton } from "@/components/ui/submit-button";
import { VerificationBadge } from "@/components/ui/badge";

export const metadata = { title: "Profile" };

export default async function MentorProfilePage() {
  const session = await requireRole(["MENTOR", "ADMIN"]);
  const profile = await db.mentorProfile.findUnique({ where: { userId: session.user.id } });

  return (
    <div className="max-w-lg">
      <h1 className="text-h1">Your profile</h1>
      {profile && !profile.verified && (
        <p className="mt-2 flex items-center gap-2 text-sm text-ink-500">
          Verification status: <VerificationBadge status={profile.verificationStatus} />
        </p>
      )}
      <p className="mt-1 text-sm text-ink-500">
        Your university, country, and study level appear on your public profile — students trust
        mentors who are transparent about where they studied.
      </p>

      <form action={updateMentorProfileAction} className="card mt-6 space-y-4 p-6">
        <Field label="Title" name="title" defaultValue={profile?.title ?? ""} placeholder="e.g. Master's in Computer Science" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="University" name="university" defaultValue={profile?.university ?? ""} placeholder="e.g. University of Toronto" />
          <Field label="Country" name="country" defaultValue={profile?.country ?? ""} placeholder="e.g. Canada" />
        </div>
        <Field label="Study level" name="studyLevel" defaultValue={profile?.studyLevel ?? ""} placeholder="e.g. Master's" />
        <TextArea label="Bio" name="bio" defaultValue={profile?.bio ?? ""} />
        <Field label="Expertise (comma-separated)" name="expertise" defaultValue={profile?.expertise.join(", ") ?? ""} />
        <Field label="Subjects (comma-separated)" name="subjects" defaultValue={profile?.subjects.join(", ") ?? ""} />
        <TextArea label="Teaching approach" name="teachingApproach" defaultValue={profile?.teachingApproach ?? ""} />
        <div>
          <label htmlFor="hourlyRate" className="field-label">
            Hourly rate ({profile?.currency ?? "USD"})
          </label>
          <input
            id="hourlyRate"
            name="hourlyRate"
            type="number"
            min={0}
            step="0.01"
            defaultValue={profile?.hourlyRate ? Number(profile.hourlyRate) : ""}
            className="input mt-1"
          />
        </div>
        <SubmitButton pendingLabel="Saving…">Save changes</SubmitButton>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder
}: {
  label: string;
  name: string;
  defaultValue: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      <input id={name} name={name} defaultValue={defaultValue} placeholder={placeholder} className="input mt-1" />
    </div>
  );
}

function TextArea({ label, name, defaultValue }: { label: string; name: string; defaultValue: string }) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      <textarea id={name} name={name} rows={3} defaultValue={defaultValue} className="input mt-1" />
    </div>
  );
}
