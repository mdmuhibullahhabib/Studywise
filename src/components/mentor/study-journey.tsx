import { Flag, GraduationCap, FileText, Plane, Building2, Briefcase } from "lucide-react";

export interface JourneyProps {
  university?: string | null;
  country?: string | null;
  studyLevel?: string | null;
  currentRole?: string | null;
}

/**
 * A generic-but-personalized journey: the stage labels are the same shape
 * for every mentor (this is the story every mentor has lived), while the
 * university/country/degree slotted in are the mentor's own real data.
 * There's no per-mentor timeline data modeled yet (dates, intermediate
 * milestones) — this communicates the shape of the journey honestly
 * without inventing specifics no mentor provided.
 */
export function StudyJourney({ university, country, studyLevel, currentRole }: JourneyProps) {
  const steps = [
    { icon: Flag, title: "Bangladesh", detail: "Where the journey started" },
    { icon: GraduationCap, title: "Bachelor's degree", detail: "Built the academic foundation" },
    { icon: FileText, title: "Application", detail: "Applications, essays, and scholarships" },
    { icon: Plane, title: "Move abroad", detail: "Visa approved, ticket booked" },
    {
      icon: Building2,
      title: university || "University abroad",
      detail: [studyLevel, country].filter(Boolean).join(" · ") || "Studying overseas"
    },
    { icon: Briefcase, title: currentRole || "Today", detail: "Now helping the next student" }
  ];

  return (
    <div className="relative">
      <div className="absolute bottom-0 left-[15px] top-0 w-px bg-line" aria-hidden="true" />
      <ol className="space-y-6">
        {steps.map((step, i) => (
          <li key={i} className="relative flex gap-4 pl-0">
            <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-sage bg-paper">
              <step.icon className="h-3.5 w-3.5 text-sage-text" />
            </div>
            <div className="pt-1">
              <p className="text-sm font-semibold text-ink">{step.title}</p>
              <p className="mt-0.5 text-meta text-ink-500">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
