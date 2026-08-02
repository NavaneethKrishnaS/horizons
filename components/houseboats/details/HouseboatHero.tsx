"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Houseboat } from "@/data/houseboat.types";

interface HouseboatHeroProps {
  houseboat: Houseboat;
}

export default function HouseboatHero({
  houseboat,
}: HouseboatHeroProps) {
  return (
    <section className="relative h-screen min-h-[800px] overflow-hidden">
      <Image
        src={houseboat.gallery[0].src}
        alt={houseboat.gallery[0].alt}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/75" />

      <div className="absolute inset-0">
        <div className="mx-auto flex h-full max-w-7xl items-end justify-between px-6 pb-24">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl font-light leading-none text-white md:text-8xl">
              {houseboat.name}
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/80">
              {houseboat.longDescription}
            </p>

            <div className="mt-10 flex flex-wrap gap-8 text-white/90">
              <span>{houseboat.bedrooms} Bedroom</span>
              <span>{houseboat.bathrooms} Bathroom</span>
              <span>{houseboat.maxGuests} Guests</span>
              <span>{houseboat.crew} Crew</span>
            </div>
          </motion.div>

          {/* Glass Card */}
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              delay: 0.15,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            className="hidden lg:block"
          >
            <div
              className="
                w-[340px]
                rounded-[32px]
                border
                border-white/15
                bg-white/[0.08]
                p-8
                backdrop-blur-[40px]
                shadow-[0_30px_80px_rgba(0,0,0,0.35)]
                ring-1
                ring-white/10
                transition-all
                duration-500
              "
            >
              <p className="text-sm uppercase tracking-[0.28em] text-white/70">
                Starting From
              </p>

              <h2 className="mt-3 text-5xl font-semibold tracking-tight text-white">
                ₹
                {houseboat.categories
                  ?.find((c) => c.name === houseboat.defaultCategory)
                  ?.price.toLocaleString()}
              </h2>

              <p className="mt-2 text-base text-white/70">
                {houseboat.defaultCategory} • From ₹
                {houseboat.categories
                  ?.find((c) => c.name === houseboat.defaultCategory)
                  ?.price.toLocaleString()}
                /night
              </p>

              <button
                onClick={() => {
                  document
                    .getElementById("booking-card")
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }}
                className="
                  mt-8
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-full
                  bg-black/85
                  py-4
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-500
                  hover:scale-[1.02]
                  hover:bg-black
                  active:scale-[0.98]
                "
              >
                Check Availability
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1,
          duration: 1,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm uppercase tracking-[0.3em] text-white/70"
      >
        Scroll
      </motion.div>
    </section>
  );
}