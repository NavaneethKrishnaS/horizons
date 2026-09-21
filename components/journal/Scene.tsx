"use client";

import { ReactNode, useRef } from "react";

import SceneObject, { SceneObjectSpec } from "./SceneObject";
import { useSceneProgress } from "./useSceneProgress";

interface SceneProps {
  label: string;
  heading: string;
  body: ReactNode;
  objects: SceneObjectSpec[];
  children?: ReactNode;
}

export default function Scene({ label, heading, body, objects }: SceneProps) {
  const ref = useRef<HTMLElement>(null);

  useSceneProgress(ref);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[130vh] items-center overflow-hidden border-t border-black/10 bg-[#F4F2ED] py-24 md:min-h-[150vh]"
    >
      {objects.map((spec, index) => (
        <SceneObject key={`${spec.x}-${spec.y}-${index}`} spec={spec} />
      ))}

      <div className="relative mx-auto w-full max-w-2xl px-6 text-center">
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
    </section>
  );
}
