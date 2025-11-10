import { motion } from "framer-motion";

import { selectFieldClass } from "./predictorClasses";

const TeamSelection = ({ teams, selectedHomeTeam, selectedAwayTeam, onSelectHome, onSelectAway }) => {
  const sortedTeams = (teams?.data ?? []).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
      <div className="space-y-2">
        <label htmlFor="home-team" className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-100">
          Home team
        </label>
        <div className="relative">
          <select
            id="home-team"
            className={`${selectFieldClass} pr-10`}
            onChange={onSelectHome}
            value={selectedHomeTeam}
          >
            <option disabled value="">
              Select Home Team
            </option>
            {sortedTeams
              .filter((team) => team.name !== selectedAwayTeam)
              .map((team) => (
                <option key={team.name} value={team.name} className="bg-slate-900 text-white">
                  {team.name}
                </option>
              ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>

      <motion.div
        className="flex flex-col items-center justify-center gap-2"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-xs uppercase tracking-[0.6em] text-orange-200/70">Head-to-head</span>
        <span className="text-4xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
          VS
        </span>
      </motion.div>

      <div className="space-y-2">
        <label htmlFor="away-team" className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-100">
          Away team
        </label>
        <div className="relative">
          <select
            id="away-team"
            className={`${selectFieldClass} pr-10`}
            onChange={onSelectAway}
            value={selectedAwayTeam}
          >
            <option disabled value="">
              Select Away Team
            </option>
            {sortedTeams
              .filter((team) => team.name !== selectedHomeTeam)
              .map((team) => (
                <option key={team.name} value={team.name} className="bg-slate-900 text-white">
                  {team.name}
                </option>
              ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
