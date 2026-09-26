"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

/*
  The hero.

  A photograph underneath, always — it is what the first paint shows,
  what a slow connection keeps, and what anyone who has asked for less
  movement sees. Over it, two short films that dissolve into one
  another and go round.

  Three things make the change invisible rather than merely quick:

  - The next film is fetched and decoded while the current one is
    still playing, not when it ends, so it is ready before it is
    needed and never fades in as a black rectangle.
  - The change starts FADE_MS *before* the end of the clip. Both films
    are moving throughout, so the dissolve is between two live images
    rather than between a frozen last frame and a first frame.
  - Only one element animates. The arriving film is put underneath at
    full opacity and the leaving one fades off the top of it. Fading
    both at once would cross at half and half, and the photograph
    would show through the middle of every change as a pale flash.

  Adding or reordering: edit HERO_FILMS. Five or six seconds each,
  under about 20MB for the hd set, and run new footage through
  scripts/encode-hero.sh so it arrives at 1920 wide with no audio
  track, at both sizes. One film loops on its own; an empty list
  leaves the photograph, and nothing else here changes.
*/
const HERO_POSTER = {
  landscape: "/images/hero/hero-poster.jpg",
  /* The same frame, cropped where the portrait film is cropped. */
  portrait: "/images/hero/hero-poster-portrait.jpg",
  alt: "Dusk over the Kuttanad backwaters",
};

const HERO_FILMS = [
  /* Kuttanad at dusk — the paddy bunds, a boat, the red-roofed house. */
  "hero-1.mp4",
  /* The high range at sunrise, mist still in the valleys. */
  "hero-2.mp4",
  /* Theyyam, and the fire. The dark end of the clip, slowed. */
  "hero-3.mp4",
  /* A kettuvallam on open water — the thing we actually own. */
  "hero-4.mp4",
  /* The channel through the mangroves, and back to the beginning. */
  "hero-5.mp4",
];

/*
  Two renditions of every film, and the screen decides.

  hd is 1920 wide: what a laptop actually displays. sd is 1280, which
  is not a worse picture on a phone but the right one — a 390pt screen
  at three times the density is 1170 physical pixels, so 1280 lands
  almost exactly and 1920 would be a third of a file thrown away.

  The quality setting is per film rather than one number for all five,
  because the eye does not look at them the same way. The dusk sky and
  the firelight get the most bits, since a smooth gradient and a deep
  shadow are where compression shows as banding. The mangrove channel
  gets the fewest: dense moving foliage hides artefacts completely,
  and at an even setting that one clip alone was nine megabytes.
*/
const RENDITIONS = {
  /* 1920 wide: what a laptop actually displays. */
  hd: "/video/hd/",
  /*
    1280 wide, for a narrow window that is still landscape. Not a
    worse picture, a smaller one.
  */
  sd: "/video/sd/",
  /*
    Cut again for a phone held upright.

    A hero that fills a 390 by 844 screen is a tall box, and a 16:9
    film poured into it with object-cover keeps about a quarter of its
    width. Centre-cropping chose that quarter by arithmetic: the
    theyyam clip lost the headdress entirely and became a black
    rectangle with a flame in it.

    So each film is cropped again from the original 4K, by hand, to
    the ninth of the frame that carries the picture — the house on the
    bund, the sun over the hills, the dancer rather than the fire, the
    boat in the channel. 1080 by 1920, which is what the screen is.
  */
  mb: "/video/mb/",
};

/*
  Upright and narrow gets the portrait cut. The test is the shape of
  the window rather than its width, so a phone turned sideways gets
  the landscape films, which is what it is now showing.
*/
function renditionFor() {
  const { innerWidth: w, innerHeight: h } = window;

  if (w / h < 0.85) return RENDITIONS.mb;

  return w >= 1024 ? RENDITIONS.hd : RENDITIONS.sd;
}

/* Short enough to read as a change of light rather than a transition. */
const FADE_MS = 650;

/*
  Three reasons not to fetch several megabytes of film: the visitor has
  asked for less movement, the browser is in data-saver mode, or it is
  telling us the connection is slow. In all three the photograph is the
  whole hero, which is why the photograph is the base layer rather than
  a fallback.
*/
function filmsAreWelcome() {
  if (!HERO_FILMS.length) return false;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }

  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;

  if (connection?.saveData) return false;

  if (
    connection?.effectiveType &&
    /^(slow-)?2g$|^3g$/.test(connection.effectiveType)
  ) {
    return false;
  }

  return true;
}

export default function Hero() {
  const first = useRef<HTMLVideoElement>(null);
  const second = useRef<HTMLVideoElement>(null);

  /* Which layer is showing. -1 until the first film is actually running. */
  const [shown, setShown] = useState(-1);

  const upcoming = useRef(0);
  const rendition = useRef(RENDITIONS.sd);

  /*
    One flag per layer, not one between them.

    A single shared flag deadlocked after one round. The leaving clip
    goes on playing all through the dissolve, so it fires timeupdate
    again after the arriving clip has already reset the flag — it set
    the flag a second time, and the arriving clip then found it
    already set when its own turn came and handed over to nobody. Both
    films stopped, and it took a full cycle to show up.
  */
  const handedOver = useRef<[boolean, boolean]>([false, false]);

  const layerOf = useCallback(
    (layer: 0 | 1) => (layer === 0 ? first : second).current,
    [],
  );

  /* Point a layer at the next film and get it decoded, but do not play it. */
  const prepare = useCallback(
    (layer: 0 | 1) => {
      const node = layerOf(layer);

      if (!node) return;

      node.src = rendition.current + HERO_FILMS[upcoming.current];
      upcoming.current = (upcoming.current + 1) % HERO_FILMS.length;

      node.load();
    },
    [layerOf],
  );

  useEffect(() => {
    if (!filmsAreWelcome()) return;

    rendition.current = renditionFor();

    const offs: (() => void)[] = [];
    const timers: number[] = [];

    ([0, 1] as const).forEach((layer) => {
      const node = layerOf(layer);

      if (!node) return;

      const other = layer === 0 ? 1 : 0;

      const onPlaying = () => {
        setShown(layer);
        handedOver.current[layer] = false;

        /*
          Get the next one ready — but not until the dissolve is over.
          Pointing a layer at a new file resets it to a black first
          frame, and that layer is the one still fading out on top of
          this one. Doing it immediately put the first frame of the
          next clip into the middle of the change, which is the one
          thing the whole arrangement exists to avoid. There are still
          four seconds of lead time afterwards.
        */
        if (HERO_FILMS.length > 1) {
          const timer = window.setTimeout(() => prepare(other), FADE_MS + 120);

          timers.push(timer);
        }
      };

      /*
        The handover, started early. `timeupdate` fires a few times a
        second, which is close enough for a change measured in
        hundreds of milliseconds and survives a stall in a way a
        timer set at the start would not.
      */
      const onTime = () => {
        if (handedOver.current[layer] || HERO_FILMS.length < 2) return;
        if (!Number.isFinite(node.duration)) return;
        if (node.duration - node.currentTime > FADE_MS / 1000) return;

        handedOver.current[layer] = true;

        const incoming = layerOf(other);

        if (!incoming) return;

        /*
          Only rewind one that has actually been somewhere. A freshly
          prepared clip is already at zero, and asking for a seek it
          does not need makes it stutter on its first few frames —
          which are the frames showing through the dissolve.
        */
        if (incoming.currentTime > 0.05) incoming.currentTime = 0;

        incoming.play().catch(() => {});
      };

      /*
        A single film has nobody to hand over to, and a clip whose
        handover never fired — a stall, a tab in the background — must
        still go somewhere rather than stop on its last frame.
      */
      const onEnded = () => {
        if (HERO_FILMS.length < 2) {
          node.currentTime = 0;
          node.play().catch(() => {});

          return;
        }

        if (handedOver.current[layer]) return;

        handedOver.current[layer] = true;

        const incoming = layerOf(other);

        if (!incoming) return;

        if (incoming.currentTime > 0.05) incoming.currentTime = 0;

        incoming.play().catch(() => {});
      };

      node.addEventListener("playing", onPlaying);
      node.addEventListener("timeupdate", onTime);
      node.addEventListener("ended", onEnded);

      offs.push(() => {
        node.removeEventListener("playing", onPlaying);
        node.removeEventListener("timeupdate", onTime);
        node.removeEventListener("ended", onEnded);
      });
    });

    prepare(0);

    // Autoplay is refused often enough — a battery-saving phone, a
    // browser setting — that it has to be treated as an ordinary
    // outcome rather than an error. The photograph stands.
    layerOf(0)
      ?.play()
      .catch(() => {});

    return () => {
      offs.forEach((off) => off());
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [layerOf, prepare]);

  /*
    The arriving layer is opaque and underneath; the leaving one is on
    top and is the only thing that animates.
  */
  const layerStyle = (layer: 0 | 1) => ({
    opacity: shown === layer ? 1 : 0,
    zIndex: shown === layer ? 1 : 2,
    transition: shown === layer ? "none" : `opacity ${FADE_MS}ms linear`,
  });

  return (
    <section className="relative flex min-h-lvh items-center justify-center overflow-hidden bg-[#111111]">
      <Image
        src={HERO_POSTER.landscape}
        alt={HERO_POSTER.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover portrait:hidden"
      />

      <Image
        src={HERO_POSTER.portrait}
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover portrait:block"
      />

      {/*
        Written out twice rather than mapped. The two layers are two
        distinct refs, and a ref handed out of an array is the kind of
        thing that works until someone reorders it.
      */}
      <video
        ref={first}
        muted
        playsInline
        preload="auto"
        aria-hidden
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover"
        style={layerStyle(0)}
      />

      <video
        ref={second}
        muted
        playsInline
        preload="auto"
        aria-hidden
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover"
        style={layerStyle(1)}
      />

      <div
        aria-hidden
        className="absolute inset-0 z-[3] bg-gradient-to-b from-black/25 via-black/10 to-black/40"
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center text-[#F7F4EE]">
        {/*
          The three lines below now use the same vocabulary as every
          other page: a micro label in tracked capitals, Cormorant for
          anything that carries the brand's voice, and a link set in
          small tracked capitals rather than as a sentence. The hero
          was the one place still speaking in the body font.
        */}
        <p className="mb-7 text-[10px] uppercase tracking-[0.35em] text-white/65">
          By Scenic Escapes
        </p>

        <h1 className="font-cormorant text-[54px] font-medium leading-none tracking-[-0.02em] sm:text-[76px] md:text-[118px] lg:text-[150px]">
          HORIZONS
        </h1>

        <p className="mt-7 max-w-xl font-cormorant text-[24px] font-light leading-snug text-white/90 sm:text-[28px] md:text-[34px]">
          Find Your Next Horizon.
        </p>

        <Link
          href="/houseboats"
          className="group mt-11 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/75 transition-colors duration-300 hover:text-white"
        >
          Begin Journey
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
