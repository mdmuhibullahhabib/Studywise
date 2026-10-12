"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface MentorPaginationOrSortProps {
  totalCount: number;
}

export function MentorPaginationOrSort({ totalCount }: MentorPaginationOrSortProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "recommended";

  const handleSortChange = (sortKey: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortKey === "recommended") {
      params.delete("sort");
    } else {
      params.set("sort", sortKey);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 border-b border-[#E0E8E3] pb-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[14px] text-[#556960]">
        Showing <strong className="font-bold text-[#0F1E17]">{totalCount}</strong> verified mentors
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[13px] font-medium text-[#708078]">Sort by:</span>

        {[
          { key: "recommended", label: "Recommended" },
          { key: "experience", label: "Most experienced" },
          { key: "rating", label: "Highest rated" },
        ].map((item) => {
          const active = currentSort === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => handleSortChange(item.key)}
              className={`h-[36px] rounded-full px-4 text-[13px] font-semibold transition-all duration-200 active:scale-95 ${
                active
                  ? "bg-[#1C3E30] text-white shadow-xs"
                  : "border border-[#D5DCD7] bg-white text-[#556960] hover:border-[#36887F] hover:text-[#0F1E17]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}