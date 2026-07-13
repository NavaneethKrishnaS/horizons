import Container from "../ui/Container";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <Container>
        <div className="flex items-center justify-between py-6">
          <div>
            <h1 className="text-2xl font-bold text-white">
              HORIZONS
            </h1>

            <p className="text-xs uppercase tracking-[0.35em] text-white/80">
              by Scenic Escapes
            </p>
          </div>

          <div className="hidden md:flex items-center gap-8 text-white">
            <a href="#">Hotels</a>
            <a href="#">Experiences</a>
            <a href="#">Destinations</a>
            <a href="#">About</a>
          </div>

          <button className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-white backdrop-blur-md transition hover:bg-white/20">
            Sign In
          </button>
        </div>
      </Container>
    </nav>
  );
}