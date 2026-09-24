import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import {
  ADDRESS,
  MAP_LINK,
  ORGANISATION,
  PHONE_DISPLAY,
  PHONE_HREF,
  REGISTRATION,
  REPLY,
} from "@/data/contact";

/*
  The facts, once, at the foot of the page.

  Anything missing from data/contact.ts is left out rather than printed
  half-empty — an address with a hole in it reads as a site that has been
  abandoned, and a registration number is not something to approximate.
*/
export default function ContactDetails() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
            Where to find us
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
              Write
            </p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-block text-[15px] leading-7 text-white/70 transition-colors duration-300 hover:text-[#A8B473]"
            >
              {CONTACT_EMAIL}
            </a>
          </Reveal>

          <Reveal delay={90}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
              Call or WhatsApp
            </p>

            <a
              href={PHONE_HREF}
              className="mt-4 inline-block text-[15px] leading-7 text-white/70 transition-colors duration-300 hover:text-[#A8B473] lining-nums"
            >
              {PHONE_DISPLAY}
            </a>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-[13px] leading-6 text-white/35 transition-colors duration-300 hover:text-[#A8B473]"
            >
              Open a WhatsApp conversation
            </a>
          </Reveal>

          {ADDRESS.length > 0 ? (
            <Reveal delay={180}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                Our office
              </p>

              <address className="mt-4 text-[15px] not-italic leading-7 text-white/70">
                {ADDRESS.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              {MAP_LINK ? (
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-[13px] leading-6 text-white/35 transition-colors duration-300 hover:text-[#A8B473]"
                >
                  See it on the map
                </a>
              ) : null}
            </Reveal>
          ) : null}

          <Reveal delay={270}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
              When we answer
            </p>

            <p className="mt-4 text-[15px] leading-7 text-white/70">
              {REPLY.promise}
            </p>

            <p className="mt-2 text-[13px] leading-6 text-white/35">
              {REPLY.hours}
            </p>
          </Reveal>
        </div>

        {/*
          The company, said quietly at the bottom — which is where the
          planners and agents who want it will look, and where it stays
          out of the way of everybody else.
        */}
        <Reveal delay={120}>
          <div className="mt-20 border-t border-white/10 pt-8 md:mt-24">
            <div className="flex flex-col gap-y-4 md:flex-row md:flex-wrap md:items-baseline md:gap-x-12">
              <p className="text-[13px] leading-6 text-white/45">
                {ORGANISATION}
              </p>

              {REGISTRATION.map((entry) => (
                <p key={entry.term} className="text-[12px] leading-6 text-white/30">
                  <span className="uppercase tracking-[0.2em]">{entry.term}</span>{" "}
                  <span className="lining-nums">{entry.value}</span>
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
