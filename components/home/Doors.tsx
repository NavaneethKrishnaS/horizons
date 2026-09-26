import Image from "next/image";
import Link from "next/link";

import Reveal from "@/components/ui/Reveal";
import { houseboats } from "@/data/houseboats";
import { packages } from "@/data/packages";
import { stays } from "@/data/stays";

/*
  The three things we do, as three bands rather than three cards.

  Cards were wrong here. The site already speaks in cards — the
  destinations index, the stays, the journeys catalogue — and putting
  two more grids of three on the home page made it the fourth page in
  a row that looked the same. A band is a different sentence: the
  photograph runs off the edge of the screen, the type has a whole
  half to itself, and the eye goes left, right, left down the page
  instead of scanning a row.

  Counts are read from the data, so nothing here is a number typed by
  hand that will be wrong the next time a house is added.
*/
export default function Doors() {
  const kerala = packages.find((tour) => tour.slug === "kerala-unhurried");
  const house = stays.find((stay) => stay.image);

  const doors = [
    {
      index: "01",
      href: "/houseboats",
      label: "Houseboats",
      title: "The boats are ours",
      body: `${houseboats.length} kettuvallam on the Alleppey backwaters, one bedroom to six. Crewed, cooked for, and moored somewhere quiet for the night rather than in a line with forty others.`,
      cta: "See the boats",
      image: "/images/houseboats/1-bedroom/cover.jpeg",
      alt: "A kettuvallam houseboat on the Alleppey backwaters",
    },
    {
      index: "02",
      href: "/stays",
      label: "Stays",
      title: "Houses we have slept in",
      body: `${stays.length} hotels, homestays and family houses across India. None of them chosen from a brochure, and most of them known to us by the name of whoever runs the place.`,
      cta: "See the houses",
      image: house?.image ?? "/images/houseboats/2-bedroom/cover.jpeg",
      alt: house?.imageAlt ?? "A house on the Kerala backwaters",
    },
    {
      index: "03",
      href: "/packages",
      label: "Journeys",
      title: "Or one made for you",
      body: `${packages.length} routes we run already, from a fortnight in Kerala to three weeks from Delhi to the bottom of the country — and every one of them a starting point rather than a menu.`,
      cta: "See the journeys",
      image: kerala?.image ?? packages[0].image,
      alt: kerala?.imageAlt ?? packages[0].imageAlt,
    },
  ];

  return (
    <section className="bg-[#111111]">
      {doors.map((door, position) => (
        <div
          key={door.href}
          className={`grid items-center border-t border-white/[0.06] md:grid-cols-2 ${
            /* Second band mirrored, so the page reads left, right, left. */
            position % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          <Reveal className="h-full">
            <Link
              href={door.href}
              aria-hidden
              tabIndex={-1}
              className="group relative block aspect-[4/3] w-full overflow-hidden md:h-[560px] md:aspect-auto lg:h-[640px]"
            >
              <Image
                src={door.image}
                alt={door.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />

              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
              />
            </Link>
          </Reveal>

          <div className="px-6 py-14 sm:px-10 md:px-14 md:py-16 lg:px-20 xl:px-28">
            <Reveal delay={90}>
              <div className="flex items-baseline gap-5">
                <span className="font-cormorant text-[34px] font-light leading-none text-white/15 lining-nums md:text-[42px]">
                  {door.index}
                </span>

                <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
                  {door.label}
                </p>
              </div>

              <h2 className="mt-7 max-w-md font-cormorant text-[34px] font-light leading-[1.08] text-white sm:text-[44px] md:text-[50px] lg:text-[56px]">
                {door.title}
              </h2>

              <p className="mt-7 max-w-md text-[15px] leading-8 text-white/50 md:text-[17px] md:leading-9">
                {door.body}
              </p>

              <Link
                href={door.href}
                className="group mt-9 inline-flex items-center gap-2 border-b border-white/20 pb-2 text-[11px] uppercase tracking-[0.25em] text-white/80 transition-colors hover:border-white/60 hover:text-white"
              >
                {door.cta}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      ))}
    </section>
  );
}
