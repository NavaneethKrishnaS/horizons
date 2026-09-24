import Container from "@/components/ui/Container";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { PHONE_DISPLAY, REPLY } from "@/data/contact";

/*
  The page where the selling stops.

  Every other page on the site is trying to show you something. This one
  only has to tell you how to reach a person, so the design is restraint:
  the same opening as the rest of the site, the same rule drawn across it,
  and under the rule the three ways in — set out like the gazetteer on the
  stays page, because the shape is the same thought. A short index of
  facts, not a row of buttons.
*/
export default function ContactHero() {
  /*
    Three facts, not three buttons — and deliberately three different
    facts. The first draft put the same number under both "WhatsApp" and
    "Telephone", which reads as a mistake rather than as a choice. The
    number is one line; what the third column is for is telling someone
    in another time zone what the silence means.
  */
  const ways = [
    {
      label: "Call or WhatsApp",
      value: PHONE_DISPLAY,
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
      external: true,
    },
    {
      label: "Email",
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
      external: false,
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-white/10 pt-40">
      <style>{`
        @keyframes horizons-contact-in {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .horizons-contact-in {
          animation: horizons-contact-in 1100ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /* The same horizon the stays page opens on. */
        @keyframes horizons-contact-rule {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .horizons-contact-rule {
          transform-origin: left center;
          animation: horizons-contact-rule 2500ms cubic-bezier(0.16, 1, 0.3, 1) 400ms both;
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-contact-in { animation: none; }
          .horizons-contact-rule { animation: none; transform: none; }
        }
      `}</style>

      <Container className="relative">
        <p
          className="horizons-contact-in text-[11px] uppercase tracking-[0.45em] text-white/50"
          style={{ animationDelay: "80ms" }}
        >
          Contact
        </p>

        <h1
          className="horizons-contact-in mt-7 max-w-4xl font-cormorant text-[44px] font-light leading-[1.02] text-white sm:text-6xl md:text-[88px]"
          style={{ animationDelay: "200ms" }}
        >
          Tell us where you want to go.
        </h1>

        <p
          className="horizons-contact-in mt-9 max-w-2xl text-[15px] leading-8 text-white/60 md:text-[17px] md:leading-9"
          style={{ animationDelay: "360ms" }}
        >
          There is no enquiry desk here and no ticket number. What you write
          reaches the people who plan the journeys, and one of them answers
          it. There are not many of us, which is the point.
        </p>
      </Container>

      <div className="mt-16 md:mt-24">
        <span
          aria-hidden
          className="horizons-contact-rule block h-px w-full bg-gradient-to-r from-[#6B7341] via-[#6B7341]/40 to-transparent"
        />

        <Container>
          <div
            className="horizons-contact-in grid gap-8 py-10 sm:grid-cols-3 md:gap-16 md:py-12"
            style={{ animationDelay: "520ms" }}
          >
            {ways.map((way) => (
              <div key={way.label}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  {way.label}
                </p>

                <a
                  href={way.href}
                  {...(way.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="mt-3 inline-block text-[15px] leading-7 text-white/70 transition-colors duration-300 hover:text-[#A8B473] md:text-[16px]"
                >
                  {way.value}
                </a>
              </div>
            ))}

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                Reply
              </p>

              <p className="mt-3 text-[15px] leading-7 text-white/70 md:text-[16px]">
                {REPLY.promise}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
