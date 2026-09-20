import Image from "next/image";

import { whatsappLink } from "@/lib/whatsapp";

type Props = {
  name: string;
  location: string;
  description: string;
  image: string;
  price: number;
  rating: number;
};

export default function StayCard({
  name,
  location,
  description,
  image,
  price,
  rating,
}: Props) {
  return (
    <article className="group relative h-[420px] cursor-pointer overflow-hidden sm:h-[520px]">
      {/* Image */}
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent transition-all duration-700 group-hover:from-black/75 group-hover:via-black/25" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 text-white transition-all duration-700 group-hover:-translate-y-3 sm:p-10">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">
            {location}
          </p>

          <p className="text-sm text-white/90">
            ★ {rating}
          </p>
        </div>

        <h3 className="font-cormorant text-[32px] leading-[1] tracking-[-0.02em] sm:text-[38px]">
          {name}
        </h3>

        <p className="mt-4 max-w-[320px] text-[15px] leading-7 text-white/80">
          {description}
        </p>

        <div className="mt-6 flex items-center justify-between sm:mt-8">
          <div>
            <p className="text-[28px] font-light">
              ₹{price.toLocaleString()}
            </p>

            <p className="text-xs uppercase tracking-[0.2em] text-white/60">
              per night
            </p>
          </div>

          <a
            href={whatsappLink(
              `Hello HORIZONS, I would like to enquire about ${name} in ${location}.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.22em] text-white/90"
          >
            Reserve

            <span className="transition-transform duration-500 group-hover:translate-x-2">
              →
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}