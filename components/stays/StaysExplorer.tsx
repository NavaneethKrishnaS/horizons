"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import StayCard from "./StayCard";

import { useKeepResultsInView } from "@/lib/keepInView";

import { collections, stays, type Collection, type Stay } from "@/data/stays";

type Filter = Collection | "all";

/* Palhaços and Palhacos are the same hotel. */
function normalise(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function haystack(stay: Stay) {
  return normalise(
    [stay.name, stay.place, stay.kind, stay.standfirst, stay.collection].join(" ")
  );
}

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
  /*
    The navbar's Stays menu names four regions, so it should land on
    them: ?region=backwaters opens on that group. Anything unrecognised
    is ignored and the page opens on everything, which is what a stale
    or hand-typed link should do.

    Derived rather than pushed into state by an effect — the URL is the
    starting position and a click overrides it, so there is nothing to
    synchronise and no render that shows the wrong group first.
  */
  const params = useSearchParams();
  const asked = params.get("region");

  const fromUrl: Filter = collections.some((group) => group.id === asked)
    ? (asked as Collection)
    : "all";

  const [chosen, setChosen] = useState<Filter | null>(null);

  const filter = chosen ?? fromUrl;
  const setFilter = setChosen;

  /*
    Search, because sixty-five is past the number anybody scans.

    Matches the name, the locality, what kind of place it is and the
    region it sits in — somebody who half-remembers "that farm near
    Kumarakom" should find it by either half. Folded to lowercase and
    stripped of accents so Palhacos finds Palhaços.
  */
  const [query, setQuery] = useState("");

  const needle = normalise(query);

  const byRegion =
    filter === "all" ? stays : stays.filter((stay) => stay.collection === filter);

  const shown = needle
    ? byRegion.filter((stay) => haystack(stay).includes(needle))
    : byRegion;

  /* Searching across everything is more use than searching inside one region. */
  const searchedEverywhere = needle
    ? stays.filter((stay) => haystack(stay).includes(needle))
    : [];

  const pool = needle ? searchedEverywhere : stays;

  const count = (id: Filter) =>
    id === "all" ? pool.length : pool.filter((s) => s.collection === id).length;

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
            items: shown.filter((stay) => stay.collection === group.id),
          }))
          .filter((group) => group.items.length > 0)
      : [];

  const waiting = shown.filter((stay) => !stay.image).length;

  /*
    One marker that travels, rather than one per line appearing and
    disappearing. Moved and stretched by transform: left and width are
    both layout, and animating them laid the index out again on every
    frame of the half-second it travels.

    It needs no breakpoint of its own. Lying down as a row the buttons
    sit side by side and it underlines the active one; standing up as a
    column they are full width and it lands on that line's rule — the
    same two numbers off the same element either way.
  */
  const indexRef = useRef<HTMLElement>(null);
  const [marker, setMarker] = useState({ x: 0, y: 0, w: 0, ready: false });

  useEffect(() => {
    const nav = indexRef.current;

    if (!nav) return;

    const place = () => {
      const active = nav.querySelector<HTMLElement>('[aria-pressed="true"]');

      if (!active) return;

      const x = active.offsetLeft;
      const y = active.offsetTop + active.offsetHeight - 1;
      const w = active.offsetWidth;

      /*
        The row fires a scroll event several times per frame while it is
        being dragged and the answer almost never changes — the marker
        scrolls with the content, so its offset is already right.
        Writing state anyway re-rendered the whole explorer each time.
      */
      setMarker((current) =>
        current.ready && current.x === x && current.y === y && current.w === w
          ? current
          : { x, y, w, ready: true }
      );
    };

    /*
      Lying down as a row, the eight regions are twice the width of a
      phone. The navbar's Stays menu deep-links into four of them, and
      ?region=rajasthan opened with Rajasthan twelve hundred pixels off
      the right-hand end: a row with nothing apparently selected, above
      a grid of twenty-two Rajasthan hotels and no explanation. So the
      active line is brought into the row — once, when it changes, never
      while the reader is dragging it.
    */
    const bring = () => {
      const active = nav.querySelector<HTMLElement>('[aria-pressed="true"]');

      if (!active || nav.scrollWidth <= nav.clientWidth) return;

      const left = active.offsetLeft;
      const right = left + active.offsetWidth;

      if (left < nav.scrollLeft + 8) {
        nav.scrollLeft = Math.max(0, left - 16);
      } else if (right > nav.scrollLeft + nav.clientWidth - 8) {
        nav.scrollLeft = right - nav.clientWidth + 16;
      }
    };

    place();
    bring();

    /* The index is set in a webfont, and it scrolls. */
    document.fonts?.ready
      .then(() => {
        place();
        bring();
      })
      .catch(() => {});

    nav.addEventListener("scroll", place, { passive: true });

    const resize = new ResizeObserver(place);

    resize.observe(nav);

    return () => {
      nav.removeEventListener("scroll", place);
      resize.disconnect();
    };
  }, [filter]);

  /* See lib/keepInView.ts — filtering must not strand you in the footer. */
  const stickyRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useKeepResultsInView(resultsRef, `${filter}|${needle}`, stickyRef);

  return (
    <section className="border-b border-white/10 py-14 md:py-20">
      <Container>
        <div className="lg:grid lg:grid-cols-[210px_1fr] lg:gap-16 xl:grid-cols-[240px_1fr] xl:gap-20">
          {/*
            ——— The index ———

            Sticky at every width, for different reasons. Beside the grid
            on a laptop it is a contents page that stays put. On a phone,
            where sixty-five cards in one column run to thirty thousand
            pixels, it is the thing that saves you from scrolling them:
            the filter row stays under the navbar wherever you have got
            to. The negative margin lets its background reach the edges
            of the screen while the buttons stay on the text column.
          */}
          <div
            ref={stickyRef}
            className="sticky z-20 -mx-6 bg-[#111111] px-6 pt-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:self-start lg:bg-transparent lg:px-0 lg:pt-0"
            /* Under the navbar, whatever height it is reporting today. */
            style={{ top: "calc(var(--horizons-nav, 72px) + 8px)" }}
          >
            <p className="hidden text-[10px] uppercase tracking-[0.3em] text-white/30 lg:block">
              Index
            </p>

            <div className="relative lg:mt-6">
              <label htmlFor="stay-search" className="sr-only">
                Search the stays
              </label>

              <input
                id="stay-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search a name or a place"
                className="w-full border-b border-white/15 bg-transparent pb-2.5 pr-7 text-[13px] text-white placeholder:text-white/30 transition-colors duration-300 focus:border-[#6B7341] focus:outline-none"
              />

              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear the search"
                  className="absolute right-0 top-0 text-[11px] uppercase tracking-[0.2em] text-white/35 transition-colors hover:text-white"
                >
                  Clear
                </button>
              ) : (
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-0 text-[13px] text-white/25"
                >
                  ⌕
                </span>
              )}
            </div>

            <nav
              ref={indexRef}
              aria-label="Filter stays by region"
              className="j-stayindex relative mt-0 flex gap-7 overflow-x-auto pb-4 lg:mt-7 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0"
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

              <span
                aria-hidden
                className="horizons-index-marker pointer-events-none absolute left-0 top-0 h-px w-px origin-left bg-[#6B7341]"
                style={{
                  transform: `translate3d(${marker.x}px, ${marker.y}px, 0) scaleX(${marker.w})`,
                  opacity: marker.ready ? 1 : 0,
                }}
              />
            </nav>

            <span
              aria-hidden
              className="block h-px w-full bg-white/10 lg:hidden"
            />

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
          <div ref={resultsRef} className="mt-10 lg:mt-0">
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
                  <p
                    key={filter}
                    className="horizons-fade max-w-2xl border-b border-white/10 pb-5 text-[14px] leading-7 text-white/45"
                  >
                    {collections.find((c) => c.id === filter)?.blurb}
                  </p>
                </Reveal>

                <Grid items={shown} />
              </>
            )}

            {needle && shown.length === 0 ? (
              <p className="max-w-xl text-[15px] leading-8 text-white/45">
                Nothing here matches “{query.trim()}”.{" "}
                {searchedEverywhere.length > 0 ? (
                  <>
                    There {searchedEverywhere.length === 1 ? "is" : "are"}{" "}
                    {searchedEverywhere.length} elsewhere —{" "}
                    <button
                      type="button"
                      onClick={() => setFilter("all")}
                      className="text-[#A8B473] underline underline-offset-4 transition-colors hover:text-white"
                    >
                      look everywhere
                    </button>
                    .
                  </>
                ) : (
                  <>
                    Tell us what you are after and we will find it — most of
                    what we book is not on a page.
                  </>
                )}
              </p>
            ) : null}

            {waiting > 0 && shown.length > 0 ? (
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

          .horizons-index-marker {
            transition: transform 620ms cubic-bezier(0.16, 1, 0.3, 1),
                        opacity 300ms ease;
          }

          @keyframes horizons-fade-in {
            from { opacity: 0; transform: translateY(6px); }
          }
          .horizons-fade {
            animation: horizons-fade-in 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
          }

          @media (prefers-reduced-motion: reduce) {
            .horizons-index-marker { transition: none; }
            .horizons-fade { animation: none; }
          }
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
