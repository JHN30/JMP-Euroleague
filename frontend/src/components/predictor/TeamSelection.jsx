const TeamSelection = ({ teams, selectedHomeTeam, selectedAwayTeam, onSelectHome, onSelectAway }) => {
  const sortedTeams = (teams?.data ?? []).sort((a, b) => a.name.localeCompare(b.name));
  const teamSelectClass =
    "appearance-none w-full rounded-lg border border-white/10 bg-slate-800/50 px-5 py-2 pr-11 text-sm font-medium text-slate-200 shadow-sm outline-none transition-all duration-200 hover:border-white/20 hover:bg-slate-800/80 focus:border-orange-400 focus:bg-slate-800 focus:ring-4 focus:ring-orange-400/10";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
      <div className="space-y-2">
        <label htmlFor="home-team" className="text-xs font-semibold uppercase tracking-wider text-orange-400/90">
          Home team
        </label>
        <div className="relative">
          <select
            id="home-team"
            className={teamSelectClass}
            onChange={onSelectHome}
            value={selectedHomeTeam}
          >
            <option disabled value="" className="bg-slate-800 text-slate-400">
              Select Home Team
            </option>
            {sortedTeams
              .filter((team) => team.name !== selectedAwayTeam)
              .map((team) => (
                <option key={team.name} value={team.name} className="bg-slate-800 text-slate-200">
                  {team.name}
                </option>
              ))}
          </select>
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
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <span className="text-4xl font-bold text-orange-300">VS</span>
      </div>

      <div className="space-y-2">
        <label htmlFor="away-team" className="text-xs font-semibold uppercase tracking-wider text-orange-400/90">
          Away team
        </label>
        <div className="relative">
          <select
            id="away-team"
            className={teamSelectClass}
            onChange={onSelectAway}
            value={selectedAwayTeam}
          >
            <option disabled value="" className="bg-slate-800 text-slate-400">
              Select Away Team
            </option>
            {sortedTeams
              .filter((team) => team.name !== selectedHomeTeam)
              .map((team) => (
                <option key={team.name} value={team.name} className="bg-slate-800 text-slate-200">
                  {team.name}
                </option>
              ))}
          </select>
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
        </div>
      </div>
    </div>
  );
};

export default TeamSelection;
