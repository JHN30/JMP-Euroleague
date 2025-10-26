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
import { pageCardClass } from "../layout/PageShell";

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

  const ELO_CHANGE = 16;
  const DEFAULT_SEASON = "2025";

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

  if (loadingTeams || loadingRounds || !teams?.data?.length || !rounds?.data?.length || true) {
    return (
      <div className={`${pageCardClass} flex min-h-[320px] w-full items-center justify-center`}>
        <PlayoffBracketSkeleton />
      </div>
    );
  }

  if (errorTeams || errorRounds) {
    return (
      <div className={`${pageCardClass} flex min-h-[280px] w-full items-center justify-center`}>
        <ErrorBox error={errorTeams || errorRounds} />
      </div>
    );
  }

  const currentRound = rounds.data[0].currentRound;
  const seededTeams = getSeededTeams();

  return (
    <div className="relative w-full space-y-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/15 to-transparent blur-[180px]" />
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <PlayInSection
        seededTeams={seededTeams}
        winners={winners}
        onSelectWinner={handleSelectWinner}
        getWinningTeam={getWinningTeamObject}
        getLosingTeam={getLosingTeamObject}
        currentRound={currentRound}
      />

      <section className={`${pageCardClass} relative overflow-hidden`} role="region" aria-labelledby="main-bracket-title">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-orange-400/10" />
        <div className="relative z-10 space-y-8 px-3 p-3">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-orange-200">Main Bracket</p>
            <h2 id="main-bracket-title" className="mt-2 text-2xl font-semibold text-white">
              Quarterfinals to Finals
            </h2>
          </div>

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
