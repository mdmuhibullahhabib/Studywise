const FAQS: [string, string][] = [
  ["How are mentors verified?", "Every applicant submits their education and experience, which our team reviews before they're approved and become visible to students."],
  ["What if I need to cancel a session?", "You can cancel any upcoming session from its booking details page, as long as it hasn't started yet."],
  ["Are sessions recorded?", "Yes, with disclosure to both participants. Recordings appear back in your conversation once processing finishes."],
  ["How much does StudyWise cost?", "There's no subscription. Each mentor sets their own hourly rate, and you only pay for sessions you book."],
  ["Can I message a mentor before booking?", "Yes — message any mentor directly from their profile to ask questions before committing to a session."],
  ["How do mentors get paid?", "Mentors are paid out for completed sessions, minus a platform fee. See the earnings page in the mentor dashboard for details."]
];

export const metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <div className="container-content max-w-2xl py-16">
      <h1 className="text-h1">Frequently asked questions</h1>
      <div className="mt-8 divide-y divide-line border-y border-line">
        {FAQS.map(([q, a]) => (
          <details key={q} className="py-4">
            <summary className="cursor-pointer list-none text-sm font-medium text-ink">{q}</summary>
            <p className="mt-2 text-sm text-ink-500">{a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
