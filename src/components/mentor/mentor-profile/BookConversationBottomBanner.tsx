import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BookConversationBottomBannerProps {
  mentorId: string;
  mentorName: string;
}

export function BookConversationBottomBanner({
  mentorId,
  mentorName,
}: BookConversationBottomBannerProps) {
  const firstName = mentorName.split(" ")[0];

  return (
    <section className="relative mt-16 overflow-hidden rounded-[28px] border border-[#E7ECE8] shadow-[0_4px_24px_rgba(0,0,0,0.03)] min-h-[260px]">
      {/* Background Silhouette */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2000&q=85"
          alt="London City Silhouette"
          fill
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFBF9] via-[#FAFBF9]/88 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-[260px] flex-col justify-center p-8 sm:p-12">
        <span className="text-[11px] font-bold tracking-[0.2em] text-[#788881] uppercase">
          READY TO GET REAL ANSWERS?
        </span>

        <h2 className="mt-2 font-serif text-3xl font-normal text-[#0F1E17] sm:text-4xl">
          Book a conversation with {firstName}.
        </h2>

        <p className="mt-2 max-w-lg text-xs text-[#5F7068] sm:text-sm">
          Get personalized guidance and ask all your questions about studying abroad.
        </p>

        <div className="mt-6">
          <Link
            href={`/student/book/${mentorId}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#1C3E30] px-6 py-3 text-xs font-medium text-white shadow-sm hover:bg-[#142e23]"
          >
            <span>Book a Session</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}