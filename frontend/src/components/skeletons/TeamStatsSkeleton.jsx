import { pageCardClass } from "../layout/PageShell";

const shimmer = "animate-pulse bg-white/10";

const StatCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-6 shadow-inner shadow-black/30 backdrop-blur">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_70%)]" />
        <div className="absolute -bottom-16 left-6 h-24 w-24 rounded-full bg-white/10 blur-3xl" />
      </div>
      <div className="relative flex flex-col gap-4">
        <span className={`h-3 w-24 rounded-full ${shimmer}`} />
        <span className={`h-8 w-20 rounded-2xl ${shimmer}`} />
      </div>
    </div>
  );
};

const MatchupSkeleton = () => (
  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-4 shadow-inner shadow-black/30 backdrop-blur">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_65%)]" />
    <div className="relative flex flex-col gap-4">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-gray-400">
        <span className={`h-3 w-20 rounded-full ${shimmer}`} />
        <span className={`h-3 w-12 rounded-full ${shimmer}`} />
      </div>
      <div className="flex flex-col items-center gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col items-center gap-2 text-center sm:items-end sm:text-right">
          <span className={`h-4 w-28 rounded-full ${shimmer}`} />
          <span className={`h-2 w-16 rounded-full ${shimmer}`} />
        </div>
        <div className="flex min-w-[96px] flex-col items-center gap-2">
          <span className={`h-10 w-20 rounded-full ${shimmer}`} />
          <span className={`h-2 w-12 rounded-full ${shimmer}`} />
        </div>
        <div className="flex flex-1 flex-col items-center gap-2 text-center sm:items-start sm:text-left">
          <span className={`h-4 w-28 rounded-full ${shimmer}`} />
          <span className={`h-2 w-16 rounded-full ${shimmer}`} />
        </div>
      </div>
    </div>
  </div>
);

const FormSkeleton = () => (
  <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(3.25rem,1fr))] place-items-center gap-3 sm:grid-cols-[repeat(auto-fit,minmax(3.5rem,1fr))] sm:place-items-stretch sm:gap-4">
    {Array.from({ length: 10 }).map((_, idx) => (
      <div
        key={idx}
        className={`flex h-14 w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 ${shimmer} sm:h-16`}
      />
    ))}
  </div>
);

const TeamStatsSkeleton = () => {
  return (
    <div className="flex flex-col gap-8 text-white">
      <div className={`${pageCardClass} overflow-hidden`}>
        <div className="relative flex flex-col gap-8 px-6 py-8 sm:px-8 lg:flex-row lg:items-center">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="absolute -bottom-24 right-8 h-60 w-60 rounded-full bg-amber-400/10 blur-3xl" />
          </div>
          <div className="relative z-10 flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className={`h-3 w-32 rounded-full ${shimmer}`} />
              <span className={`h-10 w-60 rounded-2xl ${shimmer}`} />
              <span className={`h-4 w-32 rounded-full ${shimmer}`} />
            </div>
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <span key={idx} className={`h-14 w-32 rounded-2xl border border-white/10 bg-white/5 ${shimmer}`} />
              ))}
            </div>
          </div>
          <div className="relative z-10 flex justify-center lg:justify-end">
            <div className="relative flex h-48 w-48 items-center justify-center rounded-[2.5rem] border border-white/10 bg-slate-950/60 shadow-2xl shadow-black/50 backdrop-blur-xl sm:h-56 sm:w-56">
              <span className={`h-24 w-24 rounded-full ${shimmer}`} />
            </div>
          </div>
        </div>
      </div>

      <div className={`${pageCardClass} px-6 py-6 sm:px-8`}>
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

      <div className={`${pageCardClass} overflow-hidden`}>
        <div className="flex flex-col gap-6 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className={`h-3 w-28 rounded-full ${shimmer}`} />
              <span className={`mt-2 block h-6 w-40 rounded-full ${shimmer}`} />
            </div>
            <div className="flex gap-3">
              {Array.from({ length: 2 }).map((_, idx) => (
                <span key={idx} className={`h-11 w-32 rounded-xl border border-white/10 bg-white/5 ${shimmer}`} />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-5 shadow-inner shadow-black/30 backdrop-blur">
            <FormSkeleton />
          </div>
        </div>
      </div>

      <div className={`${pageCardClass} overflow-hidden`}>
        <div className="flex flex-col gap-6 px-6 py-6 sm:px-8">
          <div className="border-b border-white/10 pb-6">
            <span className={`h-3 w-32 rounded-full ${shimmer}`} />
            <span className={`mt-2 block h-6 w-60 rounded-full ${shimmer}`} />
          </div>
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <MatchupSkeleton key={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStatsSkeleton;
