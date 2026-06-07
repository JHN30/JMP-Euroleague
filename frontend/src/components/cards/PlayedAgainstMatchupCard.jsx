const PlayedAgainstMatchupCard = ({ entry }) => (
  <div className="rounded-2xl border border-white/10 bg-white/4 px-4 py-4">
    <div className="relative z-10 flex flex-col gap-4">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-gray-300">
        <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-orange-200/80">
          {entry.roundLabel}
        </span>
        <span className="text-gray-400">{entry.venueLabel}</span>
      </div>

      <div className="flex flex-col items-center gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col items-center gap-1 text-center sm:items-end sm:text-right">
          <p className={`text-base font-semibold sm:text-lg ${entry.homeTextClass}`}>{entry.homeLabel}</p>
          <span className="text-[0.7rem] uppercase tracking-[0.35em] text-gray-400">{entry.homeCaption}</span>
        </div>

        <div
          className={`flex min-w-24 flex-col items-center justify-center rounded-2xl border px-4 py-3 text-lg font-semibold transition-colors duration-200 ${entry.scoreClasses}`}
        >
          <span>{entry.displayScore}</span>
          {entry.hasScores ? (
            <span className="mt-1 text-[0.65rem] uppercase tracking-[0.4em] text-white/70">
              {entry.didWin ? "Win" : "Loss"}
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col items-center gap-1 text-center sm:items-start sm:text-left">
          <p className={`text-base font-semibold sm:text-lg ${entry.awayTextClass}`}>{entry.awayLabel}</p>
          <span className="text-[0.7rem] uppercase tracking-[0.35em] text-gray-400">{entry.awayCaption}</span>
        </div>
      </div>
    </div>
  </div>
);

export default PlayedAgainstMatchupCard;
