export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="container-content max-w-2xl py-16">
      <h1 className="text-h1">Privacy Policy</h1>
      <p className="mt-3 text-sm text-ink-300">
        Placeholder — replace with a real privacy policy reviewed by counsel before launch.
      </p>

      <div className="mt-8 space-y-6 text-sm text-ink-500">
        <section>
          <h2 className="text-base text-ink">Data we collect</h2>
          <p className="mt-2">
            Account details (name, email), profile information you add, messages, booking history, and
            session recordings you're a participant in.
          </p>
        </section>
        <section>
          <h2 className="text-base text-ink">Recordings</h2>
          <p className="mt-2">
            Session recordings are stored privately and are accessible only to the student, the mentor, and
            authorized platform staff investigating a report — never publicly.
          </p>
        </section>
        <section>
          <h2 className="text-base text-ink">Third parties</h2>
          <p className="mt-2">
            We use third-party providers for payments, video, storage, and email delivery. Each only
            receives the data required to perform its function.
          </p>
        </section>
        <section>
          <h2 className="text-base text-ink">Your choices</h2>
          <p className="mt-2">
            You can edit or deactivate your account at any time from settings, or contact us to request
            deletion.
          </p>
        </section>
      </div>
    </div>
  );
}
