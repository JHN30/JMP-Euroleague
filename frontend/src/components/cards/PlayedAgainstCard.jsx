const PlayedAgainstCard = ({
  teamName,
  opposition = [],
  homeCourt = [],
  result = [],
  pointsFor = [],
  pointsAgainst = [],
}) => {
  const safeOpposition = Array.isArray(opposition) ? opposition : [];
  const safeHome = Array.isArray(homeCourt) ? homeCourt : [];
  const safeResult = Array.isArray(result) ? result : [];
  const safePointsFor = Array.isArray(pointsFor) ? pointsFor : [];
  const safePointsAgainst = Array.isArray(pointsAgainst) ? pointsAgainst : [];

  return (
    <div className="flex flex-col gap-4">
      {safeOpposition.length === 0 ? (
        <span className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-sm text-gray-300">
          No recent matchups
        </span>
      ) : (
        safeOpposition.map((opponentRaw, idx) => {
          const opponent = opponentRaw ?? "-";
          const reversedIndex = safeOpposition.length - idx;
          const homeFlag = String(safeHome[idx] ?? "").toUpperCase();
          const isHome = homeFlag === "H";
          const isAway = homeFlag === "A";
          const hasNeutralCourt = !isHome && !isAway;

          const homeLabel = hasNeutralCourt ? (teamName ?? "-") : isHome ? (teamName ?? "-") : opponent;
          const awayLabel = hasNeutralCourt ? opponent : isAway ? (teamName ?? "-") : opponent;

          const rawTeamScore = Number(safePointsFor[idx]);
          const rawOppScore = Number(safePointsAgainst[idx]);
          const hasScores = Number.isFinite(rawTeamScore) && Number.isFinite(rawOppScore);
          const didWin = hasScores ? rawTeamScore > rawOppScore : String(safeResult[idx]).toUpperCase() === "W";

          const displayScore = hasScores
            ? isHome
              ? `${rawTeamScore} - ${rawOppScore}`
              : isAway
                ? `${rawOppScore} - ${rawTeamScore}`
                : `${rawTeamScore} - ${rawOppScore}`
            : didWin
              ? "W"
              : "L";

          const scoreClasses = hasScores
            ? didWin
              ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-200"
              : "border-rose-400/60 bg-rose-500/10 text-rose-200"
            : didWin
              ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-200"
              : "border-rose-400/60 bg-rose-500/10 text-rose-200";

          return (
            <div
              key={`${opponent}-${idx}`}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-4 shadow-inner shadow-black/30 backdrop-blur"
            >
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-gray-300">
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-orange-200/80">
                    Round {reversedIndex}
                  </span>
                  <span className="text-gray-400">
                    {isHome ? "Home" : isAway ? "Away" : homeFlag ? homeFlag : "Neutral"}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-1 flex-col items-center gap-1 text-center sm:items-end sm:text-right">
                    <p
                      className={`text-base font-semibold sm:text-lg ${
                        isHome ? "text-white" : hasNeutralCourt ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {homeLabel}
                    </p>
                    <span className="text-[0.7rem] uppercase tracking-[0.35em] text-gray-400">
                      {isHome ? "Home" : hasNeutralCourt ? "Team" : "Home"}
                    </span>
                  </div>

                  <div
                    className={`flex min-w-24 flex-col items-center justify-center rounded-2xl border px-4 py-3 text-lg font-semibold transition-colors duration-200 ${scoreClasses}`}
                  >
                    <span>{displayScore}</span>
                    {hasScores ? (
                      <span className="mt-1 text-[0.65rem] uppercase tracking-[0.4em] text-white/70">
                        {didWin ? "Win" : "Loss"}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col items-center gap-1 text-center sm:items-start sm:text-left">
                    <p
                      className={`text-base font-semibold sm:text-lg ${
                        isAway ? "text-white" : hasNeutralCourt ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {awayLabel}
                    </p>
                    <span className="text-[0.7rem] uppercase tracking-[0.35em] text-gray-400">
                      {isAway ? "Away" : hasNeutralCourt ? "Opponent" : "Away"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default PlayedAgainstCard;
