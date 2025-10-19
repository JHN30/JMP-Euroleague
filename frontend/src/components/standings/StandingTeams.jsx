import { useEffect, useState } from "react";

import { useTeam } from "../../hooks/useTeam";

import StandingTeam from "./StandingTeam";
import FullTeamSkeleton from "../skeletons/FullTeamSkeleton";
import ErrorBox from "../errors/ErrorBox";

const Teams = () => {
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
    // Composite sorting when key is the active rating:
    // 1. Primary: rating (desc or asc per user choice) with equality determined on rounded value
    // 2. Secondary: pointsPlusMinus (follows same order direction as rating)
    // 3. Tertiary: wins (same direction as rating = more wins first if desc, fewer wins first if asc)
    // 4. Quaternary: alphabetical name for deterministic ordering
    if (sortConfig.key === "rating2" || sortConfig.key === "rating") {
      const aRating = getTeamRatingValue(a);
      const bRating = getTeamRatingValue(b);
      const aRounded = Math.round(aRating);
      const bRounded = Math.round(bRating);

      if (aRounded !== bRounded) {
        return sortConfig.order === "asc" ? aRating - bRating : bRating - aRating;
      }

      const aDiff = Number(a.pointsPlusMinus) || 0;
      const bDiff = Number(b.pointsPlusMinus) || 0;
      if (aDiff !== bDiff) {
        return sortConfig.order === "asc" ? aDiff - bDiff : bDiff - aDiff;
      }

      const aWins = Number(a.wins) || 0;
      const bWins = Number(b.wins) || 0;
      if (aWins !== bWins) {
        return sortConfig.order === "asc" ? aWins - bWins : bWins - aWins;
      }

      return a.name.localeCompare(b.name);
    }

    if (sortConfig.key === "wins") {
      const direction = sortConfig.order === "asc" ? 1 : -1;
      const aWins = Number(a.wins) || 0;
      const bWins = Number(b.wins) || 0;
      const winDiff = (aWins - bWins) * direction;
      if (winDiff !== 0) {
        return winDiff;
      }

      const aDiff = Number(a.pointsPlusMinus) || 0;
      const bDiff = Number(b.pointsPlusMinus) || 0;
      const diffDiff = (aDiff - bDiff) * direction;
      if (diffDiff !== 0) {
        return diffDiff;
      }

      const aRating = getTeamRatingValue(a);
      const bRating = getTeamRatingValue(b);
      const ratingDiff = (aRating - bRating) * direction;
      if (ratingDiff !== 0) {
        return ratingDiff;
      }

      return direction === 1 ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }

    // Generic path for other sort keys
    let aValue, bValue;
    if (sortConfig.key === "pointsPlus" || sortConfig.key === "pointsMinus" || sortConfig.key === "pointsPlusMinus") {
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

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortConfig.order === "asc" ? aValue - bValue : bValue - aValue;
    }
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    return 0;
  });

  return (
    <div className="overflow-x-auto">
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
            // Find the updated rating for this team in the updatedRatings array
            const teamIndex = teams.data.indexOf(team);
            //const updatedRating = updatedRatings[teamIndex] || team.rating;

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

export default Teams;
