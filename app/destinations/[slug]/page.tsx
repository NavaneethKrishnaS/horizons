import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { pageMeta } from "@/lib/meta";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import EnquiryActions from "@/components/ui/EnquiryActions";
import { KERALA, district, neighbours } from "@/data/destinations";
import { stays } from "@/data/stays";
import { packages } from "@/data/packages";

/*
  A district, at length.

  Set deliberately unlike a stay or a journey page: those are wide,
  two-column and built around a booking. This is a chapter opening — a
  photograph you fall into, the name over it, and then one narrow column
  of prose down the middle the way a magazine would set it, with the
  practicalities in a band under the picture.

  Where to sleep comes last and quietly. The page is about the place;
  the hotels are a footnote to it.
*/

export function generateStaticParams() {
  return KERALA.map((place) => ({ slug: place.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const place = district(slug);

  if (!place) return { title: "Not found | HORIZONS by Scenic Escapes" };

  return pageMeta({
    title: `${place.district}, Kerala — ${place.name} | HORIZONS by Scenic Escapes`,
    description: `${place.standfirst} When to come, how long to give it, how to get there, and what we would arrange.`,
    path: `/destinations/${place.id}`,
  });
}

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = district(slug);

  if (!place) notFound();

  const houses = place.stays
    .map((entry) => stays.find((stay) => stay.slug === entry))
    .filter((stay) => stay !== undefined);

  const journeys = packages.filter((tour) =>
    tour.route.some((stop) => place.routeStops.includes(stop))
  );

  const { previous, next } = neighbours(place.id);

  return (
    <main className="overflow-x-clip">
      <section className="relative flex h-[78vh] min-h-[520px] items-end overflow-hidden">
        {place.image ? (
          <>
            <Image
              src={place.image.src}
              alt={place.image.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/55 to-[#111111]/25"
            />
          </>
        ) : (
          <div aria-hidden className="absolute inset-0 bg-[#141414]" />
        )}

        <Container className="relative pb-16 md:pb-20">
          <p className="text-[11px] uppercase tracking-[0.45em] text-[#A8B473]">
            {place.district} · Kerala
          </p>

          <h1 className="mt-6 max-w-3xl font-cormorant text-[40px] font-light leading-[1.04] text-white sm:text-6xl md:text-[76px]">
            {place.name}
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-8 text-white/70 md:text-[17px]">
            {place.standfirst}
          </p>
        </Container>
      </section>

      <section className="border-y border-white/10">
        <Container>
          <div className="grid gap-8 py-10 sm:grid-cols-3 md:gap-16 md:py-12">
            {[
              { term: "When to come", value: place.season },
              { term: "How long", value: place.nights },
              { term: "Getting there", value: place.arrive },
            ].map((row) => (
              <div key={row.term}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  {row.term}
                </p>

                <p className="mt-3 text-[14px] leading-7 text-white/65 lining-nums">
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl">
            {place.body.map((paragraph, line) => (
              <Reveal key={`${place.id}-p${line}`} delay={Math.min(line, 3) * 70}>
                <p
                  className={`text-[16px] leading-9 text-white/70 md:text-[17px] md:leading-[1.95] ${
                    line === 0
                      ? "first-letter:float-left first-letter:mr-3 first-letter:font-cormorant first-letter:text-[64px] first-letter:leading-[0.8] first-letter:text-[#A8B473]"
                      : "mt-8"
                  }`}
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {place.boats ? (
        <section className="border-t border-white/10 py-16 md:py-20">
          <Container>
            <Reveal>
              <Link
                href="/houseboats"
                className="group mx-auto flex max-w-2xl items-baseline justify-between gap-6 border-y border-[#6B7341]/35 py-6 transition-colors duration-500 hover:border-[#6B7341]"
              >
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.3em] text-[#8B9556]">
                    Our own boats
                  </span>

                  <span className="mt-2 block font-cormorant text-[24px] font-light text-white transition-colors duration-300 group-hover:text-[#A8B473] md:text-[28px]">
                    One, two and three bedroom kettuvallam
                  </span>
                </span>

                <span
                  aria-hidden
                  className="shrink-0 text-white/50 transition-transform duration-500 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-white/10 py-20 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            {houses.length > 0 ? (
              <Reveal>
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
                  Where we would put you
                </p>

                <ul className="mt-6 border-t border-white/10">
                  {houses.map((stay) => (
                    <li key={stay.slug} className="border-b border-white/10">
                      <Link
                        href={`/stays/${stay.slug}`}
                        className="group flex items-baseline justify-between gap-6 py-4"
                      >
                        <span className="text-[15px] leading-7 text-white/70 transition-colors duration-300 group-hover:text-[#A8B473]">
                          {stay.name}
                        </span>

                        <span className="shrink-0 text-[12px] leading-7 text-white/30">
                          {stay.place}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            <Reveal delay={90}>
              <Link
                href={`/stays?region=${place.collection}`}
                className="group mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/50 transition-colors duration-300 hover:text-[#A8B473]"
              >
                {houses.length > 0
                  ? "Every house in this group"
                  : "Houses in this part of Kerala"}
                <span
                  aria-hidden
                  className="transition-transform duration-500 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </Link>
            </Reveal>

            {journeys.length > 0 ? (
              <Reveal delay={140}>
                <div className="mt-14">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
                    Journeys that go there
                  </p>

                  <ul className="mt-6 border-t border-white/10">
                    {journeys.map((tour) => (
                      <li key={tour.slug} className="border-b border-white/10">
                        <Link
                          href={`/packages/${tour.slug}`}
                          className="group flex items-baseline justify-between gap-6 py-4"
                        >
                          <span className="text-[15px] leading-7 text-white/70 transition-colors duration-300 group-hover:text-[#A8B473]">
                            {tour.title}
                          </span>

                          <span className="shrink-0 text-[12px] leading-7 text-white/30 lining-nums">
                            {tour.duration}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 py-14 md:py-16">
        <Container>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            {previous ? (
              <Link href={`/destinations/${previous.id}`} className="group max-w-xs">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                  ← South
                </p>

                <p className="mt-3 font-cormorant text-[24px] font-light text-white transition-colors duration-300 group-hover:text-[#A8B473]">
                  {previous.district}
                </p>
              </Link>
            ) : null}

            <Link
              href="/destinations"
              className="text-[11px] uppercase tracking-[0.3em] text-white/40 transition-colors duration-300 hover:text-[#A8B473]"
            >
              All fourteen
            </Link>

            {next ? (
              <Link
                href={`/destinations/${next.id}`}
                className="group max-w-xs sm:text-right"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                  North →
                </p>

                <p className="mt-3 font-cormorant text-[24px] font-light text-white transition-colors duration-300 group-hover:text-[#A8B473]">
                  {next.district}
                </p>
              </Link>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 py-20 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <h2 className="font-cormorant text-[30px] font-light leading-[1.1] text-white md:text-[40px]">
                Worth your time, or not?
              </h2>

              <p className="mt-6 text-[15px] leading-8 text-white/55 md:text-[17px] md:leading-9">
                Tell us how many days you have and who is coming, and we will
                tell you whether {place.district} belongs in them — and what to
                leave out to make room for it.
              </p>

              <EnquiryActions
                message={`Hello HORIZONS, I am thinking about ${place.district} in Kerala and would be glad of your advice.`}
                subject={`${place.district}, Kerala`}
                className="mt-10"
              />
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
