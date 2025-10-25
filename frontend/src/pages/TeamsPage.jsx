import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useTeam } from "../hooks/useTeam";
import ErrorBox from "../components/errors/ErrorBox";
import TeamCardSkeleton from "../components/skeletons/TeamCardSkeleton";
import TeamCard from "../components/cards/TeamCard";
import { sortTeams } from "../utils/sortTeams";
import SeasonSelect from "../components/common/SeasonSelect";

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

  if (!teams?.data?.length) {
    return (
      <div className="flex items-center justify-center h-full w-full py-20">
        <ErrorBox error="Team or round data is not available. Please try refreshing." />
      </div>
    );
  }

  const sortedTeams = sortTeams(teams.data, { key: sortConfig.key });

  return (
    <>
      <SeasonSelect
        id="team-season"
        className="mx-2 my-2"
        value={selectedSeason}
        onChange={(e) => setSelectedSeason(e.target.value)}
      />

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
