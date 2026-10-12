"use client";

import { useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

interface MentorQuickBookWidgetProps {
  mentorId: string;
  hourlyRate: number;
  currency: string;
}

const SAMPLE_TIMES = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "04:00 PM",
  "06:00 PM",
];

export function MentorQuickBookWidget({
  mentorId,
  hourlyRate,
  currency,
}: MentorQuickBookWidgetProps) {
  const [duration, setDuration] = useState<30 | 60>(30);
  const [selectedTime, setSelectedTime] = useState<string>("11:00 AM");

  const price = duration === 30 ? (hourlyRate * 30) / 60 : hourlyRate;

  return (
    <aside className="w-full rounded-[24px] border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_14px_rgba(0,0,0,0.02)]">
      <h3 className="font-serif text-lg font-normal text-[#0F1E17]">
        Book a Session
      </h3>

      {/* Duration Switcher (30 min / 60 min) */}
      <div className="mt-4 grid grid-cols-2 rounded-full bg-[#F4F6F4] p-1 text-xs">
        <button
          type="button"
          onClick={() => setDuration(30)}
          className={`rounded-full py-1.5 font-medium transition-all ${
            duration === 30
              ? "bg-[#1C3E30] text-white shadow-xs"
              : "text-[#5D6F66] hover:text-[#0F1E17]"
          }`}
        >
          30 min
        </button>
        <button
          type="button"
          onClick={() => setDuration(60)}
          className={`rounded-full py-1.5 font-medium transition-all ${
            duration === 60
              ? "bg-[#1C3E30] text-white shadow-xs"
              : "text-[#5D6F66] hover:text-[#0F1E17]"
          }`}
        >
          60 min
        </button>
      </div>

      {/* Price Display */}
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-serif text-2xl font-bold text-[#0F1E17]">
          {formatCurrency(price, currency)}
        </span>
        <span className="text-xs text-[#7B8C84]">/ session</span>
      </div>

      {/* Select a Date Input */}
      <div className="mt-5">
        <label className="block text-[11px] font-medium text-[#73847D]">
          Select a date
        </label>
        <select
          defaultValue="2025-09-25"
          className="mt-1.5 w-full rounded-xl border border-[#DCE4E0] bg-[#FAFBF9] px-3.5 py-2 text-xs text-[#1C2C24] focus:border-[#1C3E30] focus:outline-none"
        >
          <option value="2025-09-25">Thu, Sep 25, 2025</option>
          <option value="2025-09-26">Fri, Sep 26, 2025</option>
          <option value="2025-09-27">Sat, Sep 27, 2025</option>
        </select>
      </div>

      {/* Available Time Slots Grid */}
      <div className="mt-5">
        <label className="block text-[11px] font-medium text-[#73847D]">
          Available time slots
        </label>
        <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
          {SAMPLE_TIMES.map((time) => {
            const isSelected = selectedTime === time;
            return (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`rounded-lg py-2 text-[11px] font-medium transition-all ${
                  isSelected
                    ? "bg-[#1C3E30] text-white shadow-2xs"
                    : "border border-[#DCE4E0] bg-white text-[#3D4F46] hover:border-[#1C3E30]"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA Button */}
      <Link
        href={`/student/book/${mentorId}`}
        className="mt-6 flex w-full items-center justify-center rounded-full bg-[#1C3E30] py-3 text-xs font-medium text-white shadow-sm transition-all hover:bg-[#142e23]"
      >
        <span>Continue to Booking →</span>
      </Link>
    </aside>
  );
}