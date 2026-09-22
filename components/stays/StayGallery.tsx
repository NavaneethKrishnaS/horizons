"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { useScrollLock } from "@/lib/scrollLock";

type Plate = { src: string; alt: string };

/*
  The property's own photographs, when it has sent more than one.

  A strip rather than a grid: a hotel's pictures are a sequence somebody
  chose — the room, the water, the food — and a strip keeps that order
  while a grid scrambles it into a mosaic. Opens into a plain lightbox,
  arrow keys and Escape, because that is all anybody wants from one.
*/
export default function StayGallery({
  plates,
  name,
}: {
  plates: Plate[];
  name: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const isOpen = open !== null;

  useScrollLock(isOpen);

  const step = useCallback(
    (by: number) => {
      setOpen((current) =>
        current === null
          ? current
          : (current + by + plates.length) % plates.length
      );
    },
    [plates.length]
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, step]);

  if (plates.length === 0) return null;

  const index = open ?? -1;
  const shown = index < 0 ? null : plates[index];

  return (
    <>
      <div className="j-plates -mx-6 flex gap-4 overflow-x-auto px-6 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
        {plates.map((plate, index) => (
          <button
            key={plate.src}
            type="button"
            onClick={() => setOpen(index)}
            aria-label={`Open photograph ${index + 1} of ${plates.length}`}
            className="group relative aspect-[4/3] w-[76vw] shrink-0 overflow-hidden bg-white/5 sm:w-[46vw] lg:w-[380px]"
          >
            <Image
              src={plate.src}
              alt={plate.alt}
              fill
              sizes="(max-width: 640px) 76vw, (max-width: 1024px) 46vw, 380px"
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>

      <style>{`
        .j-plates { scrollbar-width: none; -ms-overflow-style: none; }
        .j-plates::-webkit-scrollbar { display: none; }
      `}</style>

      {shown ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} — photographs`}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4 md:p-10"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative h-full w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={shown.src}
              alt={shown.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute right-5 top-5 text-[11px] uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-white"
          >
            Close
          </button>

          {plates.length > 1 ? (
            <>
              <Arrow direction="left" onClick={() => step(-1)} />
              <Arrow direction="right" onClick={() => step(1)} />

              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] text-white/40">
                {index + 1} / {plates.length}
              </p>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

function Arrow({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const left = direction === "left";

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      aria-label={left ? "Previous photograph" : "Next photograph"}
      className={`absolute top-1/2 -translate-y-1/2 px-5 py-6 text-[22px] leading-none text-white/50 transition-colors hover:text-white ${
        left ? "left-1" : "right-1"
      }`}
    >
      {left ? "←" : "→"}
    </button>
  );
}
