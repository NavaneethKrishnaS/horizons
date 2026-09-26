"use client";

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

  /*
    Everything else gets the full-sized files and keeps them unless
    the connection says otherwise — which it says by stalling, not by
    being asked. navigator.connection.downlink is a rounded guess
    from whatever the browser measured last, and on a good line it
    reads low often enough that trusting it would hand a small file
    to a large screen for no reason. So: start at hd, and step down
    the first time a clip cannot keep up. See `downgrade` below.
  */
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

  /*
    The same fact as `shown`, in a ref.

    The handlers below run outside React's render and have to know
    which layer owns the screen *now*, not at the next paint. Every
    decision here is made against this, and `shown` exists only to
    move the opacity.
  */
  const active = useRef(-1);

  /* The film the next prepare() will take. */
  const nextFilm = useRef(0);

  /*
    Set while a change is in flight — from asking the other layer to
    play until it actually plays. It replaces the pair of per-layer
    flags this used to keep, which could both end up set with nobody
    left to clear them.
  */
  const busy = useRef(false);

  const rendition = useRef(RENDITIONS.sd);

  const layerOf = useCallback(
    (layer: 0 | 1) => (layer === 0 ? first : second).current,
    [],
  );

  /* Point a layer at the next film and get it decoded, but do not play it. */
  const prepare = useCallback(
    (layer: 0 | 1) => {
      const node = layerOf(layer);

      if (!node) return;

      /*
        Never the layer on screen. This is what used to stop the hero
        dead: a stalled clip fires `playing` again when it recovers,
        that scheduled a second prepare, and the second one pointed
        the *playing* layer at a new file. It reloads to a black first
        frame, nothing is playing any more, and no event ever arrives
        to start it again — the hero stands there looking like a
        photograph until the page is reloaded.
      */
      if (layer === active.current) return;

      node.src = rendition.current + HERO_FILMS[nextFilm.current];
      nextFilm.current = (nextFilm.current + 1) % HERO_FILMS.length;

      node.load();
    },
    [layerOf],
  );

  useEffect(() => {
    if (!filmsAreWelcome()) return;

    rendition.current = renditionFor();

    const offs: (() => void)[] = [];

    let prepareTimer = 0;
    let failsafe = 0;
    let recoveries = 0;

    const other = (layer: number) => (layer === 0 ? 1 : 0) as 0 | 1;

    /*
      The connection has told us something by stalling. Take the
      smaller set from here on — the films already loaded finish as
      they are, and every one after arrives at 1280 instead of 1920.
      Between a third and a quarter of the bytes, which is the
      difference between a clip that keeps up and one that does not.
    */
    const downgrade = () => {
      if (rendition.current !== RENDITIONS.hd) return;

      rendition.current = RENDITIONS.sd;
    };

    /*
      Start the change. Guarded by `busy` so the several events that
      can ask for it — the last half second of the clip, its end, a
      stall the watchdog noticed — only ever produce one.
    */
    const handover = () => {
      if (HERO_FILMS.length < 2 || busy.current) return;

      const from = active.current;

      if (from !== 0 && from !== 1) return;

      const to = other(from);
      const incoming = layerOf(to);

      if (!incoming) return;

      /* A prepare that never happened, or was skipped. Take one now. */
      if (!incoming.getAttribute("src")) prepare(to);

      busy.current = true;

      /*
        Only rewind one that has actually been somewhere. A freshly
        prepared clip is already at zero, and asking for a seek it
        does not need makes it stutter on its first few frames —
        which are the frames showing through the dissolve.
      */
      if (incoming.currentTime > 0.05) incoming.currentTime = 0;

      incoming.play().catch(() => {
        busy.current = false;
      });

      /*
        If it has not started within a second and a half — the file is
        still arriving, the decoder is busy — let the flag go and ask
        again. A late change is better than a hero that has stopped.
      */
      window.clearTimeout(failsafe);

      failsafe = window.setTimeout(() => {
        if (!busy.current) return;

        busy.current = false;
        downgrade();
        incoming.play().catch(() => {});
      }, 1500);
    };

    ([0, 1] as const).forEach((layer) => {
      const node = layerOf(layer);

      if (!node) return;

      const onPlaying = () => {
        /*
          A clip that recovers from buffering fires this again. It is
          already the one on screen and nothing about the arrangement
          has changed, so there is nothing to do — and everything to
          avoid doing.
        */
        if (active.current === layer) return;

        /*
          And only a layer that is genuinely running may take the
          screen. Handing it to one that is standing still is how the
          hero ends up as a photograph: the layer actually playing is
          then treated as the spare and gets pointed at the next file.
        */
        if (node.paused || node.ended) return;

        active.current = layer;
        busy.current = false;
        setShown(layer);

        window.clearTimeout(failsafe);

        /*
          Get the next one ready — but not until the dissolve is over.
          Pointing a layer at a new file resets it to a black first
          frame, and that layer is the one still fading out on top of
          this one. There are still four seconds of lead time
          afterwards.
        */
        if (HERO_FILMS.length > 1) {
          window.clearTimeout(prepareTimer);

          prepareTimer = window.setTimeout(
            () => prepare(other(layer)),
            FADE_MS + 120,
          );
        }
      };

      /*
        The handover, started early. `timeupdate` fires a few times a
        second, which is close enough for a change measured in
        hundreds of milliseconds and survives a stall in a way a
        timer set at the start would not.
      */
      const onTime = () => {
        if (active.current !== layer) return;
        if (!Number.isFinite(node.duration)) return;
        if (node.duration - node.currentTime > FADE_MS / 1000) return;

        handover();
      };

      /*
        A single film has nobody to hand over to, and a clip whose
        early handover never fired — a stall, a tab in the background
        — must still go somewhere rather than stop on its last frame.
      */
      const onEnded = () => {
        if (HERO_FILMS.length < 2) {
          node.currentTime = 0;
          node.play().catch(() => {});

          return;
        }

        if (active.current !== layer) return;

        handover();
      };

      /*
        A file that will not load must not take the hero down with it.
        If it was on screen, move on; if it was the one waiting, give
        that layer the film after it. Bounded, so five bad files end
        as the photograph rather than as a loop.
      */
      const onError = () => {
        if (recoveries > HERO_FILMS.length) return;

        recoveries += 1;

        if (active.current === layer) {
          handover();

          return;
        }

        prepare(layer);
      };

      node.addEventListener("playing", onPlaying);
      node.addEventListener("timeupdate", onTime);
      node.addEventListener("ended", onEnded);
      node.addEventListener("error", onError);

      offs.push(() => {
        node.removeEventListener("playing", onPlaying);
        node.removeEventListener("timeupdate", onTime);
        node.removeEventListener("ended", onEnded);
        node.removeEventListener("error", onError);
      });
    });

    /*
      The watchdog.

      Every event this depends on is one the browser may simply not
      send: a clip that stalls stops firing `timeupdate` and never
      reaches `ended`, a backgrounded tab pauses the video, and a
      refused autoplay produces nothing at all. Half a second of
      arithmetic covers all three, and costs nothing next to the film
      it is watching.
    */
    let lastTime = -1;
    let still = 0;
    let ticks = 0;

    const watchdog = window.setInterval(() => {
      ticks += 1;

      /* Nothing has ever played: autoplay was refused. Ask again. */
      if (active.current !== 0 && active.current !== 1) {
        if (ticks % 4 === 0)
          layerOf(0)
            ?.play()
            .catch(() => {});

        return;
      }

      const node = layerOf(active.current as 0 | 1);

      if (!node) return;

      if (node.ended) {
        handover();

        return;
      }

      if (node.paused) {
        node.play().catch(() => {});

        return;
      }

      if (Math.abs(node.currentTime - lastTime) < 0.01) {
        still += 1;

        /* Three seconds without a new frame is a stall, not a pause. */
        if (still >= 6) {
          still = 0;
          downgrade();
          handover();
        }
      } else {
        still = 0;
      }

      lastTime = node.currentTime;
    }, 500);

    /*
      Coming back to the tab. Browsers pause a backgrounded video and
      do not always resume it, which is the other way this used to be
      found standing still.
    */
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      if (active.current !== 0 && active.current !== 1) return;

      layerOf(active.current as 0 | 1)
        ?.play()
        .catch(() => {});
    };

    document.addEventListener("visibilitychange", onVisible);

    prepare(0);

    // Autoplay is refused often enough — a battery-saving phone, a
    // browser setting — that it has to be treated as an ordinary
    // outcome rather than an error. The photograph stands, and the
    // watchdog keeps asking.
    layerOf(0)
      ?.play()
      .catch(() => {});

    return () => {
      offs.forEach((off) => off());

      document.removeEventListener("visibilitychange", onVisible);

      window.clearInterval(watchdog);
      window.clearTimeout(prepareTimer);
      window.clearTimeout(failsafe);

      /*
        Back to a standing start. In development this effect is run
        twice on purpose, and without this the second run would carry
        the first one's place in the reel.
      */
      active.current = -1;
      busy.current = false;
      nextFilm.current = 0;
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
      {/*
        The photograph, as a plain picture element.

        It was two next/image layers, one hidden by CSS in each
        orientation — which meant the browser preloaded both and threw
        one away on every visit, and warned about the sizes of the one
        it could not measure. A picture element lets the preload
        scanner read the media query and fetch exactly the one that
        will be shown. Both files are already cut to the size they are
        displayed at, 288KB and 132KB, so the optimiser was adding
        little beyond the second download.
      */}
      <picture>
        <source
          media="(orientation: portrait)"
          srcSet={HERO_POSTER.portrait}
          width={1080}
          height={1922}
        />

        <img
          src={HERO_POSTER.landscape}
          alt={HERO_POSTER.alt}
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

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
