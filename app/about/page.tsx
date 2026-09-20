import type { Metadata } from "next";
import Image from "next/image";
import AboutHero from "@/components/about/AboutHero";
import WhereWeComeFrom from "@/components/about/WhereWeComeFrom";

export const metadata: Metadata = {
  title: "About HORIZONS | Luxury Travel in Kerala & South India",
  description:
    "Discover HORIZONS by Scenic Escapes India — a specialist travel company with more than 28 years of experience creating tailor-made journeys across Kerala, South India and beyond.",
  keywords: [
    "Kerala luxury travel",
    "South India luxury travel",
    "tailor-made Kerala holidays",
    "Kerala travel specialist",
    "Kerala backwater holidays",
    "Kerala houseboat experiences",
    "South India tailor-made travel",
    "luxury travel India",
    "Kerala private tours",
    "Scenic Escapes India",
    "HORIZONS Kerala",
  ],
};

export default function AboutPage() {
  return (
    <main className="bg-neutral-950 text-white">
      <AboutHero />

      {/* INTRODUCTION */}
      <section className="border-t border-white/10 bg-neutral-950 px-6 py-28 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">
              About HORIZONS
            </p>

            <h2 className="mt-6 font-cormorant text-5xl leading-tight text-white md:text-6xl">
              Travel is personal.
              <br />
              We believe it should stay that way.
            </h2>
          </div>

          <div className="max-w-2xl space-y-7 text-lg leading-8 text-neutral-300">
            <p className="text-2xl leading-9 text-neutral-100">
              Most tour operators count their guests in the thousands. We
              prefer to know ours by name.
            </p>

            <p>
              HORIZONS is a brand of Scenic Escapes India Private Limited — a
              specialist tour operator with more than twenty-eight years
              behind it, designing and running tailor-made journeys across
              India and its neighbouring countries: Nepal, Bhutan and Sri
              Lanka.
            </p>

            <p>
              Our heart, and our deepest knowledge, lies in the south:
              <span className="text-white">
                {" "}
                Kerala, Tamil Nadu, Karnataka and Goa.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* THE INDIA WE KNOW */}
      <section className="border-t border-white/10 bg-neutral-900 px-6 py-28 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">
              The India We Know
            </p>

            <h2 className="mt-6 font-cormorant text-5xl leading-tight md:text-7xl">
              One country.
              <br />
              Countless worlds.
            </h2>

            <div className="mt-10 space-y-6 text-lg leading-8 text-neutral-300">
              <p>
                India is not one place. It is many, set side by side, and it
                changes every few hundred kilometres — the language, the food,
                the shape of the temples, the way people take their tea.
              </p>

              <p>
                The south is our home ground. Kerala, where the backwaters lie
                still in the early morning and the palms lean out over the
                water. Tamil Nadu, with granite temples a thousand years old
                that are still full of people, still lit, still in use.
                Karnataka, with its coffee hills and the ruined city at Hampi
                scattered among the boulders. And Goa, and the sea.
              </p>

              <p>
                We know when the mist settles on the tea gardens at Munnar and
                when it lifts. We know which hill road is worth the extra hour.
                We know where the elephants come down to drink at Periyar,
                which market in Madurai to walk through at dawn, and where to
                sleep on a boat and wake to nothing at all but water and birds.
              </p>
            </div>
          </div>

          <div className="mt-24 grid border-t border-white/10 md:grid-cols-4">
            <div className="border-b border-white/10 px-0 py-8 md:border-r md:border-b-0 md:px-8 md:first:pl-0">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                01
              </p>
              <h3 className="mt-4 font-cormorant text-3xl">Kerala</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-400">
                Backwaters, palms, quiet mornings and the landscapes we call
                home.
              </p>
            </div>

            <div className="border-b border-white/10 px-0 py-8 md:border-r md:border-b-0 md:px-8">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                02
              </p>
              <h3 className="mt-4 font-cormorant text-3xl">Tamil Nadu</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-400">
                Ancient granite temples that remain living, breathing places.
              </p>
            </div>

            <div className="border-b border-white/10 px-0 py-8 md:border-r md:border-b-0 md:px-8">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                03
              </p>
              <h3 className="mt-4 font-cormorant text-3xl">Karnataka</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-400">
                Coffee hills, dramatic landscapes and the ruins of Hampi.
              </p>
            </div>

            <div className="px-0 py-8 md:px-8 md:pr-0">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                04
              </p>
              <h3 className="mt-4 font-cormorant text-3xl">Goa</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-400">
                The sea, the coast and another side of southern India.
              </p>
            </div>
          </div>

          <div className="mt-24 border-t border-white/10 pt-16">
            <p className="max-w-3xl font-cormorant text-4xl leading-tight text-neutral-100 md:text-5xl">
              There is a great deal of India.
              <br />
              <span className="text-neutral-500">
                We would like to show you the quiet parts of it.
              </span>
            </p>
          </div>
        </div>
      </section>

      <WhereWeComeFrom />

      {/* WHAT WE TAKE CARE OF */}
      <section className="border-t border-white/10 bg-neutral-900 px-6 py-28 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">
              What We Take Care Of
            </p>

            <h2 className="mt-6 font-cormorant text-5xl leading-tight md:text-7xl">
              Everything between
              <br />
              arrival and departure.
            </h2>

            <p className="mt-8 text-lg leading-8 text-neutral-400">
              From the first transfer to the final morning, we take care of
              the details that allow you to simply be present in the journey.
            </p>
          </div>

          <div className="mt-20 border-t border-white/10">
            {[
              "Hotels, heritage properties and homestays",
              "Private transport and experienced drivers",
              "Kettuvallam houseboats and backwater cruises",
              "Guides, permits and internal travel",
              "Ecotourism and sustainable tourism experiences — chosen because they are genuinely worth your time, not because they are easy to book",
            ].map((item, index) => (
              <div
                key={item}
                className="grid gap-4 border-b border-white/10 py-7 md:grid-cols-[80px_1fr] md:items-center"
              >
                <span className="text-xs tracking-[0.3em] text-neutral-500">
                  0{index + 1}
                </span>

                <p className="font-cormorant text-2xl text-neutral-100 md:text-3xl">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 max-w-3xl">
            <p className="text-lg leading-8 text-neutral-300">
              Long-standing relationships with hotels across the region mean
              we can often secure rates that are not available to the public.
            </p>

            <p className="mt-4 font-cormorant text-3xl text-white">
              That saving goes to you.
            </p>
          </div>
        </div>
      </section>

      {/* WHY WE STAY SMALL */}
      <section className="border-t border-white/10 bg-neutral-950 px-6 py-28 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">
            Why We Stay Small
          </p>

          <h2 className="mt-6 font-cormorant text-6xl md:text-8xl">
            By choice.
          </h2>

          <div className="mx-auto mt-12 max-w-3xl space-y-7 text-lg leading-8 text-neutral-300">
            <p>
              Staying small is how we come to know most of our guests by their
              first name. It is how we can spend a week shaping one itinerary
              around one family&apos;s interests instead of sending fifty
              groups down the same road.
            </p>

            <p>
              And it is why, when something shifts mid-journey — a delayed
              flight, a change of plan, a temple festival worth rearranging a
              day for — there is someone at the other end of the phone who
              already knows your trip and can put it right.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE ARE AIMING AT */}
      <section className="border-t border-white/10 bg-neutral-900 px-6 py-32 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">
            What We Are Aiming At
          </p>

          <h2 className="mt-8 max-w-5xl font-cormorant text-5xl leading-tight md:text-7xl">
            We are not interested in being adequate.
          </h2>

          <p className="mt-10 max-w-4xl text-2xl leading-10 text-neutral-300 md:text-3xl md:leading-[1.5]">
            We are interested in being remembered — in designing a journey you
            will still be describing to people years from now.
          </p>

          <div className="mt-20 border-t border-white/10 pt-16">
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">
              Our Policy &amp; Hallmark
            </p>

            <p className="mt-8 font-cormorant text-5xl leading-tight text-white md:text-7xl">
              Welcome a tourist,
              <br />
              and send back a friend.
            </p>

            <p className="mt-10 max-w-2xl text-lg leading-8 text-neutral-400">
              It has worked for twenty-eight years. Most of our guests come to
              us because someone they trust travelled with us first.
            </p>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="border-t border-white/10 bg-neutral-950 px-6 py-28 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-28">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">
              Meet The Founder
            </p>

            <h2 className="mt-6 font-cormorant text-5xl leading-tight md:text-6xl">
              Surjith
              <br />
              Somasundaram
            </h2>

            <p className="mt-6 text-sm uppercase tracking-[0.25em] text-neutral-500">
              Travel Professional
              <br />
              28 Years in Tourism &amp; Hospitality
            </p>
          </div>

          <div className="space-y-7 text-lg leading-8 text-neutral-300">
            <p>
              Mr Surjith Somasundaram is a travel professional with twenty-eight
              years in tourism and hospitality — driven by curiosity, a
              willingness to experiment, and the conviction that tourism should
              be a living, creative craft rather than a fixed menu of packages.
            </p>

            <p>
              He has spent nearly three decades learning this part of the world
              in detail: which backwater route is quiet in March, which small
              hotel is worth the detour, which guide will make a temple come
              alive rather than simply list its dates.
            </p>

            <p className="border-l border-white/30 pl-6 font-cormorant text-3xl leading-10 text-white md:text-4xl">
              That knowledge is what you are really booking when you travel
              with HORIZONS.
            </p>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="border-t border-white/10 bg-neutral-900 px-6 py-32 text-center md:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">
            HORIZONS
          </p>

          <h2 className="mt-8 font-cormorant text-5xl leading-tight md:text-7xl">
            Come with curiosity.
            <br />
            Leave with a story.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-400">
            We would be glad to have you travel with us.
          </p>

          <div className="mx-auto mt-12 h-px w-24 bg-white/20" />
        </div>
      </section>
    </main>
  );
}