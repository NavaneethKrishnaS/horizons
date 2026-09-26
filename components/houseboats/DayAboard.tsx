import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { commonItinerary } from "@/data/houseboat.shared";

/*
  The twenty-one hours, hour by hour.

  This replaced "Curated For Every Journey" and its five invented
  audience segments — for families, for couples, for friends — which
  were a way of filling a page without telling anybody anything. What
  a guest actually wants to know before they spend a night on a boat
  is when they get on, what they are fed, and where the boat stops. It
  is all in data/houseboat.shared.ts already, and it was only being
  shown at the bottom of each boat's own page.

  Read from the shared itinerary rather than retyped, so a change to
  the schedule reaches this page too.
*/
export default function DayAboard() {
  const days = [
    { label: "Day one", items: commonItinerary.filter((i) => i.day === 1) },
    { label: "Day two", items: commonItinerary.filter((i) => i.day === 2) },
  ];

  return (
    <section className="border-y border-white/[0.06] bg-[#0E0E0E] py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
                A night on board
              </p>

              <h2 className="mt-7 font-cormorant text-[30px] font-light leading-[1.1] text-white sm:text-[40px] md:text-[48px]">
                Noon to nine the next morning.
              </h2>
            </div>

            <p className="text-[15px] leading-8 text-white/45 md:col-span-4 md:col-start-9 md:self-end md:text-[16px]">
              The same shape on every boat. What changes is the size of the
              boat, the size of the crew, and how far you go before the light
              does.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-x-14 gap-y-12 md:mt-20 md:grid-cols-2">
          {days.map((day, dayIndex) => (
            <div key={day.label}>
              <Reveal delay={dayIndex * 90}>
                <p className="border-b border-white/[0.12] pb-4 text-[10px] uppercase tracking-[0.3em] text-white/35">
                  {day.label}
                </p>
              </Reveal>

              <ul>
                {day.items.map((item, index) => (
                  <Reveal
                    key={`${item.day}-${item.time}`}
                    delay={dayIndex * 90 + index * 60}
                  >
                    <li className="flex gap-6 border-b border-white/[0.07] py-6 md:gap-8">
                      {/*
                        The clock in a fixed column so the times line
                        up as a column of their own, the way a timetable
                        sets them.
                      */}
                      <span className="w-[74px] shrink-0 pt-1 text-[11px] uppercase tracking-[0.18em] text-[#8B9556] lining-nums tabular-nums md:w-[84px]">
                        {item.time}
                      </span>

                      <div className="min-w-0">
                        <h3 className="font-cormorant text-[21px] font-light leading-tight text-white md:text-[23px]">
                          {item.title}
                        </h3>

                        <p className="mt-2.5 max-w-md text-[14px] leading-7 text-white/45">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
