import { SearchX } from "lucide-react";
import { MentorService } from "@/features/mentors/mentor.service";
import { DEMO_MENTORS } from "@/constants/demo-mentors";
import { MentorsHero } from "@/components/mentor/MentorsHero";
import { MentorsFilterSidebar } from "@/components/mentor/MentorsFilterSidebar";
import { MentorPaginationOrSort } from "@/components/mentor/MentorPaginationOrSort";
import { MentorGridCard } from "@/components/mentor/MentorGridCard";
import { FeaturedMentorWideCard } from "@/components/mentor/FeaturedMentorWideCard";
import { NotSureMentorCta } from "@/components/mentor/NotSureMentorCta";

interface MentorsPageProps {
  searchParams: Promise<{
    subject?: string;
    rating?: string;
    q?: string;
    country?: string;
    sort?: "recommended" | "experience" | "rating";
  }>;
}

export const metadata = {
  title: "Find a Mentor | StudyWise",
  description: "Connect with verified student mentors from top global universities.",
};

export default async function MentorsPage({ searchParams }: MentorsPageProps) {
  const { subject, rating, q, country, sort } = await searchParams;

  const dbResults = await MentorService.search({
    subject,
    minRating: rating ? Number(rating) : undefined,
    q,
  });

  const usingDemoFallback = dbResults.length === 0 && !subject && !rating && !q && !country;
  let mentors = usingDemoFallback ? [...DEMO_MENTORS] : [...dbResults];

  if (country) {
    mentors = mentors.filter((m: any) =>
      m.country?.toLowerCase().includes(country.toLowerCase())
    );
  }

  if (sort === "rating") {
    mentors.sort((a: any, b: any) => (b.ratingAverage ?? 0) - (a.ratingAverage ?? 0));
  } else if (sort === "experience") {
    mentors.sort((a: any, b: any) => (b.sessionCount ?? 0) - (a.sessionCount ?? 0));
  } else {
    mentors.sort((a: any, b: any) => {
      const scoreA = (a.ratingAverage ?? 0) * 10 + (a.sessionCount ?? 0);
      const scoreB = (b.ratingAverage ?? 0) * 10 + (b.sessionCount ?? 0);
      return scoreB - scoreA;
    });
  }

  return (
    <main className="min-h-screen w-full bg-[#FAFBF9] pb-20 text-[#0F1E17]">
      {/* 1. Hero Search */}
      <MentorsHero initialSearch={q} />

      {/* 2. Main Content Grid */}
      <div className="relative z-10 mx-auto mt-10 w-10/12 sm:mt-14">
        <div className="mx-auto max-w-[1920px] px-5 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
            
            {/* Sidebar Filters */}
            <div className="lg:col-span-3">
              <MentorsFilterSidebar
                currentSubject={subject}
                currentRating={rating}
                currentCountry={country}
                currentQ={q}
                currentSort={sort}
              />
            </div>

            {/* Results & Sorter */}
            <div className="lg:col-span-9">
              <MentorPaginationOrSort totalCount={mentors.length} />

              {mentors.length === 0 ? (
                <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-[#E0E8E3] bg-white py-20 text-center shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EBF4F0] text-[#36887F]">
                    <SearchX className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-bold text-[#0F1E17]">
                    No mentors found
                  </h3>
                  <p className="mt-2 text-[15px] text-[#556960]">
                    Try adjusting your search criteria, clearing filters, or checking back later.
                  </p>
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {mentors.map((mentor: any) => (
                    <MentorGridCard key={mentor.id} mentor={mentor} />
                  ))}
                </div>
              )}

              {/* Highlighted Banner */}
              <div className="mt-12">
                <FeaturedMentorWideCard />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Conversion CTA */}
      <div className="mt-14 sm:mt-20">
        <NotSureMentorCta />
      </div>
    </main>
  );
}