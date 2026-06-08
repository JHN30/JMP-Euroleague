export const getMatchupValue = (matchup, fieldNames, fallback = "") => {
  const fieldName = fieldNames.find((name) => matchup?.[name] !== undefined && matchup?.[name] !== null);

  return fieldName ? matchup[fieldName] : fallback;
};

export const getMatchedWinnerResult = ({ actualWinner, predictedWinner }) =>
  Boolean(predictedWinner && actualWinner && predictedWinner === actualWinner);

export const getWinnerProbabilityFallback = ({ awayWinProbability, homeTeam, homeWinProbability, predictedWinner }) => {
  if (predictedWinner === homeTeam) {
    return homeWinProbability;
  }

  return awayWinProbability;
};
