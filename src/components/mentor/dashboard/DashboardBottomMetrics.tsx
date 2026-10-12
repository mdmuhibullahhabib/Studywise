import Link from "next/link";
import { Star, Wallet, Check, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface DashboardBottomMetricsProps {
  monthlyEarnings: number;
  totalEarnings: number;
  currency?: string;
  completion: {
    percentage: number;
    steps: { label: string; done: boolean }[];
  };
}

export function DashboardBottomMetrics({
  monthlyEarnings,
  totalEarnings,
  currency = "USD",
  completion,
}: DashboardBottomMetricsProps) {
  return (
    <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* 1. Recent Reviews */}
      <div className="rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between border-b border-[#F0F3F1] pb-4">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-[#E5A023] text-[#E5A023]" />
            <h3 className="font-serif text-base font-normal text-[#0F1E17]">
              Recent Reviews
            </h3>
          </div>
          <Link href="/mentor/reviews" className="text-xs font-medium text-[#1C3E30] hover:underline">
            View all →
          </Link>
        </div>

        <div className="mt-4 space-y-4">
          {[
            {
              name: "Nusrat Jahan",
              comment: "Arif bhai is very helpful and knowledgeable. His guidance made my application process much easier.",
              date: "May 18, 2025",
            },
            {
              name: "Fahim Hasan",
              comment: "Great session! Clear, honest and super supportive.",
              date: "May 12, 2025",
            },
          ].map((rev, idx) => (
            <div key={idx} className="border-b border-[#F0F3F1] pb-3 last:border-none">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#0F1E17]">{rev.name}</span>
                <div className="flex text-[#E5A023]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-[#5F7068]">{rev.comment}</p>
              <span className="mt-1 block text-[10px] text-[#8C9C94]">{rev.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Earnings Breakdown & Chart */}
      <div className="rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between border-b border-[#F0F3F1] pb-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-[#1C3E30]" />
            <h3 className="font-serif text-base font-normal text-[#0F1E17]">Earnings</h3>
          </div>
          <Link href="/mentor/earnings" className="text-xs font-medium text-[#1C3E30] hover:underline">
            View details →
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-left">
          <div>
            <p className="text-[10px] text-[#7C8D85] uppercase">This month</p>
            <p className="font-serif text-lg font-semibold text-[#0F1E17]">
              {formatCurrency(monthlyEarnings || 420, currency)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-[#7C8D85] uppercase">Last month</p>
            <p className="font-serif text-lg font-semibold text-[#0F1E17]">$380</p>
          </div>
          <div>
            <p className="text-[10px] text-[#7C8D85] uppercase">Total earned</p>
            <p className="font-serif text-lg font-semibold text-[#0F1E17]">
              {formatCurrency(totalEarnings || 1240, currency)}
            </p>
          </div>
        </div>

        {/* Minimal Bar Chart */}
        <div className="mt-6 flex h-24 items-end justify-between gap-2 border-b border-[#E7ECE8] pb-2">
          {[40, 65, 30, 85, 70, 95].map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className="w-full rounded-t-md bg-[#1C3E30]"
                style={{ height: `${h}%` }}
              />
              <span className="text-[10px] text-[#8C9C94]">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Profile Completion Ring */}
      <div className="rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between border-b border-[#F0F3F1] pb-4">
          <h3 className="font-serif text-base font-normal text-[#0F1E17]">
            Profile Completion
          </h3>
          <span className="text-xs font-semibold text-[#1C3E30]">
            {completion.percentage}%
          </span>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-[#1C3E30] text-sm font-bold text-[#1C3E30]">
            {completion.percentage}%
          </div>
          <p className="text-xs leading-relaxed text-[#5F7068]">
            Your mentor profile is almost complete. Finish steps to unlock top ranking.
          </p>
        </div>

        <div className="mt-5 space-y-2 text-xs">
          {completion.steps.map((st, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`flex h-4 w-4 items-center justify-center rounded-full ${
                  st.done ? "bg-[#1C3E30] text-white" : "border border-[#CCD6D0] bg-[#FAFBF9]"
                }`}
              >
                {st.done && <Check className="h-2.5 w-2.5 stroke-[3]" />}
              </div>
              <span className={st.done ? "text-[#0F1E17]" : "text-[#7B8B83]"}>
                {st.label}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/mentor/profile"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#1C3E30] py-2.5 text-xs font-medium text-white shadow-2xs hover:bg-[#142e23]"
        >
          <span>Complete Profile</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
