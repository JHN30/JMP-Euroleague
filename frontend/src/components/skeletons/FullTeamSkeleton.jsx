import TeamSkeleton from "./TeamSkeleton";

export default function FullTeamSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="table table-md">
        <thead className="border-b-2 border-orange-400">
          <tr className="text-orange-400">
            <th className="font-bold">Pos</th>
            <th className="font-bold">Name</th>
            <th className="font-bold">Win</th>
            <th className="font-bold">Loss</th>
            <th className="font-bold">Win%</th>
            <th className="font-bold">PTS+</th>
            <th className="font-bold">PTS-</th>
            <th className="font-bold">Form</th>
            <th className="font-bold">Rating</th>
          </tr>
        </thead>
        <tbody>
          <TeamSkeleton />
          <TeamSkeleton />
          <TeamSkeleton />
          <TeamSkeleton />
          <TeamSkeleton />
          <TeamSkeleton />
          <TeamSkeleton />
          <TeamSkeleton />
          <TeamSkeleton />
          <TeamSkeleton />
        </tbody>
      </table>
    </div>
  );
}
