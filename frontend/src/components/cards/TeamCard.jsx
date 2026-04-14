const TeamCard = ({ team }) => {
  const ratingLabel = "JMP Rating";
  const ratingValue = Number(team?.rating);
  const wins = Number(team?.wins ?? 0);
  const losses = Number(team?.losses ?? 0);
  const record = `${wins}-${losses}`;

  return (
    <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5">

      <div className="relative h-full overflow-hidden rounded-3xl bg-slate-900/80">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl border border-transparent transition-colors duration-300 group-hover:border-orange-300/60" />

        <div className="relative z-10 flex h-full flex-col px-4 py-4">
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-md font-semibold leading-tight text-white">{team.name}</h2>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <img
                src={team.logoImg}
                className="relative h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                alt={`${team.name} logo`}
                loading="lazy"
              />
            </div>
          </div>

          <div className="mt-6 text-sm text-slate-200">
            <div className="flex w-full items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
              <p className="text-[0.65rem] uppercase tracking-[0.25em] text-slate-400">Record</p>
              <p className="text-lg font-semibold text-white">{record}</p>
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
