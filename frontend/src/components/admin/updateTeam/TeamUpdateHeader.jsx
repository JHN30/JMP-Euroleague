const TeamUpdateHeader = ({ team, totalRounds, onBack, BackIcon, backLabel = "Back to Teams" }) => {
  return (
    <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-slate-950/30 p-3 shadow-inner shadow-black/40 sm:h-24 sm:w-24">
          {team.logoImg ? (
            <img src={team.logoImg} alt={`${team.name ?? "Team"} logo`} className="h-full w-full object-contain" />
          ) : (
            <span className="text-xs text-gray-400">No logo</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.4em] text-orange-200/80">Team Update</p>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">{team.name}</h2>
          <p className="text-xs text-gray-400">Latest round tracked: {totalRounds > 0 ? totalRounds : "-"}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:border-orange-400/40 hover:text-white"
        aria-label={backLabel}
      >
        {BackIcon ? <BackIcon className="h-4 w-4" aria-hidden="true" /> : null}
        <span>{backLabel}</span>
      </button>
    </header>
  );
};

export default TeamUpdateHeader;
