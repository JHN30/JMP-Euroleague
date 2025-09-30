import { Link } from "react-router-dom";

const Team2025 = ({ team, position }) => {
  const pointsPlusTotal = Number(team.pointsPlus) || 0;
  const pointsMinusTotal = Number(team.pointsMinus) || 0;
  const pointsDiff = Number(team.pointsPlusMinus) || pointsPlusTotal - pointsMinusTotal;

  return (
    <tr className="border-b-2 border-orange-400/60 h-16 hover:bg-white/3 transition-colors duration-200">
      <td className="font-semibold text-orange-400">{position}</td>
      <td>
        <Link to={`/team-stats/${team._id}`} className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-lg p-1">
            <img src={team.logoImg} className="object-contain max-w-full max-h-full" alt={`${team.name} logo`} />
          </div>
          <span className="font-bold text-base-content">{team.name}</span>
        </Link>
      </td>
      <td className="font-medium text-green-400">{team.wins}</td>
      <td className="font-medium text-red-400">{team.losses}</td>
      <td className="font-semibold text-orange-300">{team.winPercentage.toFixed(2)}%</td>
      <td className="font-medium text-green-400">{pointsPlusTotal}</td>
      <td className="font-medium text-red-400">{pointsMinusTotal}</td>
      <td
        className={`font-medium ${pointsDiff > 0 ? "text-green-400" : pointsDiff < 0 ? "text-red-400" : "text-orange-300"}`}
      >
        {pointsDiff > 0 ? `+${pointsDiff}` : `${pointsDiff}`}
      </td>
      <td>
        <div className="flex gap-1">
          {team.form.slice(-5).map((result, index) => (
            <span
              key={index}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                result === "W"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
              }`}
            >
              {result}
            </span>
          ))}
        </div>
      </td>
      <td className="font-bold text-orange-400">{team.rating !== undefined ? team.rating.toFixed(0) : "Loading..."}</td>
    </tr>
  );
};

export default Team2025;
