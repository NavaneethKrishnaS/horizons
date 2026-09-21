"use client";

import { useRef } from "react";

import SceneObject from "./SceneObject";
import { Arch, OrnamentBand } from "./PaperFrame";
import { useSceneProgress } from "./useSceneProgress";

import { journalIntro } from "@/data/journal";

export default function JournalHero() {
  const ref = useRef<HTMLElement>(null);

  useSceneProgress(ref);

  return (
    <section
      ref={ref}
      className="relative flex min-h-lvh flex-col justify-center overflow-hidden bg-[#F4F2ED] pt-28"
    >
      {/*
        Nothing sits above roughly a quarter down: the navbar lives there,
        and an object crossing the logo reads as a mistake rather than as
        composition.
      */}
      <SceneObject spec={{ x: 10, y: 34, size: 5, drift: -26, src: "/images/journal/star.webp" }} />
      <SceneObject spec={{ x: 24, y: 54, size: 3, drift: -14, src: "/images/journal/sphere.webp" }} />
      <SceneObject spec={{ x: 8, y: 74, size: 8, drift: -34, src: "/images/journal/pookkalam.webp" }} />
      <SceneObject spec={{ x: 91, y: 32, size: 6, drift: -30, src: "/images/journal/star.webp" }} />
      <SceneObject spec={{ x: 78, y: 58, size: 2.6, drift: -18, src: "/images/journal/sphere.webp" }} />
      <SceneObject spec={{ x: 90, y: 74, size: 5, drift: -22, src: "/images/journal/lamp.webp" }} />
      <SceneObject spec={{ x: 33, y: 28, size: 1.3, drift: -40, src: "/images/journal/beads.webp" }} />
      <SceneObject spec={{ x: 67, y: 26, size: 1.3, drift: -46, src: "/images/journal/beads.webp" }} />

      <Arch>
        <p className="text-center text-[10px] uppercase tracking-[0.4em] text-black/45">
          {journalIntro.label}
        </p>

        <h1 className="mt-8 text-center font-cormorant text-[36px] font-light leading-[1.06] text-[#111111] sm:text-5xl md:text-[62px]">
          {journalIntro.heading}
        </h1>

        <p className="mx-auto mt-8 max-w-lg text-center text-[14px] leading-7 text-black/60 md:text-[15px] md:leading-8">
          {journalIntro.standfirst}
        </p>

        <div className="mt-14 flex justify-center">
          <span className="text-[10px] uppercase tracking-[0.35em] text-black/35">
            Scroll
          </span>
        </div>
      </Arch>

      <div className="mt-16 md:mt-24">
        <OrnamentBand />
      </div>
    </section>
  );
}
