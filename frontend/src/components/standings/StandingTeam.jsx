import { Link } from "react-router-dom";

const StandingTeam = ({ team, position }) => {
  const pointsPlusTotal = Number(team.pointsPlus) || 0;
  const pointsMinusTotal = Number(team.pointsMinus) || 0;
  const pointsDiff = Number(team.pointsPlusMinus) || pointsPlusTotal - pointsMinusTotal;
  const ratingDisplay = Number(team.displayRating ?? team.rating2);
  const recentForm = Array.isArray(team.form) ? team.form.slice(-5) : [];
  const recentWins = recentForm.filter((result) => result === "W").length;
  const recentLosses = recentForm.length - recentWins;

  return (
    <tr className="group border-b border-white/5 text-xs transition-colors hover:bg-white/5 last:border-0 md:text-sm">
      <td className="whitespace-nowrap px-2 py-3 font-semibold text-orange-300 text-center">
        {position.toString().padStart(2, "0")}
      </td>
      <td className="px-1 py-2">
        <Link
          to={`/team-stats/${team._id}`}
          aria-label={`${team.name} stats`}
          className="relative flex items-center gap-2 rounded-lg border border-transparent px-1.5 py-1 transition-all duration-200 hover:border-white/10 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
        >
          {/* Vertical glow indicator */}
          <span className="absolute left-0 top-1/2 hidden h-10 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-orange-400/80 to-amber-400/60 opacity-0 transition-all duration-200 group-hover:opacity-100 md:block" />
          {/* Logo badge with fallback */}
          <div className="relative z-10 flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center overflow-hidden rounded-lg bg-white/10 p-1">
            {team.logoImg ? (
              <img src={team.logoImg} className="max-h-full max-w-full object-contain" alt={`${team.name} logo`} />
            ) : (
              <span className="text-xs text-gray-400">N/A</span>
            )}
          </div>
          {/* Text stack highlights name on hover */}
          <div className="relative z-10 hidden flex-col md:flex">
            <span className="text-sm font-semibold text-white transition-colors duration-200 group-hover:text-orange-200">
              {team.name}
            </span>
          </div>
        </Link>
      </td>
      <td className="px-1 py-3 font-medium text-center text-green-300">{team.wins}</td>
      <td className="px-1 py-3 font-medium text-center text-red-300">{team.losses}</td>
      <td className="hidden px-1 py-3 font-medium text-center text-orange-200 lg:table-cell">{team.winPercentage.toFixed(2)}%</td>
      <td className="hidden px-1 py-3 font-medium text-center text-green-300 lg:table-cell">{pointsPlusTotal}</td>
      <td className="hidden px-1 py-3 font-medium text-center text-red-300 lg:table-cell">{pointsMinusTotal}</td>
      <td
        className={`hidden px-2 py-3 font-semibold text-center lg:table-cell ${
          pointsDiff > 0 ? "text-green-300" : pointsDiff < 0 ? "text-red-300" : "text-orange-200"
        }`}
      >
        {pointsDiff > 0 ? `+${pointsDiff}` : `${pointsDiff}`}
      </td>
      <td className="px-1 py-3 text-center">
        <span className="font-semibold text-orange-200 lg:hidden">
          {recentWins}-{recentLosses}
        </span>
        <div className="hidden justify-center gap-1 lg:flex">
          {recentForm.map((result, index) => (
            <span
              key={index}
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                result === "W"
                  ? "border border-green-500/40 bg-green-500/15 text-green-300"
                  : "border border-red-500/40 bg-red-500/15 text-red-300"
              }`}
            >
              {result}
            </span>
          ))}
        </div>
      </td>
      <td className="px-1 py-3 text-center font-bold text-orange-200">
        {Number.isFinite(ratingDisplay) ? ratingDisplay.toFixed(0) : "Loading..."}
      </td>
    </tr>
  );
};

export default StandingTeam;
