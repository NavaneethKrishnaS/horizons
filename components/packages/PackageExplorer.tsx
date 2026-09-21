"use client";

import { useEffect, useRef, useState } from "react";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import PackageCard from "./PackageCard";

import {
  collections,
  packages,
  type Collection,
  type TourPackage,
  spelled,
} from "@/data/packages";

type Filter = Collection | "all";

export default function PackageExplorer() {
  const [filter, setFilter] = useState<Filter>("all");

  /*
    One marker that travels, rather than one per button appearing and
    disappearing. It is the only moving thing on the row and it makes
    the row feel like a control instead of a list of links.
  */
  const rowRef = useRef<HTMLDivElement>(null);
  const [marker, setMarker] = useState({ left: 0, width: 0, ready: false });

  useEffect(() => {
    const row = rowRef.current;

    if (!row) return;

    const place = () => {
      const active = row.querySelector<HTMLElement>('[aria-pressed="true"]');

      if (!active) return;

      setMarker({
        left: active.offsetLeft,
        width: active.offsetWidth,
        ready: true,
      });
    };

    place();

    // The row is a webfont, and it scrolls.
    document.fonts?.ready.then(place).catch(() => {});
    row.addEventListener("scroll", place, { passive: true });

    const resize = new ResizeObserver(place);

    resize.observe(row);

    return () => {
      row.removeEventListener("scroll", place);
      resize.disconnect();
    };
  }, [filter]);

  const shown =
    filter === "all"
      ? packages
      : packages.filter((tour) => tour.collection === filter);

  const active = collections.find((group) => group.id === filter);

  /*
    Two lengths, kept apart. An eighteen-day traverse of the Himalaya and
    five days on a boat are not competing for the same afternoon, and a
    grid that mixes them serves neither.
  */
  const journeys = shown.filter((tour) => tour.tier === "journey");
  const escapes = shown.filter((tour) => tour.tier === "escape");

  return (
    <section className="border-b border-white/10 py-16 md:py-24">
      <Container>
        {/*
          Twenty is too many to scan, so they are grouped the way we
          think about them rather than by price or length.

          One line that scrolls, never a wrapping block. Seven of these
          fit across a laptop and do not come close to fitting across a
          phone, and wrapped they were both hard to read and wrong — the
          marker under the active one is positioned against its own row,
          so on a second row it landed on the labels below it.
        */}
        <div className="relative border-b border-white/10">
          <div ref={rowRef} className="j-filters relative flex gap-8 overflow-x-auto pb-4">
            <FilterButton
              label="Everything"
              active={filter === "all"}
              onClick={() => setFilter("all")}
            />

            {collections.map((group) => (
              <FilterButton
                key={group.id}
                label={group.label}
                active={filter === group.id}
                onClick={() => setFilter(group.id)}
              />
            ))}

            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 h-px bg-[#6B7341]"
              style={{
                left: marker.left,
                width: marker.width,
                opacity: marker.ready ? 1 : 0,
                transition:
                  "left 620ms cubic-bezier(0.16,1,0.3,1), width 620ms cubic-bezier(0.16,1,0.3,1), opacity 300ms ease",
              }}
            />
          </div>

          {/* There is more to the right of a phone screen; say so quietly. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#111111] to-transparent sm:hidden"
          />

          <style>{`
            .j-filters { scrollbar-width: none; -ms-overflow-style: none; }
            .j-filters::-webkit-scrollbar { display: none; }

            @keyframes horizons-fade-in {
              from { opacity: 0; transform: translateY(6px); }
            }
            .horizons-fade {
              animation: horizons-fade-in 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
            }

            @media (prefers-reduced-motion: reduce) {
              .horizons-fade { animation: none; }
            }
          `}</style>
        </div>

        <p
          key={filter}
          className="horizons-fade mt-7 max-w-xl text-[14px] leading-7 text-white/45"
        >
          {active ? active.blurb : `Everything we run, all ${spelled(packages.length)} of them.`}
        </p>

        {journeys.length ? (
          <Tier
            label="Journeys"
            note="Two or three weeks. Quoted, and built around whoever is travelling."
            tours={journeys}
          />
        ) : null}

        {escapes.length ? (
          <Tier
            label="Short escapes"
            note="A few days. For anyone already here, or with a week to spare at the end of something else."
            tours={escapes}
          />
        ) : null}
      </Container>
    </section>
  );
}

function Tier({
  label,
  note,
  tours,
}: {
  label: string;
  note: string;
  tours: TourPackage[];
}) {
  return (
    <div className="mt-14 md:mt-20">
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <h2 className="font-cormorant text-[26px] font-light text-white md:text-[32px]">
          {label}
        </h2>

        <p className="text-[13px] text-white/35">{note}</p>
      </div>

      <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour, index) => (
          /*
            Staggered by column rather than by index, so a row arrives
            left to right and the next row starts over instead of the
            last card in a long list waiting two seconds for its turn.
          */
          <Reveal key={tour.slug} delay={(index % 3) * 110}>
            <PackageCard tour={tour} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative shrink-0 whitespace-nowrap pb-2 text-[11px] uppercase tracking-[0.25em] transition-colors ${
        active ? "text-white" : "text-white/40 hover:text-white/70"
      }`}
    >
      {label}
    </button>
  );
}
