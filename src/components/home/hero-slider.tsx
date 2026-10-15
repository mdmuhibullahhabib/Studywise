"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BadgeCheck, ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";

/**
 * Placeholder imagery — Lorem Picsum (no API key required, safe to use as a
 * stand-in). Swap these for real, licensed photography of Bangladeshi
 * students abroad before launch; this environment has no network access to
 * source or verify real photos.
 */
const SLIDES = [
  {
    image: "https://picsum.photos/seed/studywise-campus-1/1200/1400",
    name: "Rahim Ahmed",
    university: "University of Manchester",
    country: "United Kingdom",
    program: "MSc Computer Science",
    rating: 4.9,
    students: 28
  },
  {
    image: "https://picsum.photos/seed/studywise-campus-2/1200/1400",
    name: "Nusrat Jahan",
    university: "University of Toronto",
    country: "Canada",
    program: "MSc Data Science",
    rating: 4.8,
    students: 41
  },
  {
    image: "https://picsum.photos/seed/studywise-campus-3/1200/1400",
    name: "Tanvir Hossain",
    university: "TU Munich",
    country: "Germany",
    program: "MSc Mechanical Engineering",
    rating: 5.0,
    students: 19
  },
  {
    image: "https://picsum.photos/seed/studywise-campus-4/1200/1400",
    name: "Farzana Karim",
    university: "University of Melbourne",
    country: "Australia",
    program: "MBA",
    rating: 4.9,
    students: 33
  }
];

const AUTOPLAY_MS = 4500;

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused]);

const slide = SLIDES[active] ?? SLIDES[0]!;

  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-line shadow-raised"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((s, i) => (
        <div
          key={s.image}
          aria-hidden={i !== active}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <Image
            src={s.image}
            alt={i === active ? `${s.name}, mentor at ${s.university}` : ""}
            fill
            priority={i === 0}
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-cover"
            style={{
              // Very slow, subtle Ken Burns zoom — only runs on the active slide.
              animation: i === active ? `hero-zoom ${AUTOPLAY_MS * 2}ms ease-out forwards` : undefined
            }}
          />
        </div>
      ))}

      {/* Gradient for legibility of the floating card below */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/10" />

      {/* Prev / next controls */}
      <button
        onClick={() => setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length)}
        aria-label="Previous"
        className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-card transition-transform hover:scale-105"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={() => setActive((i) => (i + 1) % SLIDES.length)}
        aria-label="Next"
        className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-card transition-transform hover:scale-105"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Progress dots */}
      <div className="absolute left-1/2 top-4 flex -translate-x-1/2 gap-1.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.image}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Floating mentor info card — content changes with the active slide */}
      <div className="absolute inset-x-4 bottom-4 rounded-md bg-white/95 p-4 shadow-raised backdrop-blur">
        <div className="flex items-center gap-1.5">
          <p className="font-display text-[15px] font-semibold text-ink">{slide.name}</p>
          <BadgeCheck className="h-4 w-4 text-gold" aria-label="Verified mentor" />
        </div>
        <p className="mt-1 flex items-center gap-1 text-meta text-sky-text">
          <MapPin className="h-3 w-3" />
          {slide.university}, {slide.country}
        </p>
        <p className="text-meta text-ink-500">{slide.program}</p>
        <div className="mt-2 flex items-center gap-3 text-meta text-ink-500">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            <span className="font-semibold text-ink">{slide.rating}</span>
          </span>
          <span>{slide.students} students helped</span>
        </div>
      </div>

      <style>{`
        @keyframes hero-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.06); }
        }
      `}</style>
    </div>
  );
}
