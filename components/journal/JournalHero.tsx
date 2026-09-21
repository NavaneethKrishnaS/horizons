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
      {/* Objects hanging in the room, drifting at different rates. */}
      <SceneObject spec={{ x: 12, y: 18, size: 5, drift: -26, shape: "star" }} />
      <SceneObject spec={{ x: 22, y: 42, size: 3, drift: -14, shape: "disc" }} />
      <SceneObject spec={{ x: 8, y: 62, size: 7, drift: -34, spin: 40, shape: "ring" }} />
      <SceneObject spec={{ x: 88, y: 22, size: 6, drift: -30, shape: "star" }} />
      <SceneObject spec={{ x: 78, y: 52, size: 3, drift: -18, shape: "disc" }} />
      <SceneObject spec={{ x: 93, y: 68, size: 4, drift: -22, spin: -30, shape: "star" }} />
      <SceneObject spec={{ x: 30, y: 8, size: 2.5, drift: -40, shape: "beads" }} />
      <SceneObject spec={{ x: 70, y: 6, size: 2.5, drift: -46, shape: "beads" }} />

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
