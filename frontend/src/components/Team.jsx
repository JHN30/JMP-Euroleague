import { Link } from "react-router-dom";

const Team = ({ team, position }) => {
  return (
    <tr className="border-b-2 border-orange-400 h-16">
      <td className="items-center">{position}</td>
      <td>
        <Link to={`/team-stats`} className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
            <img src={team.logoImg} className="object-contain max-w-full max-h-full" alt={`${team.name} logo`} />
          </div>
          <span>
            <b>{team.name}</b>
          </span>
        </Link>
      </td>
      <td>{team.wins}</td>
      <td>{team.losses}</td>
      <td>{team.winPercentage.toFixed(2)}%</td>
      <td>
        {team.form.slice(-10).map((result, index) => (
          <span key={index} className={`mr-1 font-bold ${result === "W" ? "text-green-500" : "text-red-500"}`}>
            {result}
          </span>
        ))}
      </td>
      <td>{team.rating !== undefined ? team.rating.toFixed(0) : "Loading..."}</td>
    </tr>
  );
};

export default Team;
