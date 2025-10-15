import { motion } from "framer-motion";

import TeamCard from "../../cards/TeamCard";

const TeamGrid = ({ sortedTeams, handleClick }) => {
  return (
    <motion.div
      className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-2 m-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {sortedTeams.map((team) => {
        const stableKey = team._id ?? `${team.name}-${team.season ?? "unknown"}`;
        return (
          <button onClick={() => handleClick(team)} className="block h-full hover:cursor-pointer" key={stableKey}>
            <TeamCard team={team} />
          </button>
        );
      })}
    </motion.div>
  );
};

export default TeamGrid;
