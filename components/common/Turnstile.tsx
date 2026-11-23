"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

/*
  Cloudflare Turnstile — the robot check on the enquiry forms.

  Managed mode: most people see a small box tick itself and are asked
  nothing. There are no puzzles and no pictures of traffic lights. The
  token it hands back is checked by our server before any mail is sent,
  so a token forged in the browser buys nothing.

  It is the fifth layer rather than the first. The origin check, the
  honeypot, the time trap and the gibberish test all still run, and they
  cost the visitor nothing. This was added because they were not enough
  on their own.

  The site key is public by design — it identifies the widget, it does
  not authorise anything. Its partner, the secret, lives only in Vercel.
  Until the key is set the widget renders with Cloudflare's own test key,
  which always passes, so the forms keep working while it is being set up.
*/

const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/*
  The site key is public by design — it names the widget and authorises
  nothing, which is why it sits here rather than in an environment
  variable. Its partner, the secret, is only in Vercel as
  TURNSTILE_SECRET_KEY and must never appear in this project.

  The widget is bound in Cloudflare to horizonsindia.com and
  www.horizonsindia.com. It will refuse to run on any other hostname,
  which is why localhost gets Cloudflare's own test key instead — that
  one always passes, so the forms can be worked on without the server
  check standing in the way.
*/
const SITE_KEY = "0x4AAAAAAGOXYrqHmmrQx6SV";
const TEST_SITE_KEY = "1x00000000000000000000AA";

const keyFor = (hostname: string) =>
  ["localhost", "127.0.0.1", "[::1]"].includes(hostname)
    ? TEST_SITE_KEY
    : SITE_KEY;

type Api = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: Api;
  }
}

/* Loaded once, the first time a form appears, and never on a page without one. */
let loading: Promise<Api> | null = null;

function load(): Promise<Api> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (loading) return loading;

  loading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT;
    script.async = true;
    script.onload = () =>
      window.turnstile
        ? resolve(window.turnstile)
        : reject(new Error("Turnstile loaded but did not register"));
    script.onerror = () => {
      loading = null;
      reject(new Error("Turnstile did not load"));
    };
    document.head.appendChild(script);
  });

  return loading;
}

export type TurnstileHandle = { reset: () => void };

type TurnstileProps = {
  /* The token once the check passes; "" when it expires or is reset. */
  onToken: (token: string) => void;
  /* The check could not run at all — blocked, offline, script refused. */
  onFail?: () => void;
  className?: string;
};

const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(function Turnstile(
  { onToken, onFail, className = "" },
  ref,
) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);

  /* The latest callbacks, without re-rendering the widget when they change. */
  const callbacks = useRef({ onToken, onFail });
  callbacks.current = { onToken, onFail };

  useImperativeHandle(ref, () => ({
    reset: () => {
      callbacks.current.onToken("");
      if (widget.current && window.turnstile) {
        window.turnstile.reset(widget.current);
      }
    },
  }));

  useEffect(() => {
    let alive = true;

    load()
      .then((api) => {
        if (!alive || !box.current) return;

        widget.current = api.render(box.current, {
          sitekey: keyFor(window.location.hostname),
          theme: "light",
          size: "flexible",
          callback: (token: string) => callbacks.current.onToken(token),
          "expired-callback": () => callbacks.current.onToken(""),
          "error-callback": () => {
            callbacks.current.onToken("");
            callbacks.current.onFail?.();
          },
        });
      })
      .catch(() => {
        if (alive) callbacks.current.onFail?.();
      });

    return () => {
      alive = false;
      if (widget.current && window.turnstile) {
        window.turnstile.remove(widget.current);
      }
      widget.current = null;
    };
  }, []);

  return <div ref={box} className={`min-h-[65px] ${className}`} />;
});

export default Turnstile;
