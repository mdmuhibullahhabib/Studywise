"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Share2,
  Clock,
  ArrowRight,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
} from "lucide-react";

export function ContactFormSection() {
  const [role, setRole] = useState<"Student" | "Mentor" | "Partner">("Student");

  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28">
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] items-center px-5 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20 w-full">
            
            {/* ================= LEFT COLUMN ================= */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col justify-start lg:col-span-5"
            >
              <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
                GET IN TOUCH
              </span>

              {/* Shorter, punchier heading with optimal sizing */}
              <h2
                style={{ lineHeight: 1.2 }}
                className="mt-3.5 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[36px] xl:text-[40px]"
              >
                We’re here to help you take the next step.
              </h2>

              {/* Desktop 18-16px calibrated body */}
              <p
                style={{ lineHeight: 1.6 }}
                className="mt-4 max-w-md text-[16px] !leading-[1.6] text-[#556960] lg:text-[18px]"
              >
                Have questions about mentors, applications, or partnerships? Reach out and our team will guide you.
              </p>

              {/* Info Items */}
              <div className="mt-9 space-y-7 border-t border-[#E0E8E3] pt-8">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EBF4F0] text-[#36887F]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-[#0F1E17]">
                      Email Us
                    </h3>
                    <a
                      href="mailto:hello@studywise.com"
                      className="mt-0.5 block text-[15px] font-medium text-[#36887F] hover:underline"
                    >
                      hello@studywise.com
                    </a>
                    <p className="mt-0.5 text-[14px] text-[#708078]">
                      We’ll get back to you within 24 hours.
                    </p>
                  </div>
                </div>

                {/* Socials */}
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EBF4F0] text-[#36887F]">
                    <Share2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-[#0F1E17]">
                      Follow Us
                    </h3>
                    <div className="mt-2.5 flex items-center gap-2.5 text-[#1C3E30]">
                      {[
                        { icon: Linkedin, href: "https://linkedin.com" },
                        { icon: Instagram, href: "https://instagram.com" },
                        { icon: Facebook, href: "https://facebook.com" },
                        { icon: Twitter, href: "https://twitter.com" },
                        { icon: Youtube, href: "https://youtube.com" },
                      ].map((item, idx) => (
                        <a
                          key={idx}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full bg-[#F0F4F2] p-2 text-[#1C3E30] transition-all hover:bg-[#36887F] hover:text-white"
                        >
                          <item.icon className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                    <p className="mt-2 text-[14px] text-[#708078]">
                      Stay updated with our latest news and resources.
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EBF4F0] text-[#36887F]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-[#0F1E17]">
                      Support Hours
                    </h3>
                    <p className="mt-0.5 text-[15px] text-[#33463E]">
                      Mon – Fri <span className="mx-1 text-[#C4D0CA]">|</span> 9:00 AM – 6:00 PM (BST)
                    </p>
                    <p className="mt-0.5 text-[14px] text-[#708078]">
                      We’re here to help during these hours.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ================= RIGHT COLUMN (FORM) ================= */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full lg:col-span-7"
            >
              <div className="rounded-3xl border border-[#E7ECE8] bg-white p-7 shadow-[0_12px_36px_rgba(0,0,0,0.03)] sm:p-9 lg:p-11">
                <h3
                  style={{ lineHeight: 1.2 }}
                  className="font-serif text-[24px] sm:text-[26px] lg:text-[28px] font-bold !leading-[1.2] text-[#0F1E17]"
                >
                  Send us a message
                </h3>
                <p
                  style={{ lineHeight: 1.6 }}
                  className="mt-2 text-[15px] sm:text-[16px] !leading-[1.6] text-[#556960]"
                >
                  Fill out the form below and we’ll get back to you as soon as possible.
                </p>

                <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[13px] font-semibold text-[#1C2C24]"
                    >
                      Name <span className="text-[#36887F]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Your full name"
                      className="mt-1.5 h-[48px] w-full rounded-2xl border border-[#DCE4E0] bg-white px-4 text-[15px] text-[#1B2923] placeholder-[#A0ACA5] transition-all focus:border-[#36887F] focus:ring-2 focus:ring-[#36887F]/10 focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[13px] font-semibold text-[#1C2C24]"
                    >
                      Email <span className="text-[#36887F]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="mt-1.5 h-[48px] w-full rounded-2xl border border-[#DCE4E0] bg-white px-4 text-[15px] text-[#1B2923] placeholder-[#A0ACA5] transition-all focus:border-[#36887F] focus:ring-2 focus:ring-[#36887F]/10 focus:outline-none"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <span className="block text-[13px] font-semibold text-[#1C2C24]">
                      I’m a:
                    </span>
                    <div className="mt-2.5 flex flex-wrap items-center gap-6">
                      {(["Student", "Mentor", "Partner"] as const).map((item) => (
                        <label
                          key={item}
                          className="flex cursor-pointer items-center gap-2 text-[15px] font-medium text-[#46574F]"
                        >
                          <input
                            type="radio"
                            name="role"
                            value={item}
                            checked={role === item}
                            onChange={() => setRole(item)}
                            className="h-4 w-4 accent-[#36887F]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-[13px] font-semibold text-[#1C2C24]"
                    >
                      Subject <span className="text-[#36887F]">*</span>
                    </label>
                    <select
                      id="contact-subject"
                      required
                      defaultValue=""
                      className="mt-1.5 h-[48px] w-full rounded-2xl border border-[#DCE4E0] bg-white px-4 text-[15px] text-[#1B2923] transition-all focus:border-[#36887F] focus:ring-2 focus:ring-[#36887F]/10 focus:outline-none"
                    >
                      <option value="" disabled className="text-[#A0ACA5]">
                        Select a subject
                      </option>
                      <option value="mentorship">Mentorship Inquiry</option>
                      <option value="application">Application Help</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="other">Other Questions</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-[13px] font-semibold text-[#1C2C24]"
                    >
                      Message <span className="text-[#36887F]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      placeholder="Tell us what’s on your mind..."
                      className="mt-1.5 w-full resize-none rounded-2xl border border-[#DCE4E0] bg-white p-4 text-[15px] text-[#1B2923] placeholder-[#A0ACA5] transition-all focus:border-[#36887F] focus:ring-2 focus:ring-[#36887F]/10 focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-full border border-transparent bg-[#1C3E30] px-7 text-[15px] font-medium text-white shadow-sm transition-all duration-200 hover:border-[#36887F] hover:bg-white hover:text-[#1C3E30] active:scale-[0.98]"
                    >
                      <span>Send Message</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}