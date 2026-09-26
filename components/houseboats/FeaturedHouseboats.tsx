"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { houseboats } from "@/data/houseboats";
import FeaturedHouseboatCard from "./FeaturedHouseboatCard";

const INITIAL_COUNT = 3;

/*
  The fleet.

  It used to sit on a background photograph with a gradient over it,
  under the words "handpicked luxury houseboats offering exceptional
  comfort, authentic Kerala hospitality". Both are gone: the
  photograph fought the cards, and the sentence said nothing that the
  six boats underneath do not say better by existing.
*/
export default function FeaturedHouseboats() {
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();

  const shown = houseboats.slice(0, INITIAL_COUNT);
  const rest = houseboats.slice(INITIAL_COUNT);

  return (
    <section className="bg-[#111111] py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
                The fleet
              </p>

              <h2 className="mt-7 font-cormorant text-[30px] font-light leading-[1.1] text-white sm:text-[40px] md:text-[48px]">
                {houseboats.length} boats, one bedroom to six.
              </h2>
            </div>

            <p className="text-[15px] leading-8 text-white/45 md:col-span-4 md:col-start-9 md:self-end md:text-[16px]">
              Prices are for the whole boat for one night, all meals included.
              Deluxe, Premium and Luxury are the same hull and a different
              standard of fit-out.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 md:mt-20 md:gap-10">
          {shown.map((houseboat, index) => (
            <Reveal key={houseboat.id} delay={Math.min(index, 3) * 80}>
              <FeaturedHouseboatCard houseboat={houseboat} />
            </Reveal>
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

        {!expanded && rest.length > 0 ? (
          <div className="mt-12 md:mt-14">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="group inline-flex items-center gap-2 border-b border-white/20 pb-2 text-[11px] uppercase tracking-[0.25em] text-white/70 transition-colors duration-300 hover:border-white/60 hover:text-white"
            >
              The other {rest.length}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
