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

  const isLeftTeamObject = leftTeam && typeof leftTeam === "object";
  const isRightTeamObject = rightTeam && typeof rightTeam === "object";

  const leftTeamName = isLeftTeamObject ? leftTeam.name : leftTeam;
  const rightTeamName = isRightTeamObject ? rightTeam.name : rightTeam;
  const leftTeamLogo = isLeftTeamObject ? leftTeam.logoImg : null;
  const rightTeamLogo = isRightTeamObject ? rightTeam.logoImg : null;

  const renderTeamDisplay = (seed, teamName, teamLogo, isSelected, side) => {
    return (
      <button
        type="button"
        onClick={() => handleTeamSelect(side)}
        disabled={disabled}
        className={`relative flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "hover:border-orange-300/50 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/60"
        } ${
          isSelected
            ? "border-orange-300/50 bg-orange-500/15 text-white"
            : "border-white/10 bg-white/5 text-slate-100"
        }`}
      >
        <div
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
            isSelected ? "bg-orange-300 text-slate-900" : "bg-orange-500/20 text-orange-200"
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
                className="h-8 w-8 flex-shrink-0 rounded-lg bg-white/5 object-contain p-1"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "flex";
                }}
              />
              <div className="hidden h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-700 text-xs font-bold text-slate-100">
                {teamName?.charAt(0) || "?"}
              </div>
              <span className="truncate text-sm font-medium text-slate-100">{teamName}</span>
            </>
          ) : (
            <span className="truncate text-sm font-medium text-slate-200">{teamName}</span>
          )}
        </div>

        {isSelected && (
          <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-xs text-slate-950 shadow-lg">
            <FaCheck />
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="w-full space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
      {matchLabel && (
        <div className="text-center text-xs font-semibold uppercase tracking-wider text-orange-300">{matchLabel}</div>
      )}

      <div className="space-y-3">
        {renderTeamDisplay(leftSeed, leftTeamName, leftTeamLogo, selectedWinner === "left", "left")}

        <div className="text-center text-[10px] font-semibold uppercase tracking-wider text-slate-400">VS</div>

        {renderTeamDisplay(rightSeed, rightTeamName, rightTeamLogo, selectedWinner === "right", "right")}
      </div>

      {disabled && (
        <div className="rounded-xl bg-black/20 py-2 text-center text-xs font-medium text-slate-300">
          Complete previous matches
        </div>
      )}
    </div>
  );
};

export default TeamMatchup;
