"use client";

import { useState } from "react";
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

interface BookingFlowProps {
  onConfirm: () => void;
}

const TIME_SLOTS = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "4:00 PM",
  "7:00 PM",
];

const CALENDAR_DAYS = [
  { day: 28, isCurrentMonth: false },
  { day: 29, isCurrentMonth: false },
  { day: 30, isCurrentMonth: false },
  { day: 1, isCurrentMonth: true },
  { day: 2, isCurrentMonth: true },
  { day: 3, isCurrentMonth: true },
  { day: 4, isCurrentMonth: true },
  { day: 5, isCurrentMonth: true },
  { day: 6, isCurrentMonth: true },
  { day: 7, isCurrentMonth: true },
  { day: 8, isCurrentMonth: true },
  { day: 9, isCurrentMonth: true },
  { day: 10, isCurrentMonth: true },
  { day: 11, isCurrentMonth: true },
  { day: 12, isCurrentMonth: true },
  { day: 13, isCurrentMonth: true },
  { day: 14, isCurrentMonth: true },
  { day: 15, isCurrentMonth: true, isSelected: true },
  { day: 16, isCurrentMonth: true },
  { day: 17, isCurrentMonth: true },
  { day: 18, isCurrentMonth: true },
  { day: 19, isCurrentMonth: true },
  { day: 20, isCurrentMonth: true },
  { day: 21, isCurrentMonth: true },
  { day: 22, isCurrentMonth: true },
  { day: 23, isCurrentMonth: true },
  { day: 24, isCurrentMonth: true },
  { day: 25, isCurrentMonth: true },
  { day: 26, isCurrentMonth: true },
  { day: 27, isCurrentMonth: true },
  { day: 28, isCurrentMonth: true },
  { day: 29, isCurrentMonth: true },
  { day: 30, isCurrentMonth: true },
  { day: 31, isCurrentMonth: true },
  { day: 1, isCurrentMonth: false },
];

export function BookingFlow({ onConfirm }: BookingFlowProps) {
  const [selectedDuration, setSelectedDuration] = useState<30 | 60>(30);
  const [selectedTime, setSelectedTime] = useState("10:30 AM");
  const [selectedDate, setSelectedDate] = useState(15);

  return (
    <div className="w-full">
      {/* Top 3-Step Indicator */}
      <div className="flex items-center justify-between border-b border-[#E7ECE8] pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C3E30] text-xs font-semibold text-white">
            01
          </div>
          <span className="text-xs font-semibold text-[#0F1E17]">Choose Session</span>
        </div>

        <div className="hidden h-px w-12 bg-[#E7ECE8] sm:block" />

        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#DCE4E0] bg-white text-xs font-medium text-[#73847C]">
            02
          </div>
          <span className="text-xs font-medium text-[#73847C]">Select Time</span>
        </div>

        <div className="hidden h-px w-12 bg-[#E7ECE8] sm:block" />

        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#DCE4E0] bg-white text-xs font-medium text-[#73847C]">
            03
          </div>
          <span className="text-xs font-medium text-[#73847C]">Confirm</span>
        </div>
      </div>

      {/* 1. Choose Session */}
      <div className="mt-8">
        <h3 className="font-serif text-base font-normal text-[#0F1E17]">
          1. Choose Session
        </h3>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* 30 Minutes Card */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setSelectedDuration(30)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedDuration(30);
              }
            }}
            className={`relative flex cursor-pointer items-start justify-between rounded-2xl border p-4 transition-all ${
              selectedDuration === 30
                ? "border-[#1C3E30] bg-white shadow-sm ring-1 ring-[#1C3E30]"
                : "border-[#E7ECE8] bg-white hover:border-[#D0DAD4]"
            }`}
          >
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 text-[#1C3E30]" />
              <div>
                <h4 className="text-sm font-semibold text-[#0F1E17]">30 minutes</h4>
                <p className="mt-0.5 text-xs text-[#5F7068]">Quick questions &amp; guidance</p>
                <p className="mt-3 text-sm font-semibold text-[#0F1E17]">$25</p>
              </div>
            </div>
            {selectedDuration === 30 && (
              <CheckCircle2 className="h-4 w-4 fill-[#1C3E30] text-white" />
            )}
          </div>

          {/* 60 Minutes Card */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setSelectedDuration(60)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedDuration(60);
              }
            }}
            className={`relative flex cursor-pointer items-start justify-between rounded-2xl border p-4 transition-all ${
              selectedDuration === 60
                ? "border-[#1C3E30] bg-white shadow-sm ring-1 ring-[#1C3E30]"
                : "border-[#E7ECE8] bg-white hover:border-[#D0DAD4]"
            }`}
          >
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 text-[#73847C]" />
              <div>
                <h4 className="text-sm font-semibold text-[#0F1E17]">60 minutes</h4>
                <p className="mt-0.5 text-xs text-[#5F7068]">Detailed discussion &amp; planning</p>
                <p className="mt-3 text-sm font-semibold text-[#0F1E17]">$45</p>
              </div>
            </div>
            {selectedDuration === 60 && (
              <CheckCircle2 className="h-4 w-4 fill-[#1C3E30] text-white" />
            )}
          </div>
        </div>
      </div>

      {/* 2. Select Date & Time */}
      <div className="mt-10">
        <h3 className="font-serif text-base font-normal text-[#0F1E17]">
          2. Select Date &amp; Time
        </h3>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Calendar Picker (7 Cols) */}
          <div className="rounded-2xl border border-[#E7ECE8] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] lg:col-span-7">
            {/* Month Switcher */}
            <div className="flex items-center justify-between">
              <button type="button" className="p-1 text-[#64756D] hover:text-[#0F1E17]">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs font-semibold text-[#0F1E17]">May 2025</span>
              <button type="button" className="p-1 text-[#64756D] hover:text-[#0F1E17]">
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

            {/* Days Grid */}
            <div className="mt-3 grid grid-cols-7 gap-y-2 text-center text-xs">
              {CALENDAR_DAYS.map((item, i) => {
                const isSelected = item.isCurrentMonth && item.day === selectedDate;
                return (
                  <div key={i} className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => item.isCurrentMonth && setSelectedDate(item.day)}
                      disabled={!item.isCurrentMonth}
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs transition-all ${
                        isSelected
                          ? "bg-[#1C3E30] font-semibold text-white shadow-sm"
                          : item.isCurrentMonth
                          ? "text-[#1C2B24] hover:bg-[#F0F4F2]"
                          : "cursor-default text-[#D0D7D3]"
                      }`}
                    >
                      {item.day}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time Slots & Summary (5 Cols) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Available Times */}
            <div>
              <span className="text-xs font-semibold text-[#0F1E17]">
                • Available Times
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {TIME_SLOTS.map((time) => {
                  const isActive = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                        isActive
                          ? "bg-[#1C3E30] text-white shadow-xs"
                          : "border border-[#DCE4E0] bg-white text-[#3E5047] hover:border-[#1C3E30]"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="rounded-2xl border border-[#E7ECE8] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
              <h4 className="text-xs font-semibold text-[#0F1E17]">Order Summary</h4>

              <div className="mt-3 flex items-center gap-2.5 border-b border-[#F0F3F1] pb-3">
                <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-[#EBF0EC]">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                    alt="Arif Rahman"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#0F1E17]">Mentor Session</p>
                  <p className="text-[10px] text-[#6D7D76]">Arif Rahman • University of Manchester</p>
                </div>
              </div>

              <div className="mt-3 space-y-1.5 text-xs text-[#52645B]">
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-medium text-[#0F1E17]">{selectedDuration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Date</span>
                  <span className="font-medium text-[#0F1E17]">May {selectedDate}, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span>Time</span>
                  <span className="font-medium text-[#0F1E17]">{selectedTime} (GMT+1)</span>
                </div>
                <div className="flex justify-between border-t border-[#F0F3F1] pt-2 text-sm font-semibold text-[#0F1E17]">
                  <span>Total</span>
                  <span>${selectedDuration === 30 ? 25 : 45}</span>
                </div>
              </div>

              {/* Confirm & Pay Button */}
              <button
                type="button"
                onClick={onConfirm}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#1C3E30] py-2.5 text-xs font-medium text-white shadow-sm transition-all hover:bg-[#142e23] active:scale-[0.98]"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>Confirm &amp; Pay →</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-8 grid grid-cols-1 gap-4 border-t border-[#E7ECE8] pt-6 sm:grid-cols-3">
        <div className="flex items-start gap-2.5 text-xs">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#1C3E30]" />
          <div>
            <p className="font-semibold text-[#0F1E17]">Secure booking</p>
            <p className="text-[11px] text-[#73847C]">Your payment is protected.</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 text-xs">
          <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-[#1C3E30]" />
          <div>
            <p className="font-semibold text-[#0F1E17]">Easy rescheduling</p>
            <p className="text-[11px] text-[#73847C]">Change plans? No problem.</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 text-xs">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1C3E30]" />
          <div>
            <p className="font-semibold text-[#0F1E17]">Verified mentors</p>
            <p className="text-[11px] text-[#73847C]">Real profiles, real experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
}