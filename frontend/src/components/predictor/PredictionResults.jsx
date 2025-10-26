import { motion } from "framer-motion";

import AnimatedNumber from "../features/AnimatedNumber";
import { pageCardClass } from "../layout/PageShell";

const ResultCard = ({ variant, team, teamName, probability }) => {
  const isHome = variant === "home";
  const gradientClass =
    variant === "home"
      ? "border border-emerald-400/30"
      : "border border-sky-400/30";
  const overlayClass =
    variant === "home"
      ? "bg-gradient-to-br from-emerald-500/10 via-transparent to-slate-900/60"
      : "bg-gradient-to-br from-sky-500/10 via-transparent to-slate-900/60";
  const labelClass =
    variant === "home" ? "text-emerald-200" : "text-sky-200";
  const barGradient =
    variant === "home"
      ? "bg-gradient-to-r from-emerald-400 to-lime-300"
      : "bg-gradient-to-r from-sky-400 to-indigo-400";
  const stateColor =
    probability > 0.6
      ? variant === "home"
        ? "text-emerald-300"
        : "text-sky-300"
      : "text-gray-300";
  const statusLabel =
    probability > 0.6 ? "Favored side" : probability > 0.4 ? "Toss-up game" : "Underdog edge";

  return (
    <motion.article
      className={`${pageCardClass} relative overflow-hidden ${gradientClass}`}
      initial={{ x: isHome ? -20 : 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className={`pointer-events-none absolute inset-0 ${overlayClass}`} />
      <div className="relative z-10 flex flex-col gap-6 px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-white/10 p-2">
            {team?.logoImg ? (
              <img src={team.logoImg} alt={`${team?.name} logo`} className="h-12 w-12 object-contain" />
            ) : (
              <span className="text-xs text-gray-400">N/A</span>
            )}
          </div>
          <div>
            <p className={`text-sm uppercase tracking-[0.4em] ${labelClass}`}>{isHome ? "Home" : "Away"}</p>
            <h4 className="text-xl font-semibold text-white">{teamName || team?.name}</h4>
          </div>
        </div>

        <div className="text-center">
          <div className="text-4xl font-bold text-white">
            <AnimatedNumber value={probability * 100} />%
          </div>
          <p className="mt-1 text-sm text-gray-300">Win probability</p>
        </div>

        <div className="space-y-3">
          <div className="h-2 w-full rounded-full bg-white/10">
            <motion.div
              className={`h-2 rounded-full ${barGradient}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, probability * 100)}%` }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
          </div>
          <p className={`text-sm font-semibold ${stateColor}`}>{statusLabel}</p>
        </div>
      </div>
    </motion.article>
  );
};

const PredictionResults = ({ predictions, displayTeams }) => {
  if (!predictions) return null;

  return (
    <motion.section
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-orange-200">Projection</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Win probabilities</h3>
        <p className="text-sm text-gray-300">Animated by the latest JMP rating delta between selections.</p>
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
