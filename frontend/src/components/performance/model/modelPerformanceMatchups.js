import { getPredictionContext } from "./modelPerformanceMatchupPredictions";
import { getRatingContext } from "./modelPerformanceMatchupRatings";

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

const getMatchupId = ({ matchup, roundNumber, index, homeTeam, awayTeam }) =>
  matchup?.id ?? `${roundNumber}-${index}-${homeTeam}-${awayTeam}`;

const getMatchupContext = (matchup, roundNumber, index) => {
  const teams = getMatchupTeams(matchup);

  if (!teams) {
    return null;
  }

  const { homeTeam, awayTeam } = teams;
  const prediction = getPredictionContext({ matchup, homeTeam });
  const rating = getRatingContext({ matchup, homeTeam, awayTeam, actualWinner: prediction.actualWinner });

  return {
    id: getMatchupId({ matchup, roundNumber, index, homeTeam, awayTeam }),
    homeTeam,
    awayTeam,
    ...prediction,
    ...rating,
  };
};

export const normalizeRoundMatchup = (matchup, roundNumber, index) => getMatchupContext(matchup, roundNumber, index);
