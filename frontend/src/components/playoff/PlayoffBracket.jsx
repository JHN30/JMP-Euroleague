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
import { layoutCardClass } from "../layout/LayoutShell";
import { DEFAULT_SEASON } from "../../constants/appConstants";
import { updateTeamElo } from "../../utils/eloCalculator";
import { resetDownstreamMatches } from "../../utils/playoffHelpers";

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

  const handleSelectWinner = (matchId, winningSide, matchLeftTeam, matchRightTeam, matchLeftSeed, matchRightSeed) => {
    const newWinners = { ...winners };

    const isLeftWinner = winningSide === "left";
    const winningTeam = isLeftWinner ? matchLeftTeam : matchRightTeam;
    const losingTeam = isLeftWinner ? matchRightTeam : matchLeftTeam;
    const winnerSeed = isLeftWinner ? matchLeftSeed : matchRightSeed;

    const { winnerNewRating, loserNewRating } = updateTeamElo(winningTeam?.rating2 || 0, losingTeam?.rating2 || 0);

    newWinners[matchId] = {
      side: winningSide,
      winnerSeedNumber: winnerSeed,
      winningTeamObject: { ...winningTeam, rating2: winnerNewRating },
      losingTeamObject: { ...losingTeam, rating2: loserNewRating },
    };

    resetDownstreamMatches(matchId, winners, setWinners);
    setWinners(newWinners);
  };

  const getWinningTeamObject = (matchId) => winners[matchId]?.winningTeamObject || null;
  const getLosingTeamObject = (matchId) => winners[matchId]?.losingTeamObject || null;

  if (loadingTeams || loadingRounds || !teams?.data?.length || !rounds?.data?.length) {
    return <PlayoffBracketSkeleton />;
  }

  if (errorTeams || errorRounds) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <ErrorBox error={errorTeams || errorRounds} />
      </div>
    );
  }

  const currentRound = rounds.data[0].currentRound;
  const seededTeams = getSeededTeams();

  return (
    <div className="w-full space-y-6">
      <PlayInSection
        seededTeams={seededTeams}
        winners={winners}
        onSelectWinner={handleSelectWinner}
        getWinningTeam={getWinningTeamObject}
        getLosingTeam={getLosingTeamObject}
        currentRound={currentRound}
      />

      <section className={`${layoutCardClass} overflow-hidden`} role="region" aria-labelledby="main-bracket-title">
        <div className="space-y-6 px-4 py-5 sm:px-6 sm:py-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-orange-400/90 font-semibold">Main bracket</p>
            <h2 id="main-bracket-title" className="mt-2 text-2xl font-semibold text-slate-100">
              Quarterfinals to Final
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
