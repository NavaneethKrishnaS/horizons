import Image from "next/image";
import Link from "next/link";

import { Houseboat } from "@/data/houseboat.types";

/*
  The card's shape is unchanged — photograph on the left, everything
  else on the right, the price set large. Only its colour moved: it
  was a cream panel on a page whose every other surface is now
  near-black, which is the one thing about this page that read as
  belonging to a different site.
*/

interface FeaturedHouseboatCardProps {
  houseboat: Houseboat;
}

export default function FeaturedHouseboatCard({
  houseboat,
}: FeaturedHouseboatCardProps) {
  /*
    The same fallback the hero and the mobile bar use. A houseboat whose
    defaultCategory no longer matches a category name would otherwise take
    the whole listing page down from here.
  */
  const price =
    houseboat.categories.find(
      (category) => category.name === houseboat.defaultCategory,
    )?.price ?? houseboat.categories[0].price;

  // Built in JS rather than JSX: a line break inside JSX text swallows the
  // space next to it, and this also keeps the plurals right.
  const plural = (count: number, word: string) =>
    `${count} ${word}${count === 1 ? "" : "s"}`;

  const specs = [
    plural(houseboat.bedrooms, "bedroom"),
    plural(houseboat.maxGuests, "guest"),
    plural(houseboat.bathrooms, "bathroom"),
  ].join(" \u00b7 ");

  return (
    <article className="group grid items-stretch overflow-hidden border border-white/[0.08] bg-[#151515] transition-colors duration-500 hover:border-white/[0.18] lg:grid-cols-[1.35fr_1fr]">
      {/* Photograph */}
      <div className="relative h-[200px] overflow-hidden sm:h-[340px] lg:h-[440px]">
        <Image
          src={houseboat.gallery[0].src}
          alt={houseboat.gallery[0].alt}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
      </div>

      {/* Detail */}
      <div className="flex flex-col justify-center px-5 py-6 sm:px-10 sm:py-8 lg:px-12">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#8B9556] sm:tracking-[0.35em]">
          {houseboat.defaultCategory}
        </p>

        <h3 className="mt-3 font-cormorant text-[24px] font-light leading-[1.08] text-white lining-nums sm:mt-4 sm:text-[32px] sm:leading-[1.05] lg:text-[42px]">
          {houseboat.name}
        </h3>

        {/* The photograph and name carry the card on a phone */}
        <p className="mt-5 hidden max-w-md text-[15px] leading-8 text-white/50 sm:block">
          {houseboat.shortDescription}
        </p>

        <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-white/35 sm:mt-6 sm:text-[12px]">
          {specs}
        </p>

        <div className="mt-5 flex items-baseline gap-2 sm:mt-7">
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/35 sm:text-[12px]">
            From
          </span>

          <span className="font-sans text-[25px] font-light leading-none tracking-[-0.01em] text-white lining-nums tabular-nums sm:text-[29px]">
            &#8377;{price.toLocaleString()}
          </span>

          <span className="text-[13px] text-white/35">per night</span>
        </div>

        <Link
          href={`/houseboats/${houseboat.slug}`}
          className="group/link mt-6 inline-flex w-fit items-center gap-2 border-b border-white/25 pb-1.5 text-[12px] uppercase tracking-[0.25em] text-white/80 transition-colors duration-300 hover:border-[#A8B473] hover:text-[#A8B473] sm:mt-8"
        >
          <span>Explore</span>

          <span
            aria-hidden
            className="transition-transform duration-300 group-hover/link:translate-x-1"
          >
            &rarr;
          </span>
        </Link>
      </div>
    </article>
  );
}
