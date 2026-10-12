"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TOPICS = [
  {
    title: "Choosing a university",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Understanding scholarships",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Preparing applications & SOPs",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Navigating student life",
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Life on campus & accommodation",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Adjusting to a new country",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
  },
];

export function UnderstandsJourneyGallery() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28">
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] flex-col px-5 sm:px-10 lg:px-16 xl:px-24">
          
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
              YOUR GOALS
            </span>
            <h2
              style={{ lineHeight: 1.2 }}
              className="mt-3.5 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[40px] xl:text-[44px]"
            >
              Find someone who <br />
              understands your journey.
            </h2>
            <p
              style={{ lineHeight: 1.6 }}
              className="mt-3 max-w-xl text-[16px] !leading-[1.6] text-[#556960] lg:text-[18px]"
            >
              Every student’s path is unique. Whether you are shortlisting universities, crafting personal statements, or exploring funding, our mentors have walked that road.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
                className="group relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-[#E7ECE8] shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#36887F]/40 hover:shadow-[0_12px_36px_rgba(54,136,127,0.08)]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 via-45% to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="font-serif text-[18px] sm:text-[20px] font-bold !leading-[1.3] tracking-tight text-white drop-shadow-sm transition-transform duration-300 group-hover:translate-x-1">
                    {item.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}