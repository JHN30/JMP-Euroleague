import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useTeam } from "../hooks/useTeam";
import ErrorBox from "../components/errors/ErrorBox";
import TeamCardSkeleton from "../components/skeletons/TeamCardSkeleton";
import TeamCard from "../components/cards/TeamCard";

const TeamsPage = () => {
  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam();
  const sortConfig = {
    key: "name",
  };
  const STORAGE_KEY = "teamsPage.selectedSeason";

  const [selectedSeason, setSelectedSeason] = useState(() => {
    if (typeof window === "undefined") {
      return "2025";
    }
    return window.localStorage.getItem(STORAGE_KEY) || "2025";
  });

  // Fetch teams data when the component mounts
  useEffect(() => {
    fetchTeams(selectedSeason);
  }, [fetchTeams, selectedSeason]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, selectedSeason);
  }, [selectedSeason]);

  if (loadingTeams) {
    return (
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-2 m-2">
        {[...Array(15)].map((_, idx) => (
          <TeamCardSkeleton key={idx} />
        ))}
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

  if (!teams?.data?.length) {
    return (
      <div className="flex items-center justify-center min-h-96 w-full">
        <div className="text-center p-8 border border-gray-600 rounded-lg bg-gray-800">
          <p className="text-lg text-gray-300">Team or round data is not available. Please try refreshing.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <select
        className="select select-bordered w-full max-w-xs mx-2 my-2 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
        onChange={(e) => setSelectedSeason(e.target.value)}
        value={selectedSeason}
      >
        <option disabled value="">
          Select Season
        </option>
        <option key={2024} value={2024}>
          2024
        </option>
        <option key={2025} value={2025}>
          2025
        </option>
      </select>

      <motion.div
        className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-2 m-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {sortedTeams.map((team, idx) => {
          return (
            <Link to={`/team-stats/${team._id}`} className="block h-full" key={team._id ?? team.name}>
              <TeamCard team={team} />
            </Link>
          );
        })}
      </motion.div>
    </>
  );
};

export default TeamsPage;
