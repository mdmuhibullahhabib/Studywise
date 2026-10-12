"use client";

import { useActionState, useState } from "react";
import { CheckCircle2, Star } from "lucide-react";
import { createReviewAction, type ReviewFormState } from "@/features/reviews/create-review-action";

const initialState: ReviewFormState = {};

export function ReviewForm({ bookingId, mentorName }: { bookingId: string; mentorName: string }) {
  const [state, formAction, pending] = useActionState(createReviewAction, initialState);
  const [rating, setRating] = useState(5);

  if (state.success) {
    return (
      <p className="flex items-center gap-1.5 text-sm text-ink-500">
        <CheckCircle2 className="h-4 w-4 text-sage" /> Thanks — your review for {mentorName} has been posted.
      </p>
    );
  }

  return (
    <form action={formAction} className="card space-y-3 p-5">
      <input type="hidden" name="bookingId" value={bookingId} />
      <input type="hidden" name="rating" value={rating} />
      <p className="text-sm font-semibold text-ink">How was your session with {mentorName}?</p>

      <div className="flex gap-1" role="radiogroup" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onClick={() => setRating(n)}
          >
            <Star className={`h-6 w-6 ${n <= rating ? "fill-gold text-gold" : "text-ink-300"}`} />
          </button>
        ))}
      </div>

      <textarea
        name="review"
        rows={3}
        placeholder="Optional — what went well?"
        className="input"
      />

      {state.error && <p className="error-text">{state.error}</p>}

      <button type="submit" disabled={pending} className="btn-primary text-sm">
        {pending ? "Submitting…" : "Submit review"}
      </button>
    </form>
  );
}
