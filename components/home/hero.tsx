export default function Hero() {
    return (
      <section
        className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
  
        <div className="relative z-10 max-w-5xl px-6 text-center text-white">
          <p className="mb-6 uppercase tracking-[0.45em] text-sm text-white/80">
            HORIZONS by Scenic Escapes
          </p>
  
          <h1 className="text-6xl font-bold leading-tight md:text-8xl">
            Find Your
            <br />
            Next Horizon.
          </h1>
  
          <p className="mx-auto mt-8 max-w-2xl text-lg text-white/80 md:text-xl">
            Discover handpicked luxury stays, boutique resorts, and unforgettable
            experiences across God's Own Country.
          </p>
  
          <button className="mt-12 rounded-full bg-[#6B7341] px-8 py-4 text-lg font-semibold text-white transition hover:bg-[#59603a]">
            Explore Kerala
          </button>
        </div>
      </section>
    );
  }