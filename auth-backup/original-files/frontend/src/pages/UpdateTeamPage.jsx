import { useCallback, useEffect, useMemo, useState } from "react";

import ErrorBox from "../components/errors/ErrorBox";

import { useTeam } from "../hooks/useTeam";
import { useRound } from "../hooks/useRound";

import TeamCardSkeleton from "../components/skeletons/TeamCardSkeleton";
import TeamGrid, { teamGridClass } from "../components/admin/updateTeam/TeamGrid";
import TeamUpdate from "../components/admin/updateTeam/TeamUpdate";

import { sortTeams } from "../utils/sortTeams";

const UpdateTeamPage = () => {
  const [activeView, setActiveView] = useState("grid");
  const [team, setTeam] = useState({});

  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam();
  const { fetchRounds, rounds, loadingRounds, errorRounds } = useRound();

  const teamList = teams?.data ?? [];
  const sortedTeams = useMemo(() => sortTeams(teamList, { key: "name" }), [teamList]);

  const latestRound = rounds?.data[0]?.latestRound;

  const handleClick = (selectedTeam) => {
    setTeam(selectedTeam);
    setActiveView("team");
  };

  const handleUpdateSuccess = useCallback(() => {
    setActiveView("grid");
    setTeam({});
    fetchTeams();
  }, [fetchTeams]);

  useEffect(() => {
    fetchTeams();
    fetchRounds();
  }, [fetchTeams, fetchRounds]);

  if (loadingTeams || loadingRounds) {
    return (
      <div className={teamGridClass}>
        {Array.from({ length: 8 }).map((_, idx) => (
          <TeamCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (errorTeams || errorRounds) {
    return (
      <div className="flex items-center justify-center h-full w-full py-12">
        <ErrorBox error={errorTeams || errorRounds} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {activeView === "grid" && <TeamGrid sortedTeams={sortedTeams} handleClick={handleClick} />}
      {activeView === "team" && (
        <TeamUpdate
          key={`${team?._id ?? "team"}-${latestRound ?? 0}`}
          team={team}
          latestRound={latestRound}
          setActiveView={setActiveView}
          allTeams={sortedTeams}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default UpdateTeamPage;
