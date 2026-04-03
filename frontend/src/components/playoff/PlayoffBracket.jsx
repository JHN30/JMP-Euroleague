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

const PlayoffBracket = () => {
  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam();
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
  }, [fetchTeams]);

  const getSeededTeams = () => {
    const sortedTeams = teams?.data ?? [];
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
    setWinners((currentWinners) => {
      const updatedWinners = resetDownstreamMatches(matchId, currentWinners);
      const isLeftWinner = winningSide === "left";
      const winningTeam = isLeftWinner ? matchLeftTeam : matchRightTeam;
      const losingTeam = isLeftWinner ? matchRightTeam : matchLeftTeam;
      const winnerSeed = isLeftWinner ? matchLeftSeed : matchRightSeed;

      updatedWinners[matchId] = {
        side: winningSide,
        winnerSeedNumber: winnerSeed,
        winningTeamObject: winningTeam && typeof winningTeam === "object" ? { ...winningTeam } : winningTeam,
        losingTeamObject: losingTeam && typeof losingTeam === "object" ? { ...losingTeam } : losingTeam,
      };

      return updatedWinners;
    });
  };

  const getWinningTeamObject = (matchId) => winners[matchId]?.winningTeamObject || null;
  const getLosingTeamObject = (matchId) => winners[matchId]?.losingTeamObject || null;

  if (loadingTeams) {
    return <PlayoffBracketSkeleton />;
  }

  if (errorTeams) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <ErrorBox error={errorTeams} />
      </div>
    );
  }

  const seededTeams = getSeededTeams();

  return (
    <div className="w-full space-y-6">
      <PlayInSection
        seededTeams={seededTeams}
        winners={winners}
        onSelectWinner={handleSelectWinner}
        getWinningTeam={getWinningTeamObject}
        getLosingTeam={getLosingTeamObject}
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
          />
          <SemifinalsSection
            winners={winners}
            onSelectWinner={handleSelectWinner}
            getWinningTeam={getWinningTeamObject}
          />
          <FinalSection
            winners={winners}
            onSelectWinner={handleSelectWinner}
            getWinningTeam={getWinningTeamObject}
          />
        </div>
      </section>

      <ChampionDisplay champion={winners["final"]?.winningTeamObject} />
    </div>
  );
};

export default PlayoffBracket;
