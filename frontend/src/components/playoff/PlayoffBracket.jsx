import { useState, useEffect } from "react";
import { useTeam } from "../../hooks/useTeam";
import { useRound } from "../../hooks/useRound";

import ErrorBox from "../errors/ErrorBox";
import PlayInSection from "./PlayInSection";
import QuarterfinalsSection from "./QuarterfinalsSection";
import SemifinalsSection from "./SemifinalsSection";
import FinalSection from "./FinalSection";
import PlayoffBracketSkeleton from "../skeletons/PlayoffBracketSkeleton";
import ChampionDisplay from "./ChampionDisplay";
import { sortTeams } from "../../utils/sortTeams";

const PlayoffBracket = () => {
  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam();
  const { fetchRounds, rounds, loadingRounds, errorRounds } = useRound();
  const [sortConfig] = useState({ key: "wins", order: "desc" });
  const [winners, setWinners] = useState({
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
  });

  const ELO_CHANGE = 24;
  const DEFAULT_SEASON = "2025";

  // Dependency mapping for resetting downstream matches
  const MATCH_DEPENDENCIES = {
    "play-in-1": ["play-in-final", "qf-1", "sf-1", "final"],
    "play-in-2": ["play-in-final", "qf-3", "sf-2", "final"],
    "play-in-final": ["qf-1", "sf-1", "final"],
    "qf-1": ["sf-1", "final"],
    "qf-2": ["sf-1", "final"],
    "qf-3": ["sf-2", "final"],
    "qf-4": ["sf-2", "final"],
    "sf-1": ["final"],
    "sf-2": ["final"],
  };

  useEffect(() => {
    fetchTeams(DEFAULT_SEASON);
    fetchRounds();
  }, [fetchTeams, fetchRounds]);

  // Helper functions
  const getSortedTeams = () => {
    if (!teams?.data) return [];

    return sortTeams(teams.data, {
      key: sortConfig.key,
      order: sortConfig.order,
      getRatingValue: (team) => Number(team?.rating2) || 0,
    });
  };

  const getSeededTeams = () => {
    const sortedTeams = getSortedTeams();
    return {
      seedOne: sortedTeams[0],
      seedTwo: sortedTeams[1],
      seedThree: sortedTeams[2],
      seedFour: sortedTeams[3],
      seedFive: sortedTeams[4],
      seedSix: sortedTeams[5],
      seedSeven: sortedTeams[6],
      seedEight: sortedTeams[7],
      seedNine: sortedTeams[8],
      seedTen: sortedTeams[9],
    };
  };

  const resetDownstreamMatches = (matchId, newWinners) => {
    const dependencies = MATCH_DEPENDENCIES[matchId] || [];
    dependencies.forEach((mId) => {
      newWinners[mId] = null;
    });
  };

  const updateTeamElo = (team, isWinner) => {
    if (!team || typeof team !== "object" || team.rating2 === undefined) {
      console.warn("Invalid team data for ELO calculation:", team);
      return team;
    }

    return {
      ...team,
      rating2: (team.rating2 || 0) + (isWinner ? ELO_CHANGE : -ELO_CHANGE),
    };
  };

  const handleSelectWinner = (matchId, winningSide, matchLeftTeam, matchRightTeam, matchLeftSeed, matchRightSeed) => {
    const newWinners = { ...winners };

    const isLeftWinner = winningSide === "left";
    const winningTeam = isLeftWinner ? matchLeftTeam : matchRightTeam;
    const losingTeam = isLeftWinner ? matchRightTeam : matchLeftTeam;
    const winnerSeed = isLeftWinner ? matchLeftSeed : matchRightSeed;

    newWinners[matchId] = {
      side: winningSide,
      winnerSeedNumber: winnerSeed,
      winningTeamObject: updateTeamElo(winningTeam, true),
      losingTeamObject: updateTeamElo(losingTeam, false),
    };

    resetDownstreamMatches(matchId, newWinners);
    setWinners(newWinners);
  };

  const getWinningTeamObject = (matchId) => winners[matchId]?.winningTeamObject || null;
  const getLosingTeamObject = (matchId) => winners[matchId]?.losingTeamObject || null;

  // Loading and error states
  if (loadingTeams || loadingRounds || !teams?.data?.length || !rounds?.data?.length) {
    return (
      <div className="flex items-center justify-center w-full">
        <PlayoffBracketSkeleton />
      </div>
    );
  }

  if (errorTeams || errorRounds) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 w-full gap-4">
        <ErrorBox error={errorTeams || errorRounds} />
      </div>
    );
  }

  const currentRound = rounds.data[0].currentRound;
  const seededTeams = getSeededTeams();

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">Playoff Bracket</h1>
      </div>

      <PlayInSection
        seededTeams={seededTeams}
        winners={winners}
        onSelectWinner={handleSelectWinner}
        getWinningTeam={getWinningTeamObject}
        getLosingTeam={getLosingTeamObject}
        currentRound={currentRound}
      />

      {/* Main Playoff Bracket */}
      <section
        className="border-2 border-orange-400 rounded-xl p-4 md:p-6 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl"
        role="region"
        aria-labelledby="main-bracket-title"
      >
        <h2 id="main-bracket-title" className="text-xl md:text-2xl font-bold mb-6 text-center text-orange-300">
          Main Bracket
        </h2>

        <div className="space-y-8">
          <QuarterfinalsSection
            seededTeams={seededTeams}
            winners={winners}
            onSelectWinner={handleSelectWinner}
            getWinningTeam={getWinningTeamObject}
            currentRound={currentRound}
          />
          <SemifinalsSection
            winners={winners}
            onSelectWinner={handleSelectWinner}
            getWinningTeam={getWinningTeamObject}
            currentRound={currentRound}
          />
          <FinalSection
            winners={winners}
            onSelectWinner={handleSelectWinner}
            getWinningTeam={getWinningTeamObject}
            currentRound={currentRound}
          />
        </div>
      </section>

      <ChampionDisplay champion={winners["final"]?.winningTeamObject} />
    </div>
  );
};

export default PlayoffBracket;

