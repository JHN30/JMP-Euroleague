import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useTeam } from "../hooks/useTeam";
import ErrorBox from "../components/errors/ErrorBox";
import TeamCardSkeleton from "../components/skeletons/TeamCardSkeleton";
import TeamCard from "../components/cards/TeamCard";
import { sortTeams } from "../utils/sortTeams";
import SeasonSelect from "../components/common/SeasonSelect";
import LayoutShell, { layoutCardClass } from "../components/layout/LayoutShell";
import { DEFAULT_SEASON, STORAGE_KEYS } from "../constants/appConstants";

const TeamsPage = () => {
  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam();
  const sortConfig = {
    key: "name",
  };

  const [selectedSeason, setSelectedSeason] = useState(() => {
    if (typeof window === "undefined") {
      return DEFAULT_SEASON;
    }
    return window.localStorage.getItem(STORAGE_KEYS.TEAMS_PAGE_SEASON) || DEFAULT_SEASON;
  });

  // Fetch teams data when the component mounts
  useEffect(() => {
    fetchTeams(selectedSeason);
  }, [fetchTeams, selectedSeason]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEYS.TEAMS_PAGE_SEASON, selectedSeason);
  }, [selectedSeason]);

  const teamList = teams?.data ?? [];


  const renderContent = () => {
    if (loadingTeams) {
      return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 15 }).map((_, idx) => (
            <TeamCardSkeleton key={idx} />
          ))}
        </div>
      );
    }

    if (errorTeams) {
      return (
        <div className="flex h-full w-full items-center justify-center">
        <ErrorBox error={errorTeams} />
      </div>
      );
    }

    if (!teams?.data?.length) {
      return (
        <div className={`${layoutCardClass} flex min-h-[280px] items-center justify-center`}>
          <ErrorBox error="Team or round data is not available. Please try refreshing." />
        </div>
      );
    }

    const sortedTeams = sortTeams(teamList, { key: sortConfig.key });

    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {sortedTeams.map((team) => (
          <Link to={`/team-stats/${team._id}`} className="block h-full" key={team._id ?? team.name}>
            <TeamCard team={team} selectedSeason={selectedSeason} />
          </Link>
        ))}
      </div>
    );
  };

  return (
    <LayoutShell>
      <div className="flex flex-col gap-6 pt-4 text-white">
        <header className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-400/90">JMP Teams</p>
          <h1 className="text-3xl font-bold leading-tight text-slate-100">Explore Every Euroleague Club</h1>
        </header>

        <section className={`${layoutCardClass} overflow-hidden`} aria-labelledby="teams-directory-title">
          <div className="border-b border-white/10 px-4 py-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-start">
              <p className="text-xs uppercase tracking-wider text-orange-400/90 font-semibold">Season</p>
              <SeasonSelect
                id="team-season"
                className="mx-0 w-full sm:w-48"
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
              />
            </div>
          </div>

          <div className="px-5 py-5 sm:px-6 sm:py-6">{renderContent()}</div>
        </section>
      </div>
    </LayoutShell>
  );
};

export default TeamsPage;
