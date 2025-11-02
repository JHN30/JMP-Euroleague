import { ELO_CHANGE } from "../constants/playoffConstants";

export const updateTeamElo = (winnerRating, loserRating) => {
  const winnerNewRating = Math.round(winnerRating + ELO_CHANGE);
  const loserNewRating = Math.round(loserRating - ELO_CHANGE);
  return { winnerNewRating, loserNewRating };
};
