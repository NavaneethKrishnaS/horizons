"use client";

import { useEffect } from "react";
import Link from "next/link";

import Container from "@/components/ui/Container";
import { CONTACT_EMAIL, whatsappLink } from "@/lib/whatsapp";

/*
  Shown when a page throws rather than when it is missing: a boundary,
  not a route, which is why it is a client component and why it is handed
  reset().

  Two things matter here. The first is that a visitor who was halfway
  through an enquiry is not simply stopped — WhatsApp and the address are
  on this page, so the journey they were about to ask about can still be
  asked about. The second is that we hear of it: the error is logged to
  the console, which is where Vercel picks it up, so a page that breaks
  for somebody in Lyon at two in the morning is not a thing we learn
  about from a lost booking.

  No Reveal here. An observer that has to mount before anything is
  visible is the wrong bet on a page that is already the fallback.
*/

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("page error", error);
  }, [error]);

  const message =
    "Hello HORIZONS, a page on your website would not load for me. I was looking at:";

  return (
    <div className="flex min-h-[78vh] items-center overflow-x-clip py-24 md:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_0.8fr] lg:gap-24">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
              Something broke
            </p>

            <h1 className="mt-7 max-w-xl font-cormorant text-[38px] font-light leading-[1.08] text-white sm:text-5xl md:text-[58px]">
              That is ours, not yours.
            </h1>

            <p className="mt-8 max-w-lg text-[15px] leading-8 text-white/55 md:text-[17px] md:leading-9">
              This page failed to load properly. It is usually momentary, so
              trying again is worth one press &mdash; and if it happens twice,
              we would rather hear it from you than not hear it at all.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <button
                type="button"
                onClick={reset}
                className="border-b border-white/25 pb-1 text-[11px] uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:border-[#6B7341] hover:text-[#A8B473]"
              >
                Try again
              </button>

              <Link
                href="/"
                className="border-b border-transparent pb-1 text-[11px] uppercase tracking-[0.25em] text-white/45 transition-colors duration-300 hover:border-white/25 hover:text-white"
              >
                Back to the beginning
              </Link>
            </div>
          </div>

          <div className="lg:pt-20">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
              Ask us directly instead
            </p>

            <p className="mt-7 max-w-sm text-[15px] leading-8 text-white/55">
              A broken page is no reason to lose the question. Tell us where you
              were going and we will answer it ourselves.
            </p>

            <div className="mt-7 flex flex-col gap-3">
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] text-white/70 transition-colors duration-300 hover:text-white"
              >
                WhatsApp
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[15px] text-white/70 transition-colors duration-300 hover:text-white"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            {error.digest ? (
              <p className="mt-10 text-[12px] leading-6 text-white/25">
                If you mention this reference it tells us exactly which page
                failed: {error.digest}
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  );
}
