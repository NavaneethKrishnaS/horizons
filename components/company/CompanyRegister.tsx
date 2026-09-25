import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { OFFICE, REGISTER, REGISTERS } from "@/data/company";

/*
  The particulars, set as a list of terms rather than a table: a table
  would want borders on both axes and this page is quiet enough without
  them. One hairline between rows, the term small and lettered, the value
  in the reading size — the same rhythm as the questions page.
*/
export default function CompanyRegister() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
            On the register
          </p>
        </Reveal>

        <dl className="mt-12">
          {REGISTER.map((row, index) => (
            <Reveal key={row.term} delay={Math.min(index, 4) * 70}>
              <div className="grid gap-2 border-b border-white/10 py-6 md:grid-cols-[220px_1fr] md:gap-10">
                <dt className="text-[10px] uppercase tracking-[0.3em] text-white/35 md:pt-1.5">
                  {row.term}
                </dt>

                <dd>
                  <p className="text-[16px] leading-7 text-white/80 lining-nums md:text-[18px]">
                    {row.value}
                  </p>

                  {row.note ? (
                    <p className="mt-2 max-w-xl text-[13px] leading-6 text-white/35">
                      {row.note}
                    </p>
                  ) : null}
                </dd>
              </div>
            </Reveal>
          ))}

          <Reveal delay={350}>
            <div className="grid gap-2 border-b border-white/10 py-6 md:grid-cols-[220px_1fr] md:gap-10">
              <dt className="text-[10px] uppercase tracking-[0.3em] text-white/35 md:pt-1.5">
                Registered office
              </dt>

              <dd>
                <address className="text-[16px] not-italic leading-8 text-white/80 lining-nums md:text-[18px] md:leading-9">
                  {OFFICE.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>

                <p className="mt-2 max-w-xl text-[13px] leading-6 text-white/35">
                  The principal place of business on the GST certificate and
                  the address on record at the Registrar of Companies. It is
                  an office and a family house in a backwater village, not a
                  shopfront — write or call before coming.
                </p>
              </dd>
            </div>
          </Reveal>
        </dl>

        {/*
          The part that makes the rest of it worth printing. Anybody can
          put a number on a page; these two searches are how you find out
          whether it is ours.
        */}
        <Reveal delay={140}>
          <div className="mt-16 md:mt-20">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
              Check it without us
            </p>

            <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
              {REGISTERS.map((register) => (
                <div key={register.name}>
                  <a
                    href={register.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-baseline gap-2 font-cormorant text-[22px] font-light text-white transition-colors duration-300 hover:text-[#A8B473] md:text-[26px]"
                  >
                    {register.name}

                    <span
                      aria-hidden
                      className="text-[14px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </a>

                  <p className="mt-3 max-w-md text-[14px] leading-7 text-white/45">
                    {register.what}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
