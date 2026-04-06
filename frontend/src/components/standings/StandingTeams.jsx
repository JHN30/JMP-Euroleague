import { useEffect, useState } from "react";

import { useTeam } from "../../hooks/useTeam";

import StandingTeam from "./StandingTeam";
import FullTeamSkeleton from "../skeletons/FullTeamSkeleton";
import ErrorBox from "../errors/ErrorBox";
import { sortTeams } from "../../utils/sortTeams";
import { layoutCardClass } from "../layout/LayoutShell";

const DEFAULT_STANDINGS_SORT = {
  key: "wins",
  order: "desc",
};

const StandingTeams = () => {
  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam();
  const [sortConfig, setSortConfig] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipTimeout, setTooltipTimeout] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const handleSort = (key) => {
    if (!sortConfig) {
      setSortConfig({ key, order: "asc" });
      return;
    }

    if (sortConfig.key === key) {
      if (key === DEFAULT_STANDINGS_SORT.key && sortConfig.order === "asc") {
        setSortConfig(null);
        return;
      }

      const nextOrder = sortConfig.order === "asc" ? "desc" : "asc";
      setSortConfig({ key, order: nextOrder });
      return;
    }

    setSortConfig({ key, order: "asc" });
  };

  const teamList = teams?.data ?? [];

  const sortedTeams = sortConfig
    ? sortTeams(teamList, {
        key: sortConfig.key,
        order: sortConfig.order,
      })
    : teamList;

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
  
  const ratingTooltipText = "Ratings update after all matches of a round finish.";

  const getSortIndicator = (key) => {
    if (!sortConfig) {
      return key === DEFAULT_STANDINGS_SORT.key ? "↓" : "";
    }

    if (sortConfig.key !== key) return "";
    return sortConfig.order === "asc" ? "↑" : "↓";
  };


  if (loadingTeams) {
    return <FullTeamSkeleton />;
  }

  if (errorTeams) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <ErrorBox error={errorTeams} />
      </div>
    );
  }

  return (
    <div className={`${layoutCardClass} flex w-full flex-col overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs text-slate-200">
          <thead className="text-xs uppercase tracking-wider text-orange-400/80">
            <tr className="border-b border-r border-l border-white/5">
              <th className="whitespace-nowrap px-2 py-2 font-semibold text-center">
                <span className="hidden sm:inline">Pos</span>
                <span className="sm:hidden">P</span>
              </th>
              <th
                onClick={() => handleSort("name")}
                className="cursor-pointer px-2 sm:px-6 py-3 text-left font-semibold transition-colors hover:text-orange-100"
              >
                Name <span className=" text-xs">{getSortIndicator("name")}</span>
              </th>
              <th
                onClick={() => handleSort("wins")}
                className="cursor-pointer px-2 py-3 text-center font-semibold transition-colors hover:text-orange-100"
              >
                <div className="flex items-center justify-center gap-1">
                  <span className="hidden sm:inline">Win</span>
                  <span className="sm:hidden">W</span>
                  <span className="text-xs">{getSortIndicator("wins")}</span>
                </div>
              </th>
              <th
                onClick={() => handleSort("losses")}
                className="cursor-pointer px-2 py-3 text-center font-semibold transition-colors hover:text-orange-100"
              >
                <div className="flex items-center justify-center gap-1">
                  <span className="hidden sm:inline">Loss</span>
                  <span className="sm:hidden">L</span>
                  <span className="text-xs">{getSortIndicator("losses")}</span>
                </div>
              </th>
              <th
                onClick={() => handleSort("winPercentage")}
                className="hidden cursor-pointer px-2 py-3 text-center font-semibold transition-colors hover:text-orange-100 lg:table-cell"
              >
                <div className="flex items-center justify-center gap-1">
                  <span className="hidden sm:inline">Win%</span>
                  <span className="sm:hidden">W%</span>
                  <span className="text-xs">{getSortIndicator("winPercentage")}</span>
                </div>
              </th>
              <th
                onClick={() => handleSort("pointsPlus")}
                className="hidden cursor-pointer px-2 py-3 text-center font-semibold transition-colors hover:text-orange-100 lg:table-cell"
              >
                PTS+ <span className=" text-xs">{getSortIndicator("pointsPlus")}</span>
              </th>
              <th
                onClick={() => handleSort("pointsMinus")}
                className="hidden cursor-pointer px-2 py-3 text-center font-semibold transition-colors hover:text-orange-100 lg:table-cell"
              >
                PTS- <span className=" text-xs">{getSortIndicator("pointsMinus")}</span>
              </th>
              <th
                onClick={() => handleSort("pointsPlusMinus")}
                className="hidden cursor-pointer px-2 py-3 text-center font-semibold transition-colors hover:text-orange-100 lg:table-cell"
              >
                +/- <span className=" text-xs">{getSortIndicator("pointsPlusMinus")}</span>
              </th>
              <th className="px-2 py-3 text-center font-semibold">Form</th>
              <th
                onClick={() => handleSort("rating")}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative cursor-pointer px-2 py-3 text-center font-semibold transition-colors hover:text-orange-100"
              >
                <div className="flex items-center justify-center gap-1">
                  <span className="hidden sm:inline">JMP Rating</span>
                  <span className="sm:hidden">JMPR</span>
                  <span className="text-xs">{getSortIndicator("rating")}</span>
                </div>
                {showTooltip && (
                  <div className="absolute right-0 top-10 w-64 rounded-xl border border-white/10 bg-slate-900/95 p-3 text-xs text-slate-300 shadow-xl ring-1 ring-white/5">
                    {ratingTooltipText}
                    <div className="absolute -top-2 right-6 h-4 w-4 rotate-45 border border-white/10 border-b-0 border-r-0 bg-slate-900/95" />
                  </div>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, index) => {
              const currentPosition = index + 1;

              return (
                <StandingTeam
                  key={team.name}
                  team={team}
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
