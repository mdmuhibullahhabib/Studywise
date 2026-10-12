import { requireRole } from "@/lib/permissions";
import { db } from "@/lib/db";
import { updateStudentProfileAction } from "@/features/profile/update-profile-actions";
import { SubmitButton } from "@/components/ui/submit-button";

export const metadata = { title: "Profile" };

export default async function StudentProfilePage() {
  const session = await requireRole(["STUDENT", "ADMIN"]);
  const profile = await db.studentProfile.findUnique({ where: { userId: session.user.id } });

  return (
    <div className="max-w-lg">
      <h1 className="text-h1">Your profile</h1>

      <form action={updateStudentProfileAction} className="card mt-6 space-y-4 p-6">
        <Field label="Education level" name="educationLevel" defaultValue={profile?.educationLevel ?? ""} />
        <Field label="Institution" name="institution" defaultValue={profile?.institution ?? ""} />
        <Field
          label="Subjects (comma-separated)"
          name="subjects"
          defaultValue={profile?.subjects.join(", ") ?? ""}
        />
        <TextArea label="Learning goals" name="goals" defaultValue={profile?.goals ?? ""} />
        <TextArea label="Bio" name="bio" defaultValue={profile?.bio ?? ""} />
        <SubmitButton pendingLabel="Saving…">Save changes</SubmitButton>
      </form>
    </div>
  );
}

function Field({ label, name, defaultValue }: { label: string; name: string; defaultValue: string }) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="input mt-1"
      />
    </div>
  );
}

function TextArea({ label, name, defaultValue }: { label: string; name: string; defaultValue: string }) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={3}
        defaultValue={defaultValue}
        className="input mt-1"
      />
    </div>
  );
}
