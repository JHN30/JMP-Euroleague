import {
  getMatchedWinnerResult,
  getMatchupValue,
  getWinnerProbabilityFallback,
} from "./modelPerformanceMatchupFieldUtils";
import { toSafeNumber } from "./modelPerformanceNumberUtils";

const ACTUAL_WINNER_FIELDS = ["actualWinner", "winner"];
const AWAY_PROBABILITY_FIELDS = ["awayWinProbability", "awayWin"];
const HOME_PROBABILITY_FIELDS = ["homeWinProbability", "homeWin"];
const PREDICTED_WINNER_FIELDS = ["predictedWinner", "pick"];
const PREDICTION_LABEL_FIELDS = ["predictionResult", "result"];
const PREDICTED_WINNER_PROBABILITY_FIELDS = ["predictedWinnerProbability"];

const getPredictionResult = ({ matchup, predictedWinner, actualWinner }) => {
  if (typeof matchup?.isCorrect === "boolean") {
    return matchup.isCorrect;
  }

  return getMatchedWinnerResult({ actualWinner, predictedWinner });
};

const getPredictedWinnerProbability = ({ matchup, predictedWinner, homeTeam, homeWinProbability, awayWinProbability }) => {
  const fallback = getWinnerProbabilityFallback({
    awayWinProbability,
    homeTeam,
    homeWinProbability,
    predictedWinner,
  });

  return toSafeNumber(getMatchupValue(matchup, PREDICTED_WINNER_PROBABILITY_FIELDS, fallback));
};

const getPredictionLabel = ({ matchup, isCorrect }) => {
  const fallback = isCorrect ? "Correct" : "Incorrect";
  return getMatchupValue(matchup, PREDICTION_LABEL_FIELDS, fallback);
};

const getWinProbabilities = (matchup) => ({
  homeWinProbability: toSafeNumber(getMatchupValue(matchup, HOME_PROBABILITY_FIELDS)),
  awayWinProbability: toSafeNumber(getMatchupValue(matchup, AWAY_PROBABILITY_FIELDS)),
});

export const getPredictionContext = ({ matchup, homeTeam }) => {
  const predictedWinner = getMatchupValue(matchup, PREDICTED_WINNER_FIELDS);
  const actualWinner = getMatchupValue(matchup, ACTUAL_WINNER_FIELDS);
  const isCorrect = getPredictionResult({ matchup, predictedWinner, actualWinner });
  const winProbabilities = getWinProbabilities(matchup);

  return {
    predictedWinner,
    actualWinner,
    isCorrect,
    predictionResult: getPredictionLabel({ matchup, isCorrect }),
    predictedWinnerProbability: getPredictedWinnerProbability({
      matchup,
      predictedWinner,
      homeTeam,
      ...winProbabilities,
    }),
    ...winProbabilities,
  };
};
