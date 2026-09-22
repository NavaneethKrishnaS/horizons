import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { CONTACT_EMAIL, emailLink, whatsappLink } from "@/lib/whatsapp";

/*
  The journeys page closes on a centred invitation. This one closes the
  way the page opened — ranged left, in two columns, like the last spread
  of the index rather than a poster.
*/
export default function StaysCTA() {
  const message =
    "Hello HORIZONS, I would like some help choosing where to stay in India.";

  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
              Or let us choose
            </p>

            <h2 className="mt-7 max-w-xl font-cormorant text-[32px] font-light leading-[1.08] text-white sm:text-5xl md:text-[54px]">
              The right one depends on who is coming.
            </h2>
          </Reveal>

          <Reveal delay={140} className="lg:pt-16">
            <p className="max-w-lg text-[15px] leading-8 text-white/55 md:text-[17px] md:leading-9">
              A house that is perfect for two people in February is the wrong
              answer for a family of six in July. Tell us who is travelling,
              roughly when, and what you did the week before — we will put a
              short list in front of you, including the ones we would talk you
              out of.
            </p>

            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-4 border border-white/25 px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-white transition-colors duration-500 hover:border-[#6B7341] hover:bg-[#6B7341]"
            >
              Start a conversation
              <span
                aria-hidden
                className="transition-transform duration-500 group-hover:translate-x-1.5"
              >
                →
              </span>
            </a>

            <p className="mt-6 text-[13px] text-white/40">
              No WhatsApp? Write to{" "}
              <a
                href={emailLink("Enquiry — where to stay in India", message)}
                className="text-white/60 transition-colors hover:text-[#A8B473]"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
