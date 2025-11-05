import { INJURY_IMPACT, MAX_INJURIES } from "../../constants/appConstants";

const InjuryInputs = ({ homeInjuries, awayInjuries, onHomeChange, onAwayChange }) => {
  const selectClass =
    "appearance-none w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400/30";

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Home Team Injuries */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-100">Home Injuries</h3>

        <div className="space-y-3">
          <div className="space-y-2">
            <label htmlFor="home-stars" className="block text-xs text-white/70">
              Star Players Out
            </label>
            <div className="relative">
              <select
                id="home-stars"
                className={`${selectClass} pr-10`}
                value={homeInjuries.stars || 0}
                onChange={(e) => onHomeChange({ ...homeInjuries, stars: Number(e.target.value) })}
              >
                {[...Array(MAX_INJURIES.STAR + 1)].map((_, i) => (
                  <option key={i} value={i} className="bg-slate-900 text-white">
                    {i}
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

          <div className="space-y-2">
            <label htmlFor="home-starters" className="block text-xs text-white/70">
              Starters Out
            </label>
            <div className="relative">
              <select
                id="home-starters"
                className={`${selectClass} pr-10`}
                value={homeInjuries.starters || 0}
                onChange={(e) => onHomeChange({ ...homeInjuries, starters: Number(e.target.value) })}
              >
                {[...Array(MAX_INJURIES.STARTER + 1)].map((_, i) => (
                  <option key={i} value={i} className="bg-slate-900 text-white">
                    {i}
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

          <div className="space-y-2">
            <label htmlFor="home-keybench" className="block text-xs text-white/70">
              Key Bench Out
            </label>
            <div className="relative">
              <select
                id="home-keybench"
                className={`${selectClass} pr-10`}
                value={homeInjuries.keyBench || 0}
                onChange={(e) => onHomeChange({ ...homeInjuries, keyBench: Number(e.target.value) })}
              >
                {[...Array(MAX_INJURIES.KEY_BENCH + 1)].map((_, i) => (
                  <option key={i} value={i} className="bg-slate-900 text-white">
                    {i}
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
      </div>

      {/* Away Team Injuries */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-100">Away Injuries</h3>

        <div className="space-y-3">
          <div className="space-y-2">
            <label htmlFor="away-stars" className="block text-xs text-white/70">
              Star Players Out
            </label>
            <div className="relative">
              <select
                id="away-stars"
                className={`${selectClass} pr-10`}
                value={awayInjuries.stars || 0}
                onChange={(e) => onAwayChange({ ...awayInjuries, stars: Number(e.target.value) })}
              >
                {[...Array(MAX_INJURIES.STAR + 1)].map((_, i) => (
                  <option key={i} value={i} className="bg-slate-900 text-white">
                    {i}
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

          <div className="space-y-2">
            <label htmlFor="away-starters" className="block text-xs text-white/70">
              Starters Out
            </label>
            <div className="relative">
              <select
                id="away-starters"
                className={`${selectClass} pr-10`}
                value={awayInjuries.starters || 0}
                onChange={(e) => onAwayChange({ ...awayInjuries, starters: Number(e.target.value) })}
              >
                {[...Array(MAX_INJURIES.STARTER + 1)].map((_, i) => (
                  <option key={i} value={i} className="bg-slate-900 text-white">
                    {i}
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

          <div className="space-y-2">
            <label htmlFor="away-keybench" className="block text-xs text-white/70">
              Key Bench Out
            </label>
            <div className="relative">
              <select
                id="away-keybench"
                className={`${selectClass} pr-10`}
                value={awayInjuries.keyBench || 0}
                onChange={(e) => onAwayChange({ ...awayInjuries, keyBench: Number(e.target.value) })}
              >
                {[...Array(MAX_INJURIES.KEY_BENCH + 1)].map((_, i) => (
                  <option key={i} value={i} className="bg-slate-900 text-white">
                    {i}
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
      </div>
    </div>
  );
};

export default InjuryInputs;
