import { toSafeNumber } from "./modelPerformanceNumberUtils";

const getPredictionResult = ({ matchup, predictedWinner, actualWinner }) => {
  if (typeof matchup?.isCorrect === "boolean") {
    return matchup.isCorrect;
  }

  return Boolean(predictedWinner && actualWinner && predictedWinner === actualWinner);
};

const getPredictedWinnerProbability = ({ matchup, predictedWinner, homeTeam, homeWinProbability, awayWinProbability }) =>
  toSafeNumber(
    matchup?.predictedWinnerProbability ?? (predictedWinner === homeTeam ? homeWinProbability : awayWinProbability)
  );

const getPredictionLabel = ({ matchup, isCorrect }) =>
  matchup?.predictionResult ?? matchup?.result ?? (isCorrect ? "Correct" : "Incorrect");

const getWinProbabilities = (matchup) => ({
  homeWinProbability: toSafeNumber(matchup?.homeWinProbability ?? matchup?.homeWin),
  awayWinProbability: toSafeNumber(matchup?.awayWinProbability ?? matchup?.awayWin),
});

export const getPredictionContext = ({ matchup, homeTeam }) => {
  const predictedWinner = matchup?.predictedWinner ?? matchup?.pick ?? "";
  const actualWinner = matchup?.actualWinner ?? matchup?.winner ?? "";
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
