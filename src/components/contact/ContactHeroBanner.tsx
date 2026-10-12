"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import CONTACT_BANNER_IMAGE from "../../../public/images/contact/contact_banner.png";


export function ContactHeroBanner() {
  return (
    <section className="relative flex min-h-[480px] w-full items-center overflow-hidden border-b border-[#E8ECE9] bg-[#FAFBF9] lg:min-h-[540px]">
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={CONTACT_BANNER_IMAGE}
          alt="Contact StudyWise"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[78%_center] sm:object-[72%_center] lg:object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFBF9] via-[#FAFBF9]/90 via-45% to-transparent sm:via-[#FAFBF9]/85 lg:via-[#FAFBF9]/75 lg:w-[65%]" />
      </div>

      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] items-center px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex w-full max-w-xl flex-col justify-center lg:max-w-2xl"
          >
            <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
              CONTACT STUDYWISE
            </span>

            <h1
              style={{ lineHeight: 1.18 }}
              className="mt-3.5 font-serif text-4xl font-extrabold !leading-[1.18] tracking-tight text-[#0F1E17] sm:text-5xl lg:text-[50px] xl:text-[56px]"
            >
              Let’s talk.
            </h1>

            <p
              style={{ lineHeight: 1.6 }}
              className="mt-4 max-w-xl text-[16px] lg:text-[20px] sm:text-[16px] !leading-[1.6] text-[#333030]"
            >
              Have a question about StudyWise, mentoring, partnerships or your study-abroad journey? We’d love to hear from you.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}