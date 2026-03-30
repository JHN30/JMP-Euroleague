const TeamCard = ({ team, selectedSeason }) => {
  const seasonDisplay = String(selectedSeason ?? team?.season ?? "");
  const isLegacySeason = seasonDisplay === "2024";
  const ratingLabel = isLegacySeason ? "JMP 1.0" : "JMP 2.0";
  const ratingValue = isLegacySeason ? Number(team?.rating) : Number(team?.rating2);
  const wins = Number(team?.wins ?? 0);
  const losses = Number(team?.losses ?? 0);
  const record = `${wins}-${losses}`;

  return (
    <div className="group relative h-full overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-xl shadow-black/20 backdrop-blur-xl">

      <div className="relative h-full overflow-hidden rounded-[1.45rem] bg-slate-900/80">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.45rem] border border-transparent transition-all duration-500 group-hover:border-orange-300/60" />
        <div className="pointer-events-none absolute inset-0 translate-x-[-120%] skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-600 group-hover:translate-x-[120%] group-hover:opacity-100" />

        <div className="relative z-10 flex h-full flex-col px-5 py-5">
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-md font-semibold leading-tight text-white">{team.name}</h2>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <img
                src={team.logoImg}
                className="relative h-full w-full object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-125"
                alt={`${team.name} logo`}
                loading="lazy"
              />
            </div>
          </div>

          <div className="mt-6 text-sm text-slate-200">
            <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
              <p className="text-[0.65rem] uppercase tracking-[0.25em] text-slate-400">Record</p>
              <p className="mt-1 text-lg font-semibold text-white">{record}</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-orange-300/30 bg-orange-500/20 px-4 py-3 text-sm text-orange-50">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-orange-100/90">
                {ratingLabel}
              </span>
              <span className="text-lg font-semibold text-white">
                {Number.isFinite(ratingValue) ? ratingValue.toFixed(0) : "0"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
