import { layoutCardClass } from "../layout/LayoutShell";

const shimmer = "animate-pulse bg-white/10";

const StatCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-black/30">
      <div className="flex flex-col gap-3">
        <span className={`h-3 w-24 rounded-full ${shimmer}`} />
        <span className={`h-10 w-24 rounded-lg ${shimmer}`} />
      </div>
    </div>
  );
};

const TeamStatsSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 pt-4 text-white">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className={`h-3 w-32 rounded-full ${shimmer}`} />
        <span className={`h-9 w-56 rounded-full ${shimmer}`} />
      </div>

      <div className={`${layoutCardClass} overflow-hidden`}>
        <div className="flex flex-col gap-6 px-5 py-5 sm:px-6 sm:py-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-5">
            <div className="flex flex-col gap-3">
              <span className={`h-3 w-28 rounded-full ${shimmer}`} />
              <span className={`h-10 w-56 rounded-2xl ${shimmer}`} />
            </div>
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <span key={idx} className={`h-14 w-32 rounded-xl border border-white/10 bg-white/5 ${shimmer}`} />
              ))}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="flex h-40 w-40 items-center justify-center rounded-3xl border border-white/10 bg-white/5 sm:h-48 sm:w-48">
              <span className={`h-30 w-30 rounded-full ${shimmer}`} />
            </div>
          </div>
        </div>
      </div>

      <div className={`${layoutCardClass} px-5 py-5 sm:px-6 sm:py-6`}>
        <div className="flex flex-col gap-4">
          <span className={`h-3 w-28 rounded-full ${shimmer}`} />
          <span className={`h-6 w-40 rounded-full ${shimmer}`} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <StatCardSkeleton key={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStatsSkeleton;
