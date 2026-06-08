import { useState, useEffect } from "react";
import { useTeam } from "../../hooks/useTeam";

import ErrorBox from "../errors/ErrorBox";
import PlayInSection from "./PlayInSection";
import QuarterfinalsSection from "./QuarterfinalsSection";
import SemifinalsSection from "./SemifinalsSection";
import FinalSection from "./FinalSection";
import PlayoffBracketSkeleton from "../skeletons/PlayoffBracketSkeleton";
import ChampionDisplay from "./ChampionDisplay";
import { layoutCardClass } from "../layout/LayoutShell";
import { resetDownstreamMatches } from "../../utils/playoffHelpers";

const initialWinners = {
  "play-in-1": null,
  "play-in-2": null,
  "play-in-final": null,
  "qf-1": null,
  "qf-2": null,
  "qf-3": null,
  "qf-4": null,
  "sf-1": null,
  "sf-2": null,
  final: null,
};

const seededTeamKeys = [
  "seedOne",
  "seedTwo",
  "seedThree",
  "seedFour",
  "seedFive",
  "seedSix",
  "seedSeven",
  "seedEight",
  "seedNine",
  "seedTen",
];

const cloneTeamValue = (team) => (team && typeof team === "object" ? { ...team } : team);

const getSeededTeams = (teams) => {
  const sortedTeams = teams?.data ?? [];

  return seededTeamKeys.reduce((seededTeams, seedKey, index) => {
    seededTeams[seedKey] = sortedTeams[index];
    return seededTeams;
  }, {});
};

const getWinnerResult = ({ winningSide, matchLeftTeam, matchRightTeam, matchLeftSeed, matchRightSeed }) => {
  const isLeftWinner = winningSide === "left";
  const winningTeam = isLeftWinner ? matchLeftTeam : matchRightTeam;
  const losingTeam = isLeftWinner ? matchRightTeam : matchLeftTeam;

  return {
    side: winningSide,
    winnerSeedNumber: isLeftWinner ? matchLeftSeed : matchRightSeed,
    winningTeamObject: cloneTeamValue(winningTeam),
    losingTeamObject: cloneTeamValue(losingTeam),
  };
};

const PlayoffErrorState = ({ error }) => (
  <div className="flex h-full w-full items-center justify-center">
    <ErrorBox error={error} />
  </div>
);

const MainBracketHeader = () => (
  <div className="text-center">
    <p className="text-xs uppercase tracking-wider text-orange-400/90 font-semibold">Main bracket</p>
    <h2 id="main-bracket-title" className="mt-2 text-2xl font-semibold text-slate-100">
      Quarterfinals to Final
    </h2>
  </div>
);

const MainBracketSection = ({ seededTeams, winners, onSelectWinner, getWinningTeam }) => (
  <section className={`${layoutCardClass} overflow-hidden`} role="region" aria-labelledby="main-bracket-title">
    <div className="space-y-6 px-4 py-5 sm:px-6 sm:py-6">
      <MainBracketHeader />

      <QuarterfinalsSection
        seededTeams={seededTeams}
        winners={winners}
        onSelectWinner={onSelectWinner}
        getWinningTeam={getWinningTeam}
      />
      <SemifinalsSection winners={winners} onSelectWinner={onSelectWinner} getWinningTeam={getWinningTeam} />
      <FinalSection winners={winners} onSelectWinner={onSelectWinner} getWinningTeam={getWinningTeam} />
    </div>
  </section>
);

const getWinningTeamObject = (winners, matchId) => winners[matchId]?.winningTeamObject || null;

const getLosingTeamObject = (winners, matchId) => winners[matchId]?.losingTeamObject || null;

const PlayoffBracket = () => {
  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam();
  const [winners, setWinners] = useState(initialWinners);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const handleSelectWinner = (matchId, winningSide, matchLeftTeam, matchRightTeam, matchLeftSeed, matchRightSeed) => {
    setWinners((currentWinners) => {
      const updatedWinners = resetDownstreamMatches(matchId, currentWinners);
      updatedWinners[matchId] = getWinnerResult({
        winningSide,
        matchLeftTeam,
        matchRightTeam,
        matchLeftSeed,
        matchRightSeed,
      });

      return updatedWinners;
    });
  };

  const getWinningTeam = (matchId) => getWinningTeamObject(winners, matchId);
  const getLosingTeam = (matchId) => getLosingTeamObject(winners, matchId);

  if (loadingTeams) {
    return <PlayoffBracketSkeleton />;
  }

  if (errorTeams) {
    return <PlayoffErrorState error={errorTeams} />;
  }

  const seededTeams = getSeededTeams(teams);

  return (
    <div className="w-full space-y-6">
      <PlayInSection
        seededTeams={seededTeams}
        winners={winners}
        onSelectWinner={handleSelectWinner}
        getWinningTeam={getWinningTeam}
        getLosingTeam={getLosingTeam}
      />

      <MainBracketSection
        seededTeams={seededTeams}
        winners={winners}
        onSelectWinner={handleSelectWinner}
        getWinningTeam={getWinningTeam}
      />

      <ChampionDisplay champion={winners["final"]?.winningTeamObject} />
    </div>
  );
};

export default PlayoffBracket;
