import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import EnquiryActions, { EnquiryAddress } from "@/components/ui/EnquiryActions";

export default function PackagesCTA() {
  const message =
    "Hello HORIZONS, I would like to talk about a journey in India.";

  return (
    <section className="py-20 md:py-32">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <h2 className="font-cormorant text-[32px] font-light leading-[1.1] text-white sm:text-5xl md:text-[56px]">
            Or tell us what you had in mind.
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-[15px] leading-8 text-white/55 md:text-[17px] md:leading-9">
            None of these is fixed. They are the routes we know best, and most
            of what we run is one of them adjusted — longer here, shorter there,
            or two of them joined.
          </p>

          <EnquiryActions
            message={message}
            subject="Travel enquiry — a journey in India"
            align="center"
            className="mt-11"
          />

          <EnquiryAddress className="mt-7" />
        </Reveal>
      </Container>
    </section>
  );
}
