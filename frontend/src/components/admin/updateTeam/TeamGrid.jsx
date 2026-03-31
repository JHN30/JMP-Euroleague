import TeamCard from "../../cards/TeamCard";

const TeamGrid = ({ sortedTeams, handleClick }) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {sortedTeams.map((team) => {
        const stableKey = team._id ?? `${team.name}-${team.season ?? "unknown"}`;
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
