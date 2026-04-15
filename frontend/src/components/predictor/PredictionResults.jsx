// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import AnimatedNumber from "../features/AnimatedNumber";
import { layoutCardClass } from "../layout/LayoutShell";

const ResultCard = ({ variant, team, teamName, probability }) => {
  const accentClass = variant === "home" ? "text-emerald-300" : "text-sky-300";
  const barClass = variant === "home" ? "bg-emerald-400" : "bg-sky-400";

  return (
    <article className={`${layoutCardClass} border border-white/10`}>
      <div className="flex flex-col gap-6 px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-white/10 p-2">
            {team?.logoImg ? (
              <img src={team.logoImg} alt={`${team?.name} logo`} className="h-12 w-12 object-contain" />
            ) : (
              <span className="text-xs text-gray-400">N/A</span>
            )}
          </div>
          <div>
            <p className={`text-xs uppercase tracking-wider font-semibold ${accentClass}`}>
              {variant === "home" ? "Home" : "Away"}
            </p>
            <h4 className="text-xl font-semibold text-slate-100">{teamName || team?.name}</h4>
          </div>
        </div>
        {/* Percentage */}
        <div className="text-center">
          <div className="text-4xl font-bold text-slate-100">
            <AnimatedNumber value={probability * 100} />%
          </div>
        </div>
        {/* Win probability bar */}
        <div className="h-2 w-full rounded-full bg-white/10">
          <div className={`h-2 rounded-full ${barClass}`} style={{ width: `${Math.min(100, probability * 100)}%` }} />
        </div>
      </div>
    </article>
  );
};

const PredictionResults = ({ predictions, displayTeams }) => {
  if (!predictions) return null;

  return (
    <motion.section
      className="space-y-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <h3 className="mt-2 text-2xl font-semibold text-slate-100">Win probabilities</h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ResultCard
          variant="home"
          team={displayTeams.homeData}
          teamName={displayTeams.home}
          probability={predictions.homeTeam}
        />
        <ResultCard
          variant="away"
          team={displayTeams.awayData}
          teamName={displayTeams.away}
          probability={predictions.awayTeam}
        />
      </div>
    </motion.section>
  );
};

export default PredictionResults;
