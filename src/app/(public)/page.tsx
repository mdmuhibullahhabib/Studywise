import { HeroBanner } from "@/components/home/hero-banner";
import { UniversityBar } from "@/components/home/university-bar";
import { MentorDiscoveryRails } from "@/components/home/MentorDiscoveryRails";
import { BrowseByCategory } from "@/components/home/BrowseByCategory";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyStudyWise } from "@/components/home/WhyStudyWise";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";

import { DEMO_MENTORS, TESTIMONIALS } from "@/constants/demo-mentors";
import { MentorService } from "@/features/mentors/mentor.service";
import type { MentorCardData } from "@/components/mentor/mentor-card";
import { StudentJourney } from "@/components/home/StudentJourney";
import { HowStudyWiseWorks } from "@/components/home/HowStudyWiseWorks";
import { ExploreDestinations } from "@/components/home/ExploreDestinations";

const RAILS = [
  { title: "Popular in Study Abroad Applications", subject: "Study Abroad Applications" },
  { title: "Popular in Programming", subject: "Programming" },
  { title: "Popular in Business", subject: "Business" },
];

function demoFallback(subject: string): MentorCardData[] {
  const matches = DEMO_MENTORS.filter((m) => m.expertise.includes(subject));
  return matches.length > 0 ? matches : DEMO_MENTORS;
}

const PROCESS = [
  {
    stage: "Discover",
    description:
      "Search mentors by country, university, and subject until you find someone who's walked your exact path.",
  },
  {
    stage: "Connect",
    description:
      "Message a mentor directly, ask real questions, then book a session that fits both your schedules.",
  },
  {
    stage: "Grow",
    description:
      "Meet, learn, and revisit the recording after — every session builds toward your own application or coursework.",
  },
];

export default async function HomePage() {
  const rails = await Promise.all(
    RAILS.map(async (rail) => {
      const results = await MentorService.search({ subject: rail.subject });
      return { ...rail, mentors: results.length > 0 ? results : demoFallback(rail.subject) };
    })
  );

  return (
    <main className="w-full overflow-hidden">
      <HeroBanner />
      <UniversityBar />
      <MentorDiscoveryRails rails={rails} />
      <BrowseByCategory />
      <HowItWorks process={PROCESS} />
      <WhyStudyWise />
      <Testimonials testimonials={TESTIMONIALS} />
      <HowStudyWiseWorks/>
      <StudentJourney/>
      <ExploreDestinations/>
      <FinalCTA />
    </main>
  );
}