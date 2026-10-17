"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Download,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { DateRangeKey } from "./types";

interface AdminHeaderProps {
  selectedRange: DateRangeKey;
  onRangeChange: (range: DateRangeKey) => void;
  onExportCsv: () => void;
  lastUpdated: Date;
}

const RANGES: { key: DateRangeKey; label: string }[] = [
  { key: "7d", label: "7 Days" },
  { key: "30d", label: "30 Days" },
  { key: "90d", label: "3 Months" },
  { key: "1y", label: "12 Months" },
  { key: "all", label: "All Time" },
];

export function AdminHeader({
  selectedRange,
  onRangeChange,
  onExportCsv,
  lastUpdated,
}: AdminHeaderProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <header className="flex flex-col gap-5 border-b border-[#E7ECE8] pb-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="font-serif text-2xl font-bold tracking-tight text-[#15282E] sm:text-3xl">
            Executive Analytics & Performance
          </h1>
          <span className="inline-flex items-center gap-1 rounded-full border border-[#D5E3DB] bg-[#EBF4F0] px-2.5 py-0.5 text-[11px] font-semibold text-[#38897D]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38897D] animate-pulse" />
            <span>Live Database</span>
          </span>
        </div>
        <p className="mt-1 text-xs text-[#556960] sm:text-sm">
          Comprehensive real-time metrics across revenue, session volume, student conversions, and operational tasks.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Date Range Selector Pill Bar */}
        <div className="flex items-center rounded-xl border border-[#E1E7E3] bg-white p-1 shadow-2xs">
          {RANGES.map((r) => {
            const isActive = selectedRange === r.key;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => onRangeChange(r.key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#15282E] text-white shadow-xs"
                    : "text-[#5B6D64] hover:bg-[#F2F6F4] hover:text-[#15282E]"
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onExportCsv}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCE4E0] bg-white px-3.5 py-2 text-xs font-semibold text-[#15282E] shadow-2xs transition-colors hover:bg-[#FAFBF9]"
            title="Export CSV Summary"
          >
            <Download className="h-3.5 w-3.5 text-[#38897D]" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center justify-center rounded-xl border border-[#DCE4E0] bg-white p-2 text-[#52645C] shadow-2xs transition-colors hover:bg-[#FAFBF9] disabled:opacity-50"
            title="Refresh Analytics Data"
          >
            <RefreshCw
              className={`h-4 w-4 text-[#38897D] ${isRefreshing ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}

