import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useTeam } from "../hooks/useTeam";
import ErrorBox from "../components/errors/ErrorBox";
import TeamCardSkeleton from "../components/skeletons/TeamCardSkeleton";
import TeamCard from "../components/cards/TeamCard";
import { sortTeams } from "../utils/sortTeams";
import SeasonSelect from "../components/common/SeasonSelect";
import PageShell, { pageCardClass } from "../components/layout/PageShell";

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

  const renderContent = () => {
    if (loadingTeams) {
      return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 15 }).map((_, idx) => (
            <TeamCardSkeleton key={idx} />
          ))}
        </div>
      );
    }

    if (errorTeams) {
      return (
        <div className={`${pageCardClass} flex min-h-[280px] items-center justify-center`}>
          <ErrorBox error={errorTeams} />
        </div>
      );
    }

    if (!teams?.data?.length) {
      return (
        <div className={`${pageCardClass} flex min-h-[280px] items-center justify-center`}>
          <ErrorBox error="Team or round data is not available. Please try refreshing." />
        </div>
      );
    }

    const sortedTeams = sortTeams(teams.data, { key: sortConfig.key });

    return (
      <motion.div
        className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {sortedTeams.map((team) => (
          <Link to={`/team-stats/${team._id}`} className="block h-full" key={team._id ?? team.name}>
            <TeamCard team={team} />
          </Link>
        ))}
      </motion.div>
    );
  };

  return (
    <PageShell>
      <div className="flex flex-col gap-8 text-white">
        <header className="flex flex-col items-center text-center gap-2">
          <p className="text-sm uppercase tracking-[0.4em] text-orange-300/80">JMP Teams</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-white">Explore Every Roster</h1>
          <p className="text-base text-gray-300 max-w-2xl">
            Browse each club and jump into detailed stats powered by the latest JMP rating data.
          </p>
        </header>

        <div className={`${pageCardClass} flex flex-col gap-6`}>
          <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-orange-200">Season filter</p>
              <p className="mt-2 text-sm text-gray-300">Toggle archived snapshots or the live leaderboard.</p>
            </div>
            <SeasonSelect
              id="team-season"
              className="mx-0 w-full sm:w-48"
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
            />
          </div>

          <div className="px-5 pb-6">{renderContent()}</div>
        </div>
      </div>
    </PageShell>
  );
};

export default TeamsPage;
