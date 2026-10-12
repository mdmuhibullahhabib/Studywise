import Image from "next/image";
import Link from "next/link";
import { Star, CheckCircle2 } from "lucide-react";

const RELATED = [
  {
    id: "maliha-ahmed",
    name: "Maliha Ahmed",
    university: "TU Munich • Germany",
    degree: "Engineering",
    rating: "4.8",
    sessions: 76,
    price: "$18",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "samiul-hasan",
    name: "Samiul Hasan",
    university: "University of Melbourne • Australia",
    degree: "Computer Science",
    rating: "4.9",
    sessions: 112,
    price: "$22",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "nusrat-jahan",
    name: "Nusrat Jahan",
    university: "University of Toronto • Canada",
    degree: "Business Analytics",
    rating: "4.8",
    sessions: 98,
    price: "$20",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
  },
];

export function RelatedMentorsSection() {
  return (
    <section className="mt-16 border-t border-[#E7ECE8] pt-12">
      <div className="flex items-end justify-between pb-6">
        <div>
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#788881] uppercase">
            RELATED MENTORS
          </span>
          <h2 className="mt-2 font-serif text-2xl font-normal text-[#0F1E17] sm:text-3xl">
            You might also like
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {RELATED.map((m) => (
          <div
            key={m.id}
            className="overflow-hidden rounded-[20px] border border-[#E7ECE8] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative aspect-[1.35/1] w-full overflow-hidden bg-[#F2F5F3]">
              <Image
                src={m.image}
                alt={m.name}
                fill
                className="object-cover object-top"
              />
              <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-medium text-[#1C3E30] shadow-2xs">
                <CheckCircle2 className="h-3 w-3 fill-[#1C3E30] text-white" />
                <span>Verified</span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-serif text-base font-semibold text-[#0F1E17]">
                {m.name}
              </h3>
              <p className="mt-0.5 text-xs text-[#5D6F66]">{m.university}</p>
              <p className="text-xs text-[#7B8C85]">{m.degree}</p>

              <div className="mt-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-[#E5A023]">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span className="font-bold text-[#0F1E17]">{m.rating}</span>
                  <span className="text-[#84948D]">({m.sessions} sessions)</span>
                </div>
                <span className="font-semibold text-[#0F1E17]">{m.price} / session</span>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Link
                  href={`/mentors/${m.id}`}
                  className="flex-1 rounded-full border border-[#DCE4E0] bg-white py-2 text-center text-xs font-medium text-[#2F4239] hover:bg-[#FAFBF9]"
                >
                  View Profile
                </Link>
                <Link
                  href={`/student/book/${m.id}`}
                  className="flex-1 rounded-full bg-[#1C3E30] py-2 text-center text-xs font-medium text-white shadow-2xs hover:bg-[#142e23]"
                >
                  Book Session
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}