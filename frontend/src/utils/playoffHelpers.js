import { MATCH_DEPENDENCIES } from "../constants/appConstants";

export const getSortedTeams = (teams) => {
  return [...teams].sort((a, b) => b.rating2 - a.rating2);
};

export const getSeededTeams = (teams) => {
  const sorted = getSortedTeams(teams);
  return sorted.slice(0, 10);
};

/**
 * Resets all downstream matches that depend on the given match
 * @param {string} matchKey - The match key that was changed
 * @param {Object} winners - Current winners state
 * @param {Function} setWinners - State setter for winners
 */

export const resetDownstreamMatches = (matchKey, winners, setWinners) => {
  const downstreamMatches = MATCH_DEPENDENCIES[matchKey] || [];
  const updatedWinners = { ...winners };

  downstreamMatches.forEach((match) => {
    delete updatedWinners[match];
  });

  setWinners(updatedWinners);
};
