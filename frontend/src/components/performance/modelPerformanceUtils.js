const DEFAULT_SEASON_LABEL = "EuroLeague";
const RECENT_PERFORMANCE_WINDOW_SIZE = 5;

const toSafeCount = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return 0;
  }

  return Math.round(numericValue);
};

const toSafeRoundNumber = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return null;
  }

  return Math.round(numericValue);
};

export const calculateSuccessRate = (correct, totalPredictions) => {
  if (!Number.isFinite(correct) || !Number.isFinite(totalPredictions) || totalPredictions <= 0) {
    return 0;
  }

  return (correct / totalPredictions) * 100;
};

export const formatPercentage = (value) => {
  const numericValue = Number(value);

  return `${Number.isFinite(numericValue) ? numericValue.toFixed(1) : "0.0"}%`;
};

export const formatSignedPoints = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "0.0";
  }

  return `${numericValue > 0 ? "+" : ""}${numericValue.toFixed(1)}`;
};

export const getPerformanceRead = (value) => {
  const successRate = Number(value);

  if (!Number.isFinite(successRate)) {
    return {
      label: "No Sample",
      tone: "neutral",
      description: "Add prediction results to see how the model currently stacks up.",
    };
  }

  if (successRate >= 75) {
    return {
      label: "Elite",
      tone: "elite",
      description: "This would put the model in rare territory for EuroLeague prediction and close to top-end research outcomes.",
    };
  }

  if (successRate >= 70) {
    return {
      label: "Very Strong",
      tone: "strong",
      description: "This is a very strong EuroLeague hit rate and clearly above the broader public benchmarks reported in published studies.",
    };
  }

  if (successRate >= 65) {
    return {
      label: "Good",
      tone: "good",
      description: "This sits in a solid range for EuroLeague forecasting and lands right in the practical zone most users would read as good.",
    };
  }

  if (successRate >= 60) {
    return {
      label: "Decent",
      tone: "steady",
      description: "This is a respectable starting point, but there is still room to climb toward the stronger high-60s research benchmarks.",
    };
  }

  return {
    label: "Below Target",
    tone: "caution",
    description: "This is still below the level usually associated with a dependable EuroLeague prediction model.",
  };
};

export const formatRoundLabel = (roundNumber) => `Round ${roundNumber}`;

export const formatPerformanceDate = (value) => {
  if (typeof value !== "string" || !value.trim()) {
    return "Unknown";
  }

  const trimmedValue = value.trim();
  const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(trimmedValue)
    ? new Date(`${trimmedValue}T00:00:00Z`)
    : new Date(trimmedValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return trimmedValue;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsedDate);
};

const isBetterRound = (currentRound, selectedRound) => {
  if (!selectedRound) {
    return true;
  }

  if (currentRound.successRate !== selectedRound.successRate) {
    return currentRound.successRate > selectedRound.successRate;
  }

  if (currentRound.correct !== selectedRound.correct) {
    return currentRound.correct > selectedRound.correct;
  }

  return currentRound.roundNumber < selectedRound.roundNumber;
};

const isWorseRound = (currentRound, selectedRound) => {
  if (!selectedRound) {
    return true;
  }

  if (currentRound.successRate !== selectedRound.successRate) {
    return currentRound.successRate < selectedRound.successRate;
  }

  if (currentRound.correct !== selectedRound.correct) {
    return currentRound.correct < selectedRound.correct;
  }

  return currentRound.roundNumber < selectedRound.roundNumber;
};

const toSafeNumber = (value, fallback = 0) => {
  const numericValue = Number(value);

  return Number.isFinite(numericValue) ? numericValue : fallback;
};

const normalizeMatchupRating = ({ team, preRoundRating, ratingDelta }) => {
  const safePreRoundRating = toSafeNumber(preRoundRating);
  const safeRatingDelta = toSafeNumber(ratingDelta);

  return {
    team,
    preRoundRating: safePreRoundRating,
    postRoundRating: safePreRoundRating + safeRatingDelta,
    ratingDelta: safeRatingDelta,
  };
};

const normalizeRoundMatchup = (matchup, roundNumber, index) => {
  const homeTeam = typeof matchup?.homeTeam === "string" ? matchup.homeTeam : "";
  const awayTeam = typeof matchup?.awayTeam === "string" ? matchup.awayTeam : "";

  if (!homeTeam || !awayTeam) {
    return null;
  }

  const predictedWinner = matchup?.predictedWinner ?? matchup?.pick ?? "";
  const actualWinner = matchup?.actualWinner ?? matchup?.winner ?? "";
  const homeWinProbability = toSafeNumber(matchup?.homeWinProbability ?? matchup?.homeWin);
  const awayWinProbability = toSafeNumber(matchup?.awayWinProbability ?? matchup?.awayWin);
  const ratingChange = Math.abs(toSafeNumber(matchup?.ratingChange));
  const isCorrect =
    typeof matchup?.isCorrect === "boolean"
      ? matchup.isCorrect
      : Boolean(predictedWinner && actualWinner && predictedWinner === actualWinner);
  const homeRatingDelta =
    matchup?.home?.ratingDelta !== undefined
      ? toSafeNumber(matchup.home.ratingDelta)
      : actualWinner === homeTeam
        ? ratingChange
        : -ratingChange;
  const awayRatingDelta =
    matchup?.away?.ratingDelta !== undefined
      ? toSafeNumber(matchup.away.ratingDelta)
      : actualWinner === awayTeam
        ? ratingChange
        : -ratingChange;

  return {
    id: matchup?.id ?? `${roundNumber}-${index}-${homeTeam}-${awayTeam}`,
    homeTeam,
    awayTeam,
    predictedWinner,
    actualWinner,
    isCorrect,
    predictionResult: matchup?.predictionResult ?? matchup?.result ?? (isCorrect ? "Correct" : "Incorrect"),
    predictedWinnerProbability: toSafeNumber(
      matchup?.predictedWinnerProbability ?? (predictedWinner === homeTeam ? homeWinProbability : awayWinProbability)
    ),
    homeWinProbability,
    awayWinProbability,
    ratingSwing: ratingChange,
    home: normalizeMatchupRating({
      team: homeTeam,
      preRoundRating: matchup?.home?.preRoundRating ?? matchup?.homeElo,
      ratingDelta: homeRatingDelta,
    }),
    away: normalizeMatchupRating({
      team: awayTeam,
      preRoundRating: matchup?.away?.preRoundRating ?? matchup?.awayElo,
      ratingDelta: awayRatingDelta,
    }),
  };
};

const normalizeRoundDetails = (details, roundNumber) => {
  const matchups = (Array.isArray(details?.matchups) ? details.matchups : [])
    .map((matchup, index) => normalizeRoundMatchup(matchup, roundNumber, index))
    .filter(Boolean);

  return {
    matchups,
    detailSummary: details?.summary ?? null,
  };
};

const normalizeRound = (round, roundDetailsByRound = {}) => {
  const roundNumber = toSafeRoundNumber(round?.roundNumber);

  if (!roundNumber) {
    return null;
  }

  const correct = toSafeCount(round?.correct);
  const wrong = toSafeCount(round?.wrong);
  const totalPredictions = correct + wrong;
  const detailData = round?.details ?? roundDetailsByRound[roundNumber];

  return {
    roundNumber,
    correct,
    wrong,
    totalPredictions,
    successRate: calculateSuccessRate(correct, totalPredictions),
    label: formatRoundLabel(roundNumber),
    shortLabel: `R${roundNumber}`,
    ...normalizeRoundDetails(detailData, roundNumber),
  };
};

export const normalizeModelPerformanceData = (data = {}, options = {}) => {
  const roundDetailsByRound = options.roundDetailsByRound ?? {};
  const normalizedRounds = (Array.isArray(data.rounds) ? data.rounds : [])
    .map((round) => normalizeRound(round, roundDetailsByRound))
    .filter(Boolean)
    .sort((firstRound, secondRound) => firstRound.roundNumber - secondRound.roundNumber);

  const totalCorrect = normalizedRounds.reduce((sum, round) => sum + round.correct, 0);
  const totalWrong = normalizedRounds.reduce((sum, round) => sum + round.wrong, 0);
  const totalPredictions = totalCorrect + totalWrong;
  const completedRounds = normalizedRounds.filter((round) => round.totalPredictions > 0);
  const recentWindowRounds = completedRounds.slice(-RECENT_PERFORMANCE_WINDOW_SIZE);
  const latestRound = normalizedRounds.length > 0 ? normalizedRounds[normalizedRounds.length - 1].roundNumber : 0;
  const overallSuccessRate = calculateSuccessRate(totalCorrect, totalPredictions);
  const recentCorrect = recentWindowRounds.reduce((sum, round) => sum + round.correct, 0);
  const recentPredictions = recentWindowRounds.reduce((sum, round) => sum + round.totalPredictions, 0);
  const recentSuccessRate = calculateSuccessRate(recentCorrect, recentPredictions);
  const recentDeltaVsSeason = recentSuccessRate - overallSuccessRate;

  const bestRound = completedRounds.reduce(
    (selectedRound, currentRound) => (isBetterRound(currentRound, selectedRound) ? currentRound : selectedRound),
    null
  );

  const worstRound = completedRounds.reduce(
    (selectedRound, currentRound) => (isWorseRound(currentRound, selectedRound) ? currentRound : selectedRound),
    null
  );

  return {
    seasonLabel:
      typeof data.seasonLabel === "string" && data.seasonLabel.trim() ? data.seasonLabel.trim() : DEFAULT_SEASON_LABEL,
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : "",
    updatedAtLabel: formatPerformanceDate(data.updatedAt),
    rounds: normalizedRounds,
    totalCorrect,
    totalWrong,
    totalPredictions,
    overallSuccessRate,
    recentWindowRounds,
    recentSuccessRate,
    recentDeltaVsSeason,
    bestRound,
    worstRound,
    averageCorrectPicks: normalizedRounds.length > 0 ? totalCorrect / normalizedRounds.length : 0,
    latestRound,
  };
};
