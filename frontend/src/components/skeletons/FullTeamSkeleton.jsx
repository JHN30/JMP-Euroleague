import TeamSkeleton from "./TeamSkeleton";
import { pageCardClass } from "../layout/PageShell";

export default function FullTeamSkeleton() {
  return (
    <div className={`${pageCardClass}`}>
      <div className="border-b border-white/10 px-6 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="h-3 w-32 rounded-full bg-white/10 animate-pulse" />
            <div className="h-4 w-48 rounded-full bg-white/10 animate-pulse" />
          </div>
          <div className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 animate-pulse sm:w-48" />
        </div>
      </div>

      <div className="overflow-x-auto px-2 py-4">
        <table className="min-w-full text-[11px] text-gray-100">
          <thead className="text-[10px] uppercase tracking-[0.25em] text-orange-200">
            <tr className="border-b border-white/10">
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
