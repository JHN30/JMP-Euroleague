import { formatRoundLabel } from "./modelPerformanceFormatters";
import { normalizeRoundMatchup } from "./modelPerformanceMatchups";
import {
  calculateSuccessRate,
  toSafeCount,
  toSafeRoundNumber,
} from "./modelPerformanceNumberUtils";

const DEFAULT_SEASON_LABEL = "EuroLeague";
const RECENT_PERFORMANCE_WINDOW_SIZE = 5;

const formatPerformanceDate = (value) => {
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

const normalizeRounds = (data, roundDetailsByRound) =>
  (Array.isArray(data.rounds) ? data.rounds : [])
    .map((round) => normalizeRound(round, roundDetailsByRound))
    .filter(Boolean)
    .sort((firstRound, secondRound) => firstRound.roundNumber - secondRound.roundNumber);

const sumRoundField = (rounds, fieldName) => rounds.reduce((sum, round) => sum + round[fieldName], 0);

const getSeasonLabel = (value) =>
  typeof value === "string" && value.trim() ? value.trim() : DEFAULT_SEASON_LABEL;

const getBestRound = (completedRounds) =>
  completedRounds.reduce(
    (selectedRound, currentRound) => (isBetterRound(currentRound, selectedRound) ? currentRound : selectedRound),
    null
  );

const getWorstRound = (completedRounds) =>
  completedRounds.reduce(
    (selectedRound, currentRound) => (isWorseRound(currentRound, selectedRound) ? currentRound : selectedRound),
    null
  );

export const normalizeModelPerformanceData = (data = {}, options = {}) => {
  const roundDetailsByRound = options.roundDetailsByRound ?? {};
  const normalizedRounds = normalizeRounds(data, roundDetailsByRound);
  const totalCorrect = sumRoundField(normalizedRounds, "correct");
  const totalWrong = sumRoundField(normalizedRounds, "wrong");
  const totalPredictions = totalCorrect + totalWrong;
  const completedRounds = normalizedRounds.filter((round) => round.totalPredictions > 0);
  const recentWindowRounds = completedRounds.slice(-RECENT_PERFORMANCE_WINDOW_SIZE);
  const recentCorrect = sumRoundField(recentWindowRounds, "correct");
  const recentPredictions = sumRoundField(recentWindowRounds, "totalPredictions");
  const overallSuccessRate = calculateSuccessRate(totalCorrect, totalPredictions);
  const recentSuccessRate = calculateSuccessRate(recentCorrect, recentPredictions);
  const latestRound = normalizedRounds.length > 0 ? normalizedRounds[normalizedRounds.length - 1].roundNumber : 0;

  return {
    seasonLabel: getSeasonLabel(data.seasonLabel),
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : "",
    updatedAtLabel: formatPerformanceDate(data.updatedAt),
    rounds: normalizedRounds,
    totalCorrect,
    totalWrong,
    totalPredictions,
    overallSuccessRate,
    recentWindowRounds,
    recentSuccessRate,
    recentDeltaVsSeason: recentSuccessRate - overallSuccessRate,
    bestRound: getBestRound(completedRounds),
    worstRound: getWorstRound(completedRounds),
    averageCorrectPicks: normalizedRounds.length > 0 ? totalCorrect / normalizedRounds.length : 0,
    latestRound,
  };
};
