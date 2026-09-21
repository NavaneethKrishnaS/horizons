import Image from "next/image";
import Link from "next/link";

import type { TourPackage } from "@/data/packages";

export default function PackageCard({ tour }: { tour: TourPackage }) {
  return (
    <Link href={`/packages/${tour.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
        <Image
          src={tour.image}
          alt={tour.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
      </div>

      <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-white/45">
        {tour.region} <span className="text-white/25">·</span> {tour.duration}
      </p>

      <h3 className="mt-3 font-cormorant text-[26px] font-light leading-[1.15] text-white transition-colors group-hover:text-[#A8B473] md:text-[30px]">
        {tour.title}
      </h3>

      <p className="mt-2.5 text-[14px] leading-7 text-white/55">
        {tour.standfirst}
      </p>
    </Link>
  );
}
