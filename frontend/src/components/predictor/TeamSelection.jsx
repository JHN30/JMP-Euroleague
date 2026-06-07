const teamSelectClass =
  "appearance-none w-full rounded-lg border border-white/10 bg-slate-800/50 px-5 py-2 pr-11 text-sm font-medium text-slate-200 shadow-sm outline-none transition-all duration-200 hover:border-white/20 hover:bg-slate-800/80 focus:border-orange-400 focus:bg-slate-800 focus:ring-4 focus:ring-orange-400/10";

const SelectChevron = () => (
  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  </span>
);

const TeamSelectField = ({ id, label, placeholder, teams, excludedTeamName, value, onChange }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-orange-400/90">
      {label}
    </label>
    <div className="relative">
      <select id={id} className={teamSelectClass} onChange={onChange} value={value}>
        <option disabled value="" className="bg-slate-800 text-slate-400">
          {placeholder}
        </option>
        {teams
          .filter((team) => team.name !== excludedTeamName)
          .map((team) => (
            <option key={team.name} value={team.name} className="bg-slate-800 text-slate-200">
              {team.name}
            </option>
          ))}
      </select>
      <SelectChevron />
    </div>
  </div>
);

const TeamSelection = ({ teams, selectedHomeTeam, selectedAwayTeam, onSelectHome, onSelectAway }) => {
  const sortedTeams = [...(teams?.data ?? [])].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
      <TeamSelectField
        id="home-team"
        label="Home team"
        placeholder="Select Home Team"
        teams={sortedTeams}
        excludedTeamName={selectedAwayTeam}
        value={selectedHomeTeam}
        onChange={onSelectHome}
      />

      <div className="flex flex-col items-center justify-center gap-2">
        <span className="text-4xl font-bold text-orange-300">VS</span>
      </div>

      <TeamSelectField
        id="away-team"
        label="Away team"
        placeholder="Select Away Team"
        teams={sortedTeams}
        excludedTeamName={selectedHomeTeam}
        value={selectedAwayTeam}
        onChange={onSelectAway}
      />
    </div>
  );
};

export default TeamSelection;
