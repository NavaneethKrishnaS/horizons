"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
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

  /*
    Where the keyboard was before the lightbox took it, so it can be put
    back. Opening a dialog and leaving focus behind it means the next Tab
    walks the page underneath, which for anyone not using a mouse reads
    as the photograph having swallowed the site.
  */
  const cameFrom = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(null);
    cameFrom.current?.focus();
  }, []);

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

    dialogRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();

        return;
      }

      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);

      if (event.key !== "Tab") return;

      /* Keep Tab inside the dialog while it is the only thing on screen. */
      const stops = dialogRef.current?.querySelectorAll<HTMLElement>("button");

      if (!stops?.length) return;

      const first = stops[0];
      const last = stops[stops.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, step, close]);

  if (plates.length === 0) return null;

  const index = open ?? -1;
  const shown = index < 0 ? null : plates[index];

  return (
    <>
      {/*
        One or two photographs left-aligned in a strip built for seven
        reads as a row that failed to load. Centred, it reads as all
        there is — which is the truth, and looks deliberate.
      */}
      <div
        className={`j-plates -mx-6 flex gap-4 overflow-x-auto px-6 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 ${
          plates.length <= 2 ? "lg:justify-center" : ""
        }`}
      >
        {plates.map((plate, position) => (
          <Reveal
            key={plate.src}
            delay={Math.min(position, 4) * 90}
            distance={18}
            className="shrink-0"
          >
            <button
              type="button"
              onClick={(event) => {
                cameFrom.current = event.currentTarget;
                setOpen(position);
              }}
              aria-label={`Open photograph ${position + 1} of ${plates.length}`}
              className="group relative block aspect-[4/3] w-[76vw] overflow-hidden bg-white/5 sm:w-[46vw] lg:w-[380px]"
            >
              <Image
                src={plate.src}
                alt={plate.alt}
                fill
                /*
                  The first plate is the largest thing above the fold on
                  a phone, so it is the page's paint. Left lazy it was
                  fetched after the JavaScript and reported as a slow
                  one; the rest can wait their turn.
                */
                priority={position === 0}
                sizes="(max-width: 640px) 76vw, (max-width: 1024px) 46vw, 380px"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
            </button>
          </Reveal>
        ))}
      </div>

      <style>{`
        .j-plates { scrollbar-width: none; -ms-overflow-style: none; }
        .j-plates::-webkit-scrollbar { display: none; }

        @keyframes horizons-lightbox-in { from { opacity: 0; } }
        @keyframes horizons-plate-in {
          from { opacity: 0; transform: scale(0.985); }
        }

        .horizons-lightbox {
          animation: horizons-lightbox-in 220ms ease both;
        }
        .horizons-lightbox-plate {
          animation: horizons-plate-in 420ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-lightbox,
          .horizons-lightbox-plate { animation: none; }
        }
      `}</style>

      {shown ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${name} — photographs`}
          tabIndex={-1}
          className="horizons-lightbox fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4 focus:outline-none md:p-10"
          onClick={close}
        >
          <div
            /*
              Re-keyed so each photograph arrives rather than cutting.
              Cheap: one opacity and one scale, both composited.
            */
            key={shown.src}
            className="horizons-lightbox-plate relative h-full w-full"
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
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 text-[11px] uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-white"
          >
            Close
          </button>

          {plates.length > 1 ? (
            <>
              <Arrow direction="left" onClick={() => step(-1)} />
              <Arrow direction="right" onClick={() => step(1)} />

              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] text-white/40 tabular-nums">
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
