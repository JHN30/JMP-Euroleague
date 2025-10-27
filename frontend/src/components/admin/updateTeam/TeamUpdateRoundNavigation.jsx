const TeamUpdateRoundNavigation = ({
  totalRounds,
  currentRound,
  activeRoundLabel,
  onPrev,
  onNext,
  onSelectRound,
  PrevIcon,
  NextIcon,
}) => {
  const isPrevDisabled = currentRound === 0;
  const isNextDisabled = currentRound === totalRounds - 1;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 px-5 py-5 shadow-inner shadow-black/30">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-orange-200/80">Active Round</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{activeRoundLabel}</h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onPrev}
            disabled={isPrevDisabled}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
              isPrevDisabled
                ? "cursor-not-allowed border-white/10 text-gray-500"
                : "border-white/10 text-gray-100 hover:border-orange-400/50 hover:text-white"
            }`}
          >
            {PrevIcon ? <PrevIcon className="h-4 w-4" aria-hidden="true" /> : null}
            <span>Previous</span>
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={isNextDisabled}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
              isNextDisabled
                ? "cursor-not-allowed border-white/10 text-gray-500"
                : "border-white/10 text-gray-100 hover:border-orange-400/50 hover:text-white"
            }`}
          >
            <span>Next</span>
            {NextIcon ? <NextIcon className="h-4 w-4" aria-hidden="true" /> : null}
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {Array.from({ length: totalRounds }).map((_, index) => {
          const isActive = index === currentRound;
          return (
            <button
              key={`round-${index}`}
              type="button"
              onClick={() => onSelectRound(index)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/30"
                  : "border border-white/10 bg-white/10 text-gray-200 hover:border-orange-400/40 hover:text-white"
              }`}
            >
              Round {index + 1}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default TeamUpdateRoundNavigation;
