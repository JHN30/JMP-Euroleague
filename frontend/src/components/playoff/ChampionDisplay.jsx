import { useEffect, useRef } from "react";
import { FaTrophy } from "react-icons/fa";
import { layoutCardClass } from "../layout/LayoutShell";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const championGlowStyle = {
  backgroundImage: `
    radial-gradient(circle at top center, rgba(251, 191, 36, 0.2), transparent 30%),
    radial-gradient(circle at bottom left, rgba(249, 115, 22, 0.18), transparent 28%),
    radial-gradient(circle at bottom right, rgba(253, 186, 116, 0.12), transparent 24%)
  `,
};

const ChampionDisplay = ({ champion }) => {
  const championRef = useRef(null);

  const championName = champion?.name || "Champion";

  useEffect(() => {
    if (!champion || !championRef.current) {
      return;
    }

    requestAnimationFrame(() => {
      const navbarOffset = 96;
      const top = window.scrollY + championRef.current.getBoundingClientRect().top - navbarOffset;
      const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

      window.scrollTo({
        top: Math.max(top, 0),
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  }, [champion, championName]);

  if (!champion) {
    return null;
  }

  return (
    <motion.section
      ref={championRef}
      className={`${layoutCardClass} relative overflow-hidden`}
      role="region"
      aria-labelledby="champion-title"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute inset-0" style={championGlowStyle} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-linear-to-b from-amber-300/10 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-40 w-40 -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />

      <div className="relative px-6 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-200">
            <FaTrophy className="h-3.5 w-3.5" />
            Champion
          </div>

          <div className="mt-8 flex flex-col items-center gap-6">
            <div className="relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
              <div className="absolute inset-0 rounded-full bg-linear-to-br from-amber-200/35 via-orange-300/20 to-transparent blur-[2px]" />
              <div className="absolute inset-2 rounded-full border border-amber-200/25 bg-white/3" />
              <div className="absolute inset-5 rounded-full border border-white/10 bg-slate-950/75 shadow-2xl shadow-black/30" />
              <div className="absolute inset-8 flex items-center justify-center rounded-full border border-amber-200/20 bg-slate-900/85">
                <img
                  src={champion.logoImg}
                  alt={`${championName} logo`}
                  className="h-[67%] w-[67%] object-contain drop-shadow-[0_0_18px_rgba(251,191,36,0.2)]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <h3 id="champion-title" className="text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
              {championName}
            </h3>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ChampionDisplay;
