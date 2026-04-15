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
        className={`relative flex min-w-0 w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-200 ${
          disabled
            ? "cursor-not-allowed border-dashed border-slate-700/80 bg-slate-900/75 text-slate-500"
            : "hover:border-orange-300/50 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/60"
        } ${
          isSelected
            ? "border-orange-300/60 bg-linear-to-r from-orange-500/20 via-orange-400/12 to-transparent text-white shadow-lg shadow-orange-950/20 ring-1 ring-orange-200/10"
            : "border-white/10 bg-white/5 text-slate-100"
        }`}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
            disabled
              ? "bg-slate-800 text-slate-500"
              : isSelected
                ? "bg-orange-300 text-slate-950 shadow-md shadow-orange-950/20"
                : "bg-orange-500/20 text-orange-200"
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
                className={`h-8 w-8 shrink-0 rounded-lg object-contain p-1 ${
                  disabled ? "bg-slate-800/80 opacity-60 grayscale" : isSelected ? "bg-orange-300/10" : "bg-white/5"
                }`}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "flex";
                }}
              />
              <div
                className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                  disabled
                    ? "bg-slate-800 text-slate-500"
                    : isSelected
                      ? "bg-orange-300/15 text-orange-100"
                      : "bg-slate-700 text-slate-100"
                }`}
              >
                {teamName?.charAt(0) || "?"}
              </div>
              <span
                className={`min-w-0 flex-1 truncate text-sm font-medium ${
                  disabled ? "text-slate-500" : isSelected ? "text-white" : "text-slate-100"
                }`}
              >
                {teamName}
              </span>
            </>
          ) : (
            <span
              className={`min-w-0 flex-1 truncate text-sm font-medium ${
                disabled ? "text-slate-500" : isSelected ? "text-white" : "text-slate-200"
              }`}
            >
              {teamName}
            </span>
          )}
        </div>

      </button>
    );
  };

  return (
    <div
      className={`h-fit min-w-0 self-start w-full space-y-3 rounded-2xl border p-4 transition-colors ${
        disabled ? "border-white/5 bg-slate-950/55 shadow-inner shadow-black/25" : "border-white/10 bg-white/5"
      }`}
    >
      {(matchLabel || disabled) && (
        <div className="flex items-center gap-3">
          <span
            className={`h-px flex-1 ${
              disabled ? "bg-linear-to-r from-transparent via-slate-700/70 to-slate-700/70" : "bg-linear-to-r from-transparent via-white/10 to-white/10"
            }`}
          />
          <div className="flex items-center gap-2">
            {matchLabel && (
              <div
                className={`text-center text-[11px] font-semibold uppercase tracking-[0.2em] ${
                  disabled ? "text-slate-400" : "text-orange-300"
                }`}
              >
                {matchLabel}
              </div>
            )}
            {disabled && (
              <span className="rounded-full border border-slate-700/80 bg-slate-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Locked
              </span>
            )}
          </div>
          <span
            className={`h-px flex-1 ${
              disabled ? "bg-linear-to-l from-transparent via-slate-700/70 to-slate-700/70" : "bg-linear-to-l from-transparent via-white/10 to-white/10"
            }`}
          />
        </div>
      )}

      <div className="space-y-3">
        {renderTeamDisplay(leftSeed, leftTeamName, leftTeamLogo, selectedWinner === "left", "left")}

        <div className="flex justify-center">
          <span
            className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${
              disabled ? "border-slate-700/80 bg-slate-900 text-slate-500" : "border-white/10 bg-black/15 text-slate-400"
            }`}
          >
            VS
          </span>
        </div>

        {renderTeamDisplay(rightSeed, rightTeamName, rightTeamLogo, selectedWinner === "right", "right")}
      </div>

      {disabled && (
        <div className="rounded-xl border border-slate-700/70 bg-slate-900/90 px-3 py-2 text-center text-xs font-medium text-slate-300">
          Complete previous matches
        </div>
      )}
    </div>
  );
};

export default TeamMatchup;
