import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component - automatically scrolls window to top on route change
 * Place this component inside Router but outside Routes
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
