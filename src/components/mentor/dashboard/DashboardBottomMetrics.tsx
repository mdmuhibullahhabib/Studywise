import Link from "next/link";
import { Star, Wallet, Check, ArrowRight, MessageSquareQuote } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

interface ReviewItem {
  id: string;
  rating: number;
  review: string | null;
  createdAt: Date | string;
  student: {
    id: string;
    name: string;
    avatarUrl?: string | null;
  };
}

interface DashboardBottomMetricsProps {
  monthlyEarnings: number;
  totalEarnings: number;
  currency?: string;
  completion: {
    percentage: number;
    steps: { label: string; done: boolean }[];
  };
  reviews?: ReviewItem[];
}

export function DashboardBottomMetrics({
  monthlyEarnings,
  totalEarnings,
  currency = "USD",
  completion,
  reviews = [],
}: DashboardBottomMetricsProps) {
  return (
    <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* 1. Recent Reviews */}
      <div className="flex flex-col justify-between rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div>
          <div className="flex items-center justify-between border-b border-[#F0F3F1] pb-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-[#E5A023] text-[#E5A023]" />
              <h3 className="font-serif text-base font-normal text-[#0F1E17]">
                Recent Reviews
              </h3>
            </div>
            <Link
              href="/mentor/reviews"
              className="text-xs font-semibold text-[#1C3E30] transition-colors hover:text-[#36887F] hover:underline"
            >
              View all →
            </Link>
          </div>

          <div className="mt-4 space-y-3.5">
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <div key={rev.id} className="border-b border-[#F0F3F1] pb-3 last:border-none">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#0F1E17]">{rev.student.name}</span>
                    <div className="flex text-[#E5A023]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < rev.rating ? "fill-[#E5A023] text-[#E5A023]" : "text-[#DCE3DF]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {rev.review && (
                    <p className="mt-1 text-[11.5px] leading-relaxed text-[#5F7068] line-clamp-2">
                      {rev.review}
                    </p>
                  )}
                  <span className="mt-1 block text-[10px] text-[#8C9C94]">
                    {formatDate(rev.createdAt, { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-6 text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF8EB] text-[#E5A023]">
                  <MessageSquareQuote className="h-4.5 w-4.5" />
                </div>
                <p className="mt-2 text-xs font-medium text-[#0F1E17]">
                  No reviews yet
                </p>
                <p className="mt-1 text-[11px] text-[#7A8A82]">
                  Complete upcoming sessions with students to receive genuine reviews and boost your profile credibility.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 border-t border-[#F0F3F1] pt-3">
          <Link
            href="/mentor/reviews"
            className="flex items-center justify-between text-xs font-medium text-[#1C3E30] hover:underline"
          >
            <span>Learn how reviews boost bookings</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Earnings Breakdown & Chart */}
      <div className="flex flex-col justify-between rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div>
          <div className="flex items-center justify-between border-b border-[#F0F3F1] pb-4">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-[#1C3E30]" />
              <h3 className="font-serif text-base font-normal text-[#0F1E17]">Earnings</h3>
            </div>
            <Link
              href="/mentor/earnings"
              className="text-xs font-semibold text-[#1C3E30] transition-colors hover:text-[#36887F] hover:underline"
            >
              View details →
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-left">
            <div className="rounded-xl bg-[#FAFBF9] border border-[#E7ECE8] p-3">
              <p className="text-[10px] uppercase tracking-wider text-[#7C8D85] font-semibold">This Month</p>
              <p className="mt-0.5 font-serif text-xl font-semibold text-[#0F1E17]">
                {formatCurrency(monthlyEarnings || 0, currency)}
              </p>
            </div>
            <div className="rounded-xl bg-[#FAFBF9] border border-[#E7ECE8] p-3">
              <p className="text-[10px] uppercase tracking-wider text-[#7C8D85] font-semibold">Total Earned</p>
              <p className="mt-0.5 font-serif text-xl font-semibold text-[#0F1E17]">
                {formatCurrency(totalEarnings || 0, currency)}
              </p>
            </div>
          </div>

          {/* Activity Height Chart */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-[11px] text-[#7A8A82] mb-2">
              <span>Monthly Activity</span>
              <span className="font-medium text-[#1C3E30]">Payouts on 1st & 15th</span>
            </div>
            <div className="flex h-20 items-end justify-between gap-2 border-b border-[#E7ECE8] pb-2">
              {[40, 65, 30, 85, 70, 95].map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                  <div
                    className="w-full rounded-t-md bg-[#1C3E30] transition-all hover:bg-[#36887F]"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[10px] text-[#8C9C94]">
                    {["May", "Jun", "Jul", "Aug", "Sep", "Oct"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-[#F0F3F1] pt-3">
          <Link
            href="/mentor/earnings"
            className="flex items-center justify-between text-xs font-semibold text-[#1C3E30] hover:underline"
          >
            <span>Manage payout method</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* 3. Profile Completion Ring */}
      <div className="flex flex-col justify-between rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div>
          <div className="flex items-center justify-between border-b border-[#F0F3F1] pb-4">
            <h3 className="font-serif text-base font-normal text-[#0F1E17]">
              Profile Strength
            </h3>
            <span className="rounded-full bg-[#EBF4F0] px-2.5 py-0.5 text-xs font-bold text-[#1C3E30]">
              {completion.percentage}%
            </span>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-[#1C3E30] text-sm font-bold text-[#1C3E30]">
              {completion.percentage}%
            </div>
            <p className="text-xs leading-relaxed text-[#5F7068]">
              {completion.percentage === 100
                ? "Your mentor profile is fully completed and highlighted in discovery search."
                : "Complete all steps to unlock higher student discovery rankings and more bookings."}
            </p>
          </div>

          <div className="mt-5 space-y-2 text-xs">
            {completion.steps.map((st, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`flex h-4 w-4 items-center justify-center rounded-full ${
                    st.done
                      ? "bg-[#1C3E30] text-white"
                      : "border border-[#CCD6D0] bg-[#FAFBF9]"
                  }`}
                >
                  {st.done && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                </div>
                <span className={st.done ? "text-[#0F1E17] font-medium" : "text-[#7B8B83]"}>
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/mentor/profile"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#1C3E30] py-2.5 text-xs font-semibold text-white shadow-2xs transition-all hover:bg-[#36887F]"
        >
          <span>Complete Profile</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
