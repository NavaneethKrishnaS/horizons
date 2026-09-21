/*
  A throttle that always runs once more at the end.

  The plain version — "if it has been less than N ms, return" — drops
  the last event of a gesture whenever that event lands inside the
  window. For a scroll handler that is not a lost frame, it is a lost
  final position: flick the page back to the top and the very last
  scroll event, the one that says scrollY is 0, is the one thrown
  away. The navbar then stays in its scrolled state at the top of the
  page until something else happens to move it.

  So the leading call still fires immediately, and anything arriving
  during the quiet window schedules one trailing call for the moment
  the window closes. The handler sees the final position every time.
*/
export function throttle(fn: () => void, ms: number) {
  let last = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const run = () => {
    const now = performance.now();
    const wait = ms - (now - last);

    if (wait <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = undefined;
      }

      last = now;
      fn();

      return;
    }

    // One trailing call is enough; it will see the position at the time
    // it runs, not the position that scheduled it.
    if (timer) return;

    timer = setTimeout(() => {
      timer = undefined;
      last = performance.now();
      fn();
    }, wait);
  };

  const cancel = () => {
    if (!timer) return;

    clearTimeout(timer);
    timer = undefined;
  };

  /* Makes the next run() fire immediately rather than wait its turn. */
  const reset = () => {
    last = 0;
  };

  return { run, cancel, reset };
}
