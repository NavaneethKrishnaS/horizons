"use client";

import { useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { Destination } from "./destinations";

type Props = {
  destinations: Destination[];
  activeIndex: number;
  onChange: (index: number) => void;
};

export default function DestinationImages({
  destinations,
  activeIndex,
  onChange,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const current = destinations[activeIndex];
  const next = destinations[(activeIndex + 1) % destinations.length];

  // Keeps the heading, description and progress bar in step with the swipe.
  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;

    const trackCentre = track.scrollLeft + track.clientWidth / 2;

    let closest = 0;
    let smallestGap = Infinity;

    Array.from(track.children).forEach((child, index) => {
      const slide = child as HTMLElement;
      const slideCentre = slide.offsetLeft + slide.offsetWidth / 2;
      const gap = Math.abs(slideCentre - trackCentre);

      if (gap < smallestGap) {
        smallestGap = gap;
        closest = index;
      }
    });

    if (closest !== activeIndex) onChange(closest);
  }

  return (
    <div className="mt-10 md:mt-20">
      {/* Mobile — swipe sideways through the destinations */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
      >
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="relative h-[340px] w-full shrink-0 snap-center overflow-hidden rounded-sm"
          >
            <Image
              src={destination.image}
              alt={destination.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Desktop — large image with a clickable preview of the next */}
      <div className="hidden gap-7 overflow-hidden md:flex">
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
                sizes="84vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => onChange((activeIndex + 1) % destinations.length)}
          aria-label={`Show ${next.title}`}
          className="relative h-[430px] w-[16%] overflow-hidden rounded-sm"
        >
          <Image
            src={next.image}
            alt={next.title}
            fill
            sizes="16vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </button>
      </div>
    </div>
  );
}
