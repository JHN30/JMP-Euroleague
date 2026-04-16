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

      <div className="grid gap-6 xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)] xl:items-stretch">
        <div className={`${layoutCardClass} overflow-hidden`}>
          <div className="flex h-full flex-col items-center justify-center gap-5 px-5 py-6 text-center sm:px-6 sm:py-7">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-white/5 sm:h-28 sm:w-28">
                <span className={`h-16 w-16 rounded-full ${shimmer}`} />
              </div>
              <div className="flex flex-col gap-3">
                <span className={`h-10 w-52 rounded-2xl ${shimmer}`} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className={`${layoutCardClass} px-5 py-5 sm:px-6 sm:py-6`}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className={`h-3 w-24 rounded-full ${shimmer}`} />
                <span className={`h-6 w-44 rounded-full ${shimmer}`} />
                <span className={`h-4 w-64 rounded-full ${shimmer}`} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <StatCardSkeleton key={idx} />
                ))}
              </div>
            </div>
          </div>

          <div className={`${layoutCardClass} overflow-hidden`}>
            <div className="flex flex-col gap-5 px-4 py-4 sm:px-6 sm:py-6">
              <span className={`h-7 w-52 rounded-full ${shimmer}`} />

              <div className="grid gap-3 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
                    <div className="flex flex-col gap-3">
                      <span className={`h-3 w-20 rounded-full ${shimmer}`} />
                      <span className={`h-8 w-20 rounded-full ${shimmer}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${layoutCardClass} px-5 py-5 sm:px-6 sm:py-6`}>
        <div className="flex flex-col gap-4">
          <span className={`h-7 w-44 rounded-full ${shimmer}`} />
          <span className={`h-[320px] w-full rounded-2xl ${shimmer}`} />
        </div>
      </div>

      <div className={`${layoutCardClass} overflow-hidden`}>
        <div className="flex flex-col gap-5 px-4 py-4 sm:px-6 sm:py-6">
          <span className={`h-7 w-32 rounded-full ${shimmer}`} />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <span key={idx} className={`h-28 w-full rounded-2xl ${shimmer}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStatsSkeleton;
