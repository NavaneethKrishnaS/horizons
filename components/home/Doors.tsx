import Image from "next/image";
import Link from "next/link";

import Reveal from "@/components/ui/Reveal";
import { houseboats } from "@/data/houseboats";
import { packages } from "@/data/packages";
import { stays } from "@/data/stays";

/*
  Three doors, edge to edge.

  The whole site is behind three of these, so they are given the width
  of the screen rather than a column of a grid. Counts and photographs
  are read from the data — nothing here is a number typed by hand that
  will be wrong the next time a house is added.
*/
export default function Doors() {
  const kerala = packages.find((tour) => tour.slug === "kerala-unhurried");
  const house = stays.find((stay) => stay.image);

  const doors = [
    {
      href: "/houseboats",
      label: "Houseboats",
      title: "The boats are ours",
      line: `${houseboats.length} kettuvallam on the Alleppey backwaters, one to six bedrooms, crewed and cooked for.`,
      image: "/images/houseboats/1-bedroom/cover.jpeg",
      alt: "A kettuvallam houseboat on the Alleppey backwaters",
    },
    {
      href: "/stays",
      label: "Stays",
      title: "Houses we have slept in",
      line: `${stays.length} hotels, homestays and family houses across India, none of them chosen from a brochure.`,
      image: house?.image ?? "/images/houseboats/2-bedroom/cover.jpeg",
      alt: house?.imageAlt ?? "A house on the Kerala backwaters",
    },
    {
      href: "/packages",
      label: "Journeys",
      title: "Or one made for you",
      line: `${packages.length} routes we run already, and a starting point rather than a menu.`,
      image: kerala?.image ?? packages[0].image,
      alt: kerala?.imageAlt ?? packages[0].imageAlt,
    },
  ];

  return (
    <section className="bg-[#111111]">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {doors.map((door, index) => (
          <Reveal key={door.href} delay={index * 90} className="h-full">
            <Link
              href={door.href}
              className="group relative flex h-[62vh] min-h-[420px] w-full items-end overflow-hidden md:h-[78vh]"
            >
              <Image
                src={door.image}
                alt={door.alt}
                fill
                sizes="(min-width: 768px) 34vw, 100vw"
                className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />

              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10"
              />

              {/*
                A hairline between the panels rather than a gap, so the
                three read as one band across the screen.
              */}
              <div
                aria-hidden
                className="absolute inset-y-0 right-0 hidden w-px bg-white/10 md:block"
              />

              <div className="relative z-10 w-full px-7 pb-10 md:px-9 md:pb-12">
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#A8B473]">
                  {door.label}
                </p>

                <h3 className="mt-4 font-cormorant text-[30px] font-light leading-tight text-white md:text-[36px]">
                  {door.title}
                </h3>

                <p className="mt-4 max-w-sm text-[14px] leading-7 text-white/60">
                  {door.line}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/70 transition-colors duration-300 group-hover:text-white">
                  Open
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
