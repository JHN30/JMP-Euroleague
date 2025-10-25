import { useEffect, useState } from "react";

import { useTeam } from "../../hooks/useTeam";

import StandingTeam from "./StandingTeam";
import FullTeamSkeleton from "../skeletons/FullTeamSkeleton";
import ErrorBox from "../errors/ErrorBox";
import { sortTeams } from "../../utils/sortTeams";
import SeasonSelect from "../common/SeasonSelect";

const StandingTeams = () => {
  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam();
  const [sortConfig, setSortConfig] = useState({
    key: "wins",
    order: "desc",
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipTimeout, setTooltipTimeout] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState("2025");
  const activeRatingKey = selectedSeason === "2024" ? "rating" : "rating2";
  const getTeamRatingValue = (team) => {
    const rawValue = activeRatingKey === "rating" ? team?.rating : team?.rating2;
    return Number(rawValue) || 0;
  };

  // Fetch teams data when the component mounts
  useEffect(() => {
    fetchTeams(selectedSeason);
  }, [fetchTeams, selectedSeason]);

  // Check if the teams data is still loading
  if (loadingTeams) {
    return <FullTeamSkeleton />;
  }

  // Check if there was an error fetching the teams
  if (errorTeams) {
    return (
      <div className="flex items-center justify-center h-full w-full py-20">
        <ErrorBox error={errorTeams} />
      </div>
    );
  }

  // Functions for sorting teams
  const handleSort = (key) => {
    let order = "asc";
    if (sortConfig.key === key && sortConfig.order === "asc") {
      order = "desc";
    }
    setSortConfig({ key, order });
  };

  const sortedTeams = sortTeams(teams.data, {
    key: sortConfig.key,
    order: sortConfig.order,
    getRatingValue: (team) => getTeamRatingValue(team),
  });

  //Tooltip handlers
  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setShowTooltip(true);
    }, 800);
    setTooltipTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
      setTooltipTimeout(null);
    }
    setShowTooltip(false);
  };

  return (
    <div className="overflow-x-auto">
      <SeasonSelect
        id="team-season"
        className="mx-2 my-2"
        value={selectedSeason}
        onChange={(e) => setSelectedSeason(e.target.value)}
      />
      <table className="table table-md">
        {/* Table Head */}
        <thead className="border-y-2  border-orange-400">
          <tr className="text-orange-400">
            <th className="font-bold">Pos</th>
            <th
              onClick={() => handleSort("name")}
              className="cursor-pointer hover:text-orange-300 transition-colors font-bold"
            >
              Name {sortConfig.key === "name" && (sortConfig.order === "asc" ? "▲" : "▼")}
            </th>
            <th
              onClick={() => handleSort("wins")}
              className="cursor-pointer hover:text-orange-300 transition-colors font-bold"
            >
              Win {sortConfig.key === "wins" && (sortConfig.order === "asc" ? "▲" : "▼")}
            </th>
            <th
              onClick={() => handleSort("losses")}
              className="cursor-pointer hover:text-orange-300 transition-colors font-bold"
            >
              Loss {sortConfig.key === "losses" && (sortConfig.order === "asc" ? "▲" : "▼")}
            </th>
            <th
              onClick={() => handleSort("winPercentage")}
              className="cursor-pointer hover:text-orange-300 transition-colors font-bold"
            >
              Win% {sortConfig.key === "winPercentage" && (sortConfig.order === "asc" ? "▲" : "▼")}
            </th>
            <th
              onClick={() => handleSort("pointsPlus")}
              className="cursor-pointer hover:text-orange-300 transition-colors font-bold"
            >
              PTS+ {sortConfig.key === "pointsPlus" && (sortConfig.order === "asc" ? "▲" : "▼")}
            </th>
            <th
              onClick={() => handleSort("pointsMinus")}
              className="cursor-pointer hover:text-orange-300 transition-colors font-bold"
            >
              PTS- {sortConfig.key === "pointsMinus" && (sortConfig.order === "asc" ? "▲" : "▼")}
            </th>
            <th
              onClick={() => handleSort("pointsPlusMinus")}
              className="cursor-pointer hover:text-orange-300 transition-colors font-bold"
            >
              +/- {sortConfig.key === "pointsPlusMinus" && (sortConfig.order === "asc" ? "▲" : "▼")}
            </th>
            <th className="font-bold">Form</th>
            <th
              onClick={() => handleSort(activeRatingKey)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="cursor-pointer hover:text-orange-300 transition-colors font-bold relative"
            >
              JMP Rating {sortConfig.key === activeRatingKey && (sortConfig.order === "asc" ? "▲" : "▼")}
              {showTooltip && (
                <div className="absolute bottom-10 right-12 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-10 border border-orange-400">
                  {selectedSeason !== "2025"
                    ? `Final ratings for this season. This season uses JMP Rating 1.0`
                    : `JMP Ratings are updated only after ALL round matches have been played`}
                  <div className="absolute top-full right-4 border-4 border-transparent border-t-orange-400"></div>
                </div>
              )}
            </th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {sortedTeams.map((team, index) => {
            const currentPosition = index + 1;
            const teamIndex = teams.data.indexOf(team);

            return (
              <StandingTeam
                key={team.name}
                team={{
                  ...team,
                  displayRating: getTeamRatingValue(team),
                  rating2: teams.data[teamIndex].rating2,
                }}
                position={currentPosition}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StandingTeams;
