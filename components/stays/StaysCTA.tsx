import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import EnquiryActions, { EnquiryAddress } from "@/components/ui/EnquiryActions";

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

            <EnquiryActions
              message={message}
              subject="Travel enquiry — where to stay in India"
              className="mt-10"
            />

            <EnquiryAddress className="mt-7" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
