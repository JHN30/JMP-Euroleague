const FINAL_MATCH_ID = "final";
const LEFT_FINALIST_MATCH_ID = "sf-1";
const RIGHT_FINALIST_MATCH_ID = "sf-2";
const DEFAULT_FINALIST_SEED = "WSF";
const DEFAULT_FINALIST_TEAMS = {
  [LEFT_FINALIST_MATCH_ID]: "Winner SF1",
  [RIGHT_FINALIST_MATCH_ID]: "Winner SF2",
};

const getFinalistSeed = (winners, matchId) => winners[matchId]?.winnerSeedNumber || DEFAULT_FINALIST_SEED;

const getFinalistTeam = ({ getWinningTeam, matchId }) => getWinningTeam(matchId) || DEFAULT_FINALIST_TEAMS[matchId];

export const getFinalMatchupProps = ({ getWinningTeam, onSelectWinner, winners }) => ({
  matchId: FINAL_MATCH_ID,
  leftSeed: getFinalistSeed(winners, LEFT_FINALIST_MATCH_ID),
  leftTeam: getFinalistTeam({ getWinningTeam, matchId: LEFT_FINALIST_MATCH_ID }),
  rightSeed: getFinalistSeed(winners, RIGHT_FINALIST_MATCH_ID),
  rightTeam: getFinalistTeam({ getWinningTeam, matchId: RIGHT_FINALIST_MATCH_ID }),
  onSelectWinner,
  selectedWinner: winners[FINAL_MATCH_ID]?.side,
  disabled: !winners[LEFT_FINALIST_MATCH_ID] || !winners[RIGHT_FINALIST_MATCH_ID],
});
