"use client";

import { useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

import { Destination } from "./destinations";
import ProgressBar from "./ProgressBar";

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
  const animation = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  function slides() {
    // Only real slides — the trailing spacer is excluded so the index can
    // never run past the end of the data.
    return Array.from(
      trackRef.current?.querySelectorAll<HTMLElement>("[data-slide]") ?? []
    );
  }

  // Keeps the heading, description and progress bar in step with the swipe.
  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;

    const trackCentre = track.scrollLeft + track.clientWidth / 2;

    let closest = 0;
    let smallestGap = Infinity;

    slides().forEach((slide, index) => {
      const centre = slide.offsetLeft - track.offsetLeft + slide.offsetWidth / 2;
      const gap = Math.abs(centre - trackCentre);

      if (gap < smallestGap) {
        smallestGap = gap;
        closest = index;
      }
    });

    if (closest !== activeIndex) onChange(closest);
  }

  function goTo(index: number) {
    const track = trackRef.current;
    const slide = slides()[index];
    if (!track || !slide) return;

    const to = slide.offsetLeft - track.offsetLeft;

    if (reduceMotion) {
      track.scrollTo({ left: to });
      return;
    }

    const from = track.scrollLeft;
    const distance = to - from;
    if (distance === 0) return;

    if (animation.current) cancelAnimationFrame(animation.current);

    // The track is scrolled by hand rather than with scrollTo({behavior:
    // "smooth"}), because mandatory snapping cancels a smooth programmatic
    // scroll. Snapping is off while the tween runs and restored at the end,
    // which lets it settle exactly on the slide.
    const duration = 600;
    const startedAt = performance.now();
    track.style.scrollSnapType = "none";

    function step(now: number) {
      const elapsed = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 3);

      track!.scrollLeft = from + distance * eased;

      if (elapsed < 1) {
        animation.current = requestAnimationFrame(step);
      } else {
        animation.current = null;
        track!.style.scrollSnapType = "";
      }
    }

    animation.current = requestAnimationFrame(step);
  }

  const atStart = activeIndex === 0;
  const atEnd = activeIndex === destinations.length - 1;

  return (
    <div>
      {/* Position indicator, and arrows for people who would rather click */}
      <div className="mb-8 flex items-center justify-end gap-8 md:mb-12">
        <ProgressBar current={activeIndex} total={destinations.length} />

        <div className="hidden items-center gap-3 md:flex">
          <Arrow
            direction="left"
            disabled={atStart}
            onClick={() => goTo(activeIndex - 1)}
          />
          <Arrow
            direction="right"
            disabled={atEnd}
            onClick={() => goTo(activeIndex + 1)}
          />
        </div>
      </div>

      {/* One swipeable track at every size */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] md:gap-7 [&::-webkit-scrollbar]:hidden"
      >
        {destinations.map((destination) => (
          <div
            key={destination.id}
            data-slide
            className="relative h-[340px] w-full shrink-0 snap-start overflow-hidden rounded-sm md:h-[430px] md:w-[84%]"
          >
            <Image
              src={destination.image}
              alt={destination.title}
              fill
              sizes="(max-width: 768px) 100vw, 84vw"
              className="object-cover"
            />
          </div>
        ))}

        {/* Lets the last slide reach the left edge on desktop */}
        <div aria-hidden className="hidden shrink-0 md:block md:w-[16%]" />
      </div>
    </div>
  );
}

function Arrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const isLeft = direction === "left";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isLeft ? "Previous destination" : "Next destination"}
      className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#1F2937]/20 text-[#1F2937] transition-all duration-300 hover:border-[#6B7341] hover:bg-[#6B7341] hover:text-white disabled:pointer-events-none disabled:opacity-20"
    >
      <span
        aria-hidden
        className={`text-[15px] leading-none transition-transform duration-300 ${
          isLeft
            ? "group-hover:-translate-x-0.5"
            : "group-hover:translate-x-0.5"
        }`}
      >
        {isLeft ? "←" : "→"}
      </span>
    </button>
  );
}
