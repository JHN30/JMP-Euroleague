// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import AnimatedNumber from "../features/AnimatedNumber";
import { layoutCardClass } from "../layout/LayoutShell";
import { getOptimizedCloudinaryImageUrl } from "../../utils/imageUrlUtils";

const RESULT_CARD_VARIANTS = {
  home: {
    accentClass: "text-emerald-300",
    barClass: "bg-emerald-400",
    label: "Home",
  },
  away: {
    accentClass: "text-sky-300",
    barClass: "bg-sky-400",
    label: "Away",
  },
};

const getResultCardVariant = (variant) => RESULT_CARD_VARIANTS[variant] ?? RESULT_CARD_VARIANTS.away;

const getTeamLogoAlt = (team) => `${team?.name ?? "Team"} logo`;

const getTeamDisplayName = ({ team, teamName }) => teamName || team?.name;

const getProbabilityPercent = (probability) => Math.min(100, probability * 100);

const TeamLogo = ({ logoSrc, team }) => {
  if (!team?.logoImg) {
    return <span className="text-xs text-gray-400">N/A</span>;
  }

  return (
    <img
      src={logoSrc}
      alt={getTeamLogoAlt(team)}
      className="h-12 w-12 object-contain"
      width="48"
      height="48"
      loading="lazy"
      decoding="async"
    />
  );
};

const ResultCard = ({ variant, team, teamName, probability }) => {
  const variantConfig = getResultCardVariant(variant);
  const logoSrc = getOptimizedCloudinaryImageUrl(team?.logoImg, { width: 96 });
  const displayName = getTeamDisplayName({ team, teamName });
  const probabilityPercent = getProbabilityPercent(probability);

  return (
    <article className={`${layoutCardClass} border border-white/10`}>
      <div className="flex flex-col gap-6 px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-white/10 p-2">
            <TeamLogo logoSrc={logoSrc} team={team} />
          </div>
          <div>
            <p className={`text-xs uppercase tracking-wider font-semibold ${variantConfig.accentClass}`}>
              {variantConfig.label}
            </p>
            <h4 className="text-xl font-semibold text-slate-100">{displayName}</h4>
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
          <div className={`h-2 rounded-full ${variantConfig.barClass}`} style={{ width: `${probabilityPercent}%` }} />
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
