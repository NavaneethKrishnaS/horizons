import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/*
  The long answers.

  A guide, not a list of questions — the FAQ has the short version and
  this is where somebody who is actually booking flights reads the whole
  thing. Ranged left in a single column at reading width, because that
  is what long prose wants and what a second column would ruin.
*/
const chapters = [
  {
    id: "by-air",
    label: "By air",
    title: "Almost everybody arrives through the Gulf.",
    body: [
      "There is no direct flight from Europe to Kerala, and anybody offering you one is selling you a connection with the change hidden in the middle. What there is instead is a great deal of choice: Emirates, Qatar and Etihad all fly into Kochi several times a day, as does Air India Express, and the change in Dubai, Doha or Abu Dhabi is usually two or three hours in an airport built for exactly this.",
      "Turkish through Istanbul works well from most of Europe and often prices better. From Britain the other honest option is a change in Delhi, Mumbai or Bengaluru — slightly longer, and it puts you on a domestic flight for the last leg, which is worth knowing if your bags are heavy.",
      "One thing nobody mentions: most Gulf flights land in Kochi in the small hours. Two in the morning is a normal arrival time. It sounds punishing and it is actually the kindest way to do it — the roads are empty, you are at the water before dawn, and you sleep on a boat rather than in a transit hotel. Tell us your flight number and the day is built around it.",
    ],
  },
  {
    id: "by-train",
    label: "By train",
    title: "The coastal line runs the length of the state.",
    body: [
      "Kerala is threaded end to end by one railway, and it is one of the pleasanter ways to see the place — palm and paddy at eye level, backwater crossings, and a country going about its business a metre from the window. Ernakulam Junction is the hub. Alappuzha and Kollam both have stations on the line, which means the backwaters are reachable without a car at all.",
      "It is not fast in the way a European train is fast, but it is often faster than the road: Ernakulam to Alappuzha takes about forty minutes by rail and can take twice that by car in the afternoon. For longer hops — Kochi down to Trivandrum, or north to Kozhikode — the train is comfortably the better answer.",
      "Book early. Indian trains open for reservation a fixed period ahead and the air-conditioned classes fill quickly, particularly around festivals and through the winter. We book them for guests as part of the itinerary, which saves a fight with a booking system that was not designed for anybody outside India.",
    ],
  },
  {
    id: "by-road",
    label: "By road",
    title: "Forty kilometres an hour, and plan around it.",
    body: [
      "This is the number that undoes first itineraries. Kerala's roads are good and they are busy, largely single carriageway, and they run through the middle of every town rather than around it. Forty kilometres an hour is a realistic average once you include the places you slow to a crawl. A hundred kilometres is not an hour here; it is two and a half, and three if it rains.",
      "Which is why the itineraries we write have fewer places in them than the ones people arrive with. Two nights somewhere is worth more than one night in two somewheres when the difference is four hours in a car. The backwaters and the tea country are three and a half hours apart; that is a morning, and it is a beautiful morning, but it is not something to do twice in a week.",
      "Cars come with a driver, always. It is not a luxury here so much as the normal arrangement — self-drive is legal and almost nobody who has seen an Indian junction wants it. The driver becomes part of the trip, which is a large part of why guests remember them by name.",
    ],
  },
  {
    id: "paperwork",
    label: "Before you fly",
    title: "The visa, and the small print.",
    body: [
      "Most British and European passport holders travel to India on an e-Visa, applied for online before departure. It is straightforward — a form, a photograph, a fee — and it usually comes back within a few days, though it is not something to leave to the last week. Rules, fees and eligible nationalities all change from time to time, so check the current position on the Indian government's own site rather than trusting a travel page. Including this one.",
      "Your passport wants six months left on it and a blank page or two. Bring the printed e-Visa approval; immigration at Kochi will ask for it even though it is electronic, and the queue is not the place to be hunting through an inbox.",
      "Nothing else is required of an ordinary traveller. No vaccination certificate is demanded at the border for arrivals from Europe, though your own doctor is the right person to ask what you personally should have. Money is simplest handled at an airport ATM on arrival — the rate is fine and it saves carrying cash through three airports.",
    ],
  },
];

export default function Chapters() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        {chapters.map((chapter, index) => (
          <article
            key={chapter.id}
            id={chapter.id}
            style={{ scrollMarginTop: "calc(var(--horizons-nav, 72px) + 32px)" }}
            className={index === 0 ? "" : "mt-20 md:mt-28"}
          >
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
                {chapter.label}
              </p>

              <h2 className="mt-7 max-w-2xl font-cormorant text-[32px] font-light leading-[1.08] text-white sm:text-5xl md:text-[46px]">
                {chapter.title}
              </h2>
            </Reveal>

            <div className="mt-9 max-w-2xl space-y-7">
              {chapter.body.map((paragraph, paragraphIndex) => (
                <Reveal key={paragraph.slice(0, 30)} delay={Math.min(paragraphIndex, 3) * 70}>
                  <p className="text-[15px] leading-8 text-white/60 md:text-[17px] md:leading-9">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </article>
        ))}
      </Container>
    </section>
  );
}

export const chapterIndex = chapters.map(({ id, label }) => ({ id, label }));
