import { calculateNextGamePrediction } from "./calculateExpectedScore";

const clampProbability = (value) => {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return 0;
  }

  return Math.max(0, Math.min(1, numericValue));
};

const getTeamRating = (team) => {
  const ratingValue = Number(team?.rating);
  return Number.isFinite(ratingValue) ? ratingValue : 0;
};

export const handleTeamSelect = ({
  homeTeam,
  awayTeam,
  teams,
  rounds,
  setPredictions,
  setDisplayTeams,
  setShowResults,
}) => {
  if (!homeTeam || !awayTeam) return;

  const teamList = teams?.data ?? [];
  const roundList = rounds?.data ?? [];
  const roundIndex = Math.max(Number(roundList[0]?.currentRound) || 0, 0);

  const homeTeamData = teamList.find((team) => team.name === homeTeam);
  const awayTeamData = teamList.find((team) => team.name === awayTeam);

  if (!homeTeamData || !awayTeamData) {
    return;
  }

  const prediction = calculateNextGamePrediction({
    homeTeam: homeTeamData,
    awayTeam: awayTeamData,
    homeRating: getTeamRating(homeTeamData),
    awayRating: getTeamRating(awayTeamData),
    roundIndex,
  });

  setPredictions({
    ...prediction,
    homeTeam: clampProbability(prediction?.homeTeam),
    awayTeam: clampProbability(prediction?.awayTeam),
  });

  setDisplayTeams({
    home: homeTeam,
    away: awayTeam,
    homeData: homeTeamData,
    awayData: awayTeamData,
  });

  setShowResults(true);
};
