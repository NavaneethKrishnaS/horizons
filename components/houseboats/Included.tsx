import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { commonExclusions } from "@/data/houseboat.shared";
import { houseboats } from "@/data/houseboats";

/*
  What the price covers, and what it does not.

  This replaced "Why Choose HORIZONS" — Curated Fleet, Local
  Expertise, Transparent Pricing, Dedicated Concierge — four claims
  every operator in Alleppey makes on their own home page, three of
  which cannot be checked. Printing the inclusions and the exclusions
  side by side is what transparent pricing actually looks like.

  The inclusions are read from the first boat, which carries the list
  the fleet shares; the exclusions are the shared list itself.
*/
export default function Included() {
  const inclusions = houseboats[0]?.inclusions ?? [];

  const columns = [
    { label: "Included", items: inclusions, tone: "text-white/70" },
    { label: "Not included", items: commonExclusions, tone: "text-white/40" },
  ];

  return (
    <section className="bg-[#111111] py-24 md:py-32">
      <Container>
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
            The price
          </p>

          <h2 className="mt-7 max-w-2xl font-cormorant text-[30px] font-light leading-[1.1] text-white sm:text-[40px] md:text-[48px]">
            One figure, for the whole boat, for the night.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-16 gap-y-12 md:mt-20 md:grid-cols-2">
          {columns.map((column, columnIndex) => (
            <div key={column.label}>
              <Reveal delay={columnIndex * 90}>
                <p className="border-b border-white/[0.12] pb-4 text-[10px] uppercase tracking-[0.3em] text-white/35">
                  {column.label}
                </p>
              </Reveal>

              <ul className="mt-2">
                {column.items.map((item, index) => (
                  <Reveal key={item} delay={columnIndex * 90 + index * 40}>
                    <li
                      className={`border-b border-white/[0.06] py-4 text-[15px] leading-7 ${column.tone}`}
                    >
                      {item}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
