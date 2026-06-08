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

const getRoundIndex = (rounds) => {
  const roundList = rounds?.data ?? [];
  return Math.max(Number(roundList[0]?.currentRound) || 0, 0);
};

const findTeamByName = (teams, teamName) => {
  const teamList = teams?.data ?? [];
  return teamList.find((team) => team.name === teamName);
};

const getSelectedTeams = ({ teams, homeTeam, awayTeam }) => {
  const homeTeamData = findTeamByName(teams, homeTeam);
  const awayTeamData = findTeamByName(teams, awayTeam);

  if (!homeTeamData || !awayTeamData) {
    return null;
  }

  return {
    homeTeamData,
    awayTeamData,
  };
};

const getNormalizedPrediction = ({ homeTeamData, awayTeamData, roundIndex }) => {
  const prediction = calculateNextGamePrediction({
    homeTeam: homeTeamData,
    awayTeam: awayTeamData,
    homeRating: getTeamRating(homeTeamData),
    awayRating: getTeamRating(awayTeamData),
    roundIndex,
  });

  return {
    ...prediction,
    homeTeam: clampProbability(prediction?.homeTeam),
    awayTeam: clampProbability(prediction?.awayTeam),
  };
};

const getDisplayTeams = ({ homeTeam, awayTeam, homeTeamData, awayTeamData }) => ({
  home: homeTeam,
  away: awayTeam,
  homeData: homeTeamData,
  awayData: awayTeamData,
});

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

  const selectedTeams = getSelectedTeams({ teams, homeTeam, awayTeam });

  if (!selectedTeams) {
    return;
  }

  const roundIndex = getRoundIndex(rounds);
  const prediction = getNormalizedPrediction({ ...selectedTeams, roundIndex });
  const displayTeams = getDisplayTeams({
    homeTeam,
    awayTeam,
    ...selectedTeams,
  });

  setPredictions(prediction);
  setDisplayTeams(displayTeams);
  setShowResults(true);
};
