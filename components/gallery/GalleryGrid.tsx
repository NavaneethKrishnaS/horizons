"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import { GALLERY, type GalleryPhoto } from "@/data/gallery";

/*
  A contact sheet, and a viewer.

  The grid is deliberately dense: the point of the page is the number of
  them, and a photograph the size of a postage stamp is an invitation to
  open it rather than a thing to be judged on its own.

  The viewer is capped rather than full-bleed. Two thirds of this library
  has no version wider than a thousand pixels, and a thousand-pixel file
  stretched across a twenty-seven inch monitor looks like a mistake we
  made. Capped, it looks like a photograph.
*/

type Entry = GalleryPhoto & { place: string; where: string };

const src = (stem: string, width: number) =>
  `/images/gallery/${stem}-${width}.webp`;

export default function GalleryGrid() {
  const [filter, setFilter] = useState<string | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  /* One flat list, so the viewer's arrows cross from one place to the next. */
  const entries = useMemo<Entry[]>(
    () =>
      GALLERY.filter((place) => !filter || place.id === filter).flatMap((place) =>
        place.photos.map((photo) => ({
          ...photo,
          place: place.name,
          where: place.where,
        })),
      ),
    [filter],
  );

  const close = useCallback(() => setOpen(null), []);

  const step = useCallback(
    (by: number) =>
      setOpen((current) =>
        current === null
          ? null
          : (current + by + entries.length) % entries.length,
      ),
    [entries.length],
  );

  /* Arrow keys and Escape, because a viewer without them is a slideshow. */
  useEffect(() => {
    if (open === null) return undefined;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, step]);

  /* The page behind must not scroll while the viewer is up. */
  useEffect(() => {
    if (open === null) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const shown = open === null ? null : entries[open];

  return (
    <>
      {/* the places, as filters */}
      <div className="flex flex-wrap gap-x-6 gap-y-3 px-6 pb-8 text-[11px] uppercase tracking-[0.2em] md:gap-x-7 md:px-14 md:pb-10">
        <button
          type="button"
          onClick={() => setFilter(null)}
          className={`pb-1.5 transition-colors duration-300 ${
            filter === null
              ? "border-b border-[#8B9556] text-[#F4F1EA]"
              : "border-b border-transparent text-white/40 hover:text-white/75"
          }`}
        >
          All
        </button>

        {GALLERY.map((place) => (
          <button
            key={place.id}
            type="button"
            onClick={() => setFilter(place.id)}
            className={`pb-1.5 transition-colors duration-300 ${
              filter === place.id
                ? "border-b border-[#8B9556] text-[#F4F1EA]"
                : "border-b border-transparent text-white/40 hover:text-white/75"
            }`}
          >
            {place.name}{" "}
            <span className="text-white/25">{place.photos.length}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-[3px] px-6 pb-24 md:grid-cols-6 md:gap-1 md:px-14 md:pb-32">
        {entries.map((entry, index) => (
          <button
            key={entry.stem}
            type="button"
            onClick={() => setOpen(index)}
            className="group relative aspect-square overflow-hidden bg-[#1a1a1a]"
          >
            <Image
              src={src(entry.stem, entry.widths[0])}
              alt={entry.alt}
              fill
              sizes="(min-width: 768px) 16vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>

      {shown && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-[#0b0b0b]/97 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={shown.alt}
        >
          <div className="flex items-center justify-between px-6 py-5 md:px-10">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">
              {shown.place}
              <span className="ml-4 text-white/25">
                {open! + 1} / {entries.length}
              </span>
            </p>

            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="text-white/55 transition-colors duration-300 hover:text-white"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-4 md:px-20">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photograph"
              className="absolute left-2 z-10 p-3 text-white/45 transition-colors duration-300 hover:text-white md:left-6"
            >
              <ChevronLeft size={30} strokeWidth={1.25} />
            </button>

            {/*
              Capped at the largest file that exists, and never stretched
              past it. A soft photograph shown small is a photograph; shown
              large it is a soft photograph.
            */}
            <div
              className="relative flex max-h-full w-full items-center justify-center"
              style={{ maxWidth: `${shown.widths[shown.widths.length - 1]}px` }}
            >
              <Image
                src={src(shown.stem, shown.widths[shown.widths.length - 1])}
                alt={shown.alt}
                width={shown.widths[shown.widths.length - 1]}
                height={Math.round(
                  (shown.widths[shown.widths.length - 1] * 2) / 3,
                )}
                sizes="(min-width: 768px) 70vw, 94vw"
                className="h-auto max-h-[76vh] w-auto object-contain"
                priority
              />
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photograph"
              className="absolute right-2 z-10 p-3 text-white/45 transition-colors duration-300 hover:text-white md:right-6"
            >
              <ChevronRight size={30} strokeWidth={1.25} />
            </button>
          </div>

          <p className="px-6 pb-7 text-center text-[13px] leading-relaxed text-white/45 md:px-20">
            {shown.alt}
          </p>
        </div>
      )}
    </>
  );
}
