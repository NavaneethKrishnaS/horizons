import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/contact";
import { journalClosing } from "@/data/journal";

/*
  The last thing on the page: an invitation and three ways to take it
  up. The words are the closing already written for the Journal rather
  than a second version of the same sentiment in a slightly different
  shape, which is how a site starts to sound like nobody.
*/
export default function HomeClosing() {
  return (
    <section className="border-t border-white/[0.06] bg-[#111111] py-24 md:py-36">
      <Container>
        <Reveal>
          <h2 className="max-w-3xl font-cormorant text-[32px] font-light leading-[1.1] text-white sm:text-[44px] md:text-[54px]">
            {journalClosing.heading}
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-8 max-w-xl text-[16px] leading-9 text-white/55 md:text-[18px] md:leading-[2]">
            {journalClosing.body}
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-white/[0.08] pt-8">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white"
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
      </Container>
    </section>
  );
}
