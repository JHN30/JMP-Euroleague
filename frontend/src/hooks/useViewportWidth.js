import { useEffect, useState } from "react";

const getViewportWidth = (fallbackWidth) => {
  if (typeof window === "undefined") {
    return fallbackWidth;
  }

  return window.innerWidth;
};

const useViewportWidth = (fallbackWidth = 1024) => {
  const [viewportWidth, setViewportWidth] = useState(() => getViewportWidth(fallbackWidth));

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return viewportWidth;
};

export default useViewportWidth;
