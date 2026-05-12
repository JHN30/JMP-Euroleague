import React from "react";

const SkeletonLine = ({ className = "" }) => <span className={`block rounded-full bg-white/10 ${className}`} />;

const TeamUpdatesTableSkeleton = () => (
  <div className="mt-5 w-full min-w-0 rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-4">
    <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <SkeletonLine className="h-4 w-32" />
        <SkeletonLine className="mt-3 h-3 w-80 max-w-full" />
      </div>

      <SkeletonLine className="h-3 w-16 sm:ml-auto" />
    </div>

    <div className="mt-4 w-full overflow-hidden">
      <div className="min-w-[1040px]">
        <div className="grid grid-cols-[1.25fr_1fr_1fr_0.75fr_0.75fr_1fr_1fr_0.75fr] gap-3 border-b border-white/10 px-3 py-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonLine key={`team-elo-header-skeleton-${index}`} className="h-2.5 w-16" />
          ))}
        </div>

        <div className="divide-y divide-white/5">
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div
              key={`team-elo-row-skeleton-${rowIndex}`}
              className="grid grid-cols-[1.25fr_1fr_1fr_0.75fr_0.75fr_1fr_1fr_0.75fr] gap-3 px-3 py-3"
            >
              {Array.from({ length: 8 }).map((_, cellIndex) => (
                <div key={`team-elo-cell-skeleton-${rowIndex}-${cellIndex}`}>
                  <SkeletonLine className="h-3 w-24" />
                  {cellIndex === 0 || cellIndex === 1 || cellIndex === 5 || cellIndex === 6 ? (
                    <SkeletonLine className="mt-2 h-2.5 w-16" />
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default TeamUpdatesTableSkeleton;
