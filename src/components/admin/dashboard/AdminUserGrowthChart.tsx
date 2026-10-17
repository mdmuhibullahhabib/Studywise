"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, GraduationCap, ArrowRight, UserPlus, TrendingUp } from "lucide-react";
import { TimeSeriesPoint } from "./analyticsUtils";

interface AdminUserGrowthChartProps {
  data: TimeSeriesPoint[];
  totalStudents: number;
  totalMentors: number;
  newStudentsCount: number;
  newMentorsCount: number;
}

export function AdminUserGrowthChart({
  data,
  totalStudents,
  totalMentors,
  newStudentsCount,
  newMentorsCount,
}: AdminUserGrowthChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const ratio = totalMentors > 0 ? (totalStudents / totalMentors).toFixed(1) : "0.0";
  const maxUsersInBucket = Math.max(
    ...data.map((d) => Math.max(d.newStudents, d.newMentors)),
    3
  );

  const svgWidth = 800;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 25;
  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;

  const points = data.map((d, i) => {
    const x = paddingX + (i / Math.max(data.length - 1, 1)) * chartW;
    const yStudents = paddingY + chartH - (d.newStudents / maxUsersInBucket) * chartH;
    const yMentors = paddingY + chartH - (d.newMentors / maxUsersInBucket) * chartH;
    return { ...d, x, yStudents, yMentors };
  });

  const studentLinePath = points.reduce(
    (acc, p, i) =>
      `${acc} ${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.yStudents.toFixed(1)}`,
    ""
  );

  const mentorLinePath = points.reduce(
    (acc, p, i) =>
      `${acc} ${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.yMentors.toFixed(1)}`,
    ""
  );

  return (
    <div className="mt-8 rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-[#F0F3F1] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-[#38897D]" />
            <h3 className="font-serif text-lg font-bold text-[#15282E]">
              User Community & Acquisition Growth
            </h3>
          </div>
          <p className="mt-0.5 text-xs text-[#63746C]">
            Comparing new student registrations vs mentor network onboarding velocity.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 font-semibold text-[#15282E]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#15282E]" /> New Students ({newStudentsCount})
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-[#38897D]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#38897D]" /> New Mentors ({newMentorsCount})
          </span>
        </div>
      </div>

      {/* Snapshot Cards */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[#E8EEEA] bg-[#FAFBF9] p-3.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7A8A82]">
            Total Students
          </p>
          <p className="font-serif text-xl font-bold text-[#15282E] mt-0.5">
            {totalStudents}
          </p>
        </div>
        <div className="rounded-xl border border-[#E8EEEA] bg-[#FAFBF9] p-3.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7A8A82]">
            Total Mentors
          </p>
          <p className="font-serif text-xl font-bold text-[#15282E] mt-0.5">
            {totalMentors}
          </p>
        </div>
        <div className="rounded-xl border border-[#E8EEEA] bg-[#FAFBF9] p-3.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#38897D]">
            Student-to-Mentor Ratio
          </p>
          <p className="font-serif text-xl font-bold text-[#38897D] mt-0.5">
            {ratio} : 1
          </p>
        </div>
        <div className="rounded-xl border border-[#E8EEEA] bg-[#FAFBF9] p-3.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#7A8A82]">
            Acquisition Rate
          </p>
          <p className="font-serif text-xl font-bold text-[#15282E] mt-0.5">
            +{newStudentsCount + newMentorsCount} users
          </p>
        </div>
      </div>

      {/* Interactive Growth SVG */}
      <div className="relative mt-6 w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible select-none"
        >
          {/* Gridlines */}
          {[0, 0.5, 1].map((pct, idx) => {
            const y = paddingY + chartH * (1 - pct);
            const val = Math.round(maxUsersInBucket * pct);
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

          {/* Student Curve */}
          <path
            d={studentLinePath}
            fill="none"
            stroke="#15282E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Mentor Curve */}
          <path
            d={mentorLinePath}
            fill="none"
            stroke="#38897D"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle
                cx={p.x}
                cy={p.yStudents}
                r={hoveredIdx === idx ? 5.5 : 3.5}
                className="fill-[#15282E] stroke-white stroke-2 transition-all duration-150"
              />
              <circle
                cx={p.x}
                cy={p.yMentors}
                r={hoveredIdx === idx ? 5.5 : 3.5}
                className="fill-[#38897D] stroke-white stroke-2 transition-all duration-150"
              />
            </g>
          ))}

          {/* Hit Targets */}
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
                hoveredIdx === idx ? "fill-[#15282E] font-bold" : "fill-[#8C9C94]"
              }`}
            >
              {p.label}
            </text>
          ))}
        </svg>

        {/* Floating Tooltip */}
        {hoveredIdx !== null && points[hoveredIdx] && (
          <div
            className="pointer-events-none absolute top-2 z-20 rounded-xl border border-[#D5E3DB] bg-white/98 p-3 shadow-lg backdrop-blur-xs text-xs"
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
                <span className="flex items-center gap-1.5 text-[#15282E]">
                  <span className="h-2 w-2 rounded-full bg-[#15282E]" /> New Students:
                </span>
                <span className="font-bold text-[#15282E]">
                  {points[hoveredIdx].newStudents}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-[#38897D]">
                  <span className="h-2 w-2 rounded-full bg-[#38897D]" /> New Mentors:
                </span>
                <span className="font-bold text-[#38897D]">
                  {points[hoveredIdx].newMentors}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer links */}
      <div className="mt-6 flex items-center justify-between border-t border-[#F0F3F1] pt-4 text-xs">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/students"
            className="font-semibold text-[#15282E] hover:underline"
          >
            Manage Students ({totalStudents}) →
          </Link>
          <Link
            href="/admin/mentors"
            className="font-semibold text-[#38897D] hover:underline"
          >
            Manage Mentors ({totalMentors}) →
          </Link>
        </div>
        <span className="text-[#8C9C94] text-[11px]">
          Healthy supply ratio target: 4–6 students per mentor
        </span>
      </div>
    </div>
  );
}

