import TeamSkeleton from "./TeamSkeleton";

export default function FullTeamSkeleton() {
  return (
    <div className="flex w-full flex-col">
      <div className="overflow-x-auto px-2 py-4">
        <table className="min-w-full text-xs text-slate-200">
          <thead className="text-xs uppercase tracking-wider text-orange-400/80">
            <tr className="border-b border-white/5">
              <th className="whitespace-nowrap px-2 py-2 font-semibold text-center">
                <span className="hidden sm:inline">Pos</span>
                <span className="sm:hidden">P</span>
              </th>
              <th className="px-2 sm:px-6 py-2 text-left font-semibold">Name</th>
              <th className="px-2 py-2 text-center font-semibold">
                <span className="hidden sm:inline">Win</span>
                <span className="sm:hidden">W</span>
              </th>
              <th className="px-2 py-2 text-center font-semibold">
                <span className="hidden sm:inline">Loss</span>
                <span className="sm:hidden">L</span>
              </th>
              <th className="hidden px-2 py-2 text-center font-semibold lg:table-cell">
                <span className="hidden sm:inline">Win%</span>
                <span className="sm:hidden">W%</span>
              </th>
              <th className="hidden px-2 py-2 text-center font-semibold lg:table-cell">PTS+</th>
              <th className="hidden px-2 py-2 text-center font-semibold lg:table-cell">PTS-</th>
              <th className="hidden px-2 py-2 text-center font-semibold lg:table-cell">+/-</th>
              <th className="px-2 py-2 text-center font-semibold">Form</th>
              <th className="px-2 py-2 text-center font-semibold">
                <span className="hidden sm:inline">JMP Rating</span>
                <span className="sm:hidden">JMPR</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TeamSkeleton key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
