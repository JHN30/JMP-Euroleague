// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import StatsCard from "./StatsCard";
import { layoutCardClass } from "../layout/LayoutShell";

const buildStatItems = ({ teamData, ratingLabel, ratingValueDisplay }) => [
  {
    title: "Wins",
    value: teamData.wins,
  },
  {
    title: "Losses",
    value: teamData.losses,
  },
  {
    title: "Win%",
    value: teamData.winPercentage ? `${teamData.winPercentage.toFixed(2)}%` : "0%",
  },
  {
    title: "PTS+",
    value: teamData.pointsPlus,
  },
  {
    title: "PTS-",
    value: teamData.pointsMinus,
  },
  {
    title: ratingLabel,
    value: ratingValueDisplay,
  },
];

const TeamStatsSummaryCard = ({ teamData, ratingLabel, ratingValueDisplay }) => {
  const statItems = buildStatItems({ teamData, ratingLabel, ratingValueDisplay });

  return (
    <motion.section
      className={`${layoutCardClass} overflow-hidden px-4 py-4 sm:px-6 sm:py-6`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex h-full flex-col gap-4">
        <div className="border-b border-white/10 pb-4">
          <h2 className="text-2xl font-semibold text-white">Stats</h2>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {statItems.map((item) => (
            <StatsCard key={item.title} title={item.title} value={item.value} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TeamStatsSummaryCard;
