"use client";

import { AnimatePresence, motion } from "framer-motion";

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
        className="mt-14 grid grid-cols-12 gap-12"
      >
        {/* Left */}
        <div className="col-span-5">
          <p className="text-[12px] uppercase tracking-[0.35em] text-[#6B7341]">
            {label}
          </p>

          <h2 className="mt-3 font-cormorant text-[72px] leading-[0.95] tracking-[-0.04em] text-[#1F2937]">
            {title}
          </h2>

          <button className="group mt-8 flex items-center gap-2 border-b border-[#1F2937] pb-2 text-[13px] uppercase tracking-[0.18em] text-[#1F2937]">
            Discover Stay
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        {/* Right */}
        <div className="col-span-4 col-start-7 pt-5">
          <p className="text-[18px] leading-9 text-[#66645F]">
            {description}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}