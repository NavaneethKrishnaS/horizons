"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Houseboat } from "@/data/houseboat.types";

interface HouseboatHeroProps {
  houseboat: Houseboat;
}

export default function HouseboatHero({ houseboat }: HouseboatHeroProps) {
  const startingPrice =
    houseboat.categories.find(
      (category) => category.name === houseboat.defaultCategory,
    )?.price ?? houseboat.categories[0].price;

  return (
    <section className="relative min-h-lvh overflow-hidden md:min-h-[800px]">
      <Image
        src={houseboat.gallery[0].src}
        alt={houseboat.gallery[0].alt}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/75" />

      <div className="absolute inset-0">
        <div className="mx-auto flex min-h-lvh max-w-7xl items-end px-6 pb-16 md:min-h-[800px] md:pb-24">
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
            <h1 className="font-cormorant text-[34px] font-light leading-[1.05] text-white lining-nums sm:text-5xl md:text-7xl md:leading-none lg:text-8xl">
              {houseboat.name}
            </h1>

            <p className="mt-5 hidden max-w-2xl text-lg leading-8 text-white/80 sm:block md:mt-8">
              {houseboat.longDescription}
            </p>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-white/90 md:mt-10 md:gap-8 md:text-base">
              <span>{houseboat.bedrooms} Bedroom</span>
              <span>{houseboat.bathrooms} Bathroom</span>
              <span>{houseboat.maxGuests} Guests</span>
              <span>{houseboat.crew} Crew</span>
            </div>

            {/*
              Replaces the glass price box that used to sit in the corner. It
              said ₹10,000 twice and repeated the booking card a screen below,
              which read like a booking marketplace rather than a hotel.
            */}
            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-12">
              <p className="text-[14px] text-white/70 md:text-[15px]">
                From{" "}
                <span className="text-[20px] font-light text-white lining-nums tabular-nums md:text-[22px]">
                  ₹{startingPrice.toLocaleString()}
                </span>{" "}
                per night
              </p>

              <button
                type="button"
                onClick={() => {
                  document.getElementById("booking-card")?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
                className="group hidden items-center gap-2 border-b border-white/40 pb-1.5 text-[12px] uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:border-white lg:inline-flex"
              >
                Check Availability
                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
