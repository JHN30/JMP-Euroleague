const TeamUpdateRoundForm = ({
  currentRound,
  values,
  onFieldChange,
  opponentTeams = [],
  submitLabel = "Save All Changes",
}) => {
  const { result, opponent, venue, pointsPlus, pointsMinus } = values;

  return (
    <>
      <section className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor={`result-${currentRound}`}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-300"
          >
            Result (W/L)
          </label>
          <input
            type="text"
            id={`result-${currentRound}`}
            value={result}
            onChange={(event) => onFieldChange("result", event.target.value.toUpperCase())}
            placeholder="W or L"
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/40"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor={`opponent-${currentRound}`}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-300"
          >
            Opponent
          </label>
          <select
            id={`opponent-${currentRound}`}
            value={opponent}
            onChange={(event) => onFieldChange("playedAgainst", event.target.value)}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/40"
          >
            <option value="" className="bg-slate-900 text-gray-400">
              Select opponent
            </option>
            {opponentTeams.map((candidate) => (
              <option key={candidate._id ?? candidate.name} value={candidate.name} className="bg-slate-900 text-white">
                {candidate.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor={`home-ground-${currentRound}`}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-300"
          >
            Venue (H/A)
          </label>
          <input
            type="text"
            id={`home-ground-${currentRound}`}
            value={venue}
            onChange={(event) => onFieldChange("homeGround", event.target.value.toUpperCase())}
            placeholder="H or A"
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/40"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor={`points-scored-${currentRound}`}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-300"
          >
            Points Scored
          </label>
          <input
            type="number"
            id={`points-scored-${currentRound}`}
            value={pointsPlus}
            onChange={(event) => onFieldChange("pointsPlus", event.target.value)}
            placeholder="e.g. 85"
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/40"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor={`points-conceded-${currentRound}`}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-300"
          >
            Points Conceded
          </label>
          <input
            type="number"
            id={`points-conceded-${currentRound}`}
            value={pointsMinus}
            onChange={(event) => onFieldChange("pointsMinus", event.target.value)}
            placeholder="e.g. 78"
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-gray-400 transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/40"
          />
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-400">
          Ensure every round has an opponent, venue tag, and complete score line before saving changes.
        </p>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:from-orange-500/90 hover:to-amber-400/90"
        >
          {submitLabel}
        </button>
      </div>
    </>
  );
};

export default TeamUpdateRoundForm;
