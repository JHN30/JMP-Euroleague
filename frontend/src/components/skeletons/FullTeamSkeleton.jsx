import TeamSkeleton from "./TeamSkeleton";
import { pageCardClass } from "../layout/PageShell";

const columnLabels = ["Pos", "Name", "Win", "Loss", "Win%", "PTS+", "PTS-", "+/-", "Form", "JMP Rating"];

export default function FullTeamSkeleton() {
  return (
    <div className={`${pageCardClass} overflow-hidden`}>
      <div className="border-b border-white/10 px-6 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="h-3 w-32 rounded-full bg-white/10 animate-pulse" />
            <div className="h-4 w-48 rounded-full bg-white/10 animate-pulse" />
          </div>
          <div className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 animate-pulse md:w-48" />
        </div>
      </div>

      <div className="overflow-x-auto px-4 py-6">
        <table className="min-w-full text-sm text-gray-100">
          <thead className="text-xs uppercase tracking-[0.3em] text-orange-200">
            <tr className="border-b border-white/10">
              {columnLabels.map((label) => (
                <th key={label} className="px-4 py-3 text-left font-semibold">
                  {label}
                </th>
              ))}
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
