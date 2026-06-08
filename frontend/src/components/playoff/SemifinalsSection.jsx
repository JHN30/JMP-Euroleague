import TeamMatchup from "./TeamMatchup";

const semifinalMatchups = [
  {
    matchId: "sf-1",
    leftSourceId: "qf-1",
    leftFallbackTeam: "Winner QF1",
    rightSourceId: "qf-2",
    rightFallbackTeam: "Winner QF2",
  },
  {
    matchId: "sf-2",
    leftSourceId: "qf-3",
    leftFallbackTeam: "Winner QF3",
    rightSourceId: "qf-4",
    rightFallbackTeam: "Winner QF4",
  },
];

const getMatchSeed = (winners, matchId) => winners[matchId]?.winnerSeedNumber || "WQF";

const getMatchTeam = (getWinningTeam, matchId, fallbackTeam) => getWinningTeam(matchId) || fallbackTeam;

const hasBothSourceWinners = (winners, leftSourceId, rightSourceId) => Boolean(winners[leftSourceId] && winners[rightSourceId]);

const getSemifinalMatchupProps = ({ matchup, winners, onSelectWinner, getWinningTeam }) => ({
  matchId: matchup.matchId,
  leftSeed: getMatchSeed(winners, matchup.leftSourceId),
  leftTeam: getMatchTeam(getWinningTeam, matchup.leftSourceId, matchup.leftFallbackTeam),
  rightSeed: getMatchSeed(winners, matchup.rightSourceId),
  rightTeam: getMatchTeam(getWinningTeam, matchup.rightSourceId, matchup.rightFallbackTeam),
  onSelectWinner,
  selectedWinner: winners[matchup.matchId]?.side,
  disabled: !hasBothSourceWinners(winners, matchup.leftSourceId, matchup.rightSourceId),
});

const SemifinalsSection = ({ winners, onSelectWinner, getWinningTeam }) => {
  const matchups = semifinalMatchups.map((matchup) =>
    getSemifinalMatchupProps({
      matchup,
      winners,
      onSelectWinner,
      getWinningTeam,
    }),
  );

  return (
    <div className="space-y-4">
      <h3 className="text-center text-lg font-semibold text-orange-300">Semifinals</h3>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 lg:grid-cols-2">
        {matchups.map((matchup) => (
          <TeamMatchup key={matchup.matchId} {...matchup} />
        ))}
      </div>
    </div>
  );
};

export default SemifinalsSection;
