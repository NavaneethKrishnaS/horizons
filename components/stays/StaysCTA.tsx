import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { CONTACT_EMAIL, emailLink, whatsappLink } from "@/lib/whatsapp";

export default function StaysCTA() {
  return (
    <section className="py-20 md:py-32">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <h2 className="font-cormorant text-[32px] font-light leading-[1.1] text-white sm:text-5xl md:text-[56px]">
            Or let us choose.
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-[15px] leading-8 text-white/55 md:text-[17px] md:leading-9">
            Which of these is right depends on who is travelling, what time of
            year it is and what you did the week before. Tell us that much and
            we will put a list in front of you — including the ones we would
            talk you out of.
          </p>

          <a
            href={whatsappLink(
              "Hello HORIZONS, I would like some help choosing where to stay in India.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-11 inline-flex items-center gap-4 border border-white/25 px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-white transition-colors duration-500 hover:border-[#6B7341] hover:bg-[#6B7341]"
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
              href={emailLink(
                "Enquiry — where to stay in India",
                "Hello HORIZONS, I would like some help choosing where to stay in India.",
              )}
              className="text-white/60 transition-colors hover:text-[#A8B473]"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
