import TeamMatchup from "./TeamMatchup";

const SemifinalsSection = ({ winners, onSelectWinner, getWinningTeam }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-center text-lg font-semibold text-orange-300">Semifinals</h3>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 lg:grid-cols-2">
        <TeamMatchup
          matchId="sf-1"
          leftSeed={winners["qf-1"]?.winnerSeedNumber || "WQF"}
          leftTeam={getWinningTeam("qf-1") || "Winner QF1"}
          rightSeed={winners["qf-2"]?.winnerSeedNumber || "WQF"}
          rightTeam={getWinningTeam("qf-2") || "Winner QF2"}
          onSelectWinner={onSelectWinner}
          selectedWinner={winners["sf-1"]?.side}
          disabled={!winners["qf-1"] || !winners["qf-2"]}
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
        />
      </div>
    </div>
  );
};

export default SemifinalsSection;
