"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import { useReducedMotion } from "@/lib/useReducedMotion";

export default function WhereWeComeFrom() {
  const pageRef = useRef<HTMLDivElement>(null);

  /*
    Our own hook rather than Framer's.

    Framer's answers null on the server and true on the client's very first
    render, so with reduced motion switched on the server sent the motion
    styles and the client hydrated without them — React logged a hydration
    mismatch and gave up patching this subtree. Ours reports false during
    hydration on both sides, matching the markup, and flips to the real
    answer on the render straight after.
  */
  const reduceMotion = useReducedMotion();

  // Progress runs from the moment the dark page begins rising into
  // view until its top edge reaches the top of the screen.
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start end", "start start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.5]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  return (
    <section className="relative bg-neutral-950">

      {/* ─── PINNED PHOTOGRAPH ─────────────────────────────── */}
      <div className="sticky top-0 h-svh overflow-hidden">

        {/* Inset top/bottom by 8% so the 6% drift never exposes an edge */}
        <motion.div
          style={reduceMotion ? undefined : { y: imageY }}
          className="absolute inset-x-0 top-[-8%] bottom-[-8%]"
        >
          <Image
            src="/images/about/backwaters.jpg"
            alt="Morning on the Kerala backwaters"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Darkens the photograph as the page rises over it */}
        <motion.div
          style={reduceMotion ? undefined : { opacity: veilOpacity }}
          className="pointer-events-none absolute inset-0 bg-neutral-950"
        />

        <motion.p
          style={reduceMotion ? undefined : { opacity: labelOpacity }}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 text-center text-[11px] tracking-[0.5em] text-white/80 md:text-xs"
        >
          WHERE WE COME FROM
        </motion.p>
      </div>

      {/* ─── THE PAGE THAT RISES OVER IT ───────────────────── */}
      <div ref={pageRef} className="relative z-10">

        {/* Static gradient — the page has no hard top edge */}
        <div className="h-[35vh] bg-gradient-to-b from-transparent via-neutral-950/85 to-neutral-950" />

        <div className="min-h-screen bg-neutral-950 px-6 pb-32 md:px-12 lg:px-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28">

            {/* LEFT */}
            <div>
              <h2 className="max-w-xl font-cormorant text-6xl leading-[0.95] text-white md:text-7xl lg:text-[76px]">
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
                now associates with God&apos;s Own Country.
              </p>

              <p className="mt-10">
                Our founder worked alongside Mr Varghese for his entire early
                career before starting this company.
              </p>

              <blockquote className="mt-12 border-l border-white/20 pl-7 font-cormorant text-[30px] leading-[1.25] text-white md:text-[38px]">
                So the backwaters are not a product we learned to sell.
                <br />
                They are where we are from.
              </blockquote>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}