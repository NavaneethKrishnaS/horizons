import { whatsappLink } from "@/lib/whatsapp";

type ExperienceCardProps = {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
};

export default function ExperienceCard({
  title,
  subtitle,
  description,
  highlights,
}: ExperienceCardProps) {
  return (
    <article className="group relative transition-all duration-500 md:py-4 md:hover:-translate-y-1">
      <p className="text-[10px] uppercase tracking-[0.25em] text-white/35 sm:text-[11px] md:tracking-[0.45em]">
        {title}
      </p>

      <h3 className="mt-2 max-w-[320px] font-cormorant text-[20px] leading-[1.15] text-white transition-colors duration-300 group-hover:text-white/60 sm:text-[26px] md:mt-4 md:text-[32px] md:leading-[1.08] md:tracking-[-0.03em] lg:text-[40px]">
        {subtitle}
      </h3>

      {/* Below desktop the columns are too narrow for these to be readable */}
      <p className="mt-5 hidden max-w-md text-[17px] leading-8 text-white/50 md:block">
        {description}
      </p>

      <div className="mt-8 hidden h-px w-16 bg-white/25 transition-all duration-300 group-hover:w-24 group-hover:bg-white md:block" />

      <ul className="mt-8 hidden space-y-4 md:block">
        {highlights.map((item) => (
          <li
            key={item}
            className="flex items-center gap-4 text-[15px] text-white/60"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#8B9556]" />
            {item}
          </li>
        ))}
      </ul>

      <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-white/35 transition-colors duration-300 group-hover:text-white md:mt-10 md:gap-3 md:text-[13px] md:font-medium md:tracking-[0.3em] md:text-white/60">
        Explore Now
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1.5"
        >
          &rarr;
        </span>
      </span>

      {/* Whole tile is the tap target */}
      <a
        href={whatsappLink(
          `Hello HORIZONS, I would like to enquire about houseboats — ${title}.`,
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Enquire about ${title}`}
        className="absolute inset-0"
      />
    </article>
  );
}
