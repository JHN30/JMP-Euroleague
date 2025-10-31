import { FaCheck } from "react-icons/fa";

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
}) => {
  const handleTeamSelect = (side) => {
    if (disabled) return;
    onSelectWinner(matchId, side, leftTeam, rightTeam, leftSeed, rightSeed);
  };

  const calculateWinProbability = (team1, team2) => {
    if (!team1 || !team2 || typeof team1 !== "object" || typeof team2 !== "object") {
      return { leftWinChance: 50, rightWinChance: 50 };
    }

    const rating1 = team1.rating2 || 1500;
    const rating2 = team2.rating2 || 1500;

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
      <button
        type="button"
        onClick={() => handleTeamSelect(side)}
        disabled={disabled}
        className={`group relative flex w-full items-center gap-3 rounded-2xl border border-white/5 px-3 py-3 text-left transition-all duration-300 ${
          disabled
            ? "cursor-not-allowed opacity-40"
            : "hover:-translate-y-0.5 hover:border-orange-300/50 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/60"
        } ${
          isSelected
            ? "bg-gradient-to-r from-orange-500/80 via-amber-400/70 to-yellow-300/60 text-white shadow-lg shadow-orange-500/30"
            : "bg-white/5 text-gray-100"
        }`}
      >
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
            isSelected ? "bg-white text-orange-600" : "bg-orange-500/20 text-orange-200"
          }`}
        >
          {seed}
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-2">
          {teamLogo ? (
            <>
              <img
                src={teamLogo}
                alt={`${teamName} logo`}
                className="h-9 w-9 flex-shrink-0 rounded-lg bg-white/5 object-contain p-1"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "flex";
                }}
              />
              <div className="hidden h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-red-500 text-sm font-bold">
                {teamName?.charAt(0) || "?"}
              </div>
              <span className="truncate text-sm font-medium text-white/90">{teamName}</span>
            </>
          ) : (
            <span className="truncate text-sm font-medium text-white/80">{teamName}</span>
          )}
        </div>

        {showProbability && (
          <div
            className={`flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
              isSelected ? "bg-white/20 text-white" : "bg-orange-400/15 text-orange-200"
            }`}
          >
            {winChance}%
          </div>
        )}

        {isSelected && (
          <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-xs font-bold text-slate-950 shadow-lg">
            <FaCheck />
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="w-full max-w-full space-y-3 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-4 shadow-2xl shadow-black/30 backdrop-blur">
      {matchLabel && (
        <div className="rounded-2xl bg-white/5 px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.4em] text-orange-200">
          {matchLabel}
        </div>
      )}

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

        <div className="text-center text-[10px] font-semibold uppercase tracking-[0.5em] text-white/40">VS</div>

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

      {disabled && (
        <div className="rounded-2xl bg-black/30 py-2 text-center text-xs font-medium text-gray-300">
          Complete previous matches
        </div>
      )}
    </div>
  );
};

export default TeamMatchup;
