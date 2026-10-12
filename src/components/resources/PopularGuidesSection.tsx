import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const GUIDES = [
  {
    title: "How to choose the right university",
    category: "Universities",
    readTime: "5 min read",
    author: "Nusrat Jahan",
    authorImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=50&q=80",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    href: "/resources/how-to-choose-the-right-university",
  },
  {
    title: "Scholarships Bangladeshi students should know",
    category: "Scholarships",
    readTime: "7 min read",
    author: "Samiul Hasan",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=50&q=80",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
    href: "/resources/scholarships-bangladeshi-students",
  },
  {
    title: "What nobody tells you about student life abroad",
    category: "Student Life",
    readTime: "6 min read",
    author: "Maliha Ahmed",
    authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=50&q=80",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
    href: "/resources/student-life-abroad-truths",
  },
  {
    title: "Your first 30 days after arriving",
    category: "Visa",
    readTime: "8 min read",
    author: "Rafius Islam",
    authorImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=50&q=80",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
    href: "/resources/first-30-days-after-arriving",
  },
];

export function PopularGuidesSection() {
  return (
    <section className="relative w-full bg-[#FAFBF9] py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1920px] px-6 sm:px-12 lg:px-16 xl:px-24">
        
        {/* Section Heading */}
        <div className="flex items-end justify-between border-b border-[#E7ECE8] pb-5">
          <div>
            <span className="text-[11px] font-bold tracking-[0.22em] text-[#71827A] uppercase">
              POPULAR GUIDES
            </span>
            <h2 className="mt-2 font-serif text-2xl font-normal text-[#0F1E17] sm:text-3xl">
              Quick answers to your biggest questions.
            </h2>
          </div>

          <Link
            href="/resources/guides"
            className="group hidden items-center gap-1.5 text-xs font-semibold text-[#1C3E30] hover:text-[#122b21] sm:inline-flex"
          >
            <span>View all guides</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GUIDES.map((guide) => (
            <Link
              key={guide.title}
              href={guide.href}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E7ECE8] bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F0F4F2]">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#1C3E30] backdrop-blur-xs">
                    {guide.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-base font-normal leading-snug text-[#0F1E17] transition-colors group-hover:text-[#1C3E30]">
                    {guide.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#F2F5F3] px-5 py-3 text-[11px] text-[#71827A]">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  <span>{guide.readTime}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="relative h-4 w-4 overflow-hidden rounded-full bg-[#E5ECE8]">
                    <Image
                      src={guide.authorImage}
                      alt={guide.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>By {guide.author}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}