"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function ExploreDestinations() {
  return (
    <section className="w-full bg-[#FFFFFF] py-20 lg:py-[100px]">
      <div className="mx-auto w-10/12 px-6 sm:px-12 lg:px-16 xl:px-24">
        
        {/* Section Heading */}
        <div className="max-w-2xl">
          <span className="text-[14px] font-bold tracking-[0.22em] text-[#6E7E77] uppercase sm:text-xs">
            EXPLORE DESTINATIONS
          </span>
          <h2 className="mt-3 font-serif text-3xl font-normal leading-[1.14] tracking-tight text-[#0F1E17] sm:text-4xl lg:text-[2.75rem] xl:text-[3.2rem]">
            Where do you want to go?
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          
          {/* UK Card (Large tall span on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative min-h-[320px] overflow-hidden rounded-2xl bg-neutral-900 sm:col-span-2 lg:col-span-5 lg:min-h-[460px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80"
              alt="United Kingdom"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
              <h3 className="font-serif text-2xl font-normal text-white sm:text-3xl">UK</h3>
              <p className="mt-1 text-xs text-white/80 sm:text-sm">120+ mentors</p>
              <Link
                href="/mentors?country=UK"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 transition-all hover:text-white"
              >
                <span>Explore mentors</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Middle Column: USA & Australia */}
          <div className="flex flex-col gap-5 sm:col-span-1 lg:col-span-4 lg:gap-6">
            {/* USA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="group relative min-h-[200px] flex-1 overflow-hidden rounded-2xl bg-neutral-900 lg:min-h-[218px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80"
                alt="USA"
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <h3 className="font-serif text-xl font-normal text-white sm:text-2xl">USA</h3>
                <p className="mt-0.5 text-xs text-white/80">100+ mentors</p>
                <Link
                  href="/mentors?country=USA"
                  className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white"
                >
                  <span>Explore mentors</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* Australia */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="group relative min-h-[200px] flex-1 overflow-hidden rounded-2xl bg-neutral-900 lg:min-h-[218px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80"
                alt="Australia"
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <h3 className="font-serif text-xl font-normal text-white sm:text-2xl">Australia</h3>
                <p className="mt-0.5 text-xs text-white/80">80+ mentors</p>
                <Link
                  href="/mentors?country=Australia"
                  className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white"
                >
                  <span>Explore mentors</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Canada, Germany, Europe */}
          <div className="flex flex-col gap-5 sm:col-span-1 lg:col-span-3 lg:gap-6">
            {/* Canada */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="group relative min-h-[190px] overflow-hidden rounded-2xl bg-neutral-900 lg:min-h-[136px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1517935703635-2717090c2210?auto=format&fit=crop&w=800&q=80"
                alt="Canada"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <h3 className="font-serif text-lg font-normal text-white sm:text-xl">Canada</h3>
                <p className="text-[11px] text-white/80">90+ mentors</p>
                <Link
                  href="/mentors?country=Canada"
                  className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-white/90 hover:text-white"
                >
                  <span>Explore mentors</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* Germany & Europe side by side */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 lg:gap-4">
              {/* Germany */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="group relative min-h-[180px] overflow-hidden rounded-2xl bg-neutral-900 lg:min-h-[300px]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80"
                  alt="Germany"
                  fill
                  sizes="(max-width: 1024px) 50vw, 13vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
                  <h3 className="font-serif text-base font-normal text-white sm:text-lg">Germany</h3>
                  <p className="text-[11px] text-white/80">70+ mentors</p>
                  <Link
                    href="/mentors?country=Germany"
                    className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-white/90 hover:text-white"
                  >
                    <span>Explore mentors</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>

              {/* Europe */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="group relative min-h-[180px] overflow-hidden rounded-2xl bg-neutral-900 lg:min-h-[300px]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80"
                  alt="Europe"
                  fill
                  sizes="(max-width: 1024px) 50vw, 13vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
                  <h3 className="font-serif text-base font-normal text-white sm:text-lg">Europe</h3>
                  <p className="text-[11px] text-white/80">60+ mentors</p>
                  <Link
                    href="/mentors?country=Europe"
                    className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-white/90 hover:text-white"
                  >
                    <span>Explore mentors</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}