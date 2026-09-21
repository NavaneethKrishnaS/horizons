"use client";

import { useState } from "react";

import Container from "@/components/ui/Container";
import PackageCard from "./PackageCard";

import { collections, packages, type Collection } from "@/data/packages";

type Filter = Collection | "all";

export default function PackageExplorer() {
  const [filter, setFilter] = useState<Filter>("all");

  const shown =
    filter === "all"
      ? packages
      : packages.filter((tour) => tour.collection === filter);

  const active = collections.find((group) => group.id === filter);

  return (
    <section className="border-b border-white/10 py-16 md:py-24">
      <Container>
        {/*
          Seventeen is too many to scan, so they are grouped the way we
          think about them rather than by price or length.

          One line that scrolls, never a wrapping block. Seven of these
          fit across a laptop and do not come close to fitting across a
          phone, and wrapped they were both hard to read and wrong — the
          marker under the active one is positioned against its own row,
          so on a second row it landed on the labels below it.
        */}
        <div className="relative border-b border-white/10">
          <div className="j-filters flex gap-8 overflow-x-auto pb-4">
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
          </div>

          {/* There is more to the right of a phone screen; say so quietly. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#111111] to-transparent sm:hidden"
          />

          <style>{`
            .j-filters { scrollbar-width: none; -ms-overflow-style: none; }
            .j-filters::-webkit-scrollbar { display: none; }
          `}</style>
        </div>

        <p className="mt-7 max-w-xl text-[14px] leading-7 text-white/45">
          {active ? active.blurb : `Every journey we run, ${packages.length} of them.`}
        </p>

        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
          {shown.map((tour) => (
            <PackageCard key={tour.slug} tour={tour} />
          ))}
        </div>
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

      {/*
        On the button's own bottom edge, not the container's. It can then
        never be drawn over anything else, whatever the row does.
      */}
      <span
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-px transition-colors ${
          active ? "bg-[#6B7341]" : "bg-transparent"
        }`}
      />
    </button>
  );
}
