const DEFAULT_SEASON_LABEL = "EuroLeague 2025/26";
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

  const parsedDate = new Date(`${value.trim()}T00:00:00Z`);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
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

const normalizeRound = (round) => {
  const roundNumber = toSafeRoundNumber(round?.roundNumber);

  if (!roundNumber) {
    return null;
  }

  const correct = toSafeCount(round?.correct);
  const wrong = toSafeCount(round?.wrong);
  const totalPredictions = correct + wrong;

  return {
    roundNumber,
    correct,
    wrong,
    totalPredictions,
    successRate: calculateSuccessRate(correct, totalPredictions),
    label: formatRoundLabel(roundNumber),
    shortLabel: `R${roundNumber}`,
  };
};

export const normalizeModelPerformanceData = (data = {}) => {
  const normalizedRounds = (Array.isArray(data.rounds) ? data.rounds : [])
    .map((round) => normalizeRound(round))
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
