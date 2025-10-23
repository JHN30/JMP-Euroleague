import { useEffect, useMemo, useState } from "react";

import { useTeam } from "../hooks/useTeam";
import { useRound } from "../hooks/useRound";
import TeamCardSkeleton from "../components/skeletons/TeamCardSkeleton";
import TeamGrid from "../components/admin/updateTeam/TeamGrid";
import TeamUpdate from "../components/admin/updateTeam/TeamUpdate";
import { sortTeams } from "../utils/sortTeams";

const UpdateTeamPage = () => {
  const [activeView, setActiveView] = useState("grid");
  const [team, setTeam] = useState({});
  const [selectedSeason, setSelectedSeason] = useState("2025");

  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam();
  const { fetchRounds, rounds, loadingRounds, errorRounds } = useRound();

  const sortConfig = { key: "name" };

  const sortedTeams = useMemo(
    () => sortTeams(teams.data, { key: sortConfig.key }),
    [teams.data, sortConfig.key]
  );

  const latestRound = rounds?.data[0]?.latestRound;

  const handleClick = (selectedTeam) => {
    setTeam(selectedTeam);
    setActiveView("team");
  };

  useEffect(() => {
    fetchTeams(selectedSeason);
    fetchRounds();
  }, [fetchTeams, selectedSeason, fetchRounds]);

  if (loadingTeams || loadingRounds) {
    return (
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-2 m-2">
        {Array.from({ length: 15 }).map((_, idx) => (
          <TeamCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (errorTeams || errorRounds) {
    return (
      <div className="flex items-center justify-center h-full w-full py-20">
        <p className="text-red-500">Error fetching data</p>
      </div>
    );
  }

  return (
    <>
      {activeView === "grid" && (
        <select
          className="select select-bordered w-full max-w-xs mx-2 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
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
      )}
      {activeView === "grid" && <TeamGrid sortedTeams={sortedTeams} handleClick={handleClick} />}
      {activeView === "team" && (
        <TeamUpdate team={team} latestRound={latestRound} setActiveView={setActiveView} allTeams={sortedTeams} />
      )}
    </>
  );
};

export default UpdateTeamPage;
