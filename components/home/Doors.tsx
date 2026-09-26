"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { houseboats } from "@/data/houseboats";
import { packages } from "@/data/packages";
import { stays } from "@/data/stays";

/*
  The three things we do — one photograph, three entries.

  Three cards was the site's own template for the fourth time. Three
  full-width bands fixed that and created a different problem: three
  screens of photograph before the page had said anything, so the top
  of the site read as a slideshow.

  This is the third answer and the compact one. The three sit as a
  list, the photograph belongs to whichever one you are on, and the
  whole section costs about the height of a single band. Moving down
  the list changes the picture, which is the one piece of motion on
  the page that is doing work rather than decorating.

  Counts are read from the data, so nothing here is a number typed by
  hand that will be wrong the next time a house is added.
*/
export default function Doors() {
  /*
    Not kerala-unhurried for the third: that photograph leads the
    journeys list a screen below, and the same picture twice on one
    page reads as a mistake.
  */
  const journey = packages.find((tour) => tour.slug === "havelis-and-palaces");
  const house = stays.find((stay) => stay.image);

  const doors = [
    {
      index: "01",
      href: "/houseboats",
      label: "Houseboats",
      title: "We own the boats",
      line: `${houseboats.length} kettuvallam on the Alleppey backwaters, one bedroom to six, moored somewhere quiet for the night.`,
      image: "/images/houseboats/1-bedroom/cover.jpeg",
      alt: "A kettuvallam houseboat on the Alleppey backwaters",
    },
    {
      index: "02",
      href: "/stays",
      label: "Stays",
      title: "Houses, not listings",
      line: `${stays.length} hotels, homestays and family houses across India, most of them known to us by whoever runs the place.`,
      image: house?.image ?? "/images/houseboats/2-bedroom/cover.jpeg",
      alt: house?.imageAlt ?? "A house on the Kerala backwaters",
    },
    {
      index: "03",
      href: "/packages",
      label: "Journeys",
      title: "Or one made for you",
      line: `${packages.length} routes we run already, from a fortnight in Kerala to three weeks down the length of the country.`,
      image: journey?.image ?? packages[0].image,
      alt: journey?.imageAlt ?? packages[0].imageAlt,
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <section className="border-y border-white/[0.06] bg-[#0E0E0E] py-20 md:py-24">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-10 lg:gap-x-14">
          {/*
            One frame, and whichever entry you are on is what is in it.
            Every photograph is rendered and only the active one is
            opaque, so moving between them is a cross-fade rather than
            a fetch — all three are on the page anyway.

            Hidden on small screens, where there is no hover and each
            entry carries its own picture instead.
          */}
          <div className="hidden md:col-span-5 md:block lg:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#161616]">
                {doors.map((door, index) => (
                  <Image
                    key={door.href}
                    src={door.image}
                    alt={door.alt}
                    fill
                    sizes="40vw"
                    className="object-cover transition-opacity duration-700 ease-out"
                    style={{ opacity: active === index ? 1 : 0 }}
                  />
                ))}

                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                />
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6 md:self-center">
            <Reveal delay={80}>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
                Three ways in
              </p>
            </Reveal>

            <ul className="mt-8 md:mt-10">
              {doors.map((door, index) => (
                <Reveal key={door.href} delay={120 + index * 70}>
                  <li className="border-t border-white/[0.09] last:border-b">
                    <Link
                      href={door.href}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      className="group block py-7 md:py-8"
                    >
                      {/* The picture, for a screen with no hover. */}
                      <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden bg-[#161616] md:hidden">
                        <Image
                          src={door.image}
                          alt={door.alt}
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex items-baseline gap-4">
                        <span
                          className="font-cormorant text-[19px] font-light leading-none transition-colors duration-500 lining-nums"
                          style={{
                            color:
                              active === index
                                ? "#A8B473"
                                : "rgba(255,255,255,0.18)",
                          }}
                        >
                          {door.index}
                        </span>

                        <h2
                          className="font-cormorant text-[27px] font-light leading-tight transition-colors duration-500 sm:text-[31px] md:text-[34px]"
                          style={{
                            color:
                              active === index
                                ? "#FFFFFF"
                                : "rgba(255,255,255,0.55)",
                          }}
                        >
                          {door.title}
                        </h2>
                      </div>

                      <div className="mt-3 flex items-end justify-between gap-6 pl-[35px]">
                        <p className="max-w-md text-[14px] leading-7 text-white/40">
                          {door.line}
                        </p>

                        <span
                          className="hidden shrink-0 text-white/30 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white sm:block"
                          aria-hidden
                        >
                          →
                        </span>
                      </div>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
