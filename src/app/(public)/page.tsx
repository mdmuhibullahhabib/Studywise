import { HeroBanner } from "@/components/home/hero-banner";
import { UniversityBar } from "@/components/home/university-bar";
import { FeaturedMentors } from "@/components/home/FeaturedMentors";
import { FinalCTA } from "@/components/home/FinalCTA";

import { DEMO_MENTORS } from "@/constants/demo-mentors";
import { MentorService } from "@/features/mentors/mentor.service";
import { StudentJourney } from "@/components/home/StudentJourney";
import { HowStudyWiseWorks } from "@/components/home/HowStudyWiseWorks";
import { ExploreDestinations } from "@/components/home/ExploreDestinations";

export default async function HomePage() {
  const featuredMentors = await MentorService.featured(4);
  const mentors = [...featuredMentors, ...DEMO_MENTORS]
    .filter((mentor, index, all) => all.findIndex(({ id }) => id === mentor.id) === index)
    .slice(0, 4);

  return (
    <main className="w-full overflow-hidden">
      <HeroBanner />
      <UniversityBar />
      <FeaturedMentors mentors={mentors} />
      <HowStudyWiseWorks/>
      <StudentJourney/>
      <ExploreDestinations/>
      <FinalCTA />
    </main>
  );
}