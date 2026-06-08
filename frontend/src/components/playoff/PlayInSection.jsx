// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import TeamMatchup from "./TeamMatchup";
import { layoutCardClass } from "../layout/LayoutShell";

const playInOpeningMatchups = [
  {
    matchId: "play-in-1",
    leftSeed: "9",
    leftTeamKey: "seedNine",
    rightSeed: "10",
    rightTeamKey: "seedTen",
    matchLabel: "Play-In Game 1",
  },
  {
    matchId: "play-in-2",
    leftSeed: "7",
    leftTeamKey: "seedSeven",
    rightSeed: "8",
    rightTeamKey: "seedEight",
    matchLabel: "Play-In Game 2",
  },
];

const getOpeningMatchupProps = ({ matchup, seededTeams, winners, onSelectWinner }) => ({
  matchId: matchup.matchId,
  leftSeed: matchup.leftSeed,
  leftTeam: seededTeams[matchup.leftTeamKey],
  rightSeed: matchup.rightSeed,
  rightTeam: seededTeams[matchup.rightTeamKey],
  matchLabel: matchup.matchLabel,
  onSelectWinner,
  selectedWinner: winners[matchup.matchId]?.side,
});

const getPlayInFinalRightSeed = (winners) => {
  if (winners["play-in-2"]?.side === "left") {
    return "8";
  }

  if (winners["play-in-2"]?.side === "right") {
    return "7";
  }

  return "L2";
};

const getPlayInFinalMatchupProps = ({ winners, onSelectWinner, getWinningTeam, getLosingTeam }) => ({
  matchId: "play-in-final",
  leftSeed: winners["play-in-1"]?.winnerSeedNumber || "W1",
  leftTeam: getWinningTeam("play-in-1") || "Winner G1",
  rightSeed: getPlayInFinalRightSeed(winners),
  rightTeam: getLosingTeam("play-in-2") || "Loser G2",
  matchLabel: "Play-In Final",
  onSelectWinner,
  selectedWinner: winners["play-in-final"]?.side,
  disabled: !winners["play-in-1"] || !winners["play-in-2"],
});

const PlayInHeader = () => (
  <div className="text-center">
    <p className="text-xs uppercase tracking-wider text-orange-400/90 font-semibold">Play-in</p>
    <h2 id="play-in-title" className="mt-2 text-2xl font-semibold text-slate-100">
      Qualification Round
    </h2>
  </div>
);

const OpeningPlayInMatchups = ({ matchups }) => (
  <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
    {matchups.map((matchup) => (
      <TeamMatchup key={matchup.matchId} {...matchup} />
    ))}
  </div>
);

const PlayInFinalMatchup = ({ matchup }) => (
  <div className="flex min-w-0 justify-center">
    <div className="min-w-0 w-full max-w-md">
      <TeamMatchup {...matchup} />
    </div>
  </div>
);

const PlayInSection = ({ seededTeams, winners, onSelectWinner, getWinningTeam, getLosingTeam }) => {
  if (!seededTeams) {
    return null;
  }

  const openingMatchups = playInOpeningMatchups.map((matchup) =>
    getOpeningMatchupProps({
      matchup,
      seededTeams,
      winners,
      onSelectWinner,
    }),
  );
  const finalMatchup = getPlayInFinalMatchupProps({
    winners,
    onSelectWinner,
    getWinningTeam,
    getLosingTeam,
  });

  return (
    <motion.section
      className={`${layoutCardClass} overflow-hidden`}
      role="region"
      aria-labelledby="play-in-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-4 py-5 sm:px-6 sm:py-6">
        <PlayInHeader />

        <div className="mt-6 grid min-w-0 gap-5">
          <OpeningPlayInMatchups matchups={openingMatchups} />
          <PlayInFinalMatchup matchup={finalMatchup} />
        </div>
      </div>
    </motion.section>
  );
};

export default PlayInSection;
