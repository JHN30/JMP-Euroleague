import { useState, useEffect } from "react";
import { useTeam } from "../../hooks/useTeam";
import { useRound } from "../../hooks/useRound";

import ErrorBox from "../errors/ErrorBox";
import TeamMatchup from "../features/TeamMatchup";
import PlayoffBracketSkeleton from "../skeletons/PlayoffBracketSkeleton";

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

  const ELO_CHANGE = 6;

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

  const DEFAULT_SEASON = "2025";

  useEffect(() => {
    fetchTeams(DEFAULT_SEASON);
    fetchRounds();
  }, [fetchTeams, fetchRounds]);

  // Helper functions
  const getSortedTeams = () => {
    if (!teams?.data) return [];

    return [...teams.data].sort((a, b) => {
      const aValue = sortConfig.key === "rating" ? a.rating : a[sortConfig.key];
      const bValue = sortConfig.key === "rating" ? b.rating : b[sortConfig.key];
      return sortConfig.order === "asc" ? aValue - bValue : bValue - aValue;
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
    if (!team || typeof team !== "object" || team.rating === undefined) {
      console.warn("Invalid team data for ELO calculation:", team);
      return team;
    }

    return {
      ...team,
      rating: (team.rating || 0) + (isWinner ? ELO_CHANGE : -ELO_CHANGE),
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
  if (loadingTeams || loadingRounds) {
    return (
      <div className="flex items-center justify-center w-full">
        <PlayoffBracketSkeleton />
      </div>
    );
  }

  if (errorTeams || errorRounds) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 w-full gap-4">
        {errorTeams && <ErrorBox error={errorTeams} />}
        {errorRounds && <ErrorBox error={errorRounds} />}
      </div>
    );
  }

  if (!teams?.data?.length || !rounds?.data?.length) {
    return (
      <div className="flex items-center justify-center min-h-96 w-full">
        <div className="text-center p-8 border border-gray-600 rounded-lg bg-gray-800">
          <p className="text-lg text-gray-300">Team or round data is not available. Please try refreshing.</p>
        </div>
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

      {/* Play-In Tournament */}
      <section
        className="border-2 border-orange-400/50 rounded-xl p-4 md:p-6 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl"
        role="region"
        aria-labelledby="play-in-title"
      >
        <h2 id="play-in-title" className="text-xl md:text-2xl font-bold mb-6 text-center text-orange-300">
          Play-In Tournament
        </h2>

        <div className="grid gap-4 md:gap-6">
          {/* Play-In Games */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <TeamMatchup
              matchId="play-in-1"
              leftSeed="9"
              leftTeam={seededTeams.seedNine}
              rightSeed="10"
              rightTeam={seededTeams.seedTen}
              matchLabel="Play-In Game 1"
              onSelectWinner={handleSelectWinner}
              selectedWinner={winners["play-in-1"]?.side}
              currentRound={currentRound}
              useLogos={true}
            />
            <TeamMatchup
              matchId="play-in-2"
              leftSeed="7"
              leftTeam={seededTeams.seedSeven}
              rightSeed="8"
              rightTeam={seededTeams.seedEight}
              matchLabel="Play-In Game 2"
              onSelectWinner={handleSelectWinner}
              selectedWinner={winners["play-in-2"]?.side}
              currentRound={currentRound}
              useLogos={true}
            />
          </div>

          {/* Play-In Final */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <TeamMatchup
                matchId="play-in-final"
                leftSeed={winners["play-in-1"]?.winnerSeedNumber || "W1"}
                leftTeam={getWinningTeamObject("play-in-1") || "Winner G1"}
                rightSeed={winners["play-in-2"]?.side === "left" ? "8" : winners["play-in-2"]?.side === "right" ? "7" : "L2"}
                rightTeam={getLosingTeamObject("play-in-2") || "Loser G2"}
                matchLabel="Play-In Final"
                onSelectWinner={handleSelectWinner}
                selectedWinner={winners["play-in-final"]?.side}
                disabled={!winners["play-in-1"] || !winners["play-in-2"]}
                currentRound={currentRound}
                useLogos={true}
              />
            </div>
          </div>
        </div>
      </section>

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
          {/* Quarterfinals */}
          <div>
            <h3 className="text-center text-lg md:text-xl font-semibold mb-4 text-orange-200">Quarterfinals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
              <TeamMatchup
                matchId="qf-1"
                leftSeed="1"
                leftTeam={seededTeams.seedOne}
                rightSeed={winners["play-in-final"]?.winnerSeedNumber || "WPF"}
                rightTeam={getWinningTeamObject("play-in-final") || "Play-In Final Winner"}
                onSelectWinner={handleSelectWinner}
                selectedWinner={winners["qf-1"]?.side}
                disabled={!winners["play-in-final"]}
                currentRound={currentRound}
                useLogos={true}
              />
              <TeamMatchup
                matchId="qf-2"
                leftSeed="4"
                leftTeam={seededTeams.seedFour}
                rightSeed="5"
                rightTeam={seededTeams.seedFive}
                onSelectWinner={handleSelectWinner}
                selectedWinner={winners["qf-2"]?.side}
                currentRound={currentRound}
                useLogos={true}
              />
              <TeamMatchup
                matchId="qf-3"
                leftSeed="2"
                leftTeam={seededTeams.seedTwo}
                rightSeed={winners["play-in-2"]?.winnerSeedNumber || "WPI"}
                rightTeam={getWinningTeamObject("play-in-2") || "Play-In Game 2 Winner"}
                onSelectWinner={handleSelectWinner}
                selectedWinner={winners["qf-3"]?.side}
                disabled={!winners["play-in-2"]}
                currentRound={currentRound}
                useLogos={true}
              />
              <TeamMatchup
                matchId="qf-4"
                leftSeed="3"
                leftTeam={seededTeams.seedThree}
                rightSeed="6"
                rightTeam={seededTeams.seedSix}
                onSelectWinner={handleSelectWinner}
                selectedWinner={winners["qf-4"]?.side}
                currentRound={currentRound}
                useLogos={true}
              />
            </div>
          </div>

          {/* Semifinals */}
          <div>
            <h3 className="text-center text-lg md:text-xl font-semibold mb-4 text-orange-200">Semifinals</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
              <TeamMatchup
                matchId="sf-1"
                leftSeed={winners["qf-1"]?.winnerSeedNumber || "WQF"}
                leftTeam={getWinningTeamObject("qf-1") || "Winner QF1"}
                rightSeed={winners["qf-2"]?.winnerSeedNumber || "WQF"}
                rightTeam={getWinningTeamObject("qf-2") || "Winner QF2"}
                onSelectWinner={handleSelectWinner}
                selectedWinner={winners["sf-1"]?.side}
                disabled={!winners["qf-1"] || !winners["qf-2"]}
                currentRound={currentRound}
                useLogos={true}
              />
              <TeamMatchup
                matchId="sf-2"
                leftSeed={winners["qf-3"]?.winnerSeedNumber || "WQF"}
                leftTeam={getWinningTeamObject("qf-3") || "Winner QF3"}
                rightSeed={winners["qf-4"]?.winnerSeedNumber || "WQF"}
                rightTeam={getWinningTeamObject("qf-4") || "Winner QF4"}
                onSelectWinner={handleSelectWinner}
                selectedWinner={winners["sf-2"]?.side}
                disabled={!winners["qf-3"] || !winners["qf-4"]}
                currentRound={currentRound}
                useLogos={true}
              />
            </div>
          </div>

          {/* Final */}
          <div>
            <h3 className="text-center text-lg md:text-xl font-semibold mb-4 text-orange-200">Championship Final</h3>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <TeamMatchup
                  matchId="final"
                  leftSeed={winners["sf-1"]?.winnerSeedNumber || "WSF"}
                  leftTeam={getWinningTeamObject("sf-1") || "Winner SF1"}
                  rightSeed={winners["sf-2"]?.winnerSeedNumber || "WSF"}
                  rightTeam={getWinningTeamObject("sf-2") || "Winner SF2"}
                  onSelectWinner={handleSelectWinner}
                  selectedWinner={winners["final"]?.side}
                  disabled={!winners["sf-1"] || !winners["sf-2"]}
                  currentRound={currentRound}
                  useLogos={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Champion Display */}
      {winners["final"] && (
        <section className="text-center" role="region" aria-labelledby="champion-title">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 rounded-2xl blur-xl"></div>
            <div className="relative border-3 border-amber-300 rounded-2xl p-6 md:p-8 shadow-2xl max-w-md mx-auto">
              <h3 id="champion-title" className="text-2xl md:text-3xl font-bold mb-4 text-yellow-400">
                Champion
              </h3>
              <div className="flex items-center gap-4 justify-center">
                <div className="flex flex-col items-center gap-2">
                  {winners["final"].winningTeamObject?.logoImg ? (
                    <img
                      src={winners["final"].winningTeamObject.logoImg}
                      alt={`${winners["final"].winningTeamObject?.name || "Champion"} logo`}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain filter brightness-110 drop-shadow-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-lg">
                      🏆
                    </div>
                  )}
                  <div className="text-lg md:text-xl font-bold text-yellow-400">
                    {winners["final"].winningTeamObject?.name || "Champion"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PlayoffBracket;
