import TeamMatchup from "./TeamMatchup";

const PlayInSection = ({
  seededTeams,
  winners,
  onSelectWinner,
  getWinningTeam,
  getLosingTeam,
  currentRound,
}) => {
  if (!seededTeams) {
    return null;
  }

  return (
    <section
      className="border-2 border-orange-400/50 rounded-xl p-4 md:p-6 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl"
      role="region"
      aria-labelledby="play-in-title"
    >
      <h2 id="play-in-title" className="text-xl md:text-2xl font-bold mb-6 text-center text-orange-300">
        Play-In Tournament
      </h2>

      <div className="grid gap-4 md:gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
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
              rightSeed={winners["play-in-2"]?.side === "left" ? "8" : winners["play-in-2"]?.side === "right" ? "7" : "L2"}
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
    </section>
  );
};

export default PlayInSection;

