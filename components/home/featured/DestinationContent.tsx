"use client";

import { AnimatePresence, motion } from "framer-motion";

import { whatsappLink } from "@/lib/whatsapp";

type Props = {
  label: string;
  title: string;
  description: string;
};

export default function DestinationContent({
  label,
  title,
  description,
}: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={title}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-10 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-12 md:gap-12"
      >
        {/* Left */}
        <div className="md:col-span-5">
          <p className="text-[12px] uppercase tracking-[0.35em] text-[#6B7341]">
            {label}
          </p>

          <h2 className="mt-3 font-cormorant text-[44px] leading-[1] tracking-[-0.02em] text-[#1F2937] sm:text-[56px] md:text-[72px] md:leading-[0.95]">
            {title}
          </h2>

          <a
            href={whatsappLink(
              `Hello HORIZONS, I would like to enquire about stays in ${title}.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 border-b border-[#1F2937] pb-2 text-[13px] uppercase tracking-[0.18em] text-[#1F2937]"
          >
            Discover Stay
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* Right */}
        <div className="md:col-span-4 md:col-start-7 md:pt-5">
          <p className="text-[18px] leading-9 text-[#66645F]">
            {description}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}