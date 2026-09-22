import Image from "next/image";
import Link from "next/link";

import type { Stay } from "@/data/stays";

/*
  Two states, and the typographic one is not a fallback.

  A hotel's photograph is the product, so until a property sends its own
  there is nothing honest to put here — a stock shot of some other
  backwater under a named hotel would be a lie told to somebody deciding
  where to sleep. So the card is set in type instead: the plate, the rule,
  the name. It is meant to look like a decision, because it is one. Add an
  `image` to the entry in data/stays.ts and the card becomes a photograph.
*/
export default function StayCard({ stay }: { stay: Stay }) {
  return (
    <Link href={`/stays/${stay.slug}`} className="group block">
      {stay.image ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
          <Image
            src={stay.image}
            alt={stay.imageAlt ?? stay.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        </div>
      ) : (
        <div className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden border border-white/10 bg-[#141510] px-7 py-8 transition-colors duration-700 group-hover:border-white/25">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B9556]">
            {stay.kind}
          </p>

          <div>
            <h3 className="font-cormorant text-[30px] font-light leading-[1.06] text-white transition-colors duration-500 group-hover:text-[#A8B473] md:text-[36px]">
              {stay.name}
            </h3>

            <span
              aria-hidden
              className="mt-5 block h-px w-10 origin-left bg-[#6B7341] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-[2.6]"
            />

            <p className="mt-5 text-[12px] uppercase tracking-[0.22em] text-white/35">
              {stay.rooms}
            </p>
          </div>
        </div>
      )}

      <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-white/45">
        {stay.place}
        {stay.image ? (
          <>
            {" "}
            <span className="text-white/25">·</span> {stay.rooms}
          </>
        ) : null}
      </p>

      {stay.image ? (
        <h3 className="mt-3 font-cormorant text-[26px] font-light leading-[1.15] text-white transition-colors group-hover:text-[#A8B473] md:text-[30px]">
          {stay.name}
        </h3>
      ) : null}

      <p className="mt-2.5 text-[14px] leading-7 text-white/55">
        {stay.standfirst}
      </p>
    </Link>
  );
}
