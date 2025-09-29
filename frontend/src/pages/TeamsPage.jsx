import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useTeam2025 } from "../hooks/useTeam2025";
import ErrorBox from "../components/errors/ErrorBox";
import LoadingSpinner from "../components/common/LoadingSpinner";
import TeamCard from "../components/cards/TeamCard";


const TeamsPage = () => {
  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam2025();
  const sortConfig = {
    key: "name",
  };

  // Fetch teams data when the component mounts
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  if (loadingTeams) {
    return (
      <div className="flex items-center justify-center h-full w-full py-20">
        <LoadingSpinner />
      </div>
    );
  }

  // Check if there was an error fetching the teams
  if (errorTeams) {
    return (
      <div className="flex items-center justify-center h-full w-full py-20">
        <ErrorBox error={errorTeams} />
      </div>
    );
  }

  const sortedTeams = [...teams.data].sort((a, b) => {
    let aValue, bValue;
    aValue = a[sortConfig.key];
    bValue = b[sortConfig.key];

    return aValue > bValue ? 1 : -1;
  });

  return (
    <motion.div
      className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-2 m-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {sortedTeams.map((team, idx) => {
        return (
          <Link to={`/team-stats/${team._id}`} className="block h-full" key={team.name}>
            <TeamCard team={team} />
          </Link>
        );
      })}
    </motion.div>
  );
};

export default TeamsPage;
