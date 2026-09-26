import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/contact";
import { journalFounder } from "@/data/journal";

/*
  The last thing on the page: who answers, and how to reach him.

  The words are the founder's own, already written for the Journal —
  quoted rather than rewritten, because a second version of a man's
  own sentence in a slightly different shape is how a site starts to
  sound like nobody.
*/
export default function HomeClosing() {
  return (
    <section className="border-t border-white/[0.06] bg-[#111111] py-24 md:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-4">
            <div className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden bg-[#161616]">
              <Image
                src={journalFounder.image.src}
                alt={journalFounder.image.alt}
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={80}>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
                {journalFounder.role}
              </p>

              <h2 className="mt-8 max-w-xl font-cormorant text-[30px] font-light leading-[1.12] text-white sm:text-[40px] md:text-[46px]">
                {journalFounder.heading}
              </h2>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-8 max-w-xl text-[16px] leading-9 text-white/55 md:text-[17px] md:leading-[2]">
                {journalFounder.paragraphs[2]}
              </p>

              <p className="mt-10 max-w-xl font-cormorant text-[24px] font-light italic leading-[1.5] text-white/80 md:text-[28px]">
                &ldquo;{journalFounder.quote}&rdquo;
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-white/[0.08] pt-8">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white transition-colors"
                >
                  Write to us
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <a
                  href={PHONE_HREF}
                  className="text-[11px] uppercase tracking-[0.25em] text-white/45 transition-colors hover:text-white lining-nums"
                >
                  {PHONE_DISPLAY}
                </a>

                <Link
                  href="/about"
                  className="text-[11px] uppercase tracking-[0.25em] text-white/45 transition-colors hover:text-white"
                >
                  Where we come from
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
