"use client";

import { motion } from "framer-motion";

interface ValueItem {
  title: string;
  subtitle?: string;
  description: string;
}

const VALUES: ValueItem[] = [
  {
    title: "Real",
    subtitle: "Experience",
    description: "Guidance from people who’ve actually lived it.",
  },
  {
    title: "Honest",
    subtitle: "Guidance",
    description: "No sugarcoating. Just real talk.",
  },
  {
    title: "Accessibility",
    description: "Quality guidance for every student, not just a few.",
  },
  {
    title: "Community",
    description: "A supportive network of students, mentors and dreamers.",
  },
  {
    title: "Trust",
    description: "Built on transparency, respect and genuine intentions.",
  },
];

export function OurValuesSection() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28">
      {/* ================= EXACT FIXED LAYOUT CONTAINER ================= */}
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] flex-col px-5 sm:px-10 lg:px-16 xl:px-24">
          
          {/* Section Header */}
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
              OUR VALUES
            </span>
            <h2
              style={{ lineHeight: 1.2 }}
              className="mt-3.5 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[42px] xl:text-[46px]"
            >
              Principles behind our guidance.
            </h2>
          </div>

          {/* 5-Column Horizontal Values Layout */}
          <div className="mt-14 grid grid-cols-1 divide-y divide-[#E0E8E3] sm:grid-cols-2 sm:divide-y-0 sm:gap-8 lg:grid-cols-5 lg:divide-x lg:divide-y-0 lg:gap-0">
            {VALUES.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
                className="flex flex-col justify-start py-7 sm:py-0 lg:px-6 lg:first:pl-0 lg:last:pr-0 xl:px-8"
              >
                {/* Heading: 26px to 30px with leading-[1.2] */}
                <h3
                  style={{ lineHeight: 1.2 }}
                  className="font-serif text-[24px] sm:text-[26px] lg:text-[28px] font-bold !leading-[1.2] tracking-tight text-[#0F1E17]"
                >
                  {item.title}
                  {item.subtitle && (
                    <>
                      <br />
                      {item.subtitle}
                    </>
                  )}
                </h3>

                {/* Subtext: 16px with Spacing */}
                <p
                  style={{ lineHeight: 1.6 }}
                  className="mt-3.5 max-w-[240px] text-[15px] sm:text-[16px] !leading-[1.6] text-[#556960]"
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}