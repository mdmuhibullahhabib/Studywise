"use client";

import { useActionState, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { cancelBookingAction, type CancelBookingState } from "@/features/booking/cancel-booking-action";

const initialState: CancelBookingState = {};

export function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const [state, formAction, pending] = useActionState(cancelBookingAction, initialState);
  const [confirming, setConfirming] = useState(false);

  if (state.success) {
    return (
      <p className="flex items-center gap-1.5 text-sm text-ink-500">
        <CheckCircle2 className="h-4 w-4 text-sage" /> This session has been cancelled.
      </p>
    );
  }

  if (!confirming) {
    return (
      <button onClick={() => setConfirming(true)} className="btn-danger !border-0 !bg-transparent !px-0 hover:!bg-transparent hover:underline">
        <XCircle className="h-4 w-4" /> Cancel session
      </button>
    );
  }

  return (
    <form action={formAction} className="card space-y-3 border-danger/25 p-4">
      <input type="hidden" name="bookingId" value={bookingId} />
      <p className="text-sm text-ink">Cancel this session? This can&apos;t be undone.</p>
      {state.error && <p className="error-text">{state.error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={pending} className="btn-danger">
          {pending ? "Cancelling…" : "Yes, cancel"}
        </button>
        <button type="button" onClick={() => setConfirming(false)} className="btn-ghost">
          Never mind
        </button>
      </div>
    </form>
  );
}
