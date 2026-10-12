"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { MapPin } from "lucide-react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: 15, suffix: "+", label: "Countries" },
  { value: 200, suffix: "+", label: "Mentors" },
  { value: 10000, suffix: "+", label: "Students" },
];

const MAP_PINS = [
  { name: "Canada", top: "28%", left: "18%", isOrigin: false },
  { name: "USA", top: "42%", left: "21%", isOrigin: false },
  { name: "UK", top: "25%", left: "46%", isOrigin: false },
  { name: "Netherlands", top: "22%", left: "50%", isOrigin: false },
  { name: "Germany", top: "30%", left: "51%", isOrigin: false },
  { name: "France", top: "38%", left: "47%", isOrigin: false },
  { name: "Bangladesh", top: "48%", left: "68%", isOrigin: true },
  { name: "Australia", top: "74%", left: "80%", isOrigin: false },
];

function StatCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    Math.floor(latest).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      animate(count, target, {
        duration: 2,
        ease: "easeOut",
      });
    }
  }, [isInView, count, target]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function GlobalCommunitySection() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28">
      {/* ================= EXACT FIXED LAYOUT CONTAINER ================= */}
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] items-center px-5 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20 w-full">
            
            {/* ================= LEFT CONTENT & STATS ================= */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col justify-center lg:col-span-5"
            >
              <div>
                {/* Eyebrow */}
                <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
                  OUR GLOBAL FOOTPRINT
                </span>

                {/* Main Heading with leading-[1.2] */}
                <h2
                  style={{ lineHeight: 1.2 }}
                  className="mt-3.5 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[42px] xl:text-[46px]"
                >
                  Building a global community from Bangladesh.
                </h2>

                {/* Description (16px base) */}
                <p
                  style={{ lineHeight: 1.6 }}
                  className="mt-4 max-w-xl text-[15px] sm:text-[16px] !leading-[1.6] text-[#556960]"
                >
                  Mentors in top destinations. Students from every corner of Bangladesh. One shared goal — a better future.
                </p>
              </div>

              {/* Metrics */}
              <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-[#E0E8E3] pt-8 sm:gap-12 lg:mt-12">
                {STATS.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="font-serif text-3xl font-bold tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[38px]">
                      <StatCounter target={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="mt-1 text-[13px] sm:text-[14px] font-medium text-[#556960]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ================= RIGHT MAP VISUALIZATION ================= */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative flex w-full flex-col items-center justify-center lg:col-span-7"
            >
              {/* World Map Wrapper */}
              <div className="relative aspect-[16/10] w-full min-h-[320px] max-w-[850px] sm:min-h-[400px]">
                
                {/* Stylized Muted World Map Vector */}
                <svg
                  viewBox="0 0 1000 500"
                  className="h-full w-full opacity-35"
                  fill="#CFDAD4"
                >
                  {/* North America */}
                  <path d="M120,80 Q180,60 260,70 Q300,100 280,180 Q240,240 180,260 Q160,220 120,180 Z" />
                  <path d="M170,260 Q210,270 230,330 Q210,360 180,310 Z" />
                  
                  {/* South America */}
                  <path d="M260,280 Q320,290 340,360 Q320,440 280,480 Q250,420 260,340 Z" />
                  
                  {/* Europe */}
                  <path d="M440,70 Q510,60 530,110 Q500,160 450,150 Q430,110 440,70 Z" />
                  <path d="M450,160 Q490,160 510,200 Q460,220 440,180 Z" />
                  
                  {/* Africa */}
                  <path d="M450,210 Q540,210 560,280 Q550,380 490,420 Q440,350 430,260 Z" />
                  
                  {/* Asia */}
                  <path d="M540,70 Q680,50 820,90 Q850,180 780,250 Q690,270 630,220 Q560,210 540,120 Z" />
                  <path d="M660,230 Q720,240 730,300 Q680,330 650,280 Z" />
                  
                  {/* Australia */}
                  <path d="M780,340 Q880,330 890,410 Q830,460 770,420 Z" />
                </svg>

                {/* Connecting Curving Dashed Rays originating from Bangladesh */}
                <svg
                  viewBox="0 0 1000 500"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  fill="none"
                >
                  <path
                    d="M680 240 Q480 130 180 140"
                    stroke="#36887F"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    strokeOpacity="0.45"
                  />
                  <path
                    d="M680 240 Q450 160 210 210"
                    stroke="#36887F"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    strokeOpacity="0.45"
                  />
                  <path
                    d="M680 240 Q570 140 460 125"
                    stroke="#36887F"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    strokeOpacity="0.45"
                  />
                  <path
                    d="M680 240 Q740 310 800 370"
                    stroke="#36887F"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    strokeOpacity="0.45"
                  />
                </svg>

                {/* Destination Map Pins */}
                {MAP_PINS.map((pin) => (
                  <div
                    key={pin.name}
                    style={{ top: pin.top, left: pin.left }}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  >
                    {pin.isOrigin ? (
                      /* Origin Badge: Bangladesh with Brand Accent */
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex items-center gap-1.5"
                      >
                        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#1C3E30] text-white shadow-md ring-4 ring-[#FAFBF9]">
                          <MapPin className="h-4 w-4 fill-current text-[#4EAEA3]" />
                          <span className="absolute -inset-1 animate-ping rounded-full bg-[#36887F]/30" />
                        </div>
                        <span className="rounded-full bg-[#1C3E30] px-3 py-1 text-[12px] font-bold text-white shadow-sm ring-1 ring-white/20">
                          {pin.name}
                        </span>
                      </motion.div>
                    ) : (
                      /* Regular Pin */
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="group flex flex-col items-center"
                      >
                        <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-[#36887F] shadow-sm transition-transform group-hover:scale-125" />
                        <span className="mt-1 rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-semibold tracking-tight text-[#162E34] shadow-xs backdrop-blur-xs sm:text-[11px]">
                          {pin.name}
                        </span>
                      </motion.div>
                    )}
                  </div>
                ))}

              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}