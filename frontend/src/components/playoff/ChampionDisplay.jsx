import { layoutCardClass } from "../layout/LayoutShell";

const ChampionDisplay = ({ champion }) => {
  if (!champion) {
    return null;
  }

  const fallbackLabel = champion.name?.slice(0, 2)?.toUpperCase() || "??";

  return (
    <section className={`${layoutCardClass} overflow-hidden`} role="region" aria-labelledby="champion-title">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-6 py-8 text-center">
        <p className="text-xs uppercase tracking-wider text-orange-400/90 font-semibold">Champion</p>
        <h3 id="champion-title" className="text-3xl font-semibold text-slate-100">
          {champion.name || "Champion"}
        </h3>

        <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 p-2">
          {champion.logoImg ? (
            <img
              src={champion.logoImg}
              alt={`${champion.name || "Champion"} logo`}
              className="h-[75%] w-[75%] object-contain"
            />
          ) : (
            <span className="text-2xl font-bold text-orange-300">{fallbackLabel}</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChampionDisplay;
