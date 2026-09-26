"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

export default function BookingCTA() {
  return (
    <section className="border-t border-white/[0.06] bg-[#111111] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="border-y border-white/[0.09] py-14 md:py-20"
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-20">
            {/* Left */}
            <div className="lg:col-span-5">
              <p className="mb-7 text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
                Tell us your dates
              </p>

              <h2 className="font-cormorant text-[32px] font-light leading-[1.1] text-white sm:text-[44px] md:text-[52px] md:leading-[1.05]">
                Ask us what is free.
              </h2>
            </div>

            {/* Right */}
            <div className="flex flex-col justify-between lg:col-span-7">
              <p className="max-w-2xl text-[16px] leading-8 text-white/50 sm:text-[18px] sm:leading-9">
                Send the dates and the number of people and we will come back
                with what is free, what it costs and which boat we would put you
                on. Usually within the day, and it is Surjith who reads it.
              </p>

              <div className="mt-10 md:mt-16">
                <a
                  href={whatsappLink(
                    "Hello HORIZONS, I would like to check houseboat availability.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3"
                >
                  <span className="border-b border-white/30 pb-1.5 text-[11px] uppercase tracking-[0.25em] text-white/80 transition-colors duration-300 group-hover:border-white group-hover:text-white">
                    Write to us on WhatsApp
                  </span>

                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.6}
                    className="text-white/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                  />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
