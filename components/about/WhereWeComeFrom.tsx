"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function WhereWeComeFrom() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Image slowly moves upward as the user scrolls
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);

  // Image gradually fades into the black page
  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    [1, 1, 0.75, 0]
  );

  // Writing page rises from below
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    ["100vh", "45vh", "5vh", "0vh"]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5],
    [0, 0.35, 1]
  );

  // Soft gradient transition
  const gradientOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.55, 0.8],
    [0, 0.25, 0.75, 1]
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh] bg-neutral-950"
    >
      {/* Sticky visual stage */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* BACKWATER IMAGE */}
        <motion.div
          style={{
            y: imageY,
            opacity: imageOpacity,
          }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/about/backwaters.jpg"
            alt="Kerala backwaters"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* Dark cinematic overlay */}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* WHERE WE COME FROM */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <motion.p
            style={{
              opacity: imageOpacity,
            }}
            className="text-[11px] tracking-[0.5em] text-white/80 md:text-xs"
          >
            WHERE WE COME FROM
          </motion.p>
        </div>

        {/* GRADIENT / PAPER TRANSITION */}
        <motion.div
          style={{
            opacity: gradientOpacity,
          }}
          className="absolute inset-x-0 bottom-0 z-20 h-[65%] bg-gradient-to-t from-neutral-950 via-neutral-950/95 to-transparent"
        />

        {/* WRITING PAGE */}
        <motion.div
          style={{
            y: contentY,
            opacity: contentOpacity,
          }}
          className="absolute inset-x-0 bottom-0 z-30 min-h-screen bg-neutral-950"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-24 md:px-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28 lg:px-24">

            {/* LEFT */}
            <div>
              <p className="mb-10 text-[11px] tracking-[0.5em] text-white/35 md:text-xs">
                WHERE WE COME FROM
              </p>

              <h2 className="max-w-xl text-6xl font-light leading-[0.95] tracking-[-0.04em] text-white md:text-7xl lg:text-[76px]">
                The backwaters are home.
              </h2>
            </div>

            {/* RIGHT */}
            <div className="max-w-2xl text-[18px] leading-[1.75] text-white/75">

              <p>
                Our founder, Surjith Somasundaram, lives in Alumkadavu, near
                Karunagappally — the village where the Kettuvallam houseboat was
                born.
              </p>

              <p className="mt-10">
                In the 1990s, Mr Babu Varghese of Tourindia took the old rice
                barges that once carried cargo through these backwaters and
                converted the first of them into a houseboat.
              </p>

              <p className="mt-10">
                It was a novel idea at the time. It went on to become the golden
                feather of Kerala tourism, and it gave the world the image it
                now associates with God's Own Country.
              </p>

              <p className="mt-10">
                Our founder worked alongside Mr Varghese for his entire early
                career before starting this company.
              </p>

              <blockquote className="mt-12 border-l border-white/20 pl-7 text-[28px] leading-[1.2] tracking-[-0.02em] text-white md:text-[34px]">
                So the backwaters are not a product we learned to sell.
                <br />
                They are where we are from.
              </blockquote>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}