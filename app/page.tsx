import Navbar from "@/components/layout/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F5F2]">
      <Navbar />

      <section className="flex min-h-screen items-center justify-center">
        <div className="text-center px-6">
          <p className="text-sm uppercase tracking-[0.4em] text-[#6B7341] mb-4">
            by Scenic Escapes
          </p>

          <h1 className="text-7xl font-bold tracking-tight text-[#1F2937]">
            HORIZONS
          </h1>

          <p className="mt-6 text-2xl text-gray-600">
            Find Your Next Horizon.
          </p>

          <button className="mt-10 rounded-full bg-[#6B7341] px-8 py-4 text-white text-lg font-medium transition hover:bg-[#556032]">
            Explore Kerala
          </button>
        </div>
      </section>
    </main>
  );
}