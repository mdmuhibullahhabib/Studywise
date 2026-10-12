import Link from "next/link";
import {
  Calculator,
  Atom,
  FlaskConical,
  Code2,
  BookOpen,
  Briefcase,
  Palette,
  Plane,
  Award,
  GraduationCap,
  type LucideIcon
} from "lucide-react";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Mathematics: Calculator,
  Physics: Atom,
  Chemistry: FlaskConical,
  Programming: Code2,
  English: BookOpen,
  Business: Briefcase,
  Design: Palette,
  "Study Abroad Applications": Plane,
  "Scholarship Applications": Award,
  Career: GraduationCap
};

export function CategoryStrip({ categories }: { categories: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const Icon = CATEGORY_ICONS[category] ?? BookOpen;
        return (
          <Link
            key={category}
            href={`/mentors?subject=${encodeURIComponent(category)}`}
            className="card-interactive flex min-w-[130px] flex-col items-center gap-2 px-4 py-5 text-center"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-soft">
              <Icon className="h-4 w-4 text-sage-text" />
            </div>
            <p className="text-sm font-medium text-ink">{category}</p>
          </Link>
        );
      })}
    </div>
  );
}
