import { toSafeNumber } from "./modelPerformanceNumberUtils";

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

const getMatchupTeamName = (matchup, fieldName) => {
  const value = matchup?.[fieldName];

  return typeof value === "string" ? value : "";
};

const getMatchupTeams = (matchup) => {
  const homeTeam = getMatchupTeamName(matchup, "homeTeam");
  const awayTeam = getMatchupTeamName(matchup, "awayTeam");

  if (!homeTeam || !awayTeam) {
    return null;
  }

  return { homeTeam, awayTeam };
};

const getPredictionResult = ({ matchup, predictedWinner, actualWinner }) => {
  if (typeof matchup?.isCorrect === "boolean") {
    return matchup.isCorrect;
  }

  return Boolean(predictedWinner && actualWinner && predictedWinner === actualWinner);
};

const getRatingDelta = ({ explicitDelta, actualWinner, team, ratingChange }) => {
  if (explicitDelta !== undefined) {
    return toSafeNumber(explicitDelta);
  }

  return actualWinner === team ? ratingChange : -ratingChange;
};

const getPredictedWinnerProbability = ({ matchup, predictedWinner, homeTeam, homeWinProbability, awayWinProbability }) =>
  toSafeNumber(
    matchup?.predictedWinnerProbability ?? (predictedWinner === homeTeam ? homeWinProbability : awayWinProbability)
  );

const getMatchupRatings = ({ matchup, homeTeam, awayTeam, actualWinner, ratingChange }) => {
  const homeRatingDelta = getRatingDelta({
    explicitDelta: matchup?.home?.ratingDelta,
    actualWinner,
    team: homeTeam,
    ratingChange,
  });
  const awayRatingDelta = getRatingDelta({
    explicitDelta: matchup?.away?.ratingDelta,
    actualWinner,
    team: awayTeam,
    ratingChange,
  });

  return {
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

export const normalizeRoundMatchup = (matchup, roundNumber, index) => {
  const teams = getMatchupTeams(matchup);

  if (!teams) {
    return null;
  }

  const { homeTeam, awayTeam } = teams;
  const predictedWinner = matchup?.predictedWinner ?? matchup?.pick ?? "";
  const actualWinner = matchup?.actualWinner ?? matchup?.winner ?? "";
  const homeWinProbability = toSafeNumber(matchup?.homeWinProbability ?? matchup?.homeWin);
  const awayWinProbability = toSafeNumber(matchup?.awayWinProbability ?? matchup?.awayWin);
  const ratingChange = Math.abs(toSafeNumber(matchup?.ratingChange));
  const isCorrect = getPredictionResult({ matchup, predictedWinner, actualWinner });
  const ratings = getMatchupRatings({ matchup, homeTeam, awayTeam, actualWinner, ratingChange });

  return {
    id: matchup?.id ?? `${roundNumber}-${index}-${homeTeam}-${awayTeam}`,
    homeTeam,
    awayTeam,
    predictedWinner,
    actualWinner,
    isCorrect,
    predictionResult: matchup?.predictionResult ?? matchup?.result ?? (isCorrect ? "Correct" : "Incorrect"),
    predictedWinnerProbability: getPredictedWinnerProbability({
      matchup,
      predictedWinner,
      homeTeam,
      homeWinProbability,
      awayWinProbability,
    }),
    homeWinProbability,
    awayWinProbability,
    ratingSwing: ratingChange,
    ...ratings,
  };
};
