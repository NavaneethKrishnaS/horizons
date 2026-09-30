"use client";

import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import { useReducedMotion } from "@/lib/useReducedMotion";

import { experiences } from "@/data/experiences";

type Props = {
  onNavigate: () => void;
};

/*
  The Experiences panel.

  Built exactly as the Destinations one is — same charcoal, same flush
  edge under the bar, same photograph-first idea — because two panels
  hanging off the same bar that behaved differently would read as two
  different websites. The only difference is four columns rather than
  six, which is what four things want.

  It reads data/experiences.ts rather than keeping its own list, so the
  menu cannot fall out of step with the page it leads to.
*/
export default function ExperiencesMenu({ onNavigate }: Props) {
  const still = useReducedMotion();

  return (
    <div className="border-y border-white/[0.07] bg-[#0E0E0E] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.65)]">
      <Container>
        <div className="py-10 lg:py-12">
          <div className="flex items-baseline justify-between">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
              On the water
            </p>

            <Link
              href="/experiences"
              onClick={onNavigate}
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/45 transition-colors hover:text-white"
            >
              All of them
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-7 lg:grid-cols-4 lg:gap-x-6">
            {experiences.map((item, index) => (
              <Link
                key={item.id}
                href={`/experiences#${item.id}`}
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
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#161616]">
                  <Image
                    src={item.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 280px, 45vw"
                    className="object-cover opacity-[0.88] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-hover:opacity-100"
                  />

                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                  />
                </div>

                <p className="mt-4 font-cormorant text-[21px] font-light leading-tight text-white transition-colors duration-300 group-hover:text-[#A8B473]">
                  {item.title}
                </p>

                <p className="mt-1.5 text-[12px] leading-5 text-white/40">
                  {item.facts[0]?.value}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
