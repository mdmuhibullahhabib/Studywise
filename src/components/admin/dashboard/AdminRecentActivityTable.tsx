"use client";

import { useState } from "react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import { AdminPaymentItem, AdminBookingItem } from "./types";
import { Activity, ArrowRight, CreditCard, CalendarCheck } from "lucide-react";

interface AdminRecentActivityTableProps {
  recentPayments: AdminPaymentItem[];
  recentBookings: AdminBookingItem[];
}

export function AdminRecentActivityTable({
  recentPayments,
  recentBookings,
}: AdminRecentActivityTableProps) {
  const [activeTab, setActiveTab] = useState<"payments" | "bookings">("payments");

  return (
    <section className="mt-10">
      <div className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-[#38897D]" />
          <h2 className="font-serif text-lg font-bold text-[#15282E]">
            Recent Live Platform Activity
          </h2>
        </div>

        {/* Tab Controls & View All Link */}
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-lg border border-[#E1E7E3] bg-[#F7FAF8] p-0.5">
            <button
              type="button"
              onClick={() => setActiveTab("payments")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                activeTab === "payments"
                  ? "bg-white text-[#15282E] shadow-2xs"
                  : "text-[#708078] hover:text-[#15282E]"
              }`}
            >
              <CreditCard className="h-3 w-3 text-[#38897D]" />
              <span>Payments ({recentPayments.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("bookings")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                activeTab === "bookings"
                  ? "bg-white text-[#15282E] shadow-2xs"
                  : "text-[#708078] hover:text-[#15282E]"
              }`}
            >
              <CalendarCheck className="h-3 w-3 text-[#38897D]" />
              <span>Bookings ({recentBookings.length})</span>
            </button>
          </div>

          <Link
            href={activeTab === "payments" ? "/admin/payments" : "/admin/sessions"}
            className="hidden items-center gap-1 text-xs font-semibold text-[#38897D] hover:underline sm:flex"
          >
            <span>View all</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="mt-2 overflow-hidden rounded-2xl border border-[#E7ECE8] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="overflow-x-auto">
          {activeTab === "payments" ? (
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#E7ECE8] bg-[#FAFBF9] text-[11px] font-semibold uppercase tracking-wider text-[#73847D]">
                <tr>
                  <th className="px-5 py-3.5">Student</th>
                  <th className="px-5 py-3.5">Mentor</th>
                  <th className="px-5 py-3.5">Gross Amount</th>
                  <th className="px-5 py-3.5">Platform Fee</th>
                  <th className="px-5 py-3.5">Mentor Payout</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F3F1]">
                {recentPayments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center text-[#7A8A82]">
                      No payments recorded yet.
                    </td>
                  </tr>
                ) : (
                  recentPayments.slice(0, 6).map((p) => (
                    <tr key={p.id} className="transition-colors hover:bg-[#F9FAF9]">
                      <td className="px-5 py-3.5 font-medium text-[#15282E]">
                        {p.student.name}
                      </td>
                      <td className="px-5 py-3.5 text-[#52645B]">{p.mentor.name}</td>
                      <td className="px-5 py-3.5 font-bold text-[#15282E]">
                        {formatCurrency(p.amount, p.currency)}
                      </td>
                      <td className="px-5 py-3.5 font-bold text-[#38897D]">
                        {formatCurrency(p.platformFee, p.currency)}
                      </td>
                      <td className="px-5 py-3.5 text-[#52645B]">
                        {formatCurrency(p.mentorAmount, p.currency)}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold ${
                            p.status === "SUCCEEDED"
                              ? "bg-[#EBF7F1] text-[#1B6F49]"
                              : p.status === "PENDING"
                              ? "bg-[#FEF3C7] text-[#92400E]"
                              : "bg-[#FDEDEC] text-[#B83227]"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-[#8C9C94]">
                        {formatDate(p.createdAt, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#E7ECE8] bg-[#FAFBF9] text-[11px] font-semibold uppercase tracking-wider text-[#73847D]">
                <tr>
                  <th className="px-5 py-3.5">Topic</th>
                  <th className="px-5 py-3.5">Student</th>
                  <th className="px-5 py-3.5">Mentor</th>
                  <th className="px-5 py-3.5">Session Date</th>
                  <th className="px-5 py-3.5">Duration</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F3F1]">
                {recentBookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center text-[#7A8A82]">
                      No sessions booked yet.
                    </td>
                  </tr>
                ) : (
                  recentBookings.slice(0, 6).map((b) => (
                    <tr key={b.id} className="transition-colors hover:bg-[#F9FAF9]">
                      <td className="px-5 py-3.5 font-medium text-[#15282E] max-w-[180px] truncate">
                        {b.subject}
                      </td>
                      <td className="px-5 py-3.5 text-[#52645B]">{b.student.name}</td>
                      <td className="px-5 py-3.5 text-[#52645B]">{b.mentor.name}</td>
                      <td className="px-5 py-3.5 text-[#7A8A82]">
                        {formatDate(b.date, {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        · {b.startTime}
                      </td>
                      <td className="px-5 py-3.5 text-[#7A8A82]">{b.duration} min</td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold ${
                            b.status === "COMPLETED"
                              ? "bg-[#EBF7F1] text-[#1B6F49]"
                              : b.status === "CONFIRMED"
                              ? "bg-[#E0E7FF] text-[#3730A3]"
                              : b.status === "PENDING"
                              ? "bg-[#FEF3C7] text-[#92400E]"
                              : "bg-[#FDEDEC] text-[#B83227]"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-bold text-[#15282E]">
                        {formatCurrency(b.price, b.currency)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Mobile footer link */}
        <div className="flex sm:hidden border-t border-[#F0F3F1] p-3 text-center">
          <Link
            href={activeTab === "payments" ? "/admin/payments" : "/admin/sessions"}
            className="w-full text-xs font-semibold text-[#38897D]"
          >
            View all {activeTab} →
          </Link>
        </div>
      </div>
    </section>
  );
}

