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
        <article className="group py-4 transition-all duration-500 hover:-translate-y-1">
        {/* Category */}
        <p className="text-[11px] uppercase tracking-[0.45em] text-neutral-500">
          {title}
        </p>
  
        {/* Heading */}
        <h3 className="mt-4 max-w-[320px] font-cormorant text-[40px] leading-[1.08] tracking-[-0.03em] text-neutral-900 transition-colors duration-300 group-hover:text-neutral-700">
          {subtitle}
        </h3>
  
        {/* Description */}
        <p className="mt-5 max-w-md text-[17px] leading-8 text-neutral-600">
          {description}
        </p>
  
        {/* Divider */}
        <div className="mt-8 h-px w-16 bg-neutral-300 transition-all duration-300 group-hover:w-24 group-hover:bg-neutral-900" />
  
        {/* Highlights */}
        <ul className="mt-8 space-y-4">
          {highlights.map((item) => (
            <li
              key={item}
              className="flex items-center gap-4 text-[15px] text-neutral-700"
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#6B7341]" />
              {item}
            </li>
          ))}
        </ul>
  
        {/* CTA */}
        <a
          href={whatsappLink(
            `Hello HORIZONS, I would like to enquire about houseboats \u2014 ${title}.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="group/button mt-10 inline-flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.3em] text-neutral-700 transition-colors duration-300 hover:text-neutral-900"
        >
          <span>Explore Now</span>

          <span className="transition-transform duration-300 group-hover/button:translate-x-1.5">
            →
          </span>
        </a>
      </article>
    );
  }