"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const BENEFITS = [
  {
    title: "Help future students",
    desc: "Guide and support students in making the right decisions for their future.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Earn from your experience",
    desc: "Get rewarded fairly for the valuable time and insights you share.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Build your network",
    desc: "Connect with an international community of scholars, professionals, and peers.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Give back to community",
    desc: "Help build an authentic, empowered, and informed Bangladeshi student network.",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
  },
];

export function WhyBecomeMentorSection() {
  return (
    <section
      id="learn-more"
      className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28"
    >
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] flex-col px-5 sm:px-10 lg:px-16 xl:px-24">
          
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
              WHY BECOME A STUDYWISE MENTOR?
            </span>
            <h2
              style={{ lineHeight: 1.2 }}
              className="mt-3.5 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[40px] xl:text-[44px]"
            >
              Why join as a mentor?
            </h2>
            <p
              style={{ lineHeight: 1.6 }}
              className="mt-3 max-w-xl text-[16px] !leading-[1.6] text-[#556960] lg:text-[18px]"
            >
              It’s more than just sharing your story. It’s about empowering aspiring students and building meaningful connections worldwide.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.45 }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-[#E7ECE8] bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#36887F]/40 hover:shadow-[0_12px_36px_rgba(54,136,127,0.08)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-black/5 bg-[#F0F4F2]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-3 pt-5">
                  <div>
                    <h3
                      style={{ lineHeight: 1.25 }}
                      className="font-serif text-[20px] font-bold !leading-[1.25] tracking-tight text-[#0F1E17] transition-colors group-hover:text-[#36887F]"
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
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}