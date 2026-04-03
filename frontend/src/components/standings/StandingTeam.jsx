import { Link } from "react-router-dom";

const StandingTeam = ({ team, position }) => {
  const pointsPlusTotal = Number(team.pointsPlus) || 0;
  const pointsMinusTotal = Number(team.pointsMinus) || 0;
  const pointsDiff = Number(team.pointsPlusMinus) || pointsPlusTotal - pointsMinusTotal;
  const ratingDisplay = Number(team.rating2);
  const recentForm = Array.isArray(team.form) ? team.form.slice(-5) : [];
  const recentFormSmallDisplay = Array.isArray(team.form) ? team.form.slice(-10) : [];
  const recentWins = recentFormSmallDisplay.filter((result) => result === "W").length;
  const recentLosses = recentFormSmallDisplay.length - recentWins;

  return (
    <tr className="group border border-white/5 text-xs transition-colors hover:bg-white/5 md:text-sm">
      <td className="whitespace-nowrap px-2 py-3 font-semibold text-orange-400/90 text-center">
        {position.toString().padStart(2, "0")}
      </td>
      <td className="px-1 py-2">
        <Link
          to={`/team-stats/${team._id}`}
          aria-label={`${team.name} stats`}
          className="relative flex items-center gap-2 rounded-lg px-1 py-1"
        >
          {/* Subtle left border indicator on hover */}
          <span className="absolute left-0 top-1/2 hidden h-8 w-0.5 -translate-y-1/2 rounded-full bg-orange-400 opacity-0 transition-all duration-200 group-hover:opacity-100 md:block" />
          {/* Logo badge with fallback */}
          <div className="relative z-10 flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center overflow-hidden rounded-lg bg-slate-800/50 p-1">
            {team.logoImg ? (
              <img src={team.logoImg} className="max-h-full max-w-full object-contain" alt={`${team.name} logo`} />
            ) : (
              <span className="text-xs text-gray-400">N/A</span>
            )}
          </div>
          {/* Text stack highlights name on hover */}
          <div className="relative z-10 hidden flex-col md:flex">
            <span className="text-sm font-semibold text-slate-200 transition-colors duration-200 group-hover:text-orange-300">
              {team.name}
            </span>
          </div>
        </Link>
      </td>
      <td className="px-1 py-3 font-medium text-center text-emerald-400">{team.wins}</td>
      <td className="px-1 py-3 font-medium text-center text-rose-400">{team.losses}</td>
      <td className="hidden px-1 py-3 font-medium text-center text-slate-300 lg:table-cell">
        {team.winPercentage.toFixed(2)}%
      </td>
      <td className="hidden px-1 py-3 font-medium text-center text-emerald-400 lg:table-cell">{pointsPlusTotal}</td>
      <td className="hidden px-1 py-3 font-medium text-center text-rose-400 lg:table-cell">{pointsMinusTotal}</td>
      <td
        className={`hidden px-2 py-3 font-semibold text-center lg:table-cell ${
          pointsDiff > 0 ? "text-emerald-400" : pointsDiff < 0 ? "text-rose-400" : "text-slate-400"
        }`}
      >
        {pointsDiff > 0 ? `+${pointsDiff}` : `${pointsDiff}`}
      </td>
      <td className="px-1 py-3 text-center">
        <span className="font-semibold text-slate-300 lg:hidden">
          {recentWins}-{recentLosses}
        </span>
        <div className="hidden justify-center gap-1 lg:flex">
          {recentForm.map((result, index) => (
            <span
              key={index}
              className={`flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold ${
                result === "W"
                  ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border border-rose-500/30 bg-rose-500/10 text-rose-400"
              }`}
            >
              {result}
            </span>
          ))}
        </div>
      </td>
      <td className="px-1 py-3 text-center font-bold text-orange-300">
        {Number.isFinite(ratingDisplay) ? ratingDisplay.toFixed(0) : "Loading..."}
      </td>
    </tr>
  );
};

export default StandingTeam;
