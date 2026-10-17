"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { TimeSeriesPoint } from "./analyticsUtils";
import { TrendingUp, BarChart2, LineChart, DollarSign } from "lucide-react";

interface AdminFinancialChartProps {
  data: TimeSeriesPoint[];
  grossVolumeTotal: number;
  platformRevenueTotal: number;
  mentorPayoutsTotal: number;
}

export function AdminFinancialChart({
  data,
  grossVolumeTotal,
  platformRevenueTotal,
  mentorPayoutsTotal,
}: AdminFinancialChartProps) {
  const [chartType, setChartType] = useState<"area" | "bar">("area");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Calculations for chart scaling
  const maxVal = Math.max(
    ...data.map((d) => Math.max(d.grossVolume, d.platformFee * 1.5)),
    50 // avoid 0 div
  );

  const takeRate =
    grossVolumeTotal > 0
      ? ((platformRevenueTotal / grossVolumeTotal) * 100).toFixed(1)
      : "15.0";

  // SVG coordinate dimensions
  const svgWidth = 800;
  const svgHeight = 260;
  const paddingX = 40;
  const paddingY = 30;
  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;

  // Compute points
  const points = data.map((d, i) => {
    const x = paddingX + (i / Math.max(data.length - 1, 1)) * chartW;
    const yGross = paddingY + chartH - (d.grossVolume / maxVal) * chartH;
    const yFee = paddingY + chartH - (d.platformFee / maxVal) * chartH;
    return { ...d, x, yGross, yFee };
  });

  // SVG area and line paths for Platform Fee
  const feeLinePath = points.reduce(
    (acc, p, i) => `${acc} ${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.yFee.toFixed(1)}`,
    ""
  );

  const feeAreaPath = `${feeLinePath} L ${points[points.length - 1]?.x.toFixed(1)} ${
    paddingY + chartH
  } L ${points[0]?.x.toFixed(1)} ${paddingY + chartH} Z`;

  // SVG line path for Gross Volume
  const grossLinePath = points.reduce(
    (acc, p, i) =>
      `${acc} ${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.yGross.toFixed(1)}`,
    ""
  );

  return (
    <div className="rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
      {/* Chart Header & Controls */}
      <div className="flex flex-col gap-4 border-b border-[#F0F3F1] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-[#38897D]" />
            <h3 className="font-serif text-lg font-bold text-[#15282E]">
              Revenue & Financial Performance
            </h3>
          </div>
          <p className="mt-0.5 text-xs text-[#63746C]">
            Gross Merchandise Volume vs Net Platform Revenue over time.
          </p>
        </div>

        {/* Chart View Toggle & Legend */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Legend */}
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 font-medium text-[#15282E]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#15282E]" /> Gross Volume
            </span>
            <span className="flex items-center gap-1.5 font-medium text-[#38897D]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#38897D]" /> Platform Fee
            </span>
          </div>

          {/* Toggle Button */}
          <div className="flex items-center rounded-lg border border-[#E1E7E3] bg-[#F7FAF8] p-0.5">
            <button
              type="button"
              onClick={() => setChartType("area")}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
                chartType === "area"
                  ? "bg-white text-[#15282E] shadow-2xs"
                  : "text-[#708078] hover:text-[#15282E]"
              }`}
            >
              <LineChart className="h-3.5 w-3.5 text-[#38897D]" />
              <span>Trend</span>
            </button>
            <button
              type="button"
              onClick={() => setChartType("bar")}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
                chartType === "bar"
                  ? "bg-white text-[#15282E] shadow-2xs"
                  : "text-[#708078] hover:text-[#15282E]"
              }`}
            >
              <BarChart2 className="h-3.5 w-3.5 text-[#38897D]" />
              <span>Bars</span>
            </button>
          </div>
        </div>
      </div>

      {/* Snapshot Summary Row */}
      <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-[#FAFBF9] border border-[#E8EEEA] p-4 sm:grid-cols-4">
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-wider text-[#7A8A82]">
            Total Gross (GMV)
          </p>
          <p className="font-serif text-xl font-bold text-[#15282E] mt-0.5">
            {formatCurrency(grossVolumeTotal)}
          </p>
        </div>
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-wider text-[#38897D]">
            Platform Net Revenue
          </p>
          <p className="font-serif text-xl font-bold text-[#38897D] mt-0.5">
            {formatCurrency(platformRevenueTotal)}
          </p>
        </div>
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-wider text-[#7A8A82]">
            Mentor Payouts
          </p>
          <p className="font-serif text-xl font-bold text-[#15282E] mt-0.5">
            {formatCurrency(mentorPayoutsTotal)}
          </p>
        </div>
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-wider text-[#7A8A82]">
            Take Rate (Commission)
          </p>
          <p className="font-serif text-xl font-bold text-[#15282E] mt-0.5">
            {takeRate}%
          </p>
        </div>
      </div>

      {/* Interactive SVG Chart Container */}
      <div className="relative mt-6 w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            <linearGradient id="platformFeeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38897D" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#38897D" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="grossBarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#15282E" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#15282E" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id="feeBarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38897D" stopOpacity="1" />
              <stop offset="100%" stopColor="#2E7167" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Gridlines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = paddingY + chartH * (1 - pct);
            const val = formatCurrency(maxVal * pct);
            return (
              <g key={idx}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={svgWidth - paddingX}
                  y2={y}
                  stroke="#E8ECE9"
                  strokeDasharray={pct === 0 ? "none" : "3,3"}
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  className="fill-[#9AA8A1] text-[9.5px] font-sans font-medium"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Area & Line mode */}
          {chartType === "area" && (
            <>
              {/* Platform Fee Area */}
              <path d={feeAreaPath} fill="url(#platformFeeGradient)" />

              {/* Gross Volume Line */}
              <path
                d={grossLinePath}
                fill="none"
                stroke="#15282E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Platform Fee Line */}
              <path
                d={feeLinePath}
                fill="none"
                stroke="#38897D"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {points.map((p, idx) => (
                <g key={idx}>
                  <circle
                    cx={p.x}
                    cy={p.yGross}
                    r={hoveredIdx === idx ? 5.5 : 3.5}
                    className="fill-[#15282E] stroke-white stroke-2 transition-all duration-150"
                  />
                  <circle
                    cx={p.x}
                    cy={p.yFee}
                    r={hoveredIdx === idx ? 5.5 : 3.5}
                    className="fill-[#38897D] stroke-white stroke-2 transition-all duration-150"
                  />
                </g>
              ))}
            </>
          )}

          {/* Bar Chart Mode */}
          {chartType === "bar" && (
            <>
              {points.map((p, idx) => {
                const barWidth = Math.max(14, chartW / points.length - 20);
                const barX = p.x - barWidth / 2;
                const grossHeight = (p.grossVolume / maxVal) * chartH;
                const feeHeight = (p.platformFee / maxVal) * chartH;

                return (
                  <g key={idx}>
                    {/* Gross Bar */}
                    <rect
                      x={barX}
                      y={paddingY + chartH - grossHeight}
                      width={barWidth / 2 - 2}
                      height={Math.max(grossHeight, 2)}
                      rx="3"
                      fill="url(#grossBarGradient)"
                      className="transition-all duration-150"
                    />
                    {/* Fee Bar */}
                    <rect
                      x={barX + barWidth / 2}
                      y={paddingY + chartH - feeHeight}
                      width={barWidth / 2 - 2}
                      height={Math.max(feeHeight, 2)}
                      rx="3"
                      fill="url(#feeBarGradient)"
                      className="transition-all duration-150"
                    />
                  </g>
                );
              })}
            </>
          )}

          {/* Interactive Hover Columns (invisible hit targets) */}
          {points.map((p, idx) => {
            const colWidth = chartW / points.length;
            const isHovered = hoveredIdx === idx;

            return (
              <g
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              >
                <rect
                  x={p.x - colWidth / 2}
                  y={paddingY}
                  width={colWidth}
                  height={chartH}
                  fill="transparent"
                />

                {/* Vertical Crosshair Line on hover */}
                {isHovered && (
                  <line
                    x1={p.x}
                    y1={paddingY}
                    x2={p.x}
                    y2={paddingY + chartH}
                    stroke="#38897D"
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                    className="opacity-70"
                  />
                )}
              </g>
            );
          })}

          {/* X Axis Labels */}
          {points.map((p, idx) => (
            <text
              key={idx}
              x={p.x}
              y={paddingY + chartH + 18}
              textAnchor="middle"
              className={`text-[10px] font-medium font-sans ${
                hoveredIdx === idx
                  ? "fill-[#15282E] font-bold"
                  : "fill-[#8C9C94]"
              }`}
            >
              {p.label}
            </text>
          ))}
        </svg>

        {/* Floating Tooltip Card */}
        {hoveredIdx !== null && points[hoveredIdx] && (
          <div
            className="pointer-events-none absolute top-4 z-20 rounded-xl border border-[#D5E3DB] bg-white/98 p-3 shadow-lg backdrop-blur-xs text-xs"
            style={{
              left: `${Math.min(
                Math.max((points[hoveredIdx].x / svgWidth) * 100 - 15, 2),
                70
              )}%`,
            }}
          >
            <p className="font-bold text-[#15282E] border-b border-[#F0F3F1] pb-1">
              {points[hoveredIdx].dateKey}
            </p>
            <div className="mt-1.5 space-y-1 text-[11px]">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-[#63746C]">
                  <span className="h-2 w-2 rounded-full bg-[#15282E]" /> Gross GMV:
                </span>
                <span className="font-semibold text-[#15282E]">
                  {formatCurrency(points[hoveredIdx].grossVolume)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-[#38897D]">
                  <span className="h-2 w-2 rounded-full bg-[#38897D]" /> Platform Fee:
                </span>
                <span className="font-bold text-[#38897D]">
                  {formatCurrency(points[hoveredIdx].platformFee)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-[#73847D]">
                  Mentor Payout:
                </span>
                <span className="font-medium text-[#1E2E27]">
                  {formatCurrency(points[hoveredIdx].mentorPayout)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

