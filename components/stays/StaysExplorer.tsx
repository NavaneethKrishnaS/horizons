"use client";

import { useState } from "react";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import StayCard from "./StayCard";

import { collections, stays, type Collection, type Stay } from "@/data/stays";

type Filter = Collection | "all";

/*
  Deliberately not the journeys control.

  That page has seven collections of roughly equal weight and a grid that
  changes shape as you filter it, so a row of chips across the top is
  right. This is a directory of sixty-five places in eight very unequal
  regions — twenty-two in Rajasthan, three in the hill country — and what
  a directory wants is a contents page: a standing index down the side
  with the counts visible, so you can see the shape of the collection
  before you touch anything. On a phone it lies down and becomes a row.
*/
export default function StaysExplorer() {
  const [filter, setFilter] = useState<Filter>("all");

  const shown =
    filter === "all" ? stays : stays.filter((stay) => stay.collection === filter);

  const count = (id: Filter) =>
    id === "all" ? stays.length : stays.filter((s) => s.collection === id).length;

  /*
    Showing everything means running heads, so sixty-five cards read as a
    gazetteer rather than as a wall. Filtered, the head would only repeat
    what the index already says, so it goes.
  */
  const groups: { id: Collection; label: string; blurb: string; items: Stay[] }[] =
    filter === "all"
      ? collections
          .map((group) => ({
            ...group,
            items: stays.filter((stay) => stay.collection === group.id),
          }))
          .filter((group) => group.items.length > 0)
      : [];

  const waiting = shown.filter((stay) => !stay.image).length;

  return (
    <section className="border-b border-white/10 py-14 md:py-20">
      <Container>
        <div className="lg:grid lg:grid-cols-[210px_1fr] lg:gap-16 xl:grid-cols-[240px_1fr] xl:gap-20">
          {/* ——— The index ——— */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="hidden text-[10px] uppercase tracking-[0.3em] text-white/30 lg:block">
              Index
            </p>

            <nav
              aria-label="Filter stays by region"
              className="j-stayindex mt-0 flex gap-7 overflow-x-auto pb-4 lg:mt-7 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0"
            >
              <IndexItem
                label="Everywhere"
                total={count("all")}
                active={filter === "all"}
                onClick={() => setFilter("all")}
              />

              {collections.map((group) => (
                <IndexItem
                  key={group.id}
                  label={group.label}
                  total={count(group.id)}
                  active={filter === group.id}
                  onClick={() => setFilter(group.id)}
                />
              ))}
            </nav>

            {/*
              Said out loud rather than hidden. Anyone can see there are no
              photographs; explaining why is better than hoping nobody asks.
            */}
            {waiting > 0 ? (
              <p className="mt-10 hidden max-w-[210px] text-[12px] leading-6 text-white/25 lg:block">
                {waiting === shown.length ? "These are" : `${waiting} of these are`}{" "}
                waiting on photographs from the properties themselves. We would
                rather show you nothing than somewhere else.
              </p>
            ) : null}
          </div>

          {/* ——— The places ——— */}
          <div className="mt-10 lg:mt-0">
            {filter === "all" ? (
              groups.map((group, groupIndex) => (
                <div
                  key={group.id}
                  className={groupIndex === 0 ? "" : "mt-20 md:mt-28"}
                >
                  <Reveal>
                    <div className="border-b border-white/10 pb-5">
                      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                        <h2 className="font-cormorant text-[26px] font-light text-white md:text-[32px]">
                          {group.label}
                        </h2>

                        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8B9556]">
                          {group.items.length}
                        </span>
                      </div>

                      <p className="mt-3 max-w-2xl text-[13px] leading-7 text-white/40">
                        {group.blurb}
                      </p>
                    </div>
                  </Reveal>

                  <Grid items={group.items} />
                </div>
              ))
            ) : (
              <>
                <Reveal>
                  <p className="max-w-2xl border-b border-white/10 pb-5 text-[14px] leading-7 text-white/45">
                    {collections.find((c) => c.id === filter)?.blurb}
                  </p>
                </Reveal>

                <Grid items={shown} />
              </>
            )}

            {waiting > 0 ? (
              <p className="mt-14 max-w-xl text-[12px] leading-6 text-white/25 lg:hidden">
                {waiting === shown.length ? "These are" : `${waiting} of these are`}{" "}
                waiting on photographs from the properties themselves.
              </p>
            ) : null}
          </div>
        </div>

        <style>{`
          .j-stayindex { scrollbar-width: none; -ms-overflow-style: none; }
          .j-stayindex::-webkit-scrollbar { display: none; }
        `}</style>
      </Container>
    </section>
  );
}

function Grid({ items }: { items: Stay[] }) {
  return (
    <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-12">
      {items.map((stay, index) => (
        <Reveal key={stay.slug} delay={(index % 2) * 110}>
          <StayCard stay={stay} />
        </Reveal>
      ))}
    </div>
  );
}

function IndexItem({
  label,
  total,
  active,
  onClick,
}: {
  label: string;
  total: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group relative flex shrink-0 items-baseline gap-3 whitespace-nowrap text-left text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 lg:w-full lg:justify-between lg:gap-4 lg:whitespace-normal lg:border-b lg:border-white/10 lg:py-3.5 ${
        active ? "text-white" : "text-white/40 hover:text-white/75"
      }`}
    >
      {/*
        The marker lives on the index rather than travelling across a row:
        a rule that grows out of the left edge of the active line.
      */}
      <span
        aria-hidden
        className={`pointer-events-none absolute left-0 hidden h-px bg-[#6B7341] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block ${
          active ? "-bottom-px w-full opacity-100" : "-bottom-px w-0 opacity-0"
        }`}
      />

      <span className="lg:pr-2">{label}</span>

      <span
        className={`text-[10px] tabular-nums transition-colors duration-300 ${
          active ? "text-[#8B9556]" : "text-white/25 group-hover:text-white/40"
        }`}
      >
        {total}
      </span>
    </button>
  );
}
