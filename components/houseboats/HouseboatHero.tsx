import Image from "next/image";

export default function HouseboatHero() {
  return (
    <section className="relative min-h-lvh overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/houseboats/hero.png"
        alt="Kerala Houseboats"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

      {/* Content */}
      <div className="relative z-10 flex min-h-lvh items-center justify-center px-6">
        <div className="max-w-4xl text-center text-white">
          <p className="mb-5 text-xs uppercase tracking-[0.45em] text-white/70">
            KERALA BACKWATERS
          </p>

          <h1 className="font-serif text-[44px] leading-none sm:text-6xl md:text-8xl xl:text-9xl">
            Curated
            <br />
            Houseboat
            <br />
            Experiences
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/80">
            Discover handpicked luxury and traditional houseboats from trusted
            local operators across Kerala's serene backwaters.
          </p>
        </div>
      </div>
    </section>
  );
}