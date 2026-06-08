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

const getRatingDelta = ({ explicitDelta, actualWinner, team, ratingChange }) => {
  if (explicitDelta !== undefined) {
    return toSafeNumber(explicitDelta);
  }

  return actualWinner === team ? ratingChange : -ratingChange;
};

const getTeamRating = ({ team, ratingSource, fallbackRating, actualWinner, ratingChange }) =>
  normalizeMatchupRating({
    team,
    preRoundRating: ratingSource?.preRoundRating ?? fallbackRating,
    ratingDelta: getRatingDelta({
      explicitDelta: ratingSource?.ratingDelta,
      actualWinner,
      team,
      ratingChange,
    }),
  });

export const getRatingContext = ({ matchup, homeTeam, awayTeam, actualWinner }) => {
  const ratingChange = Math.abs(toSafeNumber(matchup?.ratingChange));

  return {
    ratingSwing: ratingChange,
    home: getTeamRating({
      team: homeTeam,
      ratingSource: matchup?.home,
      fallbackRating: matchup?.homeElo,
      actualWinner,
      ratingChange,
    }),
    away: getTeamRating({
      team: awayTeam,
      ratingSource: matchup?.away,
      fallbackRating: matchup?.awayElo,
      actualWinner,
      ratingChange,
    }),
  };
};
