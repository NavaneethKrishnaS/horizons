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
        */}
        <div className="flex flex-wrap gap-x-7 gap-y-4 border-b border-white/10 pb-7">
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
      className={`relative pb-1 text-[11px] uppercase tracking-[0.25em] transition-colors ${
        active ? "text-white" : "text-white/40 hover:text-white/70"
      }`}
    >
      {label}

      <span
        aria-hidden
        className={`absolute inset-x-0 -bottom-[29px] h-px transition-colors ${
          active ? "bg-[#6B7341]" : "bg-transparent"
        }`}
      />
    </button>
  );
}
