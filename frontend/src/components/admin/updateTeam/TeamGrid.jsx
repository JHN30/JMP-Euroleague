import TeamCard from "../../cards/TeamCard";

export const teamGridClass = "grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

const TeamGrid = ({ sortedTeams, handleClick }) => {
  return (
    <div className={teamGridClass}>
      {sortedTeams.map((team) => {
        const stableKey = team._id ?? team.name;
        return (
          <button
            onClick={() => handleClick(team)}
            className="block h-full rounded-3xl border border-transparent transition hover:border-orange-300/40"
            key={stableKey}
          >
            <TeamCard team={team} />
          </button>
        );
      })}
    </div>
  );
};

export default TeamGrid;
