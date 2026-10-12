import Image from "next/image";

export function MentorHeroBanner() {
  return (
    <section className="relative mt-8 min-h-[220px] w-full overflow-hidden rounded-3xl border border-[#E7ECE8] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.02)] sm:min-h-[250px]">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80"
          alt="Mentor Skyline"
          fill
          priority
          className="object-cover object-[75%_center] opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFBF9] via-[#FAFBF9]/90 to-transparent sm:via-[#FAFBF9]/80" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div className="max-w-md">
            <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight text-[#0F1E17] sm:text-4xl">
              Your mentorship <br /> at a glance.
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-[#5F7068] sm:text-sm">
              Help students achieve their goals. Share your experience, make a real impact.
            </p>
          </div>

          <div className="-rotate-6 text-right select-none sm:pr-8">
            <p className="font-serif italic text-base leading-tight text-[#2B3E35] sm:text-lg">
              Real experience.
            </p>
            <p className="font-serif italic text-base leading-tight text-[#2B3E35] sm:text-lg">
              Real impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}