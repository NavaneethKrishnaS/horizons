"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { houseboats } from "@/data/houseboats";
import FeaturedHouseboatCard from "./FeaturedHouseboatCard";

const INITIAL_COUNT = 3;

export default function FeaturedHouseboats() {
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();

  const shown = houseboats.slice(0, INITIAL_COUNT);
  const rest = houseboats.slice(INITIAL_COUNT);

  return (
    <section className="relative overflow-hidden bg-black py-24 lg:py-28">
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/houseboats/featured-bg.png')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-black/60 to-black" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/60">
            Featured Collection
          </p>

          <h2 className="mt-4 font-cormorant text-4xl font-light text-white md:text-5xl">
            Featured Houseboats
          </h2>

          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-white/75 sm:mt-6 sm:text-lg sm:leading-8">
            Handpicked luxury houseboats offering exceptional comfort,
            authentic Kerala hospitality, and unforgettable backwater
            experiences.
          </p>
        </div>

        <div className="grid gap-10">
          {shown.map((houseboat) => (
            <FeaturedHouseboatCard
              key={houseboat.id}
              houseboat={houseboat}
            />
          ))}

          {expanded &&
            rest.map((houseboat, index) => (
              <motion.div
                key={houseboat.id}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: reduceMotion ? 0 : index * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <FeaturedHouseboatCard houseboat={houseboat} />
              </motion.div>
            ))}
        </div>

        {!expanded && rest.length > 0 && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="group inline-flex items-center gap-3 rounded-full border border-white/25 px-8 py-4 text-[13px] font-medium uppercase tracking-[0.28em] text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
            >
              <span>See all {houseboats.length} houseboats</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-y-1"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
