"use client";

import { ReactNode, useRef } from "react";

import SceneObject, { SceneObjectSpec } from "./SceneObject";
import { useSceneProgress } from "./useSceneProgress";
import { useFitWriting } from "./useFitWriting";

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

  The pinned box is one small viewport tall, not one large one. On a phone
  those differ by the height of the browser's own bars, and using the
  large one meant the bottom of every act was behind the address bar.

  The stage also carries the navbar's height as padding, at every width.
  The bar is fixed, so it covers the top of the box; without this the
  writing centres behind it. That is not a phone problem — a desktop
  window only has to be short enough and the heading goes under the bar
  there too.
*/
export default function Scene({ label, heading, body, objects }: SceneProps) {
  const ref = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useSceneProgress(ref);
  useFitWriting(boxRef, textRef);

  return (
    <section
      ref={ref}
      className="relative h-[300vh] border-t border-black/10 bg-[#F4F2ED]"
    >
      <div
        ref={boxRef}
        className="j-stage sticky top-0 flex h-svh items-center overflow-hidden"
      >
        {objects.map((spec, index) => (
          <SceneObject key={`${spec.src}-${index}`} spec={spec} />
        ))}

        {/*
          The writing arrives over the first third and leaves over the last,
          so each act has a beginning and an end rather than simply sitting
          there while the pictures move.
        */}
        <div className="j-column relative mx-auto w-full max-w-2xl px-5 text-center md:px-6">
          <div aria-hidden className="j-wash" />

          <div
            ref={textRef}
            className="j-writing relative"
            style={{
              opacity: "clamp(0, calc(var(--p, 0) * 6), 1)",
              transform:
                "translate3d(0, calc((1 - clamp(0, calc(var(--p, 0) * 6), 1)) * 24px), 0)",
            }}
          >
            <p className="j-label uppercase tracking-[0.4em] text-black/45">
              {label}
            </p>

            <h2 className="font-cormorant font-light text-[#111111]">
              {heading}
            </h2>

            <div className="j-body mx-auto max-w-xl text-black/60">{body}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
