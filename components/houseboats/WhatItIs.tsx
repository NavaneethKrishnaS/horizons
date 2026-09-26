import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/*
  What the thing actually is, before anybody is asked to choose one.

  Every houseboat site in Kerala opens with adjectives. Almost none of
  them says what a kettuvallam is or where it came from, which is the
  one thing we can say from the inside — the village the boats were
  reinvented in is the village the company is run from.

  Set to the two margins, title left and the telling right, the same
  five-and-seven split the page uses further down.
*/
export default function WhatItIs() {
  return (
    <section className="bg-[#111111] py-24 md:py-36">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          {/* Left margin */}
          <Reveal className="md:col-span-5">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
              The kettuvallam
            </p>

            <h2 className="mt-8 font-cormorant text-[34px] font-light leading-[1.1] text-white sm:text-5xl md:text-[52px]">
              A boat tied together without a single nail.
            </h2>
          </Reveal>

          {/* Right margin */}
          <Reveal delay={90} className="md:col-span-6 md:col-start-7">
            <p className="text-[16px] leading-9 text-white/55 md:text-[17px] md:leading-[2]">
              A kettuvallam is a rice barge — jackwood planks stitched with coir
              rope, thatched over with bamboo and palm, built to carry grain
              down the backwaters when the roads were water. In the
              nineteen-nineties Mr Babu Varghese of Tourindia put a bed in one,
              and the whole industry followed. That happened in Alumkadavu,
              where our founder lives and where he began his career alongside Mr
              Varghese. The boats on this page are ours: when you ask who is
              cooking and where you will be moored for the night, there is
              somebody here who knows.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
