import Container from "@/components/ui/Container";
import { whatsappLink } from "@/lib/whatsapp";

export default function PackagesCTA() {
  return (
    <section className="py-20 md:py-32">
      <Container className="max-w-3xl text-center">
        <h2 className="font-cormorant text-[32px] font-light leading-[1.1] text-white sm:text-5xl md:text-[56px]">
          Or tell us what you had in mind.
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-[15px] leading-8 text-white/55 md:text-[17px] md:leading-9">
          None of these is fixed. They are the routes we know best, and most
          of what we run is one of them adjusted — longer here, shorter
          there, or two of them joined.
        </p>

        <a
          href={whatsappLink(
            "Hello HORIZONS, I would like to talk about a journey in India."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-11 inline-block border border-white/25 px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-white transition-colors hover:border-[#6B7341] hover:bg-[#6B7341]"
        >
          Start a conversation
        </a>
      </Container>
    </section>
  );
}
