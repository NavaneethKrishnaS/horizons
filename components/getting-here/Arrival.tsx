"use client";

import { useState } from "react";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import KeralaMap from "./KeralaMap";
import { airports, legs } from "@/data/gettingHere";

/*
  The map and the four airports, reading as one thing.

  The map is sticky beside the list on a laptop, so choosing an airport
  from the list moves the ring on the map without either leaving the
  screen. On a phone the map comes first and the list follows it, which
  is the same idea stacked.
*/
export default function Arrival() {
  const [active, setActive] = useState<string | null>(null);

  const chosen = airports.find((airport) => airport.code === active);

  const shownLegs = chosen
    ? legs.filter((leg) => leg.airport === chosen.code)
    : legs;

  return (
    <section className="border-b border-white/10 py-16 md:py-24">
      <Container>
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
            Four ways in
          </p>

          <h2 className="mt-7 max-w-2xl font-cormorant text-[32px] font-light leading-[1.08] text-white sm:text-5xl md:text-[46px]">
            A state with four international airports.
          </h2>

          <p className="mt-8 max-w-2xl text-[15px] leading-8 text-white/55 md:text-[16px] md:leading-9">
            Kerala is six hundred kilometres of coast and about as wide as a
            long afternoon. Which airport you choose decides your first day
            and your last — and, more often than people expect, whether the
            trip starts with two hours in a car or twenty minutes.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* The map. */}
          <Reveal className="order-1">
            <div
              className="lg:sticky"
              style={{ top: "calc(var(--horizons-nav, 72px) + 32px)" }}
            >
              <KeralaMap active={active} onActive={setActive} />

              <p className="mt-5 text-[12px] leading-6 text-white/30">
                Drawn from the state&rsquo;s own district boundaries. Touch an
                airport to see what it is near.
              </p>
            </div>
          </Reveal>

          {/* The four, in order down the coast. */}
          <div className="order-2">
            {airports.map((airport, index) => {
              const isOpen = active === airport.code;

              return (
                <Reveal key={airport.code} delay={Math.min(index, 3) * 80}>
                  <button
                    type="button"
                    onClick={() => setActive(isOpen ? null : airport.code)}
                    aria-expanded={isOpen}
                    className="group w-full border-b border-white/10 py-7 text-left"
                  >
                    <span className="flex items-baseline justify-between gap-6">
                      <span className="flex items-baseline gap-5">
                        <span
                          className={`font-cormorant text-[30px] font-light leading-none transition-colors duration-300 md:text-[36px] ${
                            isOpen ? "text-[#A8B473]" : "text-white"
                          }`}
                        >
                          {airport.code}
                        </span>

                        <span className="text-[15px] leading-6 text-white/60 md:text-[16px]">
                          {airport.name}
                        </span>
                      </span>

                      <span
                        aria-hidden
                        className="relative mt-3 block h-px w-3.5 shrink-0 bg-[#8B9556]"
                      >
                        <span
                          className={`absolute inset-0 block h-px w-3.5 bg-[#8B9556] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isOpen ? "rotate-0" : "rotate-90"
                          }`}
                        />
                      </span>
                    </span>

                    <span className="mt-3 block text-[11px] uppercase tracking-[0.25em] text-white/35">
                      {airport.serves}
                    </span>

                    <span
                      className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span
                          className={`mt-6 block max-w-xl text-[15px] leading-8 text-white/55 transition-opacity duration-500 md:text-[16px] md:leading-9 ${
                            isOpen ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {airport.note}
                        </span>
                      </span>
                    </span>
                  </button>
                </Reveal>
              );
            })}

            {/* The legs, filtered to the airport in hand. */}
            <Reveal delay={120}>
              <div className="mt-12">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                  {chosen ? `From ${chosen.short}` : "How long it takes"}
                </p>

                <dl className="mt-6">
                  {shownLegs.map((leg) => (
                    <div
                      key={`${leg.from}-${leg.to}`}
                      className="flex items-baseline justify-between gap-6 border-b border-white/[0.07] py-3.5"
                    >
                      <dt className="text-[14px] leading-6 text-white/60">
                        {leg.from}{" "}
                        <span aria-hidden className="px-1 text-[#6B7341]">
                          →
                        </span>{" "}
                        {leg.to}
                      </dt>

                      <dd className="shrink-0 text-right text-[13px] leading-6 text-white/40 lining-nums tabular-nums">
                        {leg.km} km
                        <span aria-hidden className="px-2 text-white/20">
                          ·
                        </span>
                        {leg.hours}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-5 max-w-xl text-[12px] leading-6 text-white/30">
                  Road distances, and the times a driver will actually take
                  rather than the ones a mapping app promises. Most of these
                  roads are single carriageway and go through towns.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
