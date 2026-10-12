import { AboutCTASection } from "@/components/about/AboutCTASection";
import { AboutHeroBanner } from "@/components/about/AboutHeroBanner";
import { ExperienceToGuidanceSection } from "@/components/about/ExperienceToGuidanceSection";
import { GlobalCommunitySection } from "@/components/about/GlobalCommunitySection";
import { OurValuesSection } from "@/components/about/OurValuesSection";
import { StudentStoriesSection } from "@/components/about/StudentStoriesSection";
import { WhyWeBuiltStudyWiseSection } from "@/components/about/WhyWeBuiltStudyWiseSection";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
    <AboutHeroBanner></AboutHeroBanner>
    <ExperienceToGuidanceSection></ExperienceToGuidanceSection>
    <WhyWeBuiltStudyWiseSection></WhyWeBuiltStudyWiseSection>
    <OurValuesSection></OurValuesSection>
    <StudentStoriesSection></StudentStoriesSection>
    <GlobalCommunitySection></GlobalCommunitySection>
    <AboutCTASection></AboutCTASection>
    </>
  );
}
