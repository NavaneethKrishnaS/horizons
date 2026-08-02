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
    <div className="mt-20">
      <div className="flex gap-7 overflow-hidden">
        {/* Main Image */}
        <div className="relative h-[430px] w-[84%] overflow-hidden rounded-sm">
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
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Preview */}
        <button
          onClick={onNext}
          className="relative h-[430px] w-[16%] overflow-hidden rounded-sm"
        >
          <Image
            src={next.image}
            alt={next.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </button>
      </div>
    </div>
  );
}