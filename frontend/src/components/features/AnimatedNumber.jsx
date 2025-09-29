import { useState, useEffect, useRef } from "react";

const AnimatedNumber = ({ value, duration = 2000, decimals = 2 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const startValue = displayValue;
    const endValue = value;

    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * easeOutCubic;

      setDisplayValue(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration, displayValue]);

  return <span>{displayValue.toFixed(decimals)}</span>;
};

export default AnimatedNumber;