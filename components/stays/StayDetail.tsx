import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import StayGallery from "./StayGallery";
import EnquiryActions, { EnquiryAddress } from "@/components/ui/EnquiryActions";
import { collections, stays, type Stay } from "@/data/stays";

/*
  A dossier, not an itinerary.

  A journey page is narrative: it has a shape over time, so it reads top
  to bottom and the enquiry waits politely at the end. A hotel page is
  the opposite — one place, described, and a decision the reader is
  making the entire time they read it. So this page is built as a
  masthead over two columns with the enquiry rail pinned beside the
  writing, which is the shape the houseboat pages already use, because
  a stay is a thing you book rather than a route you follow.

  Nothing here is full-bleed and nothing is centred. That is deliberate:
  those are the two moves the journeys pages are built on.
*/
export default function StayDetail({ stay }: { stay: Stay }) {
  const group = collections.find((c) => c.id === stay.collection);

  const facts: [string, string][] = [
    ["Kind", stay.kind],
    ["Rooms", stay.rooms],
    ["Where", stay.place],
  ];

  if (group && group.label !== stay.place) facts.push(["Region", group.short]);

  const inRegion = group ? group.short : "";

  const nearby = stays
    .filter((o) => o.collection === stay.collection && o.slug !== stay.slug)
    .slice(0, 3);

  const plates = stay.images ?? [];

  const subject = `Travel enquiry — ${stay.name}`;
  const message = `Hello HORIZONS, I am interested in staying at ${stay.name} (${stay.place}). Could you send me the details?`;

  return (
    <main className="overflow-x-clip">
      <style>{`
        @keyframes horizons-stay-in {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .horizons-stay-in {
          animation: horizons-stay-in 1000ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes horizons-stay-rule { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .horizons-stay-rule {
          transform-origin: left center;
          animation: horizons-stay-rule 1800ms cubic-bezier(0.16, 1, 0.3, 1) 500ms both;
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-stay-in { animation: none; }
          .horizons-stay-rule { animation: none; transform: none; }
        }
      `}</style>

      {/*
        The masthead. Name on the left, the facts ranged right against
        it, and a rule under both — the top of a dossier rather than a
        photograph with writing laid over it.
      */}
      <header className="pt-40">
        <Container>
          <nav aria-label="Breadcrumb" className="horizons-stay-in">
            <Link
              href="/stays"
              className="text-[10px] uppercase tracking-[0.3em] text-white/35 transition-colors hover:text-white"
            >
              Stays
            </Link>
            <span aria-hidden className="px-3 text-white/20">
              /
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B9556]">
              {group?.label}
            </span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
            <h1
              className="horizons-stay-in max-w-3xl font-cormorant text-[42px] font-light leading-[1.02] text-white sm:text-6xl md:text-[76px]"
              style={{ animationDelay: "120ms" }}
            >
              {stay.name}
            </h1>

            <p
              className="horizons-stay-in text-[11px] uppercase tracking-[0.28em] text-white/45 lg:pb-3 lg:text-right"
              style={{ animationDelay: "260ms" }}
            >
              {stay.place}
            </p>
          </div>

          <span
            aria-hidden
            className="horizons-stay-rule mt-10 block h-px w-full bg-gradient-to-r from-[#6B7341] via-[#6B7341]/40 to-transparent"
          />

          <p
            className="horizons-stay-in mt-10 max-w-2xl text-[17px] leading-9 text-white/70 md:text-[20px] md:leading-10"
            style={{ animationDelay: "400ms" }}
          >
            {stay.standfirst}
          </p>
        </Container>
      </header>

      {/*
        The photographs, below the name rather than behind it, the way a
        review runs its pictures.

        The slot is always here. With several photographs it is the
        gallery; with one it is a single plate; with none it says so —
        because a hotel page with no visible pictures and no explanation
        reads as broken, while one that tells you the property's own are
        on the way reads as a house style. It is also the thing that
        reminds us which properties still owe us a media kit.
      */}
      <div className="mt-14 md:mt-20">
        <Container>
          {plates.length > 0 ? (
            <StayGallery plates={plates} name={stay.name} />
          ) : stay.image ? (
            <div className="relative aspect-[16/9] overflow-hidden bg-white/5">
              <Image
                src={stay.image}
                alt={stay.imageAlt ?? stay.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="border-t border-white/10 pt-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/30">
                  Photographs
                </p>

                <p className="max-w-lg text-[13px] leading-7 text-white/35">
                  {stay.name}&rsquo;s own, when they reach us. We do not put
                  stock photography under the name of a place you might
                  sleep in.
                </p>
              </div>
            </div>
          )}
        </Container>
      </div>

      {/* ——— The dossier ——— */}
      <Container>
        <div className="mt-16 grid gap-14 pb-8 lg:grid-cols-[1fr_340px] lg:gap-20 xl:grid-cols-[1fr_380px]">
          {/* Left: the writing. */}
          <div>
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
                The place
              </p>

              <p className="mt-7 text-[16px] leading-9 text-white/70 md:text-[18px] md:leading-10">
                {stay.summary}
              </p>
            </Reveal>

            <div className="mt-16 md:mt-20">
              <Reveal>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
                  What is there
                </p>
              </Reveal>

              <ul className="mt-8">
                {stay.features.map((line, index) => (
                  <li key={line} className="border-t border-white/10">
                    <Reveal
                      delay={Math.min(index, 5) * 80}
                      distance={14}
                      className="flex items-baseline gap-5 py-5"
                    >
                      <span
                        aria-hidden
                        className="h-px w-4 shrink-0 translate-y-[-5px] bg-[#6B7341]"
                      />

                      <span className="text-[15px] leading-8 text-white/65">
                        {line}
                      </span>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-16 md:mt-20">
              <Reveal>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
                  Getting there
                </p>

                <p className="mt-7 max-w-xl text-[15px] leading-8 text-white/65">
                  {stay.getting}
                </p>
              </Reveal>
            </div>
          </div>

          {/*
            Right: the rail. The question the reader is holding all the
            way down the page is whether to ask about this place, so the
            answer sits beside the writing rather than at the foot of it.
            It pins for as long as the column gives it room — which on a
            page this length is most of the way.
          */}
          <aside className="lg:sticky lg:self-start" style={{ top: "calc(var(--horizons-nav, 72px) + 24px)" }}>
            <Reveal delay={120}>
              <div className="border border-white/12 p-7 md:p-8">
                <dl className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-1">
                  {facts.map(([term, value]) => (
                    <div key={term}>
                      <dt className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                        {term}
                      </dt>
                      <dd className="mt-2 text-[14px] leading-6 text-white/75">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <span
                  aria-hidden
                  className="mt-8 block h-px w-full bg-white/10"
                />

                <p className="mt-8 text-[14px] leading-7 text-white/55">
                  Tell us when, and how many of you. We come back with what
                  is free, what it costs, and whether we would put you here
                  or somewhere else.
                </p>

                {/*
                  No layout to choose: the pair measures the rail it is
                  in and stacks itself, because 340px is not room for
                  two of them side by side.
                */}
                <EnquiryActions
                  message={message}
                  subject={subject}
                  className="mt-7"
                />

                <EnquiryAddress className="mt-5 text-[12px] leading-6 text-white/35" />
              </div>
            </Reveal>
          </aside>
        </div>
      </Container>

      {/* ——— The neighbours ——— */}
      {nearby.length > 0 ? (
        <section className="mt-8 border-t border-white/10 py-16 md:py-24">
          <Container>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
                Also in {inRegion}
              </p>

              <Link
                href="/stays"
                className="text-[11px] uppercase tracking-[0.25em] text-white/35 transition-colors hover:text-white"
              >
                All stays →
              </Link>
            </div>

            <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-3">
              {nearby.map((other, index) => (
                <Reveal key={other.slug} delay={index * 110}>
                  <Link href={`/stays/${other.slug}`} className="group block">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B9556]">
                      {other.kind}
                    </p>

                    <h2 className="mt-3 font-cormorant text-[24px] font-light leading-[1.1] text-white transition-colors duration-500 group-hover:text-[#A8B473] md:text-[28px]">
                      {other.name}
                    </h2>

                    <span
                      aria-hidden
                      className="mt-4 block h-px w-8 origin-left bg-white/20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-16 group-hover:bg-[#6B7341]"
                    />

                    <p className="mt-4 text-[13px] leading-7 text-white/45">
                      {other.standfirst}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </main>
  );
}
