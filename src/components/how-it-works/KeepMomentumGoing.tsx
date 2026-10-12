"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FileText, MessageSquare, CalendarCheck } from "lucide-react";

const ACTIONS = [
  {
    icon: FileText,
    title: "Session notes & action items",
    desc: "Review structured key takeaways, links, and personalized action items directly in your student hub.",
  },
  {
    icon: MessageSquare,
    title: "Direct follow-up messages",
    desc: "Have a quick question after the call? Drop a follow-up inquiry directly through your mentor chat thread.",
  },
  {
    icon: CalendarCheck,
    title: "Book your next milestone",
    desc: "Schedule subsequent review sessions for visa mock interviews or final SOP checks whenever you're ready.",
  },
];

export function KeepMomentumGoing() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28">
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] flex-col px-5 sm:px-10 lg:px-16 xl:px-24">
          
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
              AFTER THE SESSION
            </span>
            <h2
              style={{ lineHeight: 1.2 }}
              className="mt-3.5 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[40px] xl:text-[44px]"
            >
              Keep the momentum going.
            </h2>
            <p
              style={{ lineHeight: 1.6 }}
              className="mt-3 max-w-xl text-[16px] !leading-[1.6] text-[#556960] lg:text-[18px]"
            >
              Your journey doesn’t conclude after a single conversation. Stay connected, keep track of deliverables, and proceed with clarity.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
            
            <div className="space-y-4 lg:col-span-7">
              {ACTIONS.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.45 }}
                  className="group flex items-start gap-4 rounded-3xl border border-[#E7ECE8] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#36887F]/40 hover:shadow-[0_12px_36px_rgba(54,136,127,0.08)] sm:p-7"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EBF4F0] text-[#36887F] transition-colors duration-300 group-hover:bg-[#36887F] group-hover:text-white">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3
                      style={{ lineHeight: 1.25 }}
                      className="font-serif text-[18px] sm:text-[20px] font-bold !leading-[1.25] tracking-tight text-[#0F1E17] transition-colors group-hover:text-[#36887F]"
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{ lineHeight: 1.6 }}
                      className="mt-2 text-[14px] !leading-[1.6] text-[#556960] sm:text-[15px]"
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[#E7ECE8] bg-[#EAEFEA] shadow-[0_12px_36px_rgba(0,0,0,0.04)] lg:col-span-5 lg:h-full lg:min-h-[380px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80"
                alt="Notepad and pen"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/30 bg-white/95 p-5 shadow-lg backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-8">
                <span className="font-serif italic text-[15px] sm:text-[16px] font-semibold text-[#1C3E30]">
                  &ldquo;Clear advice turns uncertainty into decisive action.&rdquo;
                </span>
                <p className="mt-1 text-[12px] font-bold tracking-wider text-[#36887F] uppercase">
                  StudyWise Mentorship
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}