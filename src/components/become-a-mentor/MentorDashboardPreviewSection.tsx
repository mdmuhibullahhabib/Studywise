"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Users,
  MessageSquare,
  Clock,
  DollarSign,
  User,
  Star,
  Video,
} from "lucide-react";

export function MentorDashboardPreviewSection() {
  return (
    <section className="relative w-full overflow-hidden border-t border-[#EAEFEA] bg-[#FAFBF9] py-20 lg:py-28">
      <div className="relative z-10 mx-auto w-10/12">
        <div className="relative mx-auto flex h-full w-full max-w-[1920px] flex-col px-5 sm:px-10 lg:px-16 xl:px-24">
          
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold tracking-[0.25em] text-[#36887F] uppercase sm:text-xs">
              THE MENTOR DASHBOARD
            </span>
            <h2
              style={{ lineHeight: 1.2 }}
              className="mt-3.5 font-serif text-3xl font-extrabold !leading-[1.2] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[40px] xl:text-[44px]"
            >
              Your mentor dashboard.
            </h2>
            <p
              style={{ lineHeight: 1.6 }}
              className="mt-3 max-w-xl text-[16px] !leading-[1.6] text-[#556960] lg:text-[18px]"
            >
              Manage your sessions, connect with students, track your earnings, and organize your calendar — all in one clean place.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-14 overflow-hidden rounded-3xl border border-[#E0E8E3] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-center justify-between border-b border-[#EAEFEA] bg-[#F8FAF8] px-6 py-4 sm:px-8">
              <div className="flex items-center gap-3">
                <span className="font-serif text-lg font-bold tracking-tight text-[#0F1E17]">
                  Study<span className="text-[#36887F]">Wise</span>
                </span>
                <span className="hidden rounded-full bg-[#EBF4F0] px-3 py-0.5 text-[11px] font-bold text-[#36887F] sm:inline-block">
                  Mentor Hub
                </span>
              </div>
              <span className="text-[14px] font-medium text-[#556960]">
                Welcome back, Arif! ☀️
              </span>
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-[#36887F] text-center text-[13px] font-bold leading-8 text-white">
                  AR
                </div>
                <span className="hidden text-[14px] font-semibold text-[#0F1E17] sm:inline">
                  Arif Rahman
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:gap-8">
              
              <div className="hidden space-y-1.5 lg:col-span-3 lg:block">
                {[
                  { icon: LayoutDashboard, label: "Dashboard", active: true },
                  { icon: Calendar, label: "Bookings", active: false },
                  { icon: Users, label: "Students", active: false },
                  { icon: MessageSquare, label: "Messages", active: false },
                  { icon: Clock, label: "Availability", active: false },
                  { icon: DollarSign, label: "Earnings", active: false },
                  { icon: User, label: "Profile", active: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-medium transition-colors ${
                      item.active
                        ? "bg-[#EBF4F0] font-semibold text-[#36887F]"
                        : "text-[#556960] hover:bg-[#FAFBF9] hover:text-[#0F1E17]"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-6 lg:col-span-9">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { label: "Upcoming Sessions", val: "2", sub: "This week" },
                    { label: "Total Students", val: "18", sub: "Guided" },
                    { label: "Total Earnings", val: "$420", sub: "Available" },
                    { label: "Rating & Reviews", val: "4.9 ★", sub: "15 reviews" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-[#E7ECE8] bg-[#FAFBF9]/50 p-4 transition-all hover:border-[#36887F]/40"
                    >
                      <p className="text-[12px] font-medium text-[#708078]">
                        {stat.label}
                      </p>
                      <p className="mt-1 font-serif text-2xl font-bold tracking-tight text-[#0F1E17]">
                        {stat.val}
                      </p>
                      <p className="mt-0.5 text-[11px] text-[#36887F] font-semibold">
                        {stat.sub}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col justify-between rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-sm">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-bold tracking-wider text-[#36887F] uppercase">
                          Next Session
                        </span>
                        <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
                          In 2 hours
                        </span>
                      </div>
                      <p className="mt-3 text-[14px] text-[#556960]">
                        Thu, May 15, 2026 • 10:00 AM (BST)
                      </p>
                      <h4 className="mt-1 font-serif text-[18px] font-bold text-[#0F1E17]">
                        Session with Rahim Ahmed
                      </h4>
                      <p className="mt-1 text-[13px] text-[#708078]">
                        Topic: UK University Application & SOP Review
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#F0F4F2]">
                      <button
                        type="button"
                        className="inline-flex h-[40px] items-center justify-center gap-2 rounded-full bg-[#1C3E30] px-6 text-[13px] font-medium text-white transition-all hover:bg-[#36887F] active:scale-95"
                      >
                        <Video className="h-4 w-4" />
                        <span>Join Video Call</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between rounded-2xl border border-[#E7ECE8] bg-white p-6 shadow-sm">
                    <div>
                      <span className="text-[12px] font-bold tracking-wider text-[#36887F] uppercase">
                        Recent Messages
                      </span>
                      <div className="mt-4 space-y-3.5">
                        <div className="rounded-xl bg-[#FAFBF9] p-3 border border-[#EAEFEA]">
                          <div className="flex items-center justify-between">
                            <span className="text-[13px] font-bold text-[#0F1E17]">
                              Tasnia Ahmed
                            </span>
                            <span className="text-[11px] text-[#8C9B94]">10m ago</span>
                          </div>
                          <p className="mt-1 text-[13px] text-[#556960]">
                            Thank you so much for your advice on the visa interview! 🙏
                          </p>
                        </div>

                        <div className="rounded-xl bg-[#FAFBF9] p-3 border border-[#EAEFEA]">
                          <div className="flex items-center justify-between">
                            <span className="text-[13px] font-bold text-[#0F1E17]">
                              Samiul Alom
                            </span>
                            <span className="text-[11px] text-[#8C9B94]">1h ago</span>
                          </div>
                          <p className="mt-1 text-[13px] text-[#556960]">
                            That scholarship tip was super helpful. Thanks a lot!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}