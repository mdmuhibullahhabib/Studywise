import type { Metadata } from "next";
import { HowItWorksHero } from "@/components/how-it-works/HowItWorksHero";
import { SimpleByDesignSteps } from "@/components/how-it-works/SimpleByDesignSteps";
import { UnderstandsJourneyGallery } from "@/components/how-it-works/UnderstandsJourneyGallery";
import { EasyBookingNoHassle } from "@/components/how-it-works/EasyBookingNoHassle";
import { RealConversationsVideoPreview } from "@/components/how-it-works/RealConversationsVideoPreview";
import { KeepMomentumGoing } from "@/components/how-it-works/KeepMomentumGoing";
import { QuestionsRealAnswersBanner } from "@/components/how-it-works/QuestionsRealAnswersBanner";
import { HowItWorksFooter } from "@/components/how-it-works/HowItWorksFooter";
// import { ResourcesFooter } from "@/components/resources/ResourcesFooter";

export const metadata: Metadata = {
  title: "How It Works | StudyWise",
  description: "Studying abroad starts with a conversation. Learn how StudyWise connects you with verified mentors.",
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen w-full bg-[#FAFBF9] text-[#192721]">
      <HowItWorksHero />
      <SimpleByDesignSteps />
      <UnderstandsJourneyGallery />
      <EasyBookingNoHassle />
      <RealConversationsVideoPreview />
      <KeepMomentumGoing />
      <QuestionsRealAnswersBanner />

    </main>
  );
}