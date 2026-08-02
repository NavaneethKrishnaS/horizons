"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function GuestStory() {
  const stories = [
    {
      image: "/images/houseboats/guest-story.jpeg",
      title: (
        <>
          There are places you visit,
          <br />
          and there are places that
          <br />
          become a part of you.
        </>
      ),
      subtitle: "Kerala's backwaters became one of ours.",
      guest: "Sarah & Daniel",
      location: "Guests from London",
    },
    {
      image: "/images/houseboats/guest-story-2.jpeg",
      title: (
        <>
          Every sunrise reminded us
          <br />
          that luxury isn't measured
          <br />
          in stars—but in moments.
        </>
      ),
      subtitle: "Every morning began with silence, soft light and endless water.",
      guest: "Michael & Emma",
      location: "Guests from Sydney",
    },
    {
      image: "/images/houseboats/guest-story-3.jpeg",
      title: (
        <>
          Some journeys end
          <br />
          when you return home.
          <br />
          The best ones stay forever.
        </>
      ),
      subtitle: "Kerala left us with memories we'll always carry.",
      guest: "Luca & Sofia",
      location: "Guests from Milan",
    },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % stories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [stories.length]);

  const story = stories[active];

  return (
    <section className="bg-[#F8F7F3] py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden">

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              {/* Image */}
              <div className="relative h-[760px] w-full overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.guest}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-3xl px-10 text-center">
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-[12px] font-medium uppercase tracking-[0.4em] text-white/80"
                  >
                    A JOURNEY REMEMBERED
                  </motion.p>

                  <motion.blockquote
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mt-8 font-serif text-[34px] leading-[1.15] tracking-[-0.03em] text-white md:text-[46px] lg:text-[52px]"
                  >
                    {story.title}
                  </motion.blockquote>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="mx-auto mt-8 max-w-xl text-lg leading-8 text-white/90 md:text-2xl"
                  >
                    {story.subtitle}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    className="mx-auto mt-10 h-px w-24 bg-white/40"
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="mt-10"
                  >
                    <p className="text-xl font-medium text-white">
                      {story.guest}
                    </p>

                    <p className="mt-3 text-xs uppercase tracking-[0.35em] text-white/75">
                      {story.location}
                    </p>
                  </motion.div>
                                    {/* Progress Lines */}
                                    <div className="mt-12 flex items-center justify-center gap-4">
                    {stories.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActive(index)}
                        aria-label={`Go to story ${index + 1}`}
                        className="group relative h-[2px] w-14 overflow-hidden rounded-full bg-white/30"
                      >
                        {/* Active Fill */}
                        <motion.div
                          key={active === index ? active : `inactive-${index}`}
                          initial={{ width: active === index ? "0%" : "100%" }}
                          animate={{
                            width: active === index ? "100%" : "0%",
                          }}
                          transition={{
                            duration: active === index ? 5 : 0.2,
                            ease: "linear",
                          }}
                          className="absolute left-0 top-0 h-full bg-white"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}