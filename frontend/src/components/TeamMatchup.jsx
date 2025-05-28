import { calculateExpectedScorePlayoff } from "../utils/calculateExpectedScore";

const TeamMatchup = ({
  leftSeed,
  leftTeam,
  rightSeed,
  rightTeam,
  matchLabel,
  matchId,
  onSelectWinner,
  selectedWinner,
  disabled = false,
  currentRound,
}) => {
  const isLeftTeamObject = typeof leftTeam === "object" && leftTeam !== null;
  const isRightTeamObject = typeof rightTeam === "object" && rightTeam !== null;

  let currentLeftWinPercent = 0.5;
  let currentRightWinPercent = 0.5;

  if (isLeftTeamObject && leftTeam.rating !== undefined && isRightTeamObject && rightTeam.rating !== undefined) {
    const round = currentRound;

    const homeArrayFormAdvantage =
      isLeftTeamObject && Array.isArray(leftTeam.form) && leftTeam.form[round - 1] !== undefined
        ? leftTeam.form.slice(Math.max(0, round - 5), round)
        : [];

    const awayArrayFormAdvantage =
      isRightTeamObject && Array.isArray(rightTeam.form) && rightTeam.form[round - 1] !== undefined
        ? rightTeam.form.slice(Math.max(0, round - 5), round)
        : [];

    const homeFormAdvantage =
      homeArrayFormAdvantage.length === 0
        ? 0
        : homeArrayFormAdvantage.filter((result) => result === "W").length / homeArrayFormAdvantage.length;

    const awayFormAdvantage =
      awayArrayFormAdvantage.length === 0
        ? 0
        : awayArrayFormAdvantage.filter((result) => result === "W").length / awayArrayFormAdvantage.length;

    const prediction = calculateExpectedScorePlayoff(
      leftTeam.rating,
      rightTeam.rating,
      homeFormAdvantage,
      awayFormAdvantage
    );
    currentLeftWinPercent = prediction.homeTeam || 0.5;
    currentRightWinPercent = prediction.awayTeam || 0.5;
  }

  return (
    <div className={`border border-orange-400 rounded-lg p-3 ${disabled ? "bg-gray-800/50" : "bg-gray-800"}`}>
      {matchLabel && <div className="text-center text-sm text-gray-400 mb-2">{matchLabel}</div>}
      <div className="grid grid-cols-3 items-center">
        <div
          className={`flex items-center gap-2 justify-self-start p-1 rounded-lg ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : `cursor-pointer transition-all duration-200 ${
                  selectedWinner === "left" ? "bg-gray-700" : "hover:bg-gray-700"
                }`
          }`}
          onClick={() => !disabled && onSelectWinner(matchId, "left", leftTeam, rightTeam, leftSeed, rightSeed)}
        >
          <div className="border border-orange-400 w-8 h-8 flex items-center justify-center rounded-full bg-gray-600 text-xs">
            {leftSeed}
          </div>
          <div className="flex flex-col">
            <div className="font-medium truncate max-w-[120px]">
              {(isLeftTeamObject ? leftTeam.name : leftTeam) || `Team ${leftSeed}`}
            </div>
            {isLeftTeamObject && currentLeftWinPercent !== undefined && (
              <div className="text-xs text-green-400">{(currentLeftWinPercent * 100).toFixed(2)}% chance</div>
            )}
          </div>
        </div>
        <div className="justify-self-center font-bold">VS</div>
        <div
          className={`flex items-center gap-2 justify-self-end p-1 rounded-lg ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : `cursor-pointer transition-all duration-200 ${
                  selectedWinner === "right" ? "bg-gray-700" : "hover:bg-gray-700"
                }`
          }`}
          onClick={() => !disabled && onSelectWinner(matchId, "right", leftTeam, rightTeam, leftSeed, rightSeed)}
        >
          <div className="flex flex-col items-end">
            <div className="font-medium truncate max-w-[120px]">
              {(isRightTeamObject ? rightTeam.name : rightTeam) || `Team ${rightSeed}`}
            </div>
            {isRightTeamObject && currentRightWinPercent !== undefined && (
              <div className="text-xs text-green-400">{(currentRightWinPercent * 100).toFixed(2)}% chance</div>
            )}
          </div>
          <div className="border border-orange-400 w-8 h-8 flex items-center justify-center rounded-full bg-gray-600 text-xs">
            {rightSeed}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMatchup;
