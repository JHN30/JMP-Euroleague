import { getFinalMatchupProps } from "./finalSectionUtils";
import TeamMatchup from "./TeamMatchup";

const FinalSection = ({ winners, onSelectWinner, getWinningTeam }) => {
  const matchupProps = getFinalMatchupProps({ winners, onSelectWinner, getWinningTeam });

  return (
    <div className="space-y-4">
      <h3 className="text-center text-lg font-semibold text-orange-300">Championship Final</h3>
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <TeamMatchup {...matchupProps} />
        </div>
      </div>
    </div>
  );
};

export default FinalSection;
