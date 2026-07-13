import Button from "../ui/Button";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
        <p className="mb-6 text-sm uppercase tracking-[0.45em] text-white/80">
          Horizons by Scenic Escapes
        </p>

        <h1 className="text-6xl font-bold leading-tight md:text-8xl">
          Find Your
          <br />
          Next Horizon.
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-xl text-white/90">
          Discover handpicked luxury stays, boutique resorts, and unforgettable
          experiences across God's Own Country.
        </p>

        <Button className="mt-12">
          Explore Kerala
        </Button>
      </div>
    </section>
  );
}