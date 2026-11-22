import { GALLERY, GALLERY_TOTAL } from "@/data/gallery";

/*
  The opening. It says what the page is and, more to the point, where
  the photographs came from — a gallery of stock photography is worth
  nothing, and the only thing that makes this one worth looking at is
  that the company was standing there.
*/
export default function GalleryHero() {
  return (
    <section className="px-6 pb-14 pt-32 md:px-14 md:pb-20 md:pt-44">
      <p className="text-[11px] uppercase tracking-[0.38em] text-[#8B9556] md:text-[12px]">
        Gallery
      </p>

      <h1 className="mt-6 max-w-[16ch] font-cormorant text-[44px] font-light leading-[0.98] tracking-[-0.02em] text-[#F4F1EA] md:mt-7 md:text-[78px]">
        Everything, all at once.
      </h1>

      <p className="mt-7 max-w-[46ch] text-[16px] leading-relaxed text-white/50 md:mt-8 md:text-[19px]">
        {GALLERY_TOTAL} photographs from journeys we planned, taken by us and by
        the people travelling with us. Nothing bought, nothing borrowed, and
        nothing here that we have not stood in front of.
      </p>

      <p className="mt-9 text-[11px] uppercase tracking-[0.24em] text-white/30 md:mt-11 md:text-[12px]">
        {GALLERY_TOTAL} photographs &nbsp;·&nbsp; {GALLERY.length} places
      </p>
    </section>
  );
}
