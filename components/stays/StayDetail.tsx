import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { CONTACT_EMAIL, emailLink, whatsappLink } from "@/lib/whatsapp";
import { collections, type Stay } from "@/data/stays";

export default function StayDetail({ stay }: { stay: Stay }) {
  const group = collections.find((c) => c.id === stay.collection);

  const subject = `Enquiry — ${stay.name}`;
  const message = `Hello HORIZONS, I am interested in staying at ${stay.name} (${stay.place}). Could you send me the details?`;

  return (
    <main className="overflow-x-hidden">
      <style>{`
        @keyframes horizons-stay-rise {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes horizons-stay-settle {
          from { transform: scale(1.06); }
          to   { transform: scale(1); }
        }
        .horizons-stay-rise {
          animation: horizons-stay-rise 1100ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .horizons-stay-settle {
          animation: horizons-stay-settle 2400ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        /* The same quiet plan grid the index uses, for a stay with no photograph yet. */
        .horizons-stay-plan {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.028) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.028) 1px, transparent 1px);
          background-size: 84px 84px;
          mask-image: radial-gradient(120% 100% at 72% 34%, #000 0%, transparent 74%);
          -webkit-mask-image: radial-gradient(120% 100% at 72% 34%, #000 0%, transparent 74%);
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-stay-rise,
          .horizons-stay-settle { animation: none; }
        }
      `}</style>

      <section
        className={`relative flex items-end overflow-hidden ${
          stay.image
            ? "min-h-[78vh] md:min-h-[86vh]"
            : "min-h-[62vh] border-b border-white/10 md:min-h-[70vh]"
        }`}
      >
        {stay.image ? (
          <>
            <Image
              src={stay.image}
              alt={stay.imageAlt ?? stay.name}
              fill
              priority
              sizes="100vw"
              className="horizons-stay-settle object-cover"
            />

            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/40" />
          </>
        ) : (
          <div aria-hidden className="horizons-stay-plan" />
        )}

        <Container className="relative z-10 pb-16 pt-40 md:pb-24">
          <p
            className="horizons-stay-rise text-[10px] uppercase tracking-[0.35em] text-white/60"
            style={{ animationDelay: "120ms" }}
          >
            {stay.place} <span className="text-white/30">·</span> {stay.kind}
          </p>

          <h1
            className="horizons-stay-rise mt-6 max-w-4xl font-cormorant text-[40px] font-light leading-[1.04] text-white sm:text-6xl md:text-[80px]"
            style={{ animationDelay: "260ms" }}
          >
            {stay.name}
          </h1>

          <p
            className="horizons-stay-rise mt-6 max-w-2xl text-[16px] leading-8 text-white/70 md:text-[19px]"
            style={{ animationDelay: "420ms" }}
          >
            {stay.standfirst}
          </p>

          <p
            className="horizons-stay-rise mt-8 text-[11px] uppercase tracking-[0.25em] text-[#8B9556]"
            style={{ animationDelay: "560ms" }}
          >
            {stay.rooms}
          </p>
        </Container>
      </section>

      {/* What it is. */}
      <section className="border-b border-white/10 py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:gap-20">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
                The place
              </p>

              <p className="mt-7 text-[16px] leading-9 text-white/70 md:text-[18px] md:leading-10">
                {stay.summary}
              </p>
            </Reveal>

            <Reveal delay={140} className="lg:pt-10">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
                Getting there
              </p>

              <p className="mt-6 text-[15px] leading-8 text-white/65">
                {stay.getting}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What is actually there. */}
      <section className="border-b border-white/10 py-16 md:py-24">
        <Container>
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
            What is there
          </p>

          <ul className="mt-10 grid gap-x-14 gap-y-7 md:grid-cols-2">
            {stay.features.map((line, index) => (
              <li key={line} className="flex gap-6">
                <Reveal
                  delay={(index % 2) * 120}
                  distance={18}
                  className="flex gap-6"
                >
                  <span className="mt-1 font-cormorant text-[18px] text-[#8B9556]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-[15px] leading-8 text-white/65">
                    {line}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Ask. */}
      <section className="py-20 md:py-32">
        <Container className="max-w-3xl text-center">
          <h2 className="font-cormorant text-[30px] font-light leading-[1.1] text-white sm:text-5xl md:text-[52px]">
            Shall we hold you a room?
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-[15px] leading-8 text-white/55 md:text-[17px] md:leading-9">
            Tell us roughly when and how many of you, and we will come back
            with what is free, what it costs, and whether we would put you
            here or somewhere else.
          </p>

          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-11 inline-flex items-center gap-4 border border-white/25 px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-white transition-colors duration-500 hover:border-[#6B7341] hover:bg-[#6B7341]"
          >
            Enquire on WhatsApp
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-x-1.5"
            >
              →
            </span>
          </a>

          <p className="mt-6 text-[13px] text-white/40">
            No WhatsApp? Write to{" "}
            <a
              href={emailLink(subject, message)}
              className="text-white/60 transition-colors hover:text-[#A8B473]"
            >
              {CONTACT_EMAIL}
            </a>
          </p>

          <div className="mt-16 border-t border-white/10 pt-8">
            <Link
              href="/stays"
              className="text-[11px] uppercase tracking-[0.25em] text-white/40 transition-colors hover:text-white"
            >
              ← All stays
            </Link>

            {group ? (
              <p className="mt-4 text-[12px] text-white/25">{group.label}</p>
            ) : null}
          </div>
        </Container>
      </section>
    </main>
  );
}
