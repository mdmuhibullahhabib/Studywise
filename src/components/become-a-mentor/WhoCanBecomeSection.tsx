"use client";

import { motion } from "framer-motion";
import { Plane, GraduationCap, MessageSquare, ShieldCheck } from "lucide-react";

const QUALIFICATIONS = [
  {
    icon: Plane,
    title: "Currently studying abroad",
    desc: "Live the experience, share the insights, and help someone prepare for their journey.",
  },
  {
    icon: GraduationCap,
    title: "Graduate of an international university",
    desc: "Your journey matters. Share insights on graduation, career pathways, and settling in.",
  },
  {
    icon: MessageSquare,
    title: "Willing to share real experience",
    desc: "Be honest, transparent, and approachable to help juniors make informed choices.",
  },
  {
    icon: ShieldCheck,
    title: "Professional and trustworthy",
    desc: "Commit to building a safe, supportive, and respectful environment for aspiring students.",
  },
];

export function WhoCanBecomeSection() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28">
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] items-center px-5 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20 w-full">
            
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col justify-start lg:col-span-5"
            >
              <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
                WHO CAN BECOME A MENTOR?
              </span>

              <h2
                style={{ lineHeight: 1.2 }}
                className="mt-3.5 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[40px] xl:text-[44px]"
              >
                Who can become <br className="hidden sm:inline" />
                a mentor?
              </h2>

              <p
                style={{ lineHeight: 1.6 }}
                className="mt-4 max-w-md text-[16px] !leading-[1.6] text-[#556960] lg:text-[18px]"
              >
                If you’ve lived abroad, faced the hurdles, and have genuine experiences to share, you’re ready to guide someone through theirs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
              {QUALIFICATIONS.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.45 }}
                  className="group flex flex-col justify-between rounded-3xl border border-[#E7ECE8] bg-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#36887F]/40 hover:shadow-[0_12px_36px_rgba(54,136,127,0.08)] sm:p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EBF4F0] text-[#36887F] transition-colors duration-300 group-hover:bg-[#36887F] group-hover:text-white">
                    <item.icon className="h-6 w-6" />
                  </div>

                  <div className="mt-8">
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

          </div>
        </div>
      </div>
    </section>
  );
}