import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll to the top whenever the route (pathname) changes. Without this,
 * React Router keeps the previous scroll position, so clicking a footer or nav
 * link while scrolled down lands you mid-page on the next route — which makes
 * the links feel broken. Keyed on pathname only, so native in-page #hash
 * anchors (e.g. the Hero's "#contact") still scroll normally.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
