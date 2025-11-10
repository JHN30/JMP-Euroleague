import TeamMatchup from "./TeamMatchup";

const QuarterfinalsSection = ({ seededTeams, winners, onSelectWinner, getWinningTeam, currentRound }) => {
  if (!seededTeams) {
    return null;
  }

  return (
    <div>
      <h3 className="text-center text-lg md:text-xl font-semibold mb-4 text-orange-200">Quarterfinals</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        <TeamMatchup
          matchId="qf-1"
          leftSeed="1"
          leftTeam={seededTeams.seedOne}
          rightSeed={winners["play-in-final"]?.winnerSeedNumber || "WPF"}
          rightTeam={getWinningTeam("play-in-final") || "Play-In Final Winner"}
          onSelectWinner={onSelectWinner}
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
          onSelectWinner={onSelectWinner}
          selectedWinner={winners["qf-2"]?.side}
          currentRound={currentRound}
          useLogos={true}
        />
        <TeamMatchup
          matchId="qf-3"
          leftSeed="2"
          leftTeam={seededTeams.seedTwo}
          rightSeed={winners["play-in-2"]?.winnerSeedNumber || "WPI"}
          rightTeam={getWinningTeam("play-in-2") || "Play-In Game 2 Winner"}
          onSelectWinner={onSelectWinner}
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
          onSelectWinner={onSelectWinner}
          selectedWinner={winners["qf-4"]?.side}
          currentRound={currentRound}
          useLogos={true}
        />
      </div>
    </div>
  );
};

export default QuarterfinalsSection;
