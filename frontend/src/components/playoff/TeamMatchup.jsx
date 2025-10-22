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

    const rating1 = team1.rating2 || 1500;
    const rating2 = team2.rating2 || 1500;

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
          relative flex items-center gap-1.5 sm:gap-3 p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-300 
          ${disabled ? "opacity-50 cursor-not-allowed" : "md:hover:scale-[1.02] hover:bg-gray-700"} 
          ${isSelected ? "bg-orange-500 text-white ring-2 ring-orange-400 shadow-lg" : "bg-gray-800 text-gray-300"}
          overflow-hidden min-w-0
        `}
        onClick={() => handleTeamSelect(side)}
      >
        {/* Seed Number */}
        <div
          className={`
          w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
          ${isSelected ? "bg-white text-orange-500" : "bg-orange-400 text-white"}
        `}
        >
          {seed}
        </div>

        {/* Team Logo and Name */}
        <div className="flex items-center gap-1 md:gap-2 min-w-0 flex-1 overflow-hidden">
          {useLogos && teamLogo ? (
            <>
              <img
                src={teamLogo}
                alt={`${teamName} logo`}
                className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain flex-shrink-0"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "block";
                }}
              />
              <div
                className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ display: "none" }}
              >
                {teamName?.charAt(0) || "?"}
              </div>
              {/* Hide team name on very small screens when using logos */}
              <span className="hidden sm:block text-sm font-medium truncate min-w-0">{teamName}</span>
            </>
          ) : (
            <span className="text-sm md:text-base font-medium truncate min-w-0">{teamName}</span>
          )}
        </div>

        {/* Win Probability - Hide on very small screens */}
        {showProbability && (
          <div
            className={`
            text-sm font-bold px-1 md:px-1.5 py-0.5 rounded-full flex-shrink-0
            ${isSelected ? "bg-white/20 text-white" : "bg-orange-400/20 text-orange-400"}
          `}
          >
            {winChance}%
          </div>
        )}

        {/* Selected indicator */}
        {isSelected && (
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">✓</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-900 border border-gray-600 rounded-lg p-2 md:p-3 lg:p-4 space-y-1.5 md:space-y-2 lg:space-y-3 hover:border-orange-400/50 transition-colors duration-300 w-full max-w-full overflow-hidden">
      {/* Match Label */}
      {matchLabel && (
        <div className="text-center text-sm font-semibold text-orange-400 mb-1.5 md:mb-2 lg:mb-3 bg-orange-400/10 py-1 md:py-1.5 lg:py-2 rounded-lg">
          {matchLabel}
        </div>
      )}

      {/* Teams */}
      <div className="space-y-1.5 md:space-y-2 lg:space-y-3">
        {renderTeamDisplay(
          leftTeam,
          leftSeed,
          leftTeamName,
          leftTeamLogo,
          selectedWinner === "left",
          "left",
          winProbabilities.leftWinChance
        )}

        <div className="text-center text-gray-500 text-sm font-bold py-0.5 md:py-1">
          <span className="bg-gray-700 px-1.5 md:px-2 lg:px-3 py-0.5 rounded-full">VS</span>
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
          className="w-full py-1 md:py-1.5 lg:py-2 text-sm text-gray-400 hover:text-white transition-colors hover:bg-gray-700 rounded-lg"
        >
          Reset
        </button>
      )}

      {/* Disabled state indicator */}
      {disabled && (
        <div className="text-center text-sm text-gray-500 bg-gray-800/50 py-1 md:py-1.5 lg:py-2 rounded-lg">
          Complete previous matches
        </div>
      )}
    </div>
  );
};

export default TeamMatchup;
