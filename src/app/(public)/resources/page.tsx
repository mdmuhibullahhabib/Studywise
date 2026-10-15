import { ResourcesHero } from "@/components/resources/ResourcesHero";
import { FeaturedArticleCard } from "@/components/resources/FeaturedArticleCard";
import { PopularGuidesSection } from "@/components/resources/PopularGuidesSection";
import { StudentStoriesSection } from "@/components/resources/StudentStoriesSection";
import { MentorInsightsSection } from "@/components/resources/MentorInsightsSection";
import { NewsletterSubscribeBox } from "@/components/resources/NewsletterSubscribeBox";
import { StillQuestionsCtaBanner } from "@/components/resources/StillQuestionsCtaBanner";

export const metadata = {
  title: "Resources & Guides | StudyWise",
  description: "Practical guides, real student experiences and useful resources for your study-abroad journey.",
};

export default function ResourcesPage() {
  return (
    <main className="min-h-screen w-full bg-[#FAFBF9]">
      <ResourcesHero />
      <FeaturedArticleCard />
      <PopularGuidesSection />
      <StudentStoriesSection />
      <MentorInsightsSection />
      <NewsletterSubscribeBox />
      <StillQuestionsCtaBanner />
    </main>
  );
}