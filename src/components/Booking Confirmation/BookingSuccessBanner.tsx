"use client";

import Link from "next/link";
import { Check } from "lucide-react";

export function BookingSuccessBanner() {
  return (
    <div className="relative mt-12 w-full overflow-hidden rounded-2xl border border-[#DCE5DF] bg-[#F1F5F2] p-6 sm:p-8">
      {/* Background Graphic Accent */}
      <div className="pointer-events-none absolute right-0 bottom-0 opacity-15">
        <svg width="240" height="120" viewBox="0 0 240 120" fill="none">
          <path
            d="M20 120 L20 60 L30 50 L40 60 L40 120 M70 120 L70 30 L80 15 L90 30 L90 120 M130 120 L130 45 L145 25 L160 45 L160 120 M190 120 L190 55 L200 40 L210 55 L210 120"
            stroke="#1C3E30"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        {/* Success Message */}
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1C3E30] text-white shadow-sm">
            <Check className="h-5 w-5 stroke-[2.5]" />
          </div>

          <div>
            <h3 className="font-serif text-xl font-normal text-[#0F1E17] sm:text-2xl">
              Your session is booked.
            </h3>
            <p className="mt-1 text-xs text-[#52645B] sm:text-sm">
              You&apos;ll receive a confirmation email and a reminder before the session.
            </p>

            <Link
              href="/dashboard/bookings"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#BFCFC6] bg-white px-5 py-2 text-xs font-medium text-[#1C3E30] shadow-2xs hover:bg-neutral-50"
            >
              <span>View Booking</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Hand-Drawn Style Wish */}
        <div className="-rotate-6 text-right sm:pr-8 select-none">
          <p className="font-serif italic text-sm text-[#2F453B] sm:text-base">
            Good luck
          </p>
          <p className="font-serif italic text-sm text-[#2F453B] sm:text-base">
            with your journey!
          </p>
        </div>
      </div>
    </div>
  );
}