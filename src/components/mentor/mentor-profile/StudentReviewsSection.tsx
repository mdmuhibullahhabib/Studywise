import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, CheckCircle2 } from "lucide-react";

interface StudentReviewsSectionProps {
  reviews: any[];
}

const SAMPLE_REVIEWS = [
  {
    name: "Nusrat Jahan",
    university: "University of Toronto",
    rating: "5.0",
    comment:
      "Arif bhai was incredibly helpful! He gave me clear guidance on my application and shared real insights about student life in Canada. Highly recommend!",
    bookedCount: "Booked 2 sessions",
    timeAgo: "2 months ago",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Tanim Hasan",
    university: "University of Manchester",
    rating: "5.0",
    comment:
      "His guidance on scholarships and university selection was spot on. I felt much more confident after our session.",
    bookedCount: "Booked 1 session",
    timeAgo: "3 months ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Sumaiya Akter",
    university: "University of Melbourne",
    rating: "5.0",
    comment:
      "Very friendly and professional. Answered all my questions about visa, part-time work and living costs. Great experience!",
    bookedCount: "Booked 1 session",
    timeAgo: "3 months ago",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Rafiul Islam",
    university: "University of British Columbia",
    rating: "5.0",
    comment:
      "Arif's advice helped me choose the right course and university. He explained everything in a simple and honest way.",
    bookedCount: "Booked 3 sessions",
    timeAgo: "4 months ago",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80",
  },
];

export function StudentReviewsSection({ reviews }: StudentReviewsSectionProps) {
  const displayList = reviews.length > 0 ? reviews : SAMPLE_REVIEWS;

  return (
    <section className="mt-16 border-t border-[#E7ECE8] pt-12 sm:mt-20 sm:pt-14">
      {/* Section Header */}
      <div className="flex flex-col gap-4 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D5E3DB] bg-[#EBF4F0] px-3.5 py-1 text-[11px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#36887F]" />
            STUDENT REVIEWS
          </span>
          <h2
            style={{ lineHeight: 1.2 }}
            className="mt-3.5 font-serif text-2xl font-bold tracking-tight text-[#0F1E17] sm:text-3xl lg:text-[34px]"
          >
            What students are saying
          </h2>
          <p
            style={{ lineHeight: 1.6 }}
            className="mt-2 text-[14px] !leading-[1.6] text-[#556960] sm:text-[16px]"
          >
            Verified feedback from students who have booked and completed 1-on-1 mentorship sessions.
          </p>
        </div>

        {/* Rating Summary & View All */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-[#E2EAE4] bg-white px-4 py-2.5 shadow-sm">
            <div className="flex items-center text-[#E5A023]">
              <Star className="h-4 w-4 fill-current" />
            </div>
            <span className="text-[14px] font-bold text-[#0F1E17]">5.0</span>
            <span className="text-[12px] font-medium text-[#708078]">• Verified Mentorship</span>
          </div>

          <Link
            href="#all-reviews"
            className="group hidden items-center gap-1.5 text-[13px] font-semibold text-[#1C3E30] transition-colors hover:text-[#36887F] sm:inline-flex"
          >
            <span>View all</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayList.slice(0, 4).map((r, i) => {
          const studentName = r.student?.name || r.name || "Anonymous Student";
          const studentAvatar =
            r.avatar ||
            r.student?.avatarUrl ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80";
          const studentUni = r.university || "International Student";
          const reviewText = r.comment || r.review || "";
          const ratingVal = r.rating ? Number(r.rating).toFixed(1) : "5.0";
          const sessionInfo = r.bookedCount || "Verified Session";
          const timeInfo =
            r.timeAgo ||
            (r.createdAt
              ? new Date(r.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              : "Recently");

          return (
            <div
              key={i}
              className="group flex flex-col justify-between rounded-2xl border border-[#E7ECE8] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#36887F]/40 hover:shadow-[0_12px_36px_rgba(54,136,127,0.1)] sm:p-6"
            >
              <div>
                {/* Student Info */}
                <div className="flex items-center gap-3.5">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#EAF0EC] ring-2 ring-[#EAF0EC] transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={studentAvatar}
                      alt={studentName}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-serif text-[15px] font-bold text-[#0F1E17] transition-colors group-hover:text-[#36887F] sm:text-[16px]">
                      {studentName}
                    </h4>
                    <p className="truncate text-[12px] font-medium text-[#687C73] sm:text-[13px]">
                      {studentUni}
                    </p>
                  </div>
                </div>

                {/* Rating Stars & Badge */}
                <div className="mt-4 flex items-center justify-between border-t border-[#F2F5F3] pt-3">
                  <div className="flex items-center gap-1 text-[#E5A023]">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                    ))}
                    <span className="ml-1 text-[13px] font-bold text-[#0F1E17]">
                      {ratingVal}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-[#EBF4F0] px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#36887F] uppercase">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </span>
                </div>

                {/* Comment Text */}
                <p
                  style={{ lineHeight: 1.6 }}
                  className="mt-3.5 text-[14px] !leading-[1.6] text-[#33463E] sm:text-[14.5px]"
                >
                  “{reviewText}”
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-5 flex items-center justify-between border-t border-[#F0F4F1] pt-3.5 text-[12px] text-[#71837B]">
                <span className="font-medium text-[#40544B]">{sessionInfo}</span>
                <span className="text-[#84948D]">{timeInfo}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}