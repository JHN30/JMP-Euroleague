import { Link } from "react-router-dom";

import { getOptimizedCloudinaryImageUrl } from "../../utils/imageUrlUtils";

const toNumber = (value) => Number(value) || 0;

const getPointsStats = (team) => {
  const pointsPlusTotal = toNumber(team.pointsPlus);
  const pointsMinusTotal = toNumber(team.pointsMinus);
  const pointsDiff = toNumber(team.pointsPlusMinus) || pointsPlusTotal - pointsMinusTotal;

  return {
    pointsPlusTotal,
    pointsMinusTotal,
    pointsDiff,
  };
};

const getRecentFormStats = (team) => {
  const form = Array.isArray(team.form) ? team.form : [];
  const recentForm = form.slice(-5);
  const recentFormSmallDisplay = form.slice(-10);
  const recentWins = recentFormSmallDisplay.filter((result) => result === "W").length;

  return {
    recentForm,
    recentWins,
    recentLosses: recentFormSmallDisplay.length - recentWins,
  };
};

const getPointsDiffClassName = (pointsDiff) => {
  if (pointsDiff > 0) {
    return "text-emerald-400";
  }

  if (pointsDiff < 0) {
    return "text-rose-400";
  }

  return "text-slate-400";
};

const formatPointsDiff = (pointsDiff) => (pointsDiff > 0 ? `+${pointsDiff}` : `${pointsDiff}`);

const formatRating = (rating) => {
  const ratingDisplay = Number(rating);

  return Number.isFinite(ratingDisplay) ? ratingDisplay.toFixed(0) : "0";
};

const getFormBadgeClassName = (result) =>
  result === "W"
    ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
    : "border border-rose-500/30 bg-rose-500/10 text-rose-400";

const PositionCell = ({ position }) => (
  <td className="whitespace-nowrap px-2 py-3 font-semibold text-orange-400/90 text-center">
    {position.toString().padStart(2, "0")}
  </td>
);

const TeamLogo = ({ team, position }) => {
  const logoSrc = getOptimizedCloudinaryImageUrl(team.logoImg, { width: 64 });

  return (
    <div className="relative z-10 flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center overflow-hidden rounded-lg bg-slate-800/50 p-1">
      {team.logoImg ? (
        <img
          src={logoSrc}
          className="max-h-full max-w-full object-contain"
          alt=""
          aria-hidden="true"
          width="44"
          height="44"
          loading={position <= 6 ? "eager" : "lazy"}
          decoding="async"
        />
      ) : (
        <span className="text-xs text-gray-400">N/A</span>
      )}
    </div>
  );
};

const TeamNameCell = ({ team, position }) => (
  <td className="px-1 py-2">
    <Link to={`/team-stats/${team._id}`} className="relative flex items-center gap-2 rounded-lg px-1 py-1">
      <span className="absolute left-0 top-1/2 hidden h-8 w-0.5 -translate-y-1/2 rounded-full bg-orange-400 opacity-0 transition-all duration-200 group-hover:opacity-100 md:block" />
      <TeamLogo team={team} position={position} />
      <div className="sr-only relative z-10 flex-col md:not-sr-only md:flex">
        <span className="text-sm font-semibold text-slate-200 transition-colors duration-200 group-hover:text-orange-300">
          {team.name}
        </span>
      </div>
    </Link>
  </td>
);

const PointsDiffCell = ({ pointsDiff }) => (
  <td className={`hidden px-2 py-3 font-semibold text-center lg:table-cell ${getPointsDiffClassName(pointsDiff)}`}>
    {formatPointsDiff(pointsDiff)}
  </td>
);

const FormBadge = ({ result }) => (
  <span className={`flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold ${getFormBadgeClassName(result)}`}>
    {result}
  </span>
);

const RecentFormCell = ({ recentForm, recentWins, recentLosses }) => (
  <td className="px-1 py-3 text-center">
    <span className="font-semibold text-slate-300 lg:hidden">
      {recentWins}-{recentLosses}
    </span>
    <div className="hidden justify-center gap-1 lg:flex">
      {recentForm.map((result, index) => (
        <FormBadge key={index} result={result} />
      ))}
    </div>
  </td>
);

const StandingTeam = ({ team, position }) => {
  const { pointsPlusTotal, pointsMinusTotal, pointsDiff } = getPointsStats(team);
  const { recentForm, recentWins, recentLosses } = getRecentFormStats(team);

  return (
    <tr className="group border border-white/5 text-xs transition-colors hover:bg-white/5 md:text-sm">
      <PositionCell position={position} />
      <TeamNameCell team={team} position={position} />
      <td className="px-1 py-3 font-medium text-center text-emerald-400">{team.wins}</td>
      <td className="px-1 py-3 font-medium text-center text-rose-400">{team.losses}</td>
      <td className="hidden px-1 py-3 font-medium text-center text-slate-300 lg:table-cell">
        {team.winPercentage.toFixed(2)}%
      </td>
      <td className="hidden px-1 py-3 font-medium text-center text-emerald-400 lg:table-cell">{pointsPlusTotal}</td>
      <td className="hidden px-1 py-3 font-medium text-center text-rose-400 lg:table-cell">{pointsMinusTotal}</td>
      <PointsDiffCell pointsDiff={pointsDiff} />
      <RecentFormCell recentForm={recentForm} recentWins={recentWins} recentLosses={recentLosses} />
      <td className="px-1 py-3 text-center font-bold text-orange-300">{formatRating(team.rating)}</td>
    </tr>
  );
};

export default StandingTeam;
