"use client";

import Link from "next/link";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import { AdminBookingItem } from "./types";
import { TimeSeriesPoint } from "./analyticsUtils";

interface AdminSessionAnalyticsProps {
  bookings: AdminBookingItem[];
  timeSeriesData: TimeSeriesPoint[];
  averageRating: number;
}

export function AdminSessionAnalytics({
  bookings,
  timeSeriesData,
  averageRating,
}: AdminSessionAnalyticsProps) {
  const totalBookings = bookings.length;
  const completed = bookings.filter((b) => b.status === "COMPLETED").length;
  const confirmed = bookings.filter((b) => b.status === "CONFIRMED").length;
  const pending = bookings.filter((b) => b.status === "PENDING").length;
  const cancelled = bookings.filter(
    (b) => b.status === "CANCELLED" || b.status === "NO_SHOW"
  ).length;

  const completionPct =
    totalBookings > 0 ? Math.round((completed / totalBookings) * 100) : 0;
  const confirmedPct =
    totalBookings > 0 ? Math.round((confirmed / totalBookings) * 100) : 0;
  const pendingPct =
    totalBookings > 0 ? Math.round((pending / totalBookings) * 100) : 0;
  const cancelledPct =
    totalBookings > 0 ? Math.round((cancelled / totalBookings) * 100) : 0;

  // Maximum completed in any bucket for bar heights
  const maxCompletedInBucket = Math.max(
    ...timeSeriesData.map((d) => d.completedSessions),
    1
  );

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* 1. Status Breakdown (5 Cols) */}
      <div className="flex flex-col justify-between rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] lg:col-span-5">
        <div>
          <div className="flex items-center justify-between border-b border-[#F0F3F1] pb-4">
            <div className="flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-[#38897D]" />
              <h3 className="font-serif text-base font-bold text-[#15282E]">
                Booking Status Distribution
              </h3>
            </div>
            <Link
              href="/admin/sessions"
              className="flex items-center gap-1 text-xs font-semibold text-[#38897D] hover:underline"
            >
              <span>All sessions</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Donut & Completion Overview */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <div className="relative flex h-28 w-28 items-center justify-center">
              {/* Circular SVG Donut */}
              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                {/* Background Ring */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="#F0F4F2"
                  strokeWidth="3.5"
                />
                {/* Completed Slice */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="#38897D"
                  strokeWidth="3.5"
                  strokeDasharray={`${completionPct} 100`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="font-serif text-xl font-bold text-[#15282E]">
                  {completionPct}%
                </span>
                <span className="text-[9.5px] font-semibold uppercase text-[#73847D]">
                  Success
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-[#15282E]">
                Total Bookings: {totalBookings}
              </p>
              <p className="text-[11px] text-[#63746C] leading-relaxed">
                {completed} completed successfully with verified attendance.
              </p>
              <div className="flex items-center gap-1 text-[11px] font-medium text-[#7A5612]">
                <Star className="h-3 w-3 fill-[#E5A023] text-[#E5A023]" />
                <span>{averageRating} average student rating</span>
              </div>
            </div>
          </div>

          {/* Segmented Progress Breakdown Bar */}
          <div className="mt-6">
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-[#F0F4F2]">
              <div
                style={{ width: `${completionPct}%` }}
                className="bg-[#38897D] transition-all"
                title={`Completed: ${completed}`}
              />
              <div
                style={{ width: `${confirmedPct}%` }}
                className="bg-[#2A5C7D] transition-all"
                title={`Confirmed: ${confirmed}`}
              />
              <div
                style={{ width: `${pendingPct}%` }}
                className="bg-[#D97706] transition-all"
                title={`Pending: ${pending}`}
              />
              <div
                style={{ width: `${cancelledPct}%` }}
                className="bg-[#DC2626] transition-all"
                title={`Cancelled: ${cancelled}`}
              />
            </div>

            {/* Status Legend List */}
            <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs">
              <div className="flex items-center justify-between rounded-lg bg-[#FAFBF9] border border-[#E9EFEA] p-2">
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#2C3F36]">
                  <span className="h-2 w-2 rounded-full bg-[#38897D]" /> Completed
                </span>
                <span className="font-bold text-[#15282E]">{completed}</span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-[#FAFBF9] border border-[#E9EFEA] p-2">
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#2C3F36]">
                  <span className="h-2 w-2 rounded-full bg-[#2A5C7D]" /> Confirmed
                </span>
                <span className="font-bold text-[#15282E]">{confirmed}</span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-[#FAFBF9] border border-[#E9EFEA] p-2">
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#2C3F36]">
                  <span className="h-2 w-2 rounded-full bg-[#D97706]" /> Pending
                </span>
                <span className="font-bold text-[#15282E]">{pending}</span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-[#FAFBF9] border border-[#E9EFEA] p-2">
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#2C3F36]">
                  <span className="h-2 w-2 rounded-full bg-[#DC2626]" /> Cancelled
                </span>
                <span className="font-bold text-[#15282E]">{cancelled}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Session Volume Over Time (7 Cols) */}
      <div className="flex flex-col justify-between rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] lg:col-span-7">
        <div>
          <div className="flex items-center justify-between border-b border-[#F0F3F1] pb-4">
            <div>
              <h3 className="font-serif text-base font-bold text-[#15282E]">
                Session Volume & Completion Timeline
              </h3>
              <p className="mt-0.5 text-xs text-[#63746C]">
                Distribution of completed 1-on-1 consultations across time buckets.
              </p>
            </div>
            <span className="rounded-full bg-[#EBF4F0] px-2.5 py-1 text-[11px] font-bold text-[#38897D]">
              {completed} Completed
            </span>
          </div>

          {/* Bar Chart Visual */}
          <div className="mt-8 flex h-40 items-end justify-between gap-3 border-b border-[#E8EEEA] pb-3">
            {timeSeriesData.map((pt, idx) => {
              const heightPct =
                maxCompletedInBucket > 0
                  ? Math.max((pt.completedSessions / maxCompletedInBucket) * 100, 6)
                  : 6;

              return (
                <div
                  key={idx}
                  className="group relative flex flex-1 flex-col items-center gap-1.5"
                >
                  {/* Tooltip on bar hover */}
                  <div className="pointer-events-none absolute -top-8 z-20 hidden rounded-md bg-[#15282E] px-2 py-1 text-[10px] font-medium text-white shadow-md group-hover:block whitespace-nowrap">
                    {pt.completedSessions} sessions
                  </div>

                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full max-w-[28px] rounded-t-lg transition-all duration-300 ${
                      pt.completedSessions > 0
                        ? "bg-[#38897D] group-hover:bg-[#2A6B62]"
                        : "bg-[#EAEFEA]"
                    }`}
                  />
                  <span className="text-[10px] font-medium text-[#7C8D85] truncate max-w-[40px]">
                    {pt.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info note */}
        <div className="mt-6 flex flex-wrap items-center justify-between text-xs text-[#52645B] border-t border-[#F0F3F1] pt-3">
          <span>Average session length: 60 minutes</span>
          <Link
            href="/admin/sessions"
            className="flex items-center gap-1 font-semibold text-[#38897D] hover:underline"
          >
            <span>Inspect session logs</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

