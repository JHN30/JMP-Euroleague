import TeamMatchup from "./TeamMatchup";

const SemifinalsSection = ({ winners, onSelectWinner, getWinningTeam, currentRound }) => {
  return (
    <div>
      <h3 className="text-center text-lg md:text-xl font-semibold mb-4 text-orange-200">Semifinals</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
        <TeamMatchup
          matchId="sf-1"
          leftSeed={winners["qf-1"]?.winnerSeedNumber || "WQF"}
          leftTeam={getWinningTeam("qf-1") || "Winner QF1"}
          rightSeed={winners["qf-2"]?.winnerSeedNumber || "WQF"}
          rightTeam={getWinningTeam("qf-2") || "Winner QF2"}
          onSelectWinner={onSelectWinner}
          selectedWinner={winners["sf-1"]?.side}
          disabled={!winners["qf-1"] || !winners["qf-2"]}
          currentRound={currentRound}
          useLogos={true}
        />
        <TeamMatchup
          matchId="sf-2"
          leftSeed={winners["qf-3"]?.winnerSeedNumber || "WQF"}
          leftTeam={getWinningTeam("qf-3") || "Winner QF3"}
          rightSeed={winners["qf-4"]?.winnerSeedNumber || "WQF"}
          rightTeam={getWinningTeam("qf-4") || "Winner QF4"}
          onSelectWinner={onSelectWinner}
          selectedWinner={winners["sf-2"]?.side}
          disabled={!winners["qf-3"] || !winners["qf-4"]}
          currentRound={currentRound}
          useLogos={true}
        />
      </div>
    </div>
  );
};

export default SemifinalsSection;
