export default function AboutStory() {
    return (
      <section className="bg-neutral-950 px-6 py-28 text-white sm:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            {/* Section label */}
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                Our Story
              </p>
            </div>
  
            {/* Story */}
            <div>
              <h2 className="font-cormorant text-4xl leading-tight sm:text-5xl lg:text-6xl">
                A journey shaped by
                <br />
                experience, place & people.
              </h2>
  
              <div className="mt-10 space-y-6 text-base leading-8 text-white/65 sm:text-lg">
                <p>
                  HORIZONS was born from a deep understanding of South India
                  and a belief that travel should be more than simply visiting
                  beautiful places.
                </p>
  
                <p>
                  With nearly three decades of experience in travel, we have
                  built our approach around something simple — understanding
                  the people, places and stories that make every journey
                  meaningful.
                </p>
  
                <p>
                  From the quiet backwaters of Kerala to its ancient traditions,
                  landscapes and living culture, we create journeys that feel
                  personal, considered and distinctly your own.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }