import type { Metadata } from "next";
import { BecomeMentorHero } from "@/components/become-a-mentor/BecomeMentorHero";
import { WhyBecomeMentorSection } from "@/components/become-a-mentor/WhyBecomeMentorSection";
import { WhoCanBecomeSection } from "@/components/become-a-mentor/WhoCanBecomeSection";
import { HowMentoringWorksSteps } from "@/components/become-a-mentor/HowMentoringWorksSteps";
import { MentorSuccessStoryCard } from "@/components/become-a-mentor/MentorSuccessStoryCard";
import { MentorDashboardPreviewSection } from "@/components/become-a-mentor/MentorDashboardPreviewSection";
import { ReadyToShareCtaBanner } from "@/components/become-a-mentor/ReadyToShareCtaBanner";



export const metadata: Metadata = {
  title: "Become a Mentor | StudyWise",
  description: "Your experience could change someone’s future. Join StudyWise as a mentor and guide prospective students.",
};

export default function BecomeAMentorPage() {
  return (
    <main className="min-h-screen w-full bg-[#FAFBF9] text-[#192721]">

      <BecomeMentorHero />

      <WhyBecomeMentorSection />

      <WhoCanBecomeSection />

      <HowMentoringWorksSteps />

      <MentorSuccessStoryCard />

      <MentorDashboardPreviewSection />

      <ReadyToShareCtaBanner />
    </main>
  );
}