import { pageCardClass } from "../layout/PageShell";

const ChampionDisplay = ({ champion }) => {
  if (!champion) {
    return null;
  }

  const fallbackLabel = champion.name?.slice(0, 2)?.toUpperCase() || "??";

  return (
    <section className={`${pageCardClass} relative overflow-hidden`} role="region" aria-labelledby="champion-title">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-400/10 to-rose-500/20 opacity-80" />
      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center gap-6 px-6 py-10 text-center">
        <div className="flex items-center gap-3 text-amber-200">
          <svg className="h-8 w-8 text-amber-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16 2v2h3a1 1 0 0 1 1 1v2.35a5.5 5.5 0 0 1-4.4 5.37A5.99 5.99 0 0 1 13 15.92V18h2a1 1 0 1 1 0 2h-6a1 1 0 1 1 0-2h2v-2.08a5.99 5.99 0 0 1-2.6-3.18A5.5 5.5 0 0 1 4 7.35V4a1 1 0 0 1 1-1h3V2a1 1 0 1 1 2 0v1h4V2a1 1 0 1 1 2 0Zm2 4h-2v1.35a7.5 7.5 0 0 1-.35 2.3A3.5 3.5 0 0 0 18 7.35Zm-10 0H6v1.35A3.5 3.5 0 0 0 8.35 9.65a7.5 7.5 0 0 1-.35-2.3Z" />
          </svg>
          <p className="text-xs uppercase tracking-[0.6em]">Crowned</p>
        </div>
        <h3 id="champion-title" className="text-3xl font-semibold text-white">
          {champion.name || "Champion"}
        </h3>

        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/30 to-orange-500/10 blur-3xl" />
          <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-amber-300/40 bg-white/5 p-2">
            {champion.logoImg ? (
              <img
                src={champion.logoImg}
                alt={`${champion.name || "Champion"} logo`}
                className="h-[75%] w-[75%] object-contain"
              />
            ) : (
              <span className="text-2xl font-bold text-amber-200">{fallbackLabel}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChampionDisplay;
