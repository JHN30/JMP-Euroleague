import { formatPercentage, formatSignedPoints } from "../model/modelPerformanceUtils";

const formatProbability = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "0.0%";
  }

  return formatPercentage(numericValue <= 1 ? numericValue * 100 : numericValue);
};

const formatRating = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "-";
  }

  return numericValue.toLocaleString("en-US", {
    maximumFractionDigits: 1,
  });
};

const getRatingDeltaTone = (value) => {
  const numericValue = Number(value);

  if (numericValue > 0) {
    return "text-emerald-200";
  }

  if (numericValue < 0) {
    return "text-rose-200";
  }

  return "text-slate-300";
};

const ResultBadge = ({ isCorrect, label = isCorrect ? "Correct" : "Incorrect" }) => (
  <span
    className={`inline-flex items-center justify-center rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold ${
      isCorrect
        ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-100"
        : "border-rose-300/25 bg-rose-400/10 text-rose-100"
    }`}
  >
    {label}
  </span>
);

const EloRatingCell = ({ update }) => (
  <div className="min-w-[150px]">
    <p className="font-medium text-white">{update?.team ?? "-"}</p>
    <p className="mt-1 text-xs text-slate-400">
      {formatRating(update?.preRoundRating)} to {formatRating(update?.postRoundRating)}
    </p>
    <p className={`mt-1 text-sm font-semibold ${getRatingDeltaTone(update?.ratingDelta)}`}>
      {formatSignedPoints(update?.ratingDelta)}
    </p>
  </div>
);

const TeamUpdatesTable = ({ matchups = [] }) => {
  if (matchups.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 w-full min-w-0 rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-4">
      <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">Team Elo Updates</p>
          <p className="mt-1 text-sm text-slate-400">
            One row per game with both teams rating movement and prediction result.
          </p>
        </div>
      </div>

      <div className="mt-4 w-full overflow-x-auto">
        <table className="w-full min-w-[1040px] text-left text-sm">
          <thead className="border-b border-white/10 text-[0.68rem] font-semibold text-slate-400">
            <tr>
              <th className="px-3 py-2">Matchup</th>
              <th className="px-3 py-2">Pick</th>
              <th className="px-3 py-2">Winner</th>
              <th className="px-3 py-2">Home Win</th>
              <th className="px-3 py-2">Away Win</th>
              <th className="px-3 py-2">Home Elo</th>
              <th className="px-3 py-2">Away Elo</th>
              <th className="px-3 py-2">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-200">
            {matchups.map((matchup) => (
              <tr key={matchup.id} className="transition hover:bg-white/3">
                <td className="px-3 py-3">
                  <p className="font-medium text-white">{matchup.homeTeam}</p>
                  <p className="mt-1 text-xs text-slate-400">vs {matchup.awayTeam}</p>
                </td>
                <td className="px-3 py-3">
                  <p className="font-medium text-white">{matchup.predictedWinner || "-"}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {formatProbability(matchup.predictedWinnerProbability)}
                  </p>
                </td>
                <td className="px-3 py-3 font-medium text-white">{matchup.actualWinner || "-"}</td>
                <td className="px-3 py-3">{formatProbability(matchup.homeWinProbability)}</td>
                <td className="px-3 py-3">{formatProbability(matchup.awayWinProbability)}</td>
                <td className="px-3 py-3">
                  <EloRatingCell update={matchup.home} />
                </td>
                <td className="px-3 py-3">
                  <EloRatingCell update={matchup.away} />
                </td>
                <td className="px-3 py-3">
                  <ResultBadge isCorrect={matchup.isCorrect} label={matchup.predictionResult} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamUpdatesTable;
