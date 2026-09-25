import type { Metadata } from "next";

import { pageMeta } from "@/lib/meta";

import GettingHereHero from "@/components/getting-here/GettingHereHero";
import Arrival from "@/components/getting-here/Arrival";
import Chapters from "@/components/getting-here/Chapters";
import FaqCTA from "@/components/faq/FaqCTA";
import { airports, legs } from "@/data/gettingHere";

const SITE = "https://horizonsindia.com";

export const metadata: Metadata = pageMeta({
  title:
    "How to get to Kerala | HORIZONS by Scenic Escapes",
  description:
    "Which of Kerala's four international airports to fly into, how far each one really is from the backwaters, when the train beats the road, and what to do about the visa — written by people who make the journey every week.",
  path: "/how-to-get-to-kerala",
});

export default function HowToGetToKeralaPage() {
  /*
    Told to search engines as an article about a place, with the airports
    named as things the place contains. Generated from the same data the
    page renders, so the two cannot disagree.
  */
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "How to get to Kerala",
        description: metadata.description,
        inLanguage: "en-GB",
        about: {
          "@type": "Place",
          name: "Kerala",
          address: {
            "@type": "PostalAddress",
            addressRegion: "Kerala",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 10.1632,
            longitude: 76.6413,
          },
          containsPlace: airports.map((airport) => ({
            "@type": "Airport",
            name: airport.name,
            iataCode: airport.code,
            address: {
              "@type": "PostalAddress",
              addressLocality: airport.city,
              addressRegion: "Kerala",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: airport.lat,
              longitude: airport.lon,
            },
          })),
        },
        publisher: {
          "@type": "Organization",
          name: "HORIZONS by Scenic Escapes",
          url: SITE,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Questions", item: `${SITE}/faq` },
          {
            "@type": "ListItem",
            position: 3,
            name: "How to get to Kerala",
            item: `${SITE}/how-to-get-to-kerala`,
          },
        ],
      },
    ],
  };

  return (
    <main className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
        }}
      />

      <GettingHereHero />
      <Arrival />
      <Chapters />

      {/*
        A table nobody has to open, for the person who came for one
        number and is about to leave with it.
      */}
      <section className="border-t border-white/10 py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            Every leg, in one place
          </p>

          <dl className="mt-8 grid gap-x-12 sm:grid-cols-2">
            {legs.map((leg) => (
              <div
                key={`${leg.from}-${leg.to}-all`}
                className="flex items-baseline justify-between gap-6 border-b border-white/[0.07] py-3.5"
              >
                <dt className="text-[14px] leading-6 text-white/60">
                  {leg.from}
                  <span aria-hidden className="px-2 text-[#6B7341]">
                    →
                  </span>
                  {leg.to}
                </dt>

                <dd className="shrink-0 text-right text-[13px] leading-6 text-white/40 lining-nums tabular-nums">
                  {leg.km} km
                  <span aria-hidden className="px-2 text-white/20">
                    ·
                  </span>
                  {leg.hours}
                  <span aria-hidden className="px-2 text-white/20">
                    ·
                  </span>
                  {leg.by}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <FaqCTA />
    </main>
  );
}
