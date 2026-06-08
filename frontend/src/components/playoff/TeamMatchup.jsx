import { getOptimizedCloudinaryImageUrl } from "../../utils/imageUrlUtils";

const buttonBaseClass =
  "relative flex min-w-0 w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-200";
const buttonEnabledClass = "hover:border-orange-300/50 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/60";
const buttonDisabledClass = "cursor-not-allowed border-dashed border-slate-700/80 bg-slate-900/75 text-slate-500";
const buttonSelectedClass =
  "border-orange-300/60 bg-linear-to-r from-orange-500/20 via-orange-400/12 to-transparent text-white shadow-lg shadow-orange-950/20 ring-1 ring-orange-200/10";
const buttonDefaultClass = "border-white/10 bg-white/5 text-slate-100";

const seedBaseClass = "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors";
const logoBaseClass = "h-8 w-8 shrink-0 rounded-lg object-contain p-1";
const fallbackLogoBaseClass = "hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold";
const teamNameBaseClass = "min-w-0 flex-1 truncate text-sm font-medium";

const getTeamDetails = (team) => {
  if (team && typeof team === "object") {
    return {
      name: team.name,
      logo: team.logoImg,
    };
  }

  return {
    name: team,
    logo: null,
  };
};

const getButtonClass = ({ disabled, isSelected }) => {
  const interactionClass = disabled ? buttonDisabledClass : buttonEnabledClass;
  const selectionClass = isSelected ? buttonSelectedClass : buttonDefaultClass;

  return `${buttonBaseClass} ${interactionClass} ${selectionClass}`;
};

const getSeedClass = ({ disabled, isSelected }) => {
  if (disabled) {
    return `${seedBaseClass} bg-slate-800 text-slate-500`;
  }

  if (isSelected) {
    return `${seedBaseClass} bg-orange-300 text-slate-950 shadow-md shadow-orange-950/20`;
  }

  return `${seedBaseClass} bg-orange-500/20 text-orange-200`;
};

const getLogoClass = ({ disabled, isSelected }) => {
  if (disabled) {
    return `${logoBaseClass} bg-slate-800/80 opacity-60 grayscale`;
  }

  if (isSelected) {
    return `${logoBaseClass} bg-orange-300/10`;
  }

  return `${logoBaseClass} bg-white/5`;
};

const getFallbackLogoClass = ({ disabled, isSelected }) => {
  if (disabled) {
    return `${fallbackLogoBaseClass} bg-slate-800 text-slate-500`;
  }

  if (isSelected) {
    return `${fallbackLogoBaseClass} bg-orange-300/15 text-orange-100`;
  }

  return `${fallbackLogoBaseClass} bg-slate-700 text-slate-100`;
};

const getTeamNameClass = ({ disabled, isSelected, hasLogo }) => {
  if (disabled) {
    return `${teamNameBaseClass} text-slate-500`;
  }

  if (isSelected) {
    return `${teamNameBaseClass} text-white`;
  }

  const defaultColorClass = hasLogo ? "text-slate-100" : "text-slate-200";

  return `${teamNameBaseClass} ${defaultColorClass}`;
};

const getCardClass = (disabled) => {
  const stateClass = disabled ? "border-white/5 bg-slate-950/55 shadow-inner shadow-black/25" : "border-white/10 bg-white/5";

  return `h-fit min-w-0 self-start w-full space-y-3 rounded-2xl border p-4 transition-colors ${stateClass}`;
};

const getDividerClass = ({ disabled, direction }) => {
  const gradientDirection = direction === "left" ? "bg-linear-to-l" : "bg-linear-to-r";
  const colorStopClass = disabled ? "via-slate-700/70 to-slate-700/70" : "via-white/10 to-white/10";

  return `h-px flex-1 ${gradientDirection} from-transparent ${colorStopClass}`;
};

const SeedBadge = ({ seed, disabled, isSelected }) => (
  <div className={getSeedClass({ disabled, isSelected })}>{seed}</div>
);

const TeamLogo = ({ logo, teamName, disabled, isSelected }) => {
  if (!logo) {
    return null;
  }

  const logoSrc = getOptimizedCloudinaryImageUrl(logo, { width: 96 });

  return (
    <>
      <img
        src={logoSrc}
        alt={`${teamName} logo`}
        className={getLogoClass({ disabled, isSelected })}
        width="32"
        height="32"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextElementSibling.style.display = "flex";
        }}
      />
      <div className={getFallbackLogoClass({ disabled, isSelected })}>{teamName?.charAt(0) || "?"}</div>
    </>
  );
};

const TeamName = ({ teamName, disabled, isSelected, hasLogo }) => (
  <span className={getTeamNameClass({ disabled, isSelected, hasLogo })}>{teamName}</span>
);

const TeamButton = ({ seed, team, isSelected, side, disabled, onSelect }) => {
  const hasLogo = Boolean(team.logo);

  return (
    <button type="button" onClick={() => onSelect(side)} disabled={disabled} className={getButtonClass({ disabled, isSelected })}>
      <SeedBadge seed={seed} disabled={disabled} isSelected={isSelected} />

      <div className="flex min-w-0 flex-1 items-center gap-2">
        <TeamLogo logo={team.logo} teamName={team.name} disabled={disabled} isSelected={isSelected} />
        <TeamName teamName={team.name} disabled={disabled} isSelected={isSelected} hasLogo={hasLogo} />
      </div>
    </button>
  );
};

const MatchHeader = ({ matchLabel, disabled }) => {
  if (!matchLabel && !disabled) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <span className={getDividerClass({ disabled, direction: "right" })} />
      <div className="flex items-center gap-2">
        {matchLabel && (
          <div className={`text-center text-[11px] font-semibold uppercase tracking-[0.2em] ${disabled ? "text-slate-400" : "text-orange-300"}`}>
            {matchLabel}
          </div>
        )}
        {disabled && (
          <span className="rounded-full border border-slate-700/80 bg-slate-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Locked
          </span>
        )}
      </div>
      <span className={getDividerClass({ disabled, direction: "left" })} />
    </div>
  );
};

const VersusBadge = ({ disabled }) => (
  <div className="flex justify-center">
    <span
      className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${
        disabled ? "border-slate-700/80 bg-slate-900 text-slate-500" : "border-white/10 bg-black/15 text-slate-400"
      }`}
    >
      VS
    </span>
  </div>
);

const LockedHint = ({ disabled }) => {
  if (!disabled) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-700/70 bg-slate-900/90 px-3 py-2 text-center text-xs font-medium text-slate-300">
      Complete previous matches
    </div>
  );
};

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
  const leftTeamDetails = getTeamDetails(leftTeam);
  const rightTeamDetails = getTeamDetails(rightTeam);

  const handleTeamSelect = (side) => {
    if (disabled) return;
    onSelectWinner(matchId, side, leftTeam, rightTeam, leftSeed, rightSeed);
  };

  return (
    <div className={getCardClass(disabled)}>
      <MatchHeader matchLabel={matchLabel} disabled={disabled} />

      <div className="space-y-3">
        <TeamButton
          seed={leftSeed}
          team={leftTeamDetails}
          isSelected={selectedWinner === "left"}
          side="left"
          disabled={disabled}
          onSelect={handleTeamSelect}
        />

        <VersusBadge disabled={disabled} />

        <TeamButton
          seed={rightSeed}
          team={rightTeamDetails}
          isSelected={selectedWinner === "right"}
          side="right"
          disabled={disabled}
          onSelect={handleTeamSelect}
        />
      </div>

      <LockedHint disabled={disabled} />
    </div>
  );
};

export default TeamMatchup;
