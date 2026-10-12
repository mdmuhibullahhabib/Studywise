export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="container-content max-w-2xl py-16">
      <h1 className="text-h1">Terms of Service</h1>
      <p className="mt-3 text-sm text-ink-300">
        Placeholder — replace with legal copy reviewed by counsel before launch. This is not real legal text.
      </p>

      <div className="mt-8 space-y-6 text-sm text-ink-500">
        <section>
          <h2 className="text-base text-ink">1. The service</h2>
          <p className="mt-2">
            StudyWise connects students with independent mentors for paid tutoring sessions. StudyWise
            facilitates discovery, messaging, scheduling, payment, and recording of sessions but is not a
            party to the tutoring relationship itself.
          </p>
        </section>
        <section>
          <h2 className="text-base text-ink">2. Accounts</h2>
          <p className="mt-2">
            You're responsible for the accuracy of the information on your account and for keeping your
            credentials secure.
          </p>
        </section>
        <section>
          <h2 className="text-base text-ink">3. Bookings and cancellations</h2>
          <p className="mt-2">
            Sessions may be cancelled before they begin, subject to the cancellation window shown at booking.
          </p>
        </section>
        <section>
          <h2 className="text-base text-ink">4. Recordings</h2>
          <p className="mt-2">
            Sessions may be recorded with disclosure to both participants. Recordings are private to the
            student, mentor, and authorized platform staff.
          </p>
        </section>
        <section>
          <h2 className="text-base text-ink">5. Payments</h2>
          <p className="mt-2">
            Mentors set their own rates. StudyWise retains a platform fee from each completed, paid session.
          </p>
        </section>
      </div>
    </div>
  );
}
