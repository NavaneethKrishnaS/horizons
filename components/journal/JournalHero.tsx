"use client";

import { useRef } from "react";

import SceneObject from "./SceneObject";
import { Arch, OrnamentBand } from "./PaperFrame";
import { useSceneProgress } from "./useSceneProgress";

import { journalIntro } from "@/data/journal";

const J = "/images/journal";

export default function JournalHero() {
  const ref = useRef<HTMLElement>(null);

  useSceneProgress(ref);

  return (
    <section ref={ref} className="relative h-[220vh] bg-[#F4F2ED]">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-20">
        {/*
          The room the page opens in. Nothing sits above roughly a third
          down: the navbar lives there, and an object crossing the logo
          reads as a mistake rather than as composition.
        */}
        <SceneObject
          spec={{
            ax: 10, ay: 36, size: 6, src: `${J}/star.webp`, w: 751, h: 760, depth: 0.9,
            from: { y: 10, rotate: -30, opacity: 0.9 },
            to: { y: -44, rotate: 30, opacity: 0 },
          }}
        />
        <SceneObject
          spec={{
            ax: 90, ay: 33, size: 7, src: `${J}/star.webp`, w: 751, h: 760, depth: 1.1,
            from: { y: 14, rotate: 20, opacity: 0.9 },
            to: { y: -52, rotate: -26, opacity: 0 },
          }}
        />
        <SceneObject
          spec={{
            ax: 24, ay: 56, size: 3, src: `${J}/sphere.webp`, w: 751, h: 760, depth: 0.6,
            from: { y: 6, opacity: 1 },
            to: { y: -30, opacity: 0 },
          }}
        />
        <SceneObject
          spec={{
            ax: 77, ay: 60, size: 2.6, src: `${J}/sphere.webp`, w: 751, h: 760, depth: 0.5,
            from: { y: 4, opacity: 1 },
            to: { y: -24, opacity: 0 },
          }}
        />
        <SceneObject
          spec={{
            ax: 8, ay: 76, size: 9, src: `${J}/rosette.webp`, w: 760, h: 759, depth: 0.7,
            from: { y: 12, rotate: 0, opacity: 0.85 },
            to: { y: -40, rotate: 45, opacity: 0 },
          }}
        />
        <SceneObject
          spec={{
            ax: 91, ay: 76, size: 5, src: `${J}/lamp.webp`, w: 244, h: 760, depth: 0.8,
            from: { y: 14, opacity: 0.9 },
            to: { y: -42, opacity: 0 },
          }}
        />
        <SceneObject
          spec={{
            ax: 33, ay: 22, size: 1.3, src: `${J}/beads.webp`, w: 106, h: 760, depth: 1.3,
            from: { y: -4, opacity: 0.9 },
            to: { y: -58, opacity: 0 },
          }}
        />
        <SceneObject
          spec={{
            ax: 67, ay: 20, size: 1.3, src: `${J}/beads.webp`, w: 106, h: 760, depth: 1.5,
            from: { y: -6, opacity: 0.9 },
            to: { y: -66, opacity: 0 },
          }}
        />

        {/*
          The arch recedes as the story starts — but never all the way to
          nothing before it has left the screen. Emptying it out early is
          what used to leave a blank page between the title and act one.
        */}
        <div
          style={{
            opacity: "calc(1 - var(--e, 0))",
            transform: "scale(calc(1 - var(--e, 0) * 0.06))",
          }}
        >
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
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <OrnamentBand />
        </div>
      </div>
    </section>
  );
}
