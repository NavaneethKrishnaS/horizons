"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/*
  Three guests, in their own words.

  This was a full-bleed carousel 760px tall — taller than the hero of
  most pages and the loudest thing on a page that is otherwise quiet.
  It is now an editorial spread: one photograph at a fixed height, the
  words set beside it, and the three of them changing in place. Every
  quote is set at the same size, so nothing in the rotation moves but
  the words themselves.
*/

const STORIES = [
  {
    image: "/images/houseboats/guest-story.jpeg",
    quote:
      "There are places you visit, and there are places that become a part of you.",
    line: "Kerala's backwaters became one of ours.",
    guest: "Sarah & Daniel",
    location: "London",
  },
  {
    image: "/images/houseboats/guest-story-2.jpeg",
    quote:
      "Every sunrise reminded us that luxury isn't measured in stars, but in moments.",
    line: "Every morning began with silence, soft light and endless water.",
    guest: "Michael & Emma",
    location: "Sydney",
  },
  {
    image: "/images/houseboats/guest-story-3.jpeg",
    quote:
      "Some journeys end when you return home. The best ones stay forever.",
    line: "Kerala left us with memories we will always carry.",
    guest: "Luca & Sofia",
    location: "Milan",
  },
];

const HOLD_MS = 6000;

export default function GuestStory() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((prev) => (prev + 1) % STORIES.length),
      HOLD_MS,
    );

    return () => clearInterval(timer);
  }, []);

  const story = STORIES[active];

  return (
    <section className="border-t border-white/[0.06] bg-[#0E0E0E] py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
            In their own words
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-12 md:gap-16">
          {/* The photograph */}
          <Reveal className="md:col-span-5">
            <div className="relative h-[260px] overflow-hidden sm:h-[320px] md:h-[400px]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={story.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          {/* The words */}
          <Reveal
            delay={90}
            className="flex flex-col justify-center md:col-span-6 md:col-start-7"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
              >
                <blockquote className="font-cormorant text-[26px] font-light leading-[1.2] tracking-[-0.01em] text-white sm:text-[32px] md:text-[38px]">
                  {story.quote}
                </blockquote>

                <p className="mt-6 max-w-md text-[15px] leading-7 text-white/45 md:mt-7">
                  {story.line}
                </p>

                <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-white/60 md:mt-10">
                  {story.guest}
                  <span className="text-white/25"> — {story.location}</span>
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Which of the three, and how long it stays */}
            <div className="mt-10 flex items-center gap-3 md:mt-12">
              {STORIES.map((entry, index) => (
                <button
                  key={entry.guest}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Read what ${entry.guest} said`}
                  className="relative h-[2px] w-12 overflow-hidden bg-white/15 transition-colors hover:bg-white/30"
                >
                  <motion.span
                    key={active === index ? `run-${active}` : `idle-${index}`}
                    initial={{ width: active === index ? "0%" : "100%" }}
                    animate={{ width: active === index ? "100%" : "0%" }}
                    transition={{
                      duration: active === index ? HOLD_MS / 1000 : 0.25,
                      ease: "linear",
                    }}
                    className="absolute left-0 top-0 h-full bg-white/70"
                  />
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
