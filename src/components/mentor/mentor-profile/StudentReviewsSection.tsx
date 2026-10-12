import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

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
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
  },
  {
    name: "Tanim Hasan",
    university: "University of Manchester",
    rating: "5.0",
    comment:
      "His guidance on scholarships and university selection was spot on. I felt much more confident after our session.",
    bookedCount: "Booked 1 session",
    timeAgo: "3 months ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  },
  {
    name: "Sumaiya Akter",
    university: "University of Melbourne",
    rating: "5.0",
    comment:
      "Very friendly and professional. Answered all my questions about visa, part-time work and living costs. Great experience!",
    bookedCount: "Booked 1 session",
    timeAgo: "3 months ago",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
  },
  {
    name: "Rafiul Islam",
    university: "University of British Columbia",
    rating: "5.0",
    comment:
      "Arif's advice helped me choose the right course and university. He explained everything in a simple and honest way.",
    bookedCount: "Booked 3 sessions",
    timeAgo: "4 months ago",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80",
  },
];

export function StudentReviewsSection({ reviews }: StudentReviewsSectionProps) {
  const displayList = reviews.length > 0 ? reviews : SAMPLE_REVIEWS;

  return (
    <section className="mt-16 border-t border-[#E7ECE8] pt-12">
      <div className="flex items-end justify-between pb-6">
        <div>
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#788881] uppercase">
            STUDENT REVIEWS
          </span>
          <h2 className="mt-2 font-serif text-2xl font-normal text-[#0F1E17] sm:text-3xl">
            What students are saying
          </h2>
        </div>

        <Link
          href="#all-reviews"
          className="group hidden items-center gap-1.5 text-xs font-semibold text-[#1C3E30] hover:text-[#122b21] sm:inline-flex"
        >
          <span>View all reviews</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayList.slice(0, 4).map((r, i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-2xl border border-[#E7ECE8] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#EAF0EC]">
                  <Image
                    src={r.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                    alt={r.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#0F1E17]">{r.name}</h4>
                  <p className="text-[10px] text-[#7C8C85]">{r.university}</p>
                </div>
              </div>

              <div className="mt-2.5 flex items-center gap-1 text-[11px] text-[#E5A023]">
                <Star className="h-3 w-3 fill-current" />
                <span className="font-bold text-[#0F1E17]">{r.rating || "5.0"}</span>
              </div>

              <p className="mt-2.5 text-xs leading-relaxed text-[#5F7068]">
                {r.comment || r.review}
              </p>
            </div>

            <div className="mt-4 border-t border-[#F2F5F3] pt-3 text-[10px] text-[#8C9B94]">
              {r.bookedCount || "Booked 1 session"} • {r.timeAgo || "Recently"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}