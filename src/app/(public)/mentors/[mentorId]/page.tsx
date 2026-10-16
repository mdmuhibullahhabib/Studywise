import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { MentorService } from "@/features/mentors/mentor.service";
import { DEMO_MENTORS } from "@/constants/demo-mentors";
import { MentorProfileHeaderCard } from "@/components/mentor/mentor-profile/MentorProfileHeaderCard";
import { MentorQuickBookWidget } from "@/components/mentor/mentor-profile/MentorQuickBookWidget";
import { MentorThreeColumnDetails } from "@/components/mentor/mentor-profile/MentorThreeColumnDetails";
import { StudentReviewsSection } from "@/components/mentor/mentor-profile/StudentReviewsSection";
import { RelatedMentorsSection } from "@/components/mentor/mentor-profile/RelatedMentorsSection";
import { BookConversationBottomBanner } from "@/components/mentor/mentor-profile/BookConversationBottomBanner";

interface MentorProfilePageProps {
  params: Promise<{ mentorId: string }>;
}

export async function generateMetadata({ params }: MentorProfilePageProps): Promise<Metadata> {
  const { mentorId } = await params;
  const result = await MentorService.getByUserId(mentorId);
  if (!result) return {};
  return {
    title: `${result.profile.user.name} | StudyWise Mentor`,
    description: `${result.profile.title ?? "Mentor"} — book a session on StudyWise.`,
  };
}

export default async function MentorProfilePage({ params }: MentorProfilePageProps) {
  const { mentorId } = await params;
  const result = await MentorService.getByUserId(mentorId);

  const demo = !result ? DEMO_MENTORS.find((m) => m.id === mentorId) : null;
  if (!result && !demo) notFound();

  const session = await auth();
  const isStudent = session?.user.role === "STUDENT";

  const name = result ? result.profile.user.name : demo!.name;
  const title = result ? result.profile.title ?? "Mentor" : demo!.title;
  const country = result ? result.profile.country : demo!.country;
  const university = result ? result.profile.university : demo!.university;
  const studyLevel = result?.profile.studyLevel ?? "MSc Data Science";
  const verified = result ? result.profile.verified : demo!.verified;
  const ratingAverage = result ? Number(result.profile.ratingAverage) : demo!.ratingAverage;
  const ratingCount = result ? result.profile.ratingCount : demo!.ratingCount;
  const sessionCount = result ? result.sessionCount : demo!.sessionCount;
  const expertise = result ? result.profile.expertise : demo!.expertise;
  const hourlyRate = result ? Number(result.profile.hourlyRate ?? 25) : demo!.hourlyRate;
  const currency = result ? result.profile.currency : demo!.currency;
  const bio = result?.profile.bio;
  const teachingApproach = result?.profile.teachingApproach;
  const avatarUrl = result ? result.profile.user?.avatarUrl : demo!.avatarUrl;
  const reviews = result?.reviews ?? [];

  return (
    <main className="min-h-screen w-full bg-[#FAFBF9] pb-20 text-[#0F1E17]">
      {/* 10/12 Width Container Shell with Responsive Padding */}
      <div className="relative z-10 mx-auto w-10/12 pt-8 sm:pt-12 lg:pt-16">
        <div className="mx-auto max-w-[1920px] px-5 sm:px-10 lg:px-16 xl:px-24">
          
          {/* Top Hero Section: Profile Header (8 cols) + Sticky Quick-Book Widget (4 cols) */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
            <div className="lg:col-span-8">
              <MentorProfileHeaderCard
                mentorId={mentorId}
                mentorProfileId={result?.profile.id}
                name={name}
                title={title}
                avatarUrl={avatarUrl}
                university={university}
                country={country}
                bio={bio}
                ratingAverage={ratingAverage}
                ratingCount={ratingCount}
                sessionCount={sessionCount}
                verified={verified}
                isStudent={isStudent}
                isAuthenticated={!!session?.user}
                hasResult={!!result}
              />
            </div>

            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <MentorQuickBookWidget
                mentorId={mentorId}
                hourlyRate={hourlyRate}
                currency={currency}
              />
            </div>
          </div>

          {/* Detailed Info: About, Experience, and Specialties */}
          <MentorThreeColumnDetails
            mentorName={name}
            bio={bio}
            teachingApproach={teachingApproach}
            university={university}
            country={country}
            studyLevel={studyLevel}
            expertise={expertise}
          />

          {/* Student Reviews Grid */}
          <StudentReviewsSection reviews={reviews} />

          {/* Related Mentors Grid */}
          <RelatedMentorsSection />

          {/* Bottom Call to Action Banner */}
          <BookConversationBottomBanner mentorId={mentorId} mentorName={name} />

        </div>
      </div>
    </main>
  );
}