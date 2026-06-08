import TeamMatchup from "./TeamMatchup";

const quarterfinalMatchups = [
  {
    matchId: "qf-1",
    leftSeed: "1",
    leftTeamKey: "seedOne",
    rightSourceId: "play-in-final",
    rightSeedFallback: "WPF",
    rightTeamFallback: "Play-In Final Winner",
  },
  {
    matchId: "qf-2",
    leftSeed: "4",
    leftTeamKey: "seedFour",
    rightSeed: "5",
    rightTeamKey: "seedFive",
  },
  {
    matchId: "qf-3",
    leftSeed: "2",
    leftTeamKey: "seedTwo",
    rightSourceId: "play-in-2",
    rightSeedFallback: "WPI",
    rightTeamFallback: "Play-In Game 2 Winner",
  },
  {
    matchId: "qf-4",
    leftSeed: "3",
    leftTeamKey: "seedThree",
    rightSeed: "6",
    rightTeamKey: "seedSix",
  },
];

const getSeedFromWinner = (winners, matchId, fallbackSeed) => winners[matchId]?.winnerSeedNumber || fallbackSeed;

const getTeamFromWinner = (getWinningTeam, matchId, fallbackTeam) => getWinningTeam(matchId) || fallbackTeam;

const getRightSeed = ({ matchup, winners }) => {
  if (matchup.rightSourceId) {
    return getSeedFromWinner(winners, matchup.rightSourceId, matchup.rightSeedFallback);
  }

  return matchup.rightSeed;
};

const getRightTeam = ({ matchup, seededTeams, getWinningTeam }) => {
  if (matchup.rightSourceId) {
    return getTeamFromWinner(getWinningTeam, matchup.rightSourceId, matchup.rightTeamFallback);
  }

  return seededTeams[matchup.rightTeamKey];
};

const getIsDisabled = ({ matchup, winners }) => Boolean(matchup.rightSourceId && !winners[matchup.rightSourceId]);

const getQuarterfinalMatchupProps = ({ matchup, seededTeams, winners, onSelectWinner, getWinningTeam }) => ({
  matchId: matchup.matchId,
  leftSeed: matchup.leftSeed,
  leftTeam: seededTeams[matchup.leftTeamKey],
  rightSeed: getRightSeed({ matchup, winners }),
  rightTeam: getRightTeam({ matchup, seededTeams, getWinningTeam }),
  onSelectWinner,
  selectedWinner: winners[matchup.matchId]?.side,
  disabled: getIsDisabled({ matchup, winners }),
});

const QuarterfinalsSection = ({ seededTeams, winners, onSelectWinner, getWinningTeam }) => {
  if (!seededTeams) {
    return null;
  }

  const matchups = quarterfinalMatchups.map((matchup) =>
    getQuarterfinalMatchupProps({
      matchup,
      seededTeams,
      winners,
      onSelectWinner,
      getWinningTeam,
    }),
  );

  return (
    <div className="space-y-4">
      <h3 className="text-center text-lg font-semibold text-orange-300">Quarterfinals</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {matchups.map((matchup) => (
          <TeamMatchup key={matchup.matchId} {...matchup} />
        ))}
      </div>
    </div>
  );
};

export default QuarterfinalsSection;
