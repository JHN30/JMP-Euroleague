import { useCallback, useEffect, useMemo, useState } from "react";

import ErrorBox from "../components/errors/ErrorBox";

import { useTeam } from "../hooks/useTeam";
import { useRound } from "../hooks/useRound";

import TeamCardSkeleton from "../components/skeletons/TeamCardSkeleton";
import TeamGrid from "../components/admin/updateTeam/TeamGrid";
import TeamUpdate from "../components/admin/updateTeam/TeamUpdate";

import { sortTeams } from "../utils/sortTeams";
import SeasonSelect from "../components/common/SeasonSelect";
import { DEFAULT_SEASON } from "../constants/appConstants";

const UpdateTeamPage = () => {
  const [activeView, setActiveView] = useState("grid");
  const [team, setTeam] = useState({});
  const [selectedSeason, setSelectedSeason] = useState(DEFAULT_SEASON);

  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam();
  const { fetchRounds, rounds, loadingRounds, errorRounds } = useRound();

  const sortConfig = { key: "name" };

  const sortedTeams = useMemo(() => sortTeams(teams.data, { key: sortConfig.key }), [teams.data, sortConfig.key]);

  const latestRound = rounds?.data[0]?.latestRound;

  const handleClick = (selectedTeam) => {
    setTeam(selectedTeam);
    setActiveView("team");
  };

  const handleUpdateSuccess = useCallback(() => {
    setActiveView("grid");
    setTeam({});
    fetchTeams(selectedSeason);
  }, [fetchTeams, selectedSeason]);

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
        <ErrorBox error={errorTeams || errorRounds} />
      </div>
    );
  }

  return (
    <>
      {activeView === "grid" && (
        <SeasonSelect
          id="team-season"
          className="mx-2"
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
        />
      )}
      {activeView === "grid" && <TeamGrid sortedTeams={sortedTeams} handleClick={handleClick} />}
      {activeView === "team" && (
        <TeamUpdate
          team={team}
          latestRound={latestRound}
          setActiveView={setActiveView}
          allTeams={sortedTeams}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </>
  );
};

export default UpdateTeamPage;
