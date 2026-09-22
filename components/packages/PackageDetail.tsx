import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { CONTACT_EMAIL, emailLink, whatsappLink } from "@/lib/whatsapp";
import { collections, type TourPackage } from "@/data/packages";

export default function PackageDetail({ tour }: { tour: TourPackage }) {
  const group = collections.find((c) => c.id === tour.collection);

  const subject = `Enquiry — ${tour.title}`;
  const message = `Hello HORIZONS, I am interested in "${tour.title}" (${tour.duration}, ${tour.region}). Could you send me the details?`;

  return (
    <main className="overflow-x-hidden">
      <style>{`
        @keyframes horizons-hero-rise {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes horizons-hero-settle {
          from { transform: scale(1.06); }
          to   { transform: scale(1); }
        }
        .horizons-hero-rise {
          animation: horizons-hero-rise 1100ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        /* The shot settles rather than sits, which reads as arrival. */
        .horizons-hero-settle {
          animation: horizons-hero-settle 2400ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-hero-rise,
          .horizons-hero-settle { animation: none; }
        }
      `}</style>
      {/* The shot, and the name of the thing. */}
      <section className="relative flex min-h-[78vh] items-end overflow-hidden md:min-h-[86vh]">
        <Image
          src={tour.image}
          alt={tour.imageAlt}
          fill
          priority
          sizes="100vw"
          className="horizons-hero-settle object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/40" />

        <Container className="relative z-10 pb-16 md:pb-24">
          <p
            className="horizons-hero-rise text-[10px] uppercase tracking-[0.35em] text-white/60"
            style={{ animationDelay: "120ms" }}
          >
            {tour.region} <span className="text-white/30">·</span>{" "}
            {tour.duration}
          </p>

          <h1
            className="horizons-hero-rise mt-6 max-w-4xl font-cormorant text-[40px] font-light leading-[1.04] text-white sm:text-6xl md:text-[80px]"
            style={{ animationDelay: "260ms" }}
          >
            {tour.title}
          </h1>

          <p
            className="horizons-hero-rise mt-6 max-w-2xl text-[16px] leading-8 text-white/70 md:text-[19px]"
            style={{ animationDelay: "420ms" }}
          >
            {tour.standfirst}
          </p>
        </Container>
      </section>

      {/* What it is, and where it goes. */}
      <section className="border-b border-white/10 py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:gap-20">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
                The journey
              </p>

              <p className="mt-7 text-[16px] leading-9 text-white/70 md:text-[18px] md:leading-10">
                {tour.summary}
              </p>
            </Reveal>

            <Reveal delay={140} className="lg:pt-10">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
                Route
              </p>

              <ol className="mt-6 space-y-2.5">
                {tour.route.map((place) => (
                  <li
                    key={place}
                    className="flex items-baseline gap-4 text-[15px] text-white/65"
                  >
                    <span
                      aria-hidden
                      className="h-px w-5 shrink-0 translate-y-[-4px] bg-white/20"
                    />
                    {place}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* The things worth going for. */}
      <section className="border-b border-white/10 py-16 md:py-24">
        <Container>
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
            What stays with you
          </p>

          <ul className="mt-10 grid gap-x-14 gap-y-7 md:grid-cols-2">
            {tour.highlights.map((line, index) => (
              <li key={line} className="flex gap-6">
                <Reveal delay={(index % 2) * 120} distance={18} className="flex gap-6">
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

      {/*
        Only some of these have a day-by-day worked out. The ones that do
        not are no less real — they are simply built around the people
        travelling, which is the point of not printing dates.
      */}
      {tour.itinerary ? (
        <section className="border-b border-white/10 py-16 md:py-24">
          <Container className="max-w-4xl">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
              Day by day
            </p>

            <p className="mt-5 max-w-xl text-[14px] leading-7 text-white/40">
              A shape rather than a timetable. Days move, and most people
              move one or two of them.
            </p>

            <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
              {tour.itinerary.map((entry, index) => (
                <Reveal
                  key={entry.day}
                  delay={Math.min(index, 4) * 80}
                  distance={16}
                  className="grid gap-3 py-6 sm:grid-cols-[80px_1fr] sm:gap-8"
                >
                  <p className="font-cormorant text-[20px] leading-none text-[#8B9556]">
                    {entry.day}
                  </p>

                  <p className="text-[15px] leading-8 text-white/65">
                    {entry.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Ask. */}
      <section className="py-20 md:py-32">
        <Container className="max-w-3xl text-center">
          <h2 className="font-cormorant text-[30px] font-light leading-[1.1] text-white sm:text-5xl md:text-[52px]">
            Shall we plan it?
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-[15px] leading-8 text-white/55 md:text-[17px] md:leading-9">
            Tell us roughly when, and how many of you, and we will come back
            with dates, a price and anything we would change about the route.
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

          {/*
            Not every guest has WhatsApp — it is close to universal for
            our Indian and European travellers and close to absent for
            some of the American and British ones. An address, in plain
            sight, rather than a second button competing with the first.
          */}
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
              href="/packages"
              className="text-[11px] uppercase tracking-[0.25em] text-white/40 transition-colors hover:text-white"
            >
              ← All journeys
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
