"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

export default function BookingCTA() {
  return (
    <section className="bg-[#F8F7F3] py-20 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="border-y border-black/10 py-14 md:py-24"
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-20">
            {/* Left */}
            <div className="lg:col-span-5">
              <p className="mb-6 text-[12px] font-medium uppercase tracking-[0.4em] text-neutral-500">
                Begin Your Journey
              </p>

              <h2 className="font-cormorant text-[34px] leading-[1.1] tracking-[-0.02em] text-neutral-900 sm:text-5xl md:text-6xl md:leading-[1.05] md:tracking-[-0.04em]">
                Your Journey
                <br />
                Begins Here.
              </h2>
            </div>

            {/* Right */}
            <div className="flex flex-col justify-between lg:col-span-7">
              <p className="max-w-2xl text-[15px] leading-7 text-neutral-600 sm:text-xl sm:leading-9">
              Every journey through Kerala's backwaters is thoughtfully curated around your pace, your people and your idea of luxury. Whether you're celebrating something special or simply escaping the everyday, we'll help you discover the houseboat that's right for you.
              </p>

              <div className="mt-10 md:mt-16">
                <a
                  href={whatsappLink(
                    "Hello HORIZONS, I would like to check houseboat availability."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3"
                >
                  <span className="border-b border-black pb-1 text-[15px] font-medium text-neutral-900 transition-all duration-300 group-hover:pr-2 sm:text-lg">
                    Explore Availability
                  </span>

                  <ArrowUpRight
                    size={20}
                    strokeWidth={2}
                    className="text-black transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
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