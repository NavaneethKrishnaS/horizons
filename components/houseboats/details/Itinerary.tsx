"use client";

import { useState } from "react";
import { ChevronDown, Clock } from "lucide-react";

import { Houseboat } from "@/data/houseboat.types";

interface ItineraryProps {
  houseboat: Houseboat;
}

export default function Itinerary({ houseboat }: ItineraryProps) {
  // Mobile only: which step has its description open. Desktop always shows
  // every description, so this state is ignored from md: up.
  const [openStep, setOpenStep] = useState<string | null>(null);

  return (
    <section className="bg-white py-14 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 md:text-sm md:tracking-[0.35em]">
            Journey
          </p>

          <h2 className="mt-3 font-cormorant text-[30px] font-light leading-[1.1] text-neutral-900 sm:text-4xl md:mt-4 md:text-5xl">
            Itinerary
          </h2>

          <p className="mt-4 text-[15px] leading-7 text-neutral-600 md:mt-6 md:text-lg md:leading-8">
            Experience a carefully curated backwater journey from check-in to
            check-out.
          </p>
        </div>

        <div className="mt-8 max-w-3xl border-l border-neutral-200 md:mt-16">
          {houseboat.itinerary.map((item) => {
            const key = `${item.day}-${item.time}`;
            const isOpen = openStep === key;

            return (
              <div
                key={key}
                className="relative pb-6 pl-6 last:pb-0 md:pb-12 md:pl-10"
              >
                <span
                  aria-hidden
                  className="absolute -left-[3px] top-[7px] h-1.5 w-1.5 rounded-full bg-[#6B7341]"
                />

                {/*
                  The header is a button so the whole row is tappable on a phone.
                  From md: up it is inert — descriptions are always visible there.
                */}
                <button
                  type="button"
                  onClick={() => setOpenStep(isOpen ? null : key)}
                  aria-expanded={isOpen}
                  aria-controls={`itinerary-${key}`}
                  className="flex w-full items-start justify-between gap-4 text-left md:pointer-events-none"
                >
                  <span className="block">
                    <span className="flex items-center gap-2 text-neutral-500">
                      <Clock size={14} className="md:size-4" />

                      <span className="text-[11px] uppercase tracking-[0.18em] md:text-sm md:tracking-[0.2em]">
                        Day {item.day} &bull; {item.time}
                      </span>
                    </span>

                    <span className="mt-2 block font-cormorant text-[22px] font-light leading-[1.15] text-neutral-900 md:mt-4 md:text-3xl">
                      {item.title}
                    </span>
                  </span>

                  <ChevronDown
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden
                    className={`mt-1 shrink-0 text-neutral-400 transition-transform duration-300 md:hidden ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/*
                  0fr -> 1fr gives a smooth height animation without measuring
                  anything. The inner wrapper clips the text while it is closed.
                */}
                <div
                  id={`itinerary-${key}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out md:grid-rows-[1fr] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="mt-2 text-[14px] leading-6 text-neutral-600 md:mt-3 md:text-base md:leading-8">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
