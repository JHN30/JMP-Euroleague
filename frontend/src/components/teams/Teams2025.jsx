import { useEffect, useState } from "react";

import { useTeam2025 } from "../../hooks/useTeam2025";

import Team2025 from "./Team2025";
import FullTeamSkeleton from "../skeletons/FullTeamSkeleton";
import ErrorBox from "../errors/ErrorBox";

const Teams2025 = () => {
  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam2025();
  const [sortConfig, setSortConfig] = useState({
    key: "rating",
    order: "desc",
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipTimeout, setTooltipTimeout] = useState(null);

  // Fetch teams data when the component mounts
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

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

  const handleSort = (key) => {
    let order = "asc";
    if (sortConfig.key === key && sortConfig.order === "asc") {
      order = "desc";
    }
    setSortConfig({ key, order });
  };

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

  const sortedTeams = [...teams.data].sort((a, b) => {
    let aValue, bValue;

    if (sortConfig.key === "rating") {
      // Use stored rating value
      aValue = Number(a.rating) || 0;
      bValue = Number(b.rating) || 0;
    } else if (sortConfig.key === "pointsPlus" || sortConfig.key === "pointsMinus" || sortConfig.key === "pointsPlusMinus") {
      if (sortConfig.key === "pointsPlus") {
        aValue = Number(a.pointsPlus) || 0;
        bValue = Number(b.pointsPlus) || 0;
      } else if (sortConfig.key === "pointsMinus") {
        aValue = Number(a.pointsMinus) || 0;
        bValue = Number(b.pointsMinus) || 0;
      } else {
        aValue = Number(a.pointsPlusMinus) || 0;
        bValue = Number(b.pointsPlusMinus) || 0;
      }
    } else {
      aValue = a[sortConfig.key];
      bValue = b[sortConfig.key];
    }

    // For numerical comparisons
    if (typeof aValue === "number" && typeof bValue === "number") {
      if (sortConfig.order === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    }

    // For string comparisons
    if (sortConfig.order === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="overflow-x-auto">
      <table className="table table-md">
        {/* Table Head */}
        <thead className="border-b-2 border-orange-400">
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
              onClick={() => handleSort("rating")}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="cursor-pointer hover:text-orange-300 transition-colors font-bold relative"
            >
              Rating {sortConfig.key === "rating" && (sortConfig.order === "asc" ? "▲" : "▼")}
              {showTooltip && (
                <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-10 border border-orange-400">
                  Note: JMP Ratings are updated only after ALL round matches have been played
                  <div className="absolute bottom-full right-4 border-4 border-transparent border-b-orange-400"></div>
                </div>
              )}
            </th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {sortedTeams.map((team, index) => {
            const currentPosition = index + 1;
            // Find the updated rating for this team in the updatedRatings array
            const teamIndex = teams.data.indexOf(team);
            //const updatedRating = updatedRatings[teamIndex] || team.rating;

            return (
              <Team2025
                key={team.name}
                team={{
                  ...team,
                  rating: teams.data[teamIndex].rating,
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

export default Teams2025;
