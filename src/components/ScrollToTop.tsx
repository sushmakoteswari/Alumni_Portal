import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets window scroll on navigation so e.g. /register always opens at the top
 * (hero + form), not at a previous scroll position from another page.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
