import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/*
  The page somebody lands on when a link has gone stale — an old
  itinerary forwarded on, a boat page renamed, a typed address.

  It is written as a wrong turning rather than as an error, because that
  is what it is for the person reading it, and because a site about
  travelling somewhere can afford to be gracious about it. What it must
  do is get them somewhere real in one tap, so the ways on are the
  sections people actually arrive looking for.

  No metadata is exported here: Next.js serves this under whatever URL
  was asked for, and the root title is the honest one.
*/

const WAYS_ON = [
  { label: "Houseboats", href: "/houseboats" },
  { label: "Destinations", href: "/destinations" },
  { label: "Stays", href: "/stays" },
  { label: "Packages", href: "/packages" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[78vh] items-center overflow-x-clip py-24 md:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_0.8fr] lg:gap-24">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
              404
            </p>

            <h1 className="mt-7 max-w-xl font-cormorant text-[38px] font-light leading-[1.08] text-white sm:text-5xl md:text-[58px]">
              This page is not where it was.
            </h1>

            <p className="mt-8 max-w-lg text-[15px] leading-8 text-white/55 md:text-[17px] md:leading-9">
              Either it has been moved, or the address has a letter out of
              place. Neither is your fault, and neither is worth a second spent
              on it &mdash; everything the site holds is a tap away below.
            </p>

            <Link
              href="/"
              className="mt-10 inline-block border-b border-white/25 pb-1 text-[11px] uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:border-[#6B7341] hover:text-[#A8B473]"
            >
              Back to the beginning
            </Link>
          </Reveal>

          <Reveal delay={140} className="lg:pt-20">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
              Or go straight to
            </p>

            <ul className="mt-7 grid grid-cols-2 gap-x-8 gap-y-4">
              {WAYS_ON.map((way) => (
                <li key={way.href}>
                  <Link
                    href={way.href}
                    className="text-[15px] text-white/70 transition-colors duration-300 hover:text-white md:text-[16px]"
                  >
                    {way.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-10 max-w-sm text-[13px] leading-7 text-white/35">
              If you were following a link from an email of ours, write back to
              it and we will send you the right one.
            </p>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
