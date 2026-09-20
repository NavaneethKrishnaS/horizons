"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Destination } from "./destinations";

type Props = {
  current: Destination;
  next: Destination;
  onNext: () => void;
};

export default function DestinationImages({
  current,
  next,
  onNext,
}: Props) {
  return (
    <div className="mt-10 md:mt-20">
      <div className="flex gap-3 overflow-hidden sm:gap-7">
        {/* Main Image */}
        <div className="relative h-[300px] w-[72%] overflow-hidden rounded-sm sm:h-[430px] sm:w-[84%]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ x: 150 }}
              animate={{ x: 0 }}
              exit={{ x: -150 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                willChange: "transform",
              }}
              className="absolute inset-0 overflow-hidden"
            >
              <Image
                src={current.image}
                alt={current.title}
                fill
                priority
                sizes="(max-width: 640px) 72vw, 84vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Preview */}
        <button
          onClick={onNext}
          aria-label={`Show ${next.title}`}
          className="relative h-[300px] w-[28%] overflow-hidden rounded-sm sm:h-[430px] sm:w-[16%]"
        >
          <Image
            src={next.image}
            alt={next.title}
            fill
            sizes="(max-width: 640px) 28vw, 16vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </button>
      </div>
    </div>
  );
}