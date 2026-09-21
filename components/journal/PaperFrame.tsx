/*
  The arch and the ornamental band that frame the whole Journal, the way the
  tiled arch frames the reference. Drawn as SVG so it costs nothing and
  scales; the band repeats a single tile.
*/
export function OrnamentBand({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-10 w-full ${className}`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%23111111' stroke-width='1'%3E%3Cpath d='M20 2 L38 20 L20 38 L2 20 Z'/%3E%3Cpath d='M20 10 L30 20 L20 30 L10 20 Z'/%3E%3Cpath d='M0 0 L40 40 M40 0 L0 40'/%3E%3C/g%3E%3C/svg%3E\")",
        backgroundSize: "40px 40px",
        backgroundRepeat: "repeat-x",
        opacity: 0.35,
      }}
    />
  );
}

export function Arch({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div
        className="relative overflow-hidden bg-[#F4F2ED] px-6 py-20 md:px-16 md:py-28"
        style={{
          borderTopLeftRadius: "50% 22%",
          borderTopRightRadius: "50% 22%",
          boxShadow: "0 0 0 1px rgba(17,17,17,0.14)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
