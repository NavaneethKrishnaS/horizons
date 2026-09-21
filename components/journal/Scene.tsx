"use client";

import { ReactNode, useRef } from "react";

import SceneObject, { SceneObjectSpec } from "./SceneObject";
import { useSceneProgress } from "./useSceneProgress";

interface SceneProps {
  label: string;
  heading: string;
  body: ReactNode;
  objects: SceneObjectSpec[];
}

/*
  A pinned shot.

  The section is three screens tall but what you see is one screen, held
  still by position: sticky while those three screens of scroll go past.
  The act therefore stays in front of you and the objects move through it,
  which is what makes it read as a sequence rather than as a page going by.

  Sticky costs nothing — the browser keeps the pinned layer in place on the
  compositor. Nothing here runs per frame except the single variable the
  section publishes.
*/
export default function Scene({ label, heading, body, objects }: SceneProps) {
  const ref = useRef<HTMLElement>(null);

  useSceneProgress(ref);

  return (
    <section
      ref={ref}
      className="relative h-[300vh] border-t border-black/10 bg-[#F4F2ED]"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {objects.map((spec, index) => (
          <SceneObject key={`${spec.src}-${index}`} spec={spec} />
        ))}

        {/*
          The writing arrives over the first third and leaves over the last,
          so each act has a beginning and an end rather than simply sitting
          there while the pictures move.
        */}
        <div className="relative mx-auto w-full max-w-2xl px-6 text-center">
          <div aria-hidden className="j-wash" />

          <div
            className="relative"
            style={{
              opacity: "clamp(0, calc(var(--p, 0) * 6), 1)",
              transform:
                "translate3d(0, calc((1 - clamp(0, calc(var(--p, 0) * 6), 1)) * 24px), 0)",
            }}
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-black/45">
              {label}
            </p>

            <h2 className="mt-6 font-cormorant text-[34px] font-light leading-[1.08] text-[#111111] sm:text-5xl md:text-[58px]">
              {heading}
            </h2>

            <div className="mx-auto mt-8 max-w-xl space-y-5 text-[14px] leading-7 text-black/60 md:text-[15px] md:leading-8">
              {body}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
