import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/*
  What the thing actually is, before anybody is asked to choose one.

  Every houseboat site in Kerala opens with adjectives. Almost none of
  them says what a kettuvallam is or where it came from, which is the
  one thing we can say from the inside — the village the boats were
  reinvented in is the village the company is run from.
*/
export default function WhatItIs() {
  return (
    <section className="bg-[#111111] py-24 md:py-36">
      <Container>
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
            The kettuvallam
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-8 max-w-4xl font-cormorant text-[34px] font-light leading-[1.1] text-white sm:text-5xl md:text-[56px]">
            A boat tied together without a single nail.
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-14">
            <p className="text-[16px] leading-9 text-white/55 md:col-span-6 md:text-[17px] md:leading-[2]">
              A kettuvallam is a rice barge — jackwood planks stitched with coir
              rope, thatched over with bamboo and palm, built to carry grain
              down the backwaters when the roads were water. In the
              nineteen-nineties Mr Babu Varghese of Tourindia put a bed in one,
              and the whole industry followed.
            </p>

            <p className="text-[16px] leading-9 text-white/45 md:col-span-5 md:col-start-8 md:text-[16px] md:leading-[2]">
              That happened in Alumkadavu, which is where our founder lives and
              where he began his career alongside Mr Varghese. The boats on this
              page are ours. When you ask who is cooking and where you will be
              moored for the night, there is somebody here who knows.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
