import { MAX_INJURIES } from "../../constants/appConstants";

const InjuryInputs = ({ homeInjuries, awayInjuries, onHomeChange, onAwayChange }) => {
  const selectClass =
    "appearance-none w-full rounded-lg border border-white/10 bg-slate-800/50 px-5 py-2 pr-11 text-sm font-medium text-slate-200 shadow-sm outline-none transition-all duration-200 hover:border-white/20 hover:bg-slate-800/80 focus:border-orange-400 focus:bg-slate-800 focus:ring-4 focus:ring-orange-400/10";

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Home Team Injuries */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-orange-400/90">Home injuries</h3>

        <div className="space-y-3">
          <div className="space-y-2">
            <label htmlFor="home-stars" className="block text-xs text-white/70">
              Star Players Out
            </label>
            <div className="relative">
              <select
                id="home-stars"
                className={selectClass}
                value={homeInjuries.stars || 0}
                onChange={(e) => onHomeChange({ ...homeInjuries, stars: Number(e.target.value) })}
              >
                {[...Array(MAX_INJURIES.STAR + 1)].map((_, i) => (
                  <option key={i} value={i} className="bg-slate-800 text-slate-200">
                    {i}
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

          <div className="space-y-2">
            <label htmlFor="home-starters" className="block text-xs text-white/70">
              Starters Out
            </label>
            <div className="relative">
              <select
                id="home-starters"
                className={selectClass}
                value={homeInjuries.starters || 0}
                onChange={(e) => onHomeChange({ ...homeInjuries, starters: Number(e.target.value) })}
              >
                {[...Array(MAX_INJURIES.STARTER + 1)].map((_, i) => (
                  <option key={i} value={i} className="bg-slate-800 text-slate-200">
                    {i}
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

          <div className="space-y-2">
            <label htmlFor="home-keybench" className="block text-xs text-white/70">
              Key Bench Out
            </label>
            <div className="relative">
              <select
                id="home-keybench"
                className={selectClass}
                value={homeInjuries.keyBench || 0}
                onChange={(e) => onHomeChange({ ...homeInjuries, keyBench: Number(e.target.value) })}
              >
                {[...Array(MAX_INJURIES.KEY_BENCH + 1)].map((_, i) => (
                  <option key={i} value={i} className="bg-slate-800 text-slate-200">
                    {i}
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
      </div>

      {/* Away Team Injuries */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-orange-400/90">Away injuries</h3>

        <div className="space-y-3">
          <div className="space-y-2">
            <label htmlFor="away-stars" className="block text-xs text-white/70">
              Star Players Out
            </label>
            <div className="relative">
              <select
                id="away-stars"
                className={selectClass}
                value={awayInjuries.stars || 0}
                onChange={(e) => onAwayChange({ ...awayInjuries, stars: Number(e.target.value) })}
              >
                {[...Array(MAX_INJURIES.STAR + 1)].map((_, i) => (
                  <option key={i} value={i} className="bg-slate-800 text-slate-200">
                    {i}
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

          <div className="space-y-2">
            <label htmlFor="away-starters" className="block text-xs text-white/70">
              Starters Out
            </label>
            <div className="relative">
              <select
                id="away-starters"
                className={selectClass}
                value={awayInjuries.starters || 0}
                onChange={(e) => onAwayChange({ ...awayInjuries, starters: Number(e.target.value) })}
              >
                {[...Array(MAX_INJURIES.STARTER + 1)].map((_, i) => (
                  <option key={i} value={i} className="bg-slate-800 text-slate-200">
                    {i}
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

          <div className="space-y-2">
            <label htmlFor="away-keybench" className="block text-xs text-white/70">
              Key Bench Out
            </label>
            <div className="relative">
              <select
                id="away-keybench"
                className={selectClass}
                value={awayInjuries.keyBench || 0}
                onChange={(e) => onAwayChange({ ...awayInjuries, keyBench: Number(e.target.value) })}
              >
                {[...Array(MAX_INJURIES.KEY_BENCH + 1)].map((_, i) => (
                  <option key={i} value={i} className="bg-slate-800 text-slate-200">
                    {i}
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
      </div>
    </div>
  );
};

export default InjuryInputs;
