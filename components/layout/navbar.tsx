export default function Navbar() {
    return (
      <nav className="absolute top-0 left-0 right-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
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
  
          <button className="rounded-full bg-white/10 border border-white/30 px-5 py-2 text-white backdrop-blur-md hover:bg-white/20 transition">
            Sign In
          </button>
        </div>
      </nav>
    );
  }