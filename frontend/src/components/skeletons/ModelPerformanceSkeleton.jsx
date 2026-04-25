import { layoutCardClass } from "../layout/LayoutShell";

const shimmer = "animate-pulse bg-white/10";

const SkeletonLine = ({ className }) => <span className={`block rounded-full ${shimmer} ${className}`} />;

const KpiCardSkeleton = () => (
  <div className={`${layoutCardClass} overflow-hidden px-4 py-4 sm:px-5 sm:py-5`}>
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0 flex-1">
        <SkeletonLine className="h-2.5 w-20" />
        <SkeletonLine className="mt-4 h-8 w-24 rounded-xl" />
        <SkeletonLine className="mt-3 h-3 w-28" />
      </div>

      <span className={`h-11 w-11 shrink-0 rounded-2xl ${shimmer}`} />
    </div>
  </div>
);

const BenchmarkCardSkeleton = () => (
  <div className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-4">
    <SkeletonLine className="h-2.5 w-24" />
    <SkeletonLine className="mt-3 h-7 w-28 rounded-xl" />
    <SkeletonLine className="mt-4 h-3 w-full" />
    <SkeletonLine className="mt-2 h-3 w-11/12" />
    <SkeletonLine className="mt-4 h-3 w-24" />
  </div>
);

const ModelPerformanceSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 pt-4 text-white">
      <header className="flex flex-col items-center justify-center gap-3 text-center">
        <SkeletonLine className="h-3 w-36" />
        <SkeletonLine className="h-10 w-64 rounded-2xl" />
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-2">
          <SkeletonLine className="h-3 w-full max-w-2xl" />
          <SkeletonLine className="h-3 w-10/12 max-w-xl" />
        </div>

        <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
          <SkeletonLine className="h-10 w-40 rounded-full" />
          <SkeletonLine className="h-10 w-36 rounded-full" />
          <SkeletonLine className="h-10 w-40 rounded-full" />
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <KpiCardSkeleton key={`model-performance-kpi-skeleton-${index}`} />
        ))}
      </section>

      <section className={`${layoutCardClass} overflow-hidden`}>
        <div className="flex flex-col gap-6 px-4 py-4 sm:px-6 sm:py-6">
          <div className="border-b border-white/10 pb-5">
            <SkeletonLine className="h-3 w-20" />
            <SkeletonLine className="mt-3 h-8 w-56 rounded-xl" />
            <div className="mt-3 space-y-2">
              <SkeletonLine className="h-3 w-full max-w-2xl" />
              <SkeletonLine className="h-3 w-11/12 max-w-xl" />
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 px-5 py-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <SkeletonLine className="h-2.5 w-24" />
                  <SkeletonLine className="mt-4 h-12 w-32 rounded-2xl" />
                  <SkeletonLine className="mt-4 h-3 w-full max-w-xl" />
                  <SkeletonLine className="mt-2 h-3 w-10/12 max-w-lg" />
                </div>

                <div className="w-full max-w-[160px] rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3">
                  <SkeletonLine className="h-2.5 w-12" />
                  <SkeletonLine className="mt-3 h-8 w-16 rounded-xl" />
                  <SkeletonLine className="mt-2 h-3 w-24" />
                </div>
              </div>

              <div className="mt-8">
                <div className="pt-11">
                  <div className="h-4 overflow-hidden rounded-full border border-white/10 bg-slate-950/70">
                    <div className={`h-full w-full ${shimmer}`} />
                  </div>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={`model-performance-band-skeleton-${index}`}
                      className="rounded-xl border border-white/10 bg-slate-950/40 px-3 py-3 text-center"
                    >
                      <SkeletonLine className="mx-auto h-2.5 w-12" />
                      <SkeletonLine className="mx-auto mt-3 h-4 w-16 rounded-xl" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <BenchmarkCardSkeleton key={`model-performance-benchmark-skeleton-${index}`} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModelPerformanceSkeleton;
