"use client";

import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/useReducedMotion";

import { MENU_PLACES } from "./destinations";

type Props = {
  onNavigate: () => void;
};

/*
  The Destinations panel.

  It runs the full width of the screen and sits flush under the bar, so
  there is no gap for the pointer to fall through on its way down, and
  it is the same near-black as the rest of the site — the old one was a
  cream card, which read as a different website opening on top of this
  one.

  Six photographs rather than a list of links, because a place is a
  picture before it is a word, and the whole fourteen are one line
  below for anyone who wants the map rather than the highlights.
*/
export default function DestinationsMenu({ onNavigate }: Props) {
  const still = useReducedMotion();

  return (
    <div className="border-y border-white/[0.07] bg-[#0E0E0E] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.65)]">
      <Container>
        <div className="py-10 lg:py-12">
          <div className="flex items-baseline justify-between">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
              Kerala
            </p>

            <Link
              href="/destinations"
              onClick={onNavigate}
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/45 transition-colors hover:text-white"
            >
              All fourteen districts
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-x-5 gap-y-7 lg:grid-cols-6 lg:gap-x-6">
            {MENU_PLACES.map((place, index) => (
              <Link
                key={place.href}
                href={place.href}
                onClick={onNavigate}
                className="group block"
                style={
                  still
                    ? undefined
                    : {
                        animation: `horizons-menu-in 520ms cubic-bezier(0.16,1,0.3,1) ${
                          index * 45
                        }ms both`,
                      }
                }
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#161616] lg:aspect-[4/5]">
                  <Image
                    src={place.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 200px, 30vw"
                    className="object-cover opacity-[0.88] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-hover:opacity-100"
                  />

                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                  />
                </div>

                <p className="mt-4 font-cormorant text-[21px] font-light leading-tight text-white transition-colors duration-300 group-hover:text-[#A8B473]">
                  {place.label}
                </p>

                <p className="mt-1.5 text-[12px] leading-5 text-white/40">
                  {place.note}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
