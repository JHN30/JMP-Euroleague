import { MATCH_DEPENDENCIES } from "../constants/appConstants";

/**
 * Resets all downstream matches that depend on the given match
 * @param {string} matchKey - The match key that was changed
 * @param {Object} winners - Current winners state
 * @returns {Object} Updated winners state with downstream matches cleared
 */
export const resetDownstreamMatches = (matchKey, winners) => {
  const downstreamMatches = MATCH_DEPENDENCIES[matchKey] || [];
  const updatedWinners = { ...winners };

  downstreamMatches.forEach((match) => {
    updatedWinners[match] = null;
  });

  return updatedWinners;
};
