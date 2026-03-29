import TeamMatchup from "./TeamMatchup";
import { layoutCardClass } from "../layout/LayoutShell";

const PlayInSection = ({ seededTeams, winners, onSelectWinner, getWinningTeam, getLosingTeam, currentRound }) => {
  if (!seededTeams) {
    return null;
  }

  return (
    <section className={`${layoutCardClass} overflow-hidden`} role="region" aria-labelledby="play-in-title">
      <div className="px-4 py-5 sm:px-6 sm:py-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-orange-400/90 font-semibold">Play-in</p>
          <h2 id="play-in-title" className="mt-2 text-2xl font-semibold text-slate-100">
            Qualification Round
          </h2>
        </div>

        <div className="mt-6 grid gap-5">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TeamMatchup
              matchId="play-in-1"
              leftSeed="9"
              leftTeam={seededTeams.seedNine}
              rightSeed="10"
              rightTeam={seededTeams.seedTen}
              matchLabel="Play-In Game 1"
              onSelectWinner={onSelectWinner}
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
              onSelectWinner={onSelectWinner}
              selectedWinner={winners["play-in-2"]?.side}
              currentRound={currentRound}
              useLogos={true}
            />
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <TeamMatchup
                matchId="play-in-final"
                leftSeed={winners["play-in-1"]?.winnerSeedNumber || "W1"}
                leftTeam={getWinningTeam("play-in-1") || "Winner G1"}
                rightSeed={
                  winners["play-in-2"]?.side === "left" ? "8" : winners["play-in-2"]?.side === "right" ? "7" : "L2"
                }
                rightTeam={getLosingTeam("play-in-2") || "Loser G2"}
                matchLabel="Play-In Final"
                onSelectWinner={onSelectWinner}
                selectedWinner={winners["play-in-final"]?.side}
                disabled={!winners["play-in-1"] || !winners["play-in-2"]}
                currentRound={currentRound}
                useLogos={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayInSection;
