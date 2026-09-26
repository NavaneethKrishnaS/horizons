import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/*
  Six things the state is made of, drawn.

  The engravings are the Journal's — line art on transparent, made for
  cream paper, so here they are inverted and become white line on
  near-black. Nothing else on the site looks like this, which is the
  point: between two bands of photography the page needs a page that
  is not photography, or it reads as a gallery rather than as a
  brochure someone wrote.

  The lines under them are the Journal's own chapter headings rather
  than a second set written to sound like them.
*/
const THINGS = [
  {
    image: "/images/journal/peppercorns.webp",
    label: "Pepper",
    line: "The world came here first for this.",
  },
  {
    image: "/images/journal/houseboat.webp",
    label: "The kettuvallam",
    line: "A boat tied together without a single nail.",
  },
  {
    image: "/images/journal/face.webp",
    label: "Kathakali",
    line: "A face that takes six hours to paint.",
  },
  {
    image: "/images/journal/kalaripayattu.webp",
    label: "Kalaripayattu",
    line: "A body trained from the age of six.",
  },
  {
    image: "/images/journal/snake-boat.webp",
    label: "Chundan vallam",
    line: "A hundred men, one heartbeat.",
  },
  {
    image: "/images/journal/theyyam.webp",
    label: "Theyyam",
    line: "A god who arrives before it is light.",
  },
];

export default function Craft() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-[#0C0C0C] py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
              The Journal
            </p>

            <Link
              href="/journal"
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/40 transition-colors hover:text-white"
            >
              Read it
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-8 max-w-3xl font-cormorant text-[30px] font-light leading-[1.1] text-white sm:text-[40px] md:text-[48px]">
            A country that begins at the water, and does not stop there.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-14 md:mt-20 md:grid-cols-3 md:gap-x-12 lg:grid-cols-6">
          {THINGS.map((thing, index) => (
            <Reveal key={thing.label} delay={Math.min(index, 5) * 70}>
              <Link href="/journal" className="group block">
                <figure>
                  <div className="relative h-[92px] w-full md:h-[112px]">
                    <Image
                      src={thing.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 160px, 40vw"
                      /*
                        The plates are dark ink for paper. Inverted
                        they are white line on black, and they keep
                        their tone rather than flattening to a
                        silhouette the way brightness(0) would.

                        On hover the plate lifts a little and comes up
                        to full strength, which is as much as an
                        engraving should ever do.
                      */
                      className="object-contain object-bottom opacity-65 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] invert group-hover:-translate-y-1.5 group-hover:opacity-100"
                    />
                  </div>

                  <figcaption className="mt-6">
                    {/*
                      A floor under the label so a name that wraps does
                      not push its own line down and break the row.
                    */}
                    <p className="min-h-[2.2em] text-[10px] uppercase leading-[1.1] tracking-[0.28em] text-[#8B9556] transition-colors duration-500 group-hover:text-[#C3D08A]">
                      {thing.label}
                    </p>

                    <p className="mt-3 font-cormorant text-[18px] font-light leading-snug text-white/70 transition-colors duration-500 group-hover:text-white md:text-[19px]">
                      {thing.line}
                    </p>

                    {/*
                      A hairline that draws itself under the entry, so
                      there is something to aim at rather than a
                      picture that happens to be clickable.
                    */}
                    <span
                      aria-hidden
                      className="mt-4 block h-px w-0 bg-white/40 transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-10"
                    />
                  </figcaption>
                </figure>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
