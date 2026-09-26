import Image from "next/image";

/*
  The masthead, back to how it was written: the three-line title, the
  original line beneath it, and the two overlays — a flat tint and a
  gradient over it — that gave the photograph its darkness.
*/
export default function HouseboatHero() {
  return (
    <section className="relative min-h-lvh overflow-hidden bg-[#111111]">
      {/* Background image */}
      <Image
        src="/images/houseboats/hero.png"
        alt="A kettuvallam on the Alleppey backwaters"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* The tint, and the gradient over it */}
      <div aria-hidden className="absolute inset-0 bg-black/45" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-lvh items-center justify-center px-6">
        <div className="max-w-4xl text-center text-white">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/65">
            Alleppey · The backwaters
          </p>

          <h1 className="mt-6 font-cormorant text-[44px] font-light leading-none sm:text-6xl md:text-8xl xl:text-9xl">
            Curated
            <br />
            Houseboat
            <br />
            Experiences
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/80">
            Discover handpicked luxury and traditional houseboats from trusted
            local operators across Kerala&rsquo;s serene backwaters.
          </p>
        </div>
      </div>
    </section>
  );
}
