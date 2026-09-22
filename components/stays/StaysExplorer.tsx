"use client";

import { useEffect, useRef, useState } from "react";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import StayCard from "./StayCard";

import { collections, stays, type Collection } from "@/data/stays";

type Filter = Collection | "all";

export default function StaysExplorer() {
  const [filter, setFilter] = useState<Filter>("all");

  /*
    One marker that travels, the same control the journeys page uses. It
    is moved and stretched with a transform rather than left and width,
    so the row is not laid out again on every frame.
  */
  const rowRef = useRef<HTMLDivElement>(null);
  const [marker, setMarker] = useState({ left: 0, width: 0, ready: false });

  useEffect(() => {
    const row = rowRef.current;

    if (!row) return;

    const place = () => {
      const active = row.querySelector<HTMLElement>('[aria-pressed="true"]');

      if (!active) return;

      const left = active.offsetLeft;
      const width = active.offsetWidth;

      setMarker((current) =>
        current.left === left && current.width === width && current.ready
          ? current
          : { left, width, ready: true }
      );
    };

    place();

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
    filter === "all" ? stays : stays.filter((stay) => stay.collection === filter);

  const active = collections.find((group) => group.id === filter);

  const waiting = shown.filter((stay) => !stay.image).length;

  return (
    <section className="border-b border-white/10 py-16 md:py-24">
      <Container>
        <div className="relative border-b border-white/10">
          <div
            ref={rowRef}
            className="j-stayfilters relative flex gap-8 overflow-x-auto pb-4"
          >
            <FilterButton
              label="Everywhere"
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
              className="pointer-events-none absolute bottom-0 left-0 h-px w-px origin-left bg-[#6B7341]"
              style={{
                transform: `translate3d(${marker.left}px, 0, 0) scaleX(${marker.width})`,
                opacity: marker.ready ? 1 : 0,
                transition:
                  "transform 620ms cubic-bezier(0.16,1,0.3,1), opacity 300ms ease",
              }}
            />
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#111111] to-transparent sm:hidden"
          />

          <style>{`
            .j-stayfilters { scrollbar-width: none; -ms-overflow-style: none; }
            .j-stayfilters::-webkit-scrollbar { display: none; }

            @keyframes horizons-stay-fade {
              from { opacity: 0; transform: translateY(6px); }
            }
            .horizons-stay-fade {
              animation: horizons-stay-fade 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
            }

            @media (prefers-reduced-motion: reduce) {
              .horizons-stay-fade { animation: none; }
            }
          `}</style>
        </div>

        <p
          key={filter}
          className="horizons-stay-fade mt-7 max-w-xl text-[14px] leading-7 text-white/45"
        >
          {active
            ? active.blurb
            : "Everywhere we can put you, ordered outward from Kerala."}
        </p>

        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
          {shown.map((stay, index) => (
            <Reveal key={stay.slug} delay={(index % 3) * 110}>
              <StayCard stay={stay} />
            </Reveal>
          ))}
        </div>

        {/*
          Said out loud rather than hidden. Anyone looking at this page can
          see there are no photographs; pretending otherwise would be worse
          than explaining why.
        */}
        {waiting > 0 ? (
          <p className="mt-16 max-w-xl text-[13px] leading-7 text-white/30">
            {waiting === shown.length ? "These" : `${waiting} of these`} are
            waiting on photographs from the properties themselves. We would
            rather show you nothing than show you a picture of somewhere else.
          </p>
        ) : null}
      </Container>
    </section>
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
