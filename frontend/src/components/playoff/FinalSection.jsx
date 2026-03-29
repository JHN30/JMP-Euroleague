import TeamMatchup from "./TeamMatchup";

const FinalSection = ({ winners, onSelectWinner, getWinningTeam, currentRound }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-center text-lg font-semibold text-orange-300">Championship Final</h3>
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <TeamMatchup
            matchId="final"
            leftSeed={winners["sf-1"]?.winnerSeedNumber || "WSF"}
            leftTeam={getWinningTeam("sf-1") || "Winner SF1"}
            rightSeed={winners["sf-2"]?.winnerSeedNumber || "WSF"}
            rightTeam={getWinningTeam("sf-2") || "Winner SF2"}
            onSelectWinner={onSelectWinner}
            selectedWinner={winners["final"]?.side}
            disabled={!winners["sf-1"] || !winners["sf-2"]}
            currentRound={currentRound}
            useLogos={true}
          />
        </div>
      </div>
    </div>
  );
};

export default FinalSection;
