/**
 * Lock/unlock page scrolling while a full-screen overlay is open (Quest menu,
 * gallery album, photo lightbox).
 *
 * Setting `overflow: hidden` on <body> alone does NOT stop the page scrolling:
 * in standards mode it's the root element's (<html>) overflow that propagates to
 * the viewport, so the background still scrolled behind our modals. We lock both
 * elements, and ref-count so one overlay closing doesn't unlock while another is
 * still open.
 */
let locks = 0;
let prevHtml = "";
let prevBody = "";
let savedScrollY = 0;

export function lockScroll() {
  if (typeof document === "undefined") return;
  if (locks === 0) {
    const html = document.documentElement;
    const body = document.body;
    // capture BEFORE hiding overflow — setting overflow:hidden on the root
    // scroller resets the scroll offset to 0, so we restore it on unlock
    savedScrollY = window.scrollY;
    prevHtml = html.style.overflow;
    prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
  }
  locks += 1;
}

export function unlockScroll() {
  if (typeof document === "undefined") return;
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    document.documentElement.style.overflow = prevHtml;
    document.body.style.overflow = prevBody;
    // put the page back exactly where it was before we locked it
    window.scrollTo(0, savedScrollY);
  }
}
