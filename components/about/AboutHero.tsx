import Image from "next/image";

export default function AboutHero() {
    return (
      <section className="relative flex min-h-lvh items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/about/hero.jpg"
          alt="A mahout and child with an elephant in the South Indian forest"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
  
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />
  
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center text-white">
          <p className="mb-6 text-sm uppercase tracking-[0.45em] text-white/80">
            About HORIZONS
          </p>
  
          <h1 className="font-cormorant text-5xl leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl">
            Crafting Extraordinary
            <br />
            Journeys Across South India
          </h1>
  
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Rooted in nearly three decades of local expertise, HORIZONS creates
            tailor-made journeys through Kerala and the timeless landscapes of
            South India.
          </p>
        </div>
      </section>
    );
  }