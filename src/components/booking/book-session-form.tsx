


"use client";

import { useMemo, useState } from "react";
import { useActionState } from "react";
import Image from "next/image";
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  Lock, 
  RotateCcw, 
  ShieldCheck 
} from "lucide-react";
import { createBookingAction, type CreateBookingFormState } from "@/features/booking/create-booking-action";
import type { TimeSlot } from "@/features/booking/availability.service";
import { formatCurrency, formatDate } from "@/lib/utils";

const initialState: CreateBookingFormState = {};

interface BookSessionFormProps {
  mentorProfileId: string;
  mentorHourlyRate: number;
  currency: string;
  slots: TimeSlot[];
  durationMinutes: number;
  mentorName?: string;
  mentorImage?: string | null;
  mentorUniversity?: string;
}

export function BookSessionForm({
  mentorProfileId,
  mentorHourlyRate,
  currency,
  slots,
  durationMinutes,
  mentorName = "Arif Rahman",
  mentorImage,
  mentorUniversity = "University of Manchester",
}: BookSessionFormProps) {
  const [state, formAction, pending] = useActionState(createBookingAction, initialState);
  const [selectedDuration, setSelectedDuration] = useState<number>(durationMinutes || 30);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(slots[0] ?? null);
  const [subject, setSubject] = useState("University Application Guidance");

  // Group slots by date string YYYY-MM-DD
  const slotsByDate = useMemo(() => {
    const map = new Map<string, TimeSlot[]>();
    for (const slot of slots) {
      const list = map.get(slot.date) ?? [];
      list.push(slot);
      map.set(slot.date, list);
    }
    return map;
  }, [slots]);

  const availableDates = useMemo(() => Array.from(slotsByDate.keys()), [slotsByDate]);

  const initialDateStr = useMemo(() => {
    if (slots[0]?.date) return slots[0].date;
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  }, [slots]);

  const [activeDate, setActiveDate] = useState<string>(
    selectedSlot ? selectedSlot.date : availableDates[0] || initialDateStr
  );

  // Month navigation view state
  // const [currentMonth, setCurrentMonth] = useState<Date>(() => {
  //   if (activeDate) {
  //     const [y, m] = activeDate.split("-").map(Number);
  //     return new Date(y, m - 1, 1);
  //   }
  //   const now = new Date();
  //   return new Date(now.getFullYear(), now.getMonth(), 1);
  // });


const [currentMonth, setCurrentMonth] = useState<Date>(() => {
  if (activeDate) {
    const parts = activeDate.split("-");
    const y = Number(parts[0]);
    const m = Number(parts[1]);

    if (Number.isFinite(y) && Number.isFinite(m) && m >= 1 && m <= 12) {
      return new Date(y, m - 1, 1);
    }
  }

  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
});


  // Slots for the active chosen date
  const activeSlots = useMemo(() => {
    return slotsByDate.get(activeDate) ?? [];
  }, [slotsByDate, activeDate]);

  const price = (mentorHourlyRate * selectedDuration) / 60;

  // Dynamic Month Calendar Grid
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const startOffset = (firstDay + 6) % 7; // Monday start

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Prev month days
    for (let i = startOffset - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrent: false,
        dateKey: "",
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const mStr = String(month + 1).padStart(2, "0");
      const dStr = String(d).padStart(2, "0");
      days.push({
        day: d,
        isCurrent: true,
        dateKey: `${year}-${mStr}-${dStr}`,
      });
    }

    // Next month padding
    const remainder = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remainder; i++) {
      days.push({
        day: i,
        isCurrent: false,
        dateKey: "",
      });
    }

    return days;
  }, [currentMonth]);

  const monthLabel = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <form action={formAction} className="w-full">
      {/* Hidden inputs */}
      <input type="hidden" name="mentorProfileId" value={mentorProfileId} />
      <input type="hidden" name="duration" value={selectedDuration} />
      <input type="hidden" name="subject" value={subject} />
      {selectedSlot && (
        <>
          <input type="hidden" name="date" value={selectedSlot.date} />
          <input type="hidden" name="startTime" value={selectedSlot.startTime} />
          <input type="hidden" name="endTime" value={selectedSlot.endTime} />
          <input type="hidden" name="timezone" value={selectedSlot.timezone} />
        </>
      )}

      {/* ================= STEP INDICATOR ================= */}
      <div className="flex items-center justify-between border-b border-[#E7ECE8] pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C3E30] text-xs font-semibold text-white">
            01
          </div>
          <span className="text-xs font-semibold text-[#0F1E17]">Choose Session</span>
        </div>

        <div className="hidden h-[1px] w-12 bg-[#E7ECE8] sm:block lg:w-20" />

        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C3E30] text-xs font-medium text-white shadow-xs ring-1 ring-[#1C3E30]">
            02
          </div>
          <span className="text-xs font-medium text-[#0F1E17]">Select Time</span>
        </div>

        <div className="hidden h-[1px] w-12 bg-[#E7ECE8] sm:block lg:w-20" />

        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#DCE4E0] bg-white text-xs font-medium text-[#73847C]">
            03
          </div>
          <span className="text-xs font-medium text-[#73847C]">Confirm</span>
        </div>
      </div>

      {/* ================= 1. CHOOSE SESSION ================= */}
      <div className="mt-8">
        <h3 className="font-serif text-[17px] font-normal text-[#0F1E17]">
          1. Choose Session
        </h3>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* 30 Minutes */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setSelectedDuration(30)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelectedDuration(30);
            }}
            className={`relative flex cursor-pointer items-start justify-between rounded-2xl border p-5 transition-all ${
              selectedDuration === 30
                ? "border-[#1C3E30] bg-white shadow-xs ring-1 ring-[#1C3E30]"
                : "border-[#E7ECE8] bg-white hover:border-[#CFD9D3]"
            }`}
          >
            <div className="flex items-start gap-3.5">
              <Clock className="mt-0.5 h-4 w-4 text-[#1C3E30]" />
              <div>
                <h4 className="text-[13px] font-semibold text-[#0F1E17]">30 minutes</h4>
                <p className="mt-0.5 text-xs text-[#5F7068]">Quick questions &amp; guidance</p>
                <p className="mt-3.5 text-[15px] font-semibold text-[#0F1E17]">
                  {formatCurrency((mentorHourlyRate * 30) / 60, currency)}
                </p>
              </div>
            </div>
            {selectedDuration === 30 && (
              <CheckCircle2 className="h-4 w-4 fill-[#1C3E30] text-white" />
            )}
          </div>

          {/* 60 Minutes */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setSelectedDuration(60)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelectedDuration(60);
            }}
            className={`relative flex cursor-pointer items-start justify-between rounded-2xl border p-5 transition-all ${
              selectedDuration === 60
                ? "border-[#1C3E30] bg-white shadow-xs ring-1 ring-[#1C3E30]"
                : "border-[#E7ECE8] bg-white hover:border-[#CFD9D3]"
            }`}
          >
            <div className="flex items-start gap-3.5">
              <Clock className="mt-0.5 h-4 w-4 text-[#73847C]" />
              <div>
                <h4 className="text-[13px] font-semibold text-[#0F1E17]">60 minutes</h4>
                <p className="mt-0.5 text-xs text-[#5F7068]">Detailed discussion &amp; planning</p>
                <p className="mt-3.5 text-[15px] font-semibold text-[#0F1E17]">
                  {formatCurrency(mentorHourlyRate, currency)}
                </p>
              </div>
            </div>
            {selectedDuration === 60 && (
              <CheckCircle2 className="h-4 w-4 fill-[#1C3E30] text-white" />
            )}
          </div>
        </div>
      </div>

      {/* ================= 2. SELECT DATE & TIME ================= */}
      <div className="mt-10">
        <h3 className="font-serif text-[17px] font-normal text-[#0F1E17]">
          2. Select Date &amp; Time
        </h3>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-12">
          
          {/* Dynamic Calendar Picker (7 Cols) */}
          <div className="rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] lg:col-span-7">
            {/* Month Header */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  setCurrentMonth(
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
                  )
                }
                className="p-1 text-[#64756D] hover:text-[#0F1E17]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs font-semibold text-[#0F1E17]">{monthLabel}</span>
              <button
                type="button"
                onClick={() =>
                  setCurrentMonth(
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
                  )
                }
                className="p-1 text-[#64756D] hover:text-[#0F1E17]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Weekdays */}
            <div className="mt-5 grid grid-cols-7 text-center text-[11px] font-medium text-[#8C9B94]">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

            {/* Calendar Days */}
            <div className="mt-3 grid grid-cols-7 gap-y-2.5 text-center text-xs">
              {calendarDays.map((item, idx) => {
                const dateKey = item.dateKey;
                const hasSlots = Boolean(dateKey && slotsByDate.has(dateKey));
                const isSelected = activeDate === dateKey;

                return (
                  <div key={idx} className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        if (hasSlots) {
                          setActiveDate(dateKey);
                          const firstSlot = slotsByDate.get(dateKey)?.[0] || null;
                          setSelectedSlot(firstSlot);
                        }
                      }}
                      disabled={!hasSlots}
                      className={`relative flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-[#1C3E30] text-white font-semibold shadow-xs"
                          : hasSlots
                          ? "text-[#0F1E17] font-semibold hover:bg-[#EBF1EE]"
                          : item.isCurrent
                          ? "cursor-not-allowed text-[#B2BEB7]"
                          : "cursor-default text-[#E0E5E2]"
                      }`}
                    >
                      {item.day}
                      {hasSlots && !isSelected && (
                        <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[#1C3E30]" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time Slots & Order Summary (5 Cols) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Available Times */}
            <div>
              <span className="text-xs font-semibold text-[#0F1E17]">
                • Available Times
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeSlots.length === 0 ? (
                  <p className="text-xs text-[#7B8C84] pt-1">
                    No available time slots for this date.
                  </p>
                ) : (
                  activeSlots.map((slot) => {
                    const isActive =
                      selectedSlot?.date === slot.date &&
                      selectedSlot?.startTime === slot.startTime;

                    return (
                      <button
                        key={`${slot.date}-${slot.startTime}`}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                          isActive
                            ? "bg-[#1C3E30] text-white shadow-xs"
                            : "border border-[#DCE4E0] bg-white text-[#3E5047] hover:border-[#1C3E30]"
                        }`}
                      >
                        {slot.startTime}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="rounded-2xl border border-[#E7ECE8] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <h4 className="text-xs font-semibold text-[#0F1E17]">Order Summary</h4>

              <div className="mt-3.5 flex items-center gap-2.5 border-b border-[#F0F3F1] pb-3.5">
                <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-[#EBF0EC]">
                  <Image
                    src={
                      mentorImage ||
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                    }
                    alt={mentorName}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-[#0F1E17]">Mentor Session</p>
                  <p className="text-[11px] text-[#6D7D76]">
                    {mentorName} • {mentorUniversity}
                  </p>
                </div>
              </div>

              {/* Summary details */}
              <div className="mt-3.5 space-y-2 text-xs text-[#52645B]">
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-medium text-[#0F1E17]">{selectedDuration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Date</span>
                  <span className="font-medium text-[#0F1E17]">
                    {selectedSlot ? formatDate(selectedSlot.date) : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Time</span>
                  <span className="font-medium text-[#0F1E17]">
                    {selectedSlot ? `${selectedSlot.startTime} (${selectedSlot.timezone || "GMT+1"})` : "—"}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#F0F3F1] pt-2.5 text-sm font-semibold text-[#0F1E17]">
                  <span>Total</span>
                  <span>{formatCurrency(price, currency)}</span>
                </div>
              </div>

              {state.error && (
                <p role="alert" className="mt-2 text-xs text-rose-600">
                  {state.error}
                </p>
              )}

              {/* Confirm Button */}
              <button
                type="submit"
                disabled={pending || !selectedSlot}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#1C3E30] py-3 text-xs font-medium text-white shadow-sm transition-all hover:bg-[#142e23] disabled:opacity-50 active:scale-[0.98]"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>{pending ? "Processing…" : "Confirm & Pay →"}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ================= TRUST BADGES ================= */}
      <div className="mt-8 grid grid-cols-1 gap-5 border-t border-[#E7ECE8] pt-6 sm:grid-cols-3">
        <div className="flex items-start gap-2.5 text-xs">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#1C3E30]" />
          <div>
            <p className="font-semibold text-[#0F1E17]">Secure booking</p>
            <p className="mt-0.5 text-[11px] text-[#73847C]">Your payment is protected.</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 text-xs">
          <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-[#1C3E30]" />
          <div>
            <p className="font-semibold text-[#0F1E17]">Easy rescheduling</p>
            <p className="mt-0.5 text-[11px] text-[#73847C]">Change plans? No problem.</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 text-xs">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1C3E30]" />
          <div>
            <p className="font-semibold text-[#0F1E17]">Verified mentors</p>
            <p className="mt-0.5 text-[11px] text-[#73847C]">Real profiles, real experience.</p>
          </div>
        </div>
      </div>
    </form>
  );
}