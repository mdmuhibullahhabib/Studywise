"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import success_student from"../../../public/images/become-a-mentor/success-student.png"


export function MentorSuccessStoryCard() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28">
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] items-center px-5 sm:px-10 lg:px-16 xl:px-24">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid w-full grid-cols-1 overflow-hidden rounded-3xl border border-[#E7ECE8] bg-white shadow-[0_12px_36px_rgba(0,0,0,0.03)] lg:grid-cols-12"
          >
            {/* Left Big Picture with Subtle Quote Overlay */}
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:col-span-5 lg:aspect-auto lg:min-h-[460px]">
              <Image
                src={success_student}
                alt="Nusrat Jahan"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-[center_25%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                <p
                  style={{ lineHeight: 1.4 }}
                  className="font-serif italic text-[16px] !leading-[1.4] text-white sm:text-[18px]"
                >
                  “I just wanted to help. But it ended up being one of the most meaningful parts of my journey.”
                </p>
              </div>
            </div>

            {/* Middle: Details & Story Content */}
            <div className="flex flex-col justify-between p-7 sm:p-9 lg:col-span-4 xl:p-10">
              <div>
                <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
                  MENTOR SUCCESS STORY
                </span>
                
                <h3
                  style={{ lineHeight: 1.2 }}
                  className="mt-3.5 font-serif text-[24px] sm:text-[26px] lg:text-[28px] font-bold !leading-[1.2] tracking-tight text-[#0F1E17]"
                >
                  From student to mentor
                </h3>
                
                <p
                  style={{ lineHeight: 1.6 }}
                  className="mt-4 text-[15px] sm:text-[16px] !leading-[1.6] text-[#556960]"
                >
                  I came abroad in 2019 for my studies. The process was overwhelming at first — applications, visas, finances, and adapting to a completely new culture. Having reliable guidance makes all the difference. Now on StudyWise, I help students navigate these choices with clarity and confidence.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3.5 border-t border-[#E0E8E3] pt-5">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[#E0E8E3]">
                  <Image
                    src={success_student}
                    alt="Nusrat Jahan"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-[16px] font-bold leading-tight text-[#0F1E17]">
                    Nusrat Jahan
                  </h4>
                  <p className="mt-0.5 text-[13px] text-[#556960]">
                    University of Toronto • Canada
                  </p>
                  <p className="text-[12px] text-[#708078]">
                    Master of Business Analytics
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Testimonial Pull-quote */}
            <div className="flex flex-col justify-center border-t border-[#EAEFEA] bg-[#FAFBF9] p-7 sm:p-9 lg:col-span-3 lg:border-t-0 lg:border-l xl:p-10">
              <span className="font-serif text-5xl font-extrabold leading-none text-[#36887F]/35">
                “
              </span>
              <p
                style={{ lineHeight: 1.6 }}
                className="mt-3 font-serif italic text-[15px] sm:text-[16px] !leading-[1.6] text-[#2F4239]"
              >
                Mentoring gives me a deep sense of purpose. I get to connect with ambitious students, share real lessons, and help make their path a little smoother.
              </p>
              <span className="mt-5 text-[13px] font-bold tracking-wider text-[#36887F] uppercase">
                — Nusrat Jahan
              </span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}