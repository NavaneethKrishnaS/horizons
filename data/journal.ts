/*
  The Journal is one story, told in six movements, ending with the man who
  runs the company. Copy lives here so it can be rewritten without touching
  the page.

  Historical detail is checked: kathakali emerged in Kerala over the 16th and
  17th centuries and has 24 principal mudras; a chundan vallam runs 100–120
  feet and carries between 64 and 128 rowers, a craft roughly eight centuries
  old; the Nehru Trophy has been raced on Punnamada Lake since 1952.
*/

export interface JournalChapter {
  id: string;
  label: string;
  heading: string;
  paragraphs: string[];
  quote?: string;
  image: { src: string; alt: string };

  // Set once a scrubbed frame sequence exists for this chapter.
  sequence?: { dir: string; frames: number };
}

export const journalIntro = {
  label: "The Journal",
  heading: "A country that begins at the water.",
  standfirst:
    "Kerala is four hundred miles of coast, forty-four rivers and a network of lagoons that people have lived on rather than beside for as long as anyone has counted. This is the story of that water, and of what grew along it.",
};

export const journalChapters: JournalChapter[] = [
  {
    id: "spice-coast",
    label: "One",
    heading: "The world came here first for pepper.",
    paragraphs: [
      "Long before Europe had a name for this coast, Roman ships were sailing to it on the summer monsoon and going home heavy with black pepper, cardamom and ginger. The port they came to was called Muziris. Arab, Chinese and Jewish traders followed the same winds, then the Portuguese, the Dutch and the British after them.",
      "What that traffic left behind is not ruins but habits. A synagogue in Mattancherry. Churches older than most in Europe. And along the harbour at Fort Kochi, the cantilevered fishing nets the town still calls cheena vala — Chinese nets — dipped and raised by hand at dawn, exactly as they have been for centuries.",
    ],
    quote:
      "Everything that ever arrived in Kerala arrived by water, and most of it stayed.",
    image: {
      src: "/images/about/backwaters.jpg",
      alt: "Chinese fishing nets silhouetted against the Kerala backwaters at dusk",
    },
  },
  {
    id: "kathakali",
    label: "Two",
    heading: "A face that takes six hours to paint.",
    paragraphs: [
      "Kathakali took its present form in Kerala across the sixteenth and seventeenth centuries, drawing on temple ritual and martial art already a thousand years old. It tells the Mahabharata and the Ramayana with no spoken word at all.",
      "The performer speaks instead with twenty-four principal hand gestures and with his face — the nine rasas, each one drilled for years until grief and fury can be summoned by muscle alone. The eyes are trained separately. Students spend months moving nothing else.",
      "Green paint, pacha, marks a noble character: a king, a god, a man who will do the right thing. The rice-paste frame around the face is built up in ridges over hours while the actor lies still. Traditionally the play began at dusk and finished at dawn.",
    ],
    quote:
      "Nothing is said. Everything is understood.",
    image: {
      src: "/images/about/kadhakali-1.jpg",
      alt: "A kathakali performer in pacha green makeup and full costume",
    },
  },
  {
    id: "kalakal",
    label: "Three",
    heading: "A body trained from the age of six.",
    paragraphs: [
      "Kerala did not produce one art form. It produced a habit of training the body until it can do something no untrained body can, and then doing that thing for a reason other than applause.",
      "Mohiniyattam is the state's own classical dance — the name means the dance of the enchantress. It is danced solo, traditionally by women, in a plain white sari bordered in gold, the hair gathered into a single bun on the left side and ringed with jasmine. Where kathakali is declamatory, this is lasya: slow, curved, deliberately unhurried.",
      "In the far north, theyyam is something else entirely. Across the seven months from October the shrines of Kannur and Kasaragod host some four hundred and fifty distinct forms of it, each with its own face-painting and its own towering mudi. When that headdress is placed on the performer, the belief is not that he is playing the deity. It is that the deity has arrived.",
      "And in the kalari, the earthen pit where kalaripayattu is taught, children begin at six and learn to fall before they learn to strike.",
    ],
    quote:
      "None of it was invented for visitors. That is precisely why it is worth seeing.",
    image: {
      src: "/images/about/kadhakali-2.jpg",
      alt: "A theyyam performer in a towering headdress at a north Malabar shrine",
    },
  },
  {
    id: "vallamkali",
    label: "Four",
    heading: "A hundred men, one heartbeat.",
    paragraphs: [
      "A chundan vallam is between a hundred and a hundred and twenty feet of curved hull, and it carries anywhere from sixty-four to a hundred and twenty-eight rowers. It is the largest vessel in the world raced as sport. The way they are built has not meaningfully changed in eight hundred years; the first was commissioned as a war boat in the thirteenth century.",
      "Through the monsoon months, in the weeks around Onam, villages race them. The crews are not athletes flown in for the day — they are the men of the village, and the boat belongs to everyone in it.",
      "They row to the vanchipattu, the boat song. It is not accompaniment. It is the metronome: a hundred blades entering the water on the same syllable, which is the only way a boat that long moves in a straight line. Since 1952 the biggest of these races has been rowed on Punnamada Lake at Alappuzha, an hour from where we live.",
    ],
    image: {
      src: "/images/about/kadhakali-2.jpg",
      alt: "Snake boat crews racing on the backwaters during the Onam season",
    },
  },
  {
    id: "kettuvallam",
    label: "Five",
    heading: "A boat tied together without a single nail.",
    paragraphs: [
      "Kettuvallam means tied boat, and the name is literal. Planks of jackwood are stitched edge to edge with coir rope and sealed with boiled cashew resin. No iron anywhere. Built properly, one lasts generations, and any part of it can be untied and replaced.",
      "For centuries these were freight. They moved rice and spices down the canals to the coast, poled by two men, with a thatched hood at the stern where the crew slept. When the roads came, the trade went to lorries and the barges were left to rot in the shallows.",
      "In the 1990s a handful of people in Alumkadavu began rebuilding them for guests instead of cargo — the same hull, the same coir, the same jackwood, with rooms inside. That is the village our founder is from, and that is where our boats come from still.",
    ],
    quote:
      "The backwaters are not a product we learned to sell. They are where we are from.",
    image: {
      src: "/images/houseboats/1-bedroom/cover.jpeg",
      alt: "A kettuvallam houseboat moored on the Alleppey backwaters",
    },
  },
];

export const journalFounder = {
  label: "Six",
  name: "Surjith Somasundaram",
  role: "Founder, Scenic Escapes India",
  heading: "The man who answers the phone.",
  paragraphs: [
    "Surjith was born in Alumkadavu, near Karunagappally, in the village where the houseboat was reinvented. He began his career alongside Mr Babu Varghese of Tourindia, who converted the first of the old rice barges into something a guest could sleep on.",
    "Nearly three decades later he still lives on the same water. He knows which bend of the canal is quiet in the evening, which toddy shop is worth stopping at, and which captain to send out with a family travelling with small children.",
    "HORIZONS is deliberately small. When you write to us, he reads it.",
  ],
  quote: "Welcome a tourist, and send back a friend.",
  image: {
    src: "/images/journal/founder-portrait.webp",
    alt: "An engraved portrait of Surjith Somasundaram",
  },
};

export const journalClosing = {
  heading: "Come with curiosity. Leave with a story.",
  body: "We would be glad to have you travel with us.",
};
