const TeamMatchup = ({
  matchId,
  leftSeed,
  leftTeam,
  rightSeed,
  rightTeam,
  matchLabel,
  onSelectWinner,
  selectedWinner,
  disabled = false,
  useLogos = false,
}) => {
  const handleTeamSelect = (side) => {
    if (disabled) return;
    onSelectWinner(matchId, side, leftTeam, rightTeam, leftSeed, rightSeed);
  };

  // Calculate winning probability based on ELO ratings
  const calculateWinProbability = (team1, team2) => {
    if (!team1 || !team2 || typeof team1 !== "object" || typeof team2 !== "object") {
      return { leftWinChance: 50, rightWinChance: 50 };
    }

    const rating1 = team1.rating || 1500;
    const rating2 = team2.rating || 1500;

    // ELO probability formula
    const expected1 = 1 / (1 + Math.pow(10, (rating2 - rating1) / 400));
    const expected2 = 1 - expected1;

    return {
      leftWinChance: Math.round(expected1 * 100),
      rightWinChance: Math.round(expected2 * 100),
    };
  };

  const isLeftTeamObject = leftTeam && typeof leftTeam === "object";
  const isRightTeamObject = rightTeam && typeof rightTeam === "object";

  const leftTeamName = isLeftTeamObject ? leftTeam.name : leftTeam;
  const rightTeamName = isRightTeamObject ? rightTeam.name : rightTeam;
  const leftTeamLogo = isLeftTeamObject ? leftTeam.logoImg : null;
  const rightTeamLogo = isRightTeamObject ? rightTeam.logoImg : null;

  const winProbabilities = calculateWinProbability(leftTeam, rightTeam);

  const renderTeamDisplay = (team, seed, teamName, teamLogo, isSelected, side, winChance) => {
    const showProbability = isLeftTeamObject && isRightTeamObject && !disabled;

    return (
      <div
        className={`
          relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700 hover:scale-[1.02]"} 
          ${isSelected ? "bg-orange-500 text-white ring-2 ring-orange-400 shadow-lg" : "bg-gray-800 text-gray-300"}
        `}
        onClick={() => handleTeamSelect(side)}
      >
        {/* Seed Number */}
        <div
          className={`
          w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
          ${isSelected ? "bg-white text-orange-500" : "bg-orange-400 text-white"}
        `}
        >
          {seed}
        </div>

        {/* Team Logo and Name */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {useLogos && teamLogo ? (
            <>
              <img
                src={teamLogo}
                alt={`${teamName} logo`}
                className="w-10 h-10 object-contain flex-shrink-0"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "block";
                }}
              />
              <div
                className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ display: "none" }}
              >
                {teamName?.charAt(0) || "?"}
              </div>
              <span className="text-sm font-medium truncate">{teamName}</span>
            </>
          ) : (
            <span className="text-sm md:text-base font-medium truncate">{teamName || "TBD"}</span>
          )}
        </div>

        {/* Win Probability */}
        {showProbability && (
          <div
            className={`
            text-xs font-bold px-2 py-1 rounded-full flex-shrink-0
            ${isSelected ? "bg-white/20 text-white" : "bg-orange-400/20 text-orange-400"}
          `}
          >
            {winChance}%
          </div>
        )}

        {/* Selected indicator */}
        {isSelected && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-900 border border-gray-600 rounded-lg p-4 space-y-3 hover:border-orange-400/50 transition-colors duration-300">
      {/* Match Label */}
      {matchLabel && (
        <div className="text-center text-sm font-semibold text-orange-400 mb-3 bg-orange-400/10 py-2 rounded-lg">
          {matchLabel}
        </div>
      )}

      {/* Teams */}
      <div className="space-y-3">
        {renderTeamDisplay(
          leftTeam,
          leftSeed,
          leftTeamName,
          leftTeamLogo,
          selectedWinner === "left",
          "left",
          winProbabilities.leftWinChance
        )}

        <div className="text-center text-gray-500 text-sm font-bold py-1">
          <span className="bg-gray-700 px-3 py-1 rounded-full">VS</span>
        </div>

        {renderTeamDisplay(
          rightTeam,
          rightSeed,
          rightTeamName,
          rightTeamLogo,
          selectedWinner === "right",
          "right",
          winProbabilities.rightWinChance
        )}
      </div>

      {/* Reset Button */}
      {selectedWinner && !disabled && (
        <button
          onClick={() => onSelectWinner(matchId, null, leftTeam, rightTeam, leftSeed, rightSeed)}
          className="w-full py-2 text-xs text-gray-400 hover:text-white transition-colors hover:bg-gray-700 rounded-lg"
        >
          Reset Match
        </button>
      )}

      {/* Disabled state indicator */}
      {disabled && (
        <div className="text-center text-xs text-gray-500 bg-gray-800/50 py-2 rounded-lg">
          Complete previous matches to unlock
        </div>
      )}
    </div>
  );
};

export default TeamMatchup;
