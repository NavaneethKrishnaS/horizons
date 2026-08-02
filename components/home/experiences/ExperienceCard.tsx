import Image from "next/image";

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
    <article className="group relative h-[460px] overflow-hidden cursor-pointer">
      {/* Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent transition-all duration-700 group-hover:from-black/75 group-hover:via-black/25" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-10 text-white transition-all duration-700 group-hover:-translate-y-3">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-white/70">
          {location}
        </p>

        <h3 className="font-cormorant text-[36px] leading-[1] tracking-[-0.02em]">
          {title}
        </h3>

        <p className="mt-4 max-w-[320px] text-[15px] leading-7 text-white/80">
          {description}
        </p>

        <button className="mt-6 inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.22em] text-white/90">
          Discover

          <span className="transition-transform duration-500 group-hover:translate-x-2">
            →
          </span>
        </button>
      </div>
    </article>
  );
}