import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

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

const RATING_TOOLTIP_TEXT = "Ratings update after all matches of a round finish.";
const TOOLTIP_DELAY_MS = 900;

const headerRowClassName = "border-b border-r border-l border-white/5";
const sortableHeaderClassName = "cursor-pointer px-2 py-3 text-center font-semibold transition-colors hover:text-orange-100";
const hiddenLargeSortableHeaderClassName = `hidden ${sortableHeaderClassName} lg:table-cell`;

const standingsColumns = [
  {
    key: "name",
    label: "Name",
    className: "cursor-pointer px-2 sm:px-6 py-3 text-left font-semibold transition-colors hover:text-orange-100",
    layout: "inline",
  },
  {
    key: "wins",
    desktopLabel: "Win",
    mobileLabel: "W",
    className: sortableHeaderClassName,
  },
  {
    key: "losses",
    desktopLabel: "Loss",
    mobileLabel: "L",
    className: sortableHeaderClassName,
  },
  {
    key: "winPercentage",
    desktopLabel: "Win%",
    mobileLabel: "W%",
    className: hiddenLargeSortableHeaderClassName,
  },
  {
    key: "pointsPlus",
    label: "PTS+",
    className: hiddenLargeSortableHeaderClassName,
    layout: "inline",
  },
  {
    key: "pointsMinus",
    label: "PTS-",
    className: hiddenLargeSortableHeaderClassName,
    layout: "inline",
  },
  {
    key: "pointsPlusMinus",
    label: "+/-",
    className: hiddenLargeSortableHeaderClassName,
    layout: "inline",
  },
];

const getNextSortConfig = (sortConfig, key) => {
  if (!sortConfig) {
    return { key, order: "asc" };
  }

  if (sortConfig.key !== key) {
    return { key, order: "asc" };
  }

  if (key === DEFAULT_STANDINGS_SORT.key && sortConfig.order === "asc") {
    return null;
  }

  return {
    key,
    order: sortConfig.order === "asc" ? "desc" : "asc",
  };
};

const getSortIndicator = (sortConfig, key) => {
  if (!sortConfig) {
    return key === DEFAULT_STANDINGS_SORT.key ? "↓" : "";
  }

  if (sortConfig.key !== key) {
    return "";
  }

  return sortConfig.order === "asc" ? "↑" : "↓";
};

const getSortedTeams = (teams, sortConfig) => {
  if (!sortConfig) {
    return teams;
  }

  return sortTeams(teams, {
    key: sortConfig.key,
    order: sortConfig.order,
  });
};

const SortIndicator = ({ sortConfig, sortKey }) => (
  <span className="text-xs">{getSortIndicator(sortConfig, sortKey)}</span>
);

const ResponsiveHeaderLabel = ({ desktopLabel, mobileLabel }) => (
  <>
    <span className="hidden sm:inline">{desktopLabel}</span>
    <span className="sm:hidden">{mobileLabel}</span>
  </>
);

const SortableHeaderCell = ({ column, sortConfig, onSort }) => (
  <th onClick={() => onSort(column.key)} className={column.className}>
    {column.layout === "inline" ? (
      <>
        {column.label} <SortIndicator sortConfig={sortConfig} sortKey={column.key} />
      </>
    ) : (
      <div className="flex items-center justify-center gap-1">
        <ResponsiveHeaderLabel desktopLabel={column.desktopLabel} mobileLabel={column.mobileLabel} />
        <SortIndicator sortConfig={sortConfig} sortKey={column.key} />
      </div>
    )}
  </th>
);

const PositionHeaderCell = () => (
  <th className="whitespace-nowrap px-2 py-2 font-semibold text-center">
    <span className="hidden sm:inline">Pos</span>
    <span className="sm:hidden">P</span>
  </th>
);

const RatingTooltip = () => (
  <div className="absolute right-0 top-10 w-64 rounded-xl border border-white/10 bg-slate-900/95 p-3 text-xs text-slate-300 shadow-xl ring-1 ring-white/5">
    {RATING_TOOLTIP_TEXT}
    <div className="absolute -top-2 right-6 h-4 w-4 rotate-45 border border-white/10 border-b-0 border-r-0 bg-slate-900/95" />
  </div>
);

const RatingHeaderCell = ({ sortConfig, onSort, onMouseEnter, onMouseLeave, showTooltip }) => (
  <th
    onClick={() => onSort("rating")}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="relative cursor-pointer px-2 py-3 text-center font-semibold transition-colors hover:text-orange-100"
  >
    <div className="flex items-center justify-center gap-1">
      <ResponsiveHeaderLabel desktopLabel="JMP Rating" mobileLabel="JMPR" />
      <SortIndicator sortConfig={sortConfig} sortKey="rating" />
    </div>
    {showTooltip ? <RatingTooltip /> : null}
  </th>
);

const StandingTableHeader = ({ sortConfig, onSort, ratingTooltip }) => (
  <thead className="text-xs uppercase tracking-wider text-orange-400/80">
    <tr className={headerRowClassName}>
      <PositionHeaderCell />
      {standingsColumns.map((column) => (
        <SortableHeaderCell key={column.key} column={column} sortConfig={sortConfig} onSort={onSort} />
      ))}
      <th className="px-2 py-3 text-center font-semibold">Form</th>
      <RatingHeaderCell sortConfig={sortConfig} onSort={onSort} {...ratingTooltip} />
    </tr>
  </thead>
);

const StandingTableRows = ({ teams }) => (
  <tbody>
    {teams.map((team, index) => (
      <StandingTeam key={team.name} team={team} position={index + 1} />
    ))}
  </tbody>
);

const useDelayedTooltip = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimeoutRef = useRef(null);

  const clearTooltipTimeout = () => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
      tooltipTimeoutRef.current = null;
    }
  };

  useEffect(() => clearTooltipTimeout, []);

  const handleMouseEnter = () => {
    clearTooltipTimeout();
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, TOOLTIP_DELAY_MS);
  };

  const handleMouseLeave = () => {
    clearTooltipTimeout();
    setShowTooltip(false);
  };

  return {
    showTooltip,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
};

const StandingTeams = () => {
  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam();
  const [sortConfig, setSortConfig] = useState(null);
  const ratingTooltip = useDelayedTooltip();

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const handleSort = (key) => {
    setSortConfig((currentSortConfig) => getNextSortConfig(currentSortConfig, key));
  };

  const teamList = teams?.data ?? [];
  const sortedTeams = getSortedTeams(teamList, sortConfig);

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
    <motion.div
      className={`${layoutCardClass} flex w-full flex-col overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs text-slate-200">
          <StandingTableHeader sortConfig={sortConfig} onSort={handleSort} ratingTooltip={ratingTooltip} />
          <StandingTableRows teams={sortedTeams} />
        </table>
      </div>
    </motion.div>
  );
};

export default StandingTeams;
