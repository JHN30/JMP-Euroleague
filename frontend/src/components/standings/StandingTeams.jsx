import { useEffect, useState } from "react";

import { useTeam } from "../../hooks/useTeam";

import StandingTeam from "./StandingTeam";
import FullTeamSkeleton from "../skeletons/FullTeamSkeleton";
import ErrorBox from "../errors/ErrorBox";
import { sortTeams } from "../../utils/sortTeams";
import SeasonSelect from "../common/SeasonSelect";
import { pageCardClass } from "../layout/PageShell";

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

  useEffect(() => {
    fetchTeams(selectedSeason);
  }, [fetchTeams, selectedSeason]);

  const handleSort = (key) => {
    let order = "asc";
    if (sortConfig.key === key && sortConfig.order === "asc") {
      order = "desc";
    }
    setSortConfig({ key, order });
  };

  const teamList = teams?.data ?? [];

  const sortedTeams = sortTeams(teamList, {
    key: sortConfig.key,
    order: sortConfig.order,
    getRatingValue: (team) => getTeamRatingValue(team),
  });

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setShowTooltip(true);
    }, 900);
    setTooltipTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
      setTooltipTimeout(null);
    }
    setShowTooltip(false);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.order === "asc" ? "↑" : "↓";
  };

  const ratingTooltipText =
    selectedSeason !== "2025"
      ? "Historical seasons rely on JMP Rating 1.0 snapshots."
      : "Current season ratings update after all matches of a round finish.";

  if (loadingTeams) {
    return <FullTeamSkeleton />;
  }

  if (errorTeams || !teamList.length) {
    return (
      <div className={`${pageCardClass} flex h-full w-full items-center justify-center py-20`}>
        <ErrorBox error={errorTeams} />
      </div>
    );
  }

  return (
    <div className={`${pageCardClass}`}>
      <div className="border-b border-white/10 px-6 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-orange-200">Season filter</p>
            <p className="mt-2 text-sm text-gray-300">Swap between archived and live leaderboards.</p>
          </div>
          <SeasonSelect
            id="team-season"
            className="mx-0 w-full sm:w-48"
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto px-4 py-6">
        <table className="min-w-full text-sm text-gray-100">
          <thead className="text-xs uppercase tracking-[0.3em] text-orange-200">
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 text-left font-semibold">Pos</th>
              <th
                onClick={() => handleSort("name")}
                className="cursor-pointer px-4 py-3 text-left font-semibold transition-colors hover:text-orange-100"
              >
                Name <span className="ml-1 text-xs">{getSortIndicator("name")}</span>
              </th>
              <th
                onClick={() => handleSort("wins")}
                className="cursor-pointer px-4 py-3 text-left font-semibold transition-colors hover:text-orange-100"
              >
                Win <span className="ml-1 text-xs">{getSortIndicator("wins")}</span>
              </th>
              <th
                onClick={() => handleSort("losses")}
                className="cursor-pointer px-4 py-3 text-left font-semibold transition-colors hover:text-orange-100"
              >
                Loss <span className="ml-1 text-xs">{getSortIndicator("losses")}</span>
              </th>
              <th
                onClick={() => handleSort("winPercentage")}
                className="cursor-pointer px-4 py-3 text-left font-semibold transition-colors hover:text-orange-100"
              >
                Win% <span className="ml-1 text-xs">{getSortIndicator("winPercentage")}</span>
              </th>
              <th
                onClick={() => handleSort("pointsPlus")}
                className="cursor-pointer px-4 py-3 text-left font-semibold transition-colors hover:text-orange-100"
              >
                PTS+ <span className="ml-1 text-xs">{getSortIndicator("pointsPlus")}</span>
              </th>
              <th
                onClick={() => handleSort("pointsMinus")}
                className="cursor-pointer px-4 py-3 text-left font-semibold transition-colors hover:text-orange-100"
              >
                PTS- <span className="ml-1 text-xs">{getSortIndicator("pointsMinus")}</span>
              </th>
              <th
                onClick={() => handleSort("pointsPlusMinus")}
                className="cursor-pointer px-4 py-3 text-left font-semibold transition-colors hover:text-orange-100"
              >
                +/- <span className="ml-1 text-xs">{getSortIndicator("pointsPlusMinus")}</span>
              </th>
              <th className="px-4 py-3 text-left font-semibold">Form</th>
              <th
                onClick={() => handleSort(activeRatingKey)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative cursor-pointer px-4 py-3 text-left font-semibold transition-colors hover:text-orange-100"
              >
                JMP Rating <span className="ml-1 text-xs">{getSortIndicator(activeRatingKey)}</span>
                {showTooltip && (
                  <div className="absolute right-0 top-10 w-64 rounded-xl border border-orange-400/50 bg-black/80 p-3 text-xs text-gray-200 shadow-lg">
                    {ratingTooltipText}
                    <div className="absolute -top-2 right-6 h-4 w-4 rotate-45 border border-orange-400/50 border-b-0 border-r-0 bg-black/80" />
                  </div>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, index) => {
              const currentPosition = index + 1;
              const teamIndex = teamList.indexOf(team);
              const sourceTeam = teamIndex > -1 ? teamList[teamIndex] : team;

              return (
                <StandingTeam
                  key={team.name}
                  team={{
                    ...team,
                    displayRating: getTeamRatingValue(team),
                    rating2: sourceTeam?.rating2,
                  }}
                  position={currentPosition}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StandingTeams;
