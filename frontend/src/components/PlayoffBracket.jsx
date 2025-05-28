import { useState, useEffect } from "react";
import { useTeam } from "../func/useTeam";
import { useRound } from "../func/useRound";

import LoadingSpinner from "./LoadingSpinner";
import ErrorBox from "./ErrorBox";
import TeamMatchup from "./TeamMatchup";

const PlayoffBracket = () => {
  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam();
  const { fetchRounds, rounds, loadingRounds, errorRounds } = useRound();
  const [sortConfig, setSortConfig] = useState({
    key: "wins",
    order: "desc",
  });

  // State to track winners of each matchup
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

  useEffect(() => {
    fetchTeams();
    fetchRounds();
  }, [fetchTeams, fetchRounds]);

  if (loadingTeams || loadingRounds) {
    return (
      <div className="flex items-center justify-center h-full w-full py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (errorTeams || errorRounds) {
    return (
      <div className="flex items-center justify-center h-full w-full py-20">
        <ErrorBox error={errorTeams} />
        <ErrorBox error={errorRounds} />
      </div>
    );
  }

  if (!teams?.data || teams.data.length === 0 || !rounds?.data || rounds.data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full py-20">
        <p>Team or round data is not available. Please try refreshing.</p>
      </div>
    );
  }

  const currentRound = rounds.data[0].currentRound;

  const sortedTeams = [...teams.data].sort((a, b) => {
    const aValue = sortConfig.key === "rating" ? a.rating : a[sortConfig.key];
    const bValue = sortConfig.key === "rating" ? b.rating : b[sortConfig.key];

    if (sortConfig.order === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Extract top 10 teams with proper seeding
  const seedOne = sortedTeams[0];
  const seedTwo = sortedTeams[1];
  const seedThree = sortedTeams[2];
  const seedFour = sortedTeams[3];
  const seedFive = sortedTeams[4];
  const seedSix = sortedTeams[5];
  const seedSeven = sortedTeams[6];
  const seedEight = sortedTeams[7];
  const seedNine = sortedTeams[8];
  const seedTen = sortedTeams[9];

  const ELO_CHANGE = 8;

  const handleSelectWinner = (matchId, winningSide, matchLeftTeam, matchRightTeam, matchLeftSeed, matchRightSeed) => {
    const newWinners = { ...winners };

    let winningTeamInitialState;
    let losingTeamInitialState;
    let winnerOriginalSeed;

    if (winningSide === "left") {
      winningTeamInitialState = matchLeftTeam;
      losingTeamInitialState = matchRightTeam;
      winnerOriginalSeed = matchLeftSeed;
    } else { // winningSide === "right"
      winningTeamInitialState = matchRightTeam;
      losingTeamInitialState = matchLeftTeam;
      winnerOriginalSeed = matchRightSeed;
    }

    // Ensure we are working with actual team objects that have a rating
    if (typeof winningTeamInitialState !== 'object' || winningTeamInitialState.rating === undefined ||
        typeof losingTeamInitialState !== 'object' || losingTeamInitialState.rating === undefined) {
      console.error("Cannot adjust ELO: Team data is incomplete or not an object.", winningTeamInitialState, losingTeamInitialState);
      // Potentially show an error to the user or simply don't proceed with ELO adjustment
      // For now, we'll proceed assuming the disabled prop on TeamMatchup prevents this for unresolved teams.
      // If it still happens, the logic for passing teams or the disabled state needs review.
    }

    const newWinnerObject = {
      ...winningTeamInitialState,
      rating: (winningTeamInitialState.rating || 0) + ELO_CHANGE,
    };
    const newLoserObject = {
      ...losingTeamInitialState,
      rating: (losingTeamInitialState.rating || 0) - ELO_CHANGE,
    };

    newWinners[matchId] = {
      side: winningSide, // 'left' or 'right' side of the matchup that won
      winnerSeedNumber: winnerOriginalSeed, // The original seed of the team that won THIS match
      winningTeamObject: newWinnerObject, // The winner object with ELO adjustment
      losingTeamObject: newLoserObject,   // The loser object with ELO adjustment
    };

    // Reset dependent matches logic (ensure this is comprehensive)
    const resetDownstream = (startMatchId) => {
        const dependencies = {
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
        (dependencies[startMatchId] || []).forEach(mId => newWinners[mId] = null);
    };
    resetDownstream(matchId);

    setWinners(newWinners);
  };

  const getWinningTeamObject = (matchId) => {
    const matchInfo = winners[matchId];
    return matchInfo ? matchInfo.winningTeamObject : null;
  };

  const getLosingTeamObject = (matchId) => {
    const matchInfo = winners[matchId];
    return matchInfo ? matchInfo.losingTeamObject : null;
  };

  return (
    <div className="w-full p-4 overflow-auto">
      <div className="flex flex-col gap-6 justify-center items-center">
        {/* Play-In Tournament */}
        <div className="border-3 border-orange-400 rounded-lg p-4 bg-gray-900 w-full">
          <h3 className="text-xl font-semibold mb-4 text-center">Play-In Tournament</h3>
          <div className="flex flex-col gap-6">
            <TeamMatchup
              matchId="play-in-1"
              leftSeed="9"
              leftTeam={seedNine} // Original object
              rightSeed="10"
              rightTeam={seedTen} // Original object
              matchLabel="Play-In Game 1"
              onSelectWinner={handleSelectWinner}
              selectedWinner={winners["play-in-1"]?.side}
              currentRound={currentRound}
            />
            <TeamMatchup
              matchId="play-in-2"
              leftSeed="7"
              leftTeam={seedSeven} // Original object
              rightSeed="8"
              rightTeam={seedEight} // Original object
              matchLabel="Play-In Game 2"
              onSelectWinner={handleSelectWinner}
              selectedWinner={winners["play-in-2"]?.side}
              currentRound={currentRound}
            />
            <TeamMatchup
              matchId="play-in-final"
              leftSeed={winners["play-in-1"]?.winnerSeedNumber || "W1"}
              leftTeam={getWinningTeamObject("play-in-1") || "Winner G1"}
              rightSeed={winners["play-in-2"]?.side === "left" ? "8" : winners["play-in-2"]?.side === "right" ? "7" : "L2"} // This seed logic for loser needs care
              rightTeam={getLosingTeamObject("play-in-2") || "Loser G2"}
              matchLabel="Play-In Final"
              onSelectWinner={handleSelectWinner}
              selectedWinner={winners["play-in-final"]?.side}
              disabled={!winners["play-in-1"] || !winners["play-in-2"]}
              currentRound={currentRound}
            />
          </div>
        </div>

        {/* Main Playoff Bracket */}
        <div className="border-4 border-orange-400 rounded-lg p-4 bg-gray-900 w-full">
          <h3 className="text-xl font-semibold mb-4 text-center">Playoff Bracket</h3>
          <div className="flex flex-col gap-4">
            {/* Quarterfinals */}
            <div className="flex-1">
              <h4 className="text-center text-lg mb-3">Quarterfinals</h4>
              <div className="flex flex-col gap-4">
                <TeamMatchup
                  matchId="qf-1"
                  leftSeed="1"
                  leftTeam={seedOne} // Original object
                  rightSeed={winners["play-in-final"]?.winnerSeedNumber || "WPF"}
                  rightTeam={getWinningTeamObject("play-in-final") || "Play-In Final Winner"}
                  onSelectWinner={handleSelectWinner}
                  selectedWinner={winners["qf-1"]?.side}
                  disabled={!winners["play-in-final"]}
                  currentRound={currentRound}
                />
                <TeamMatchup
                  matchId="qf-2"
                  leftSeed="4"
                  leftTeam={seedFour} // Original object
                  rightSeed="5"
                  rightTeam={seedFive} // Original object
                  onSelectWinner={handleSelectWinner}
                  selectedWinner={winners["qf-2"]?.side}
                  currentRound={currentRound}
                />
                <TeamMatchup
                  matchId="qf-3"
                  leftSeed="2"
                  leftTeam={seedTwo} // Original object
                  rightSeed={winners["play-in-2"]?.winnerSeedNumber || "WPI2"}
                  rightTeam={getWinningTeamObject("play-in-2") || "Play-In Game 2 Winner"}
                  onSelectWinner={handleSelectWinner}
                  selectedWinner={winners["qf-3"]?.side}
                  disabled={!winners["play-in-2"]}
                  currentRound={currentRound}
                />
                <TeamMatchup
                  matchId="qf-4"
                  leftSeed="3"
                  leftTeam={seedThree} // Original object
                  rightSeed="6"
                  rightTeam={seedSix} // Original object
                  onSelectWinner={handleSelectWinner}
                  selectedWinner={winners["qf-4"]?.side}
                  currentRound={currentRound}
                />
              </div>
            </div>

            {/* Semifinals */}
            <div className="flex-1">
              <h4 className="text-center text-lg mb-3">Semifinals</h4>
              <div className="flex flex-col gap-4">
                <TeamMatchup
                  matchId="sf-1"
                  leftSeed={winners["qf-1"]?.winnerSeedNumber || "WQF1"}
                  leftTeam={getWinningTeamObject("qf-1") || "Winner QF1"}
                  rightSeed={winners["qf-2"]?.winnerSeedNumber || "WQF2"}
                  rightTeam={getWinningTeamObject("qf-2") || "Winner QF2"}
                  onSelectWinner={handleSelectWinner}
                  selectedWinner={winners["sf-1"]?.side}
                  disabled={!winners["qf-1"] || !winners["qf-2"]}
                  currentRound={currentRound}
                />
                <TeamMatchup
                  matchId="sf-2"
                  leftSeed={winners["qf-3"]?.winnerSeedNumber || "WQF3"}
                  leftTeam={getWinningTeamObject("qf-3") || "Winner QF3"}
                  rightSeed={winners["qf-4"]?.winnerSeedNumber || "WQF4"}
                  rightTeam={getWinningTeamObject("qf-4") || "Winner QF4"}
                  onSelectWinner={handleSelectWinner}
                  selectedWinner={winners["sf-2"]?.side}
                  disabled={!winners["qf-3"] || !winners["qf-4"]}
                  currentRound={currentRound}
                />
              </div>
            </div>

            {/* Final */}
            <div className="flex-1">
              <h4 className="text-center text-lg mb-3">Final</h4>
              <div className="flex flex-col gap-4">
                <TeamMatchup
                  matchId="final"
                  leftSeed={winners["sf-1"]?.winnerSeedNumber || "WSF1"}
                  leftTeam={getWinningTeamObject("sf-1") || "Winner SF1"}
                  rightSeed={winners["sf-2"]?.winnerSeedNumber || "WSF2"}
                  rightTeam={getWinningTeamObject("sf-2") || "Winner SF2"}
                  onSelectWinner={handleSelectWinner}
                  selectedWinner={winners["final"]?.side}
                  disabled={!winners["sf-1"] || !winners["sf-2"]}
                  currentRound={currentRound}
                />
              </div>
            </div>

            {/* Champion Display */}
            {winners["final"] && (
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-bold mb-2">Champion</h3>
                <div className="inline-block border-2 border-orange-300 rounded-lg p-4 bg-gray-700">
                  <div className="flex items-center gap-3 justify-center">
                    <div className="border border-orange-300 w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 text-sm">
                      {winners["final"].winnerSeedNumber}
                    </div>
                    <div className="text-xl font-bold text-orange-400">
                      {/* Ensure winningTeamObject and its name exist */}
                      {winners["final"].winningTeamObject?.name || "Champion"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayoffBracket;
