import Image from "next/image";

import { whatsappLink } from "@/lib/whatsapp";

type Props = {
  title: string;
  location: string;
  description: string;
  image: string;
};

export default function ExperienceCard({
  title,
  location,
  description,
  image,
}: Props) {
  return (
    <article className="group relative h-[240px] cursor-pointer overflow-hidden sm:h-[360px] lg:h-[460px]">
      {/* Image */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="50vw"
        className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-all duration-700 group-hover:from-black/80 group-hover:via-black/30 sm:from-black/60 sm:via-black/15" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-4 text-white transition-all duration-700 group-hover:-translate-y-3 sm:p-6 lg:p-10">
        <p className="mb-1.5 text-[9px] uppercase tracking-[0.18em] text-white/70 sm:mb-3 sm:text-[11px] sm:tracking-[0.3em]">
          {location}
        </p>

        <h3 className="font-cormorant text-[19px] leading-[1.05] tracking-[-0.01em] sm:text-[26px] sm:leading-[1] lg:text-[36px]">
          {title}
        </h3>

        <p className="mt-4 hidden max-w-[320px] text-[15px] leading-7 text-white/80 sm:block">
          {description}
        </p>

        <a
          href={whatsappLink(
            `Hello HORIZONS, I would like to know more about ${title} in ${location}.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-white/90 sm:mt-6 sm:gap-2 sm:text-[13px] sm:tracking-[0.22em]"
        >
          {/* Makes the whole card tappable, which the cursor already implied */}
          <span className="absolute inset-0" aria-hidden />

          Discover

          <span className="transition-transform duration-500 group-hover:translate-x-2">
            →
          </span>
        </a>
      </div>
    </article>
  );
}