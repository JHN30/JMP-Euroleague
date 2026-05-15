import { layoutCardClass } from "../layout/LayoutShell";

const placeholderClass = "bg-white/10";

const SkeletonLine = ({ className = "" }) => (
  <span className={`block rounded-full ${placeholderClass} ${className}`} />
);

const SkeletonBlock = ({ className = "" }) => <div className={`${placeholderClass} ${className}`} />;

const KpiCardSkeleton = () => (
  <div className={`${layoutCardClass} overflow-hidden px-4 py-4 sm:px-5 sm:py-5`}>
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0 flex-1">
        <SkeletonLine className="h-2.5 w-20" />
        <SkeletonLine className="mt-4 h-8 w-24 rounded-xl" />
      </div>

      <SkeletonBlock className="h-11 w-11 shrink-0 rounded-2xl" />
    </div>
  </div>
);

const BenchmarkCardSkeleton = () => (
  <div className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-4">
    <SkeletonLine className="h-5 w-28" />
    <SkeletonLine className="mt-3 h-7 w-20 rounded-xl" />
    <SkeletonLine className="mt-4 h-3 w-full" />
    <SkeletonLine className="mt-2 h-3 w-11/12" />
    <SkeletonLine className="mt-4 h-3 w-24" />
  </div>
);

const ResearchContextSkeleton = () => (
  <section className={`${layoutCardClass} overflow-hidden`}>
    <div className="flex flex-col gap-6 px-4 py-4 sm:px-6 sm:py-6">
      <div className="border-b border-white/10 pb-5">
        <SkeletonLine className="h-8 w-56 rounded-xl" />
        <div className="mt-3 space-y-2">
          <SkeletonLine className="h-3 w-full max-w-6xl" />
          <SkeletonLine className="h-3 w-10/12 max-w-4xl" />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 px-5 py-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <SkeletonLine className="h-3 w-24" />
              <SkeletonLine className="mt-3 h-12 w-32 rounded-2xl" />
              <SkeletonLine className="mt-4 h-3 w-full max-w-xl" />
              <SkeletonLine className="mt-2 h-3 w-10/12 max-w-lg" />
            </div>
          </div>

          <div className="mt-8">
            <div className="pt-11">
              <div className="h-4 overflow-hidden rounded-full border border-white/10 bg-slate-950/70">
                <SkeletonBlock className="h-full w-full rounded-full" />
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
);

const TrendChartSkeleton = () => {
  const barHeightClasses = ["h-28", "h-40", "h-32", "h-52", "h-44", "h-36", "h-56", "h-48", "h-60", "h-44"];

  return (
    <section className={`${layoutCardClass} overflow-hidden`}>
      <div className="flex flex-col gap-5 px-4 py-4 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 flex-1">
            <SkeletonLine className="h-8 w-72 max-w-full rounded-xl" />
            <SkeletonLine className="mt-3 h-3 w-full max-w-2xl" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={`model-performance-trend-chip-skeleton-${index}`}
                className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3"
              >
                <SkeletonLine className="h-2.5 w-20" />
                <SkeletonLine className="mt-2 h-6 w-16 rounded-xl" />
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/35 px-3 pb-7 pt-8 sm:h-[360px] lg:h-[420px]">
          <div className="absolute inset-x-3 top-8 bottom-7 flex flex-col justify-between">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={`model-performance-chart-grid-skeleton-${index}`} className="h-px w-full bg-white/10" />
            ))}
          </div>

          <div className="relative flex h-full items-end gap-2 sm:gap-3">
            {barHeightClasses.map((heightClassName, index) => (
              <SkeletonBlock
                key={`model-performance-chart-bar-skeleton-${index}`}
                className={`min-w-0 flex-1 rounded-t-xl ${heightClassName}`}
              />
            ))}
          </div>

          <div className="absolute inset-x-4 bottom-3 flex justify-between">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonLine key={`model-performance-chart-label-skeleton-${index}`} className="h-2 w-8" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const OverviewChartSkeleton = () => (
  <section className={`${layoutCardClass} overflow-hidden`}>
    <div className="flex h-full flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6">
      <div className="border-b border-white/10 pb-5">
        <SkeletonLine className="h-8 w-56 rounded-xl" />
      </div>

      <div className="mx-auto flex w-full flex-col items-center rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3">
        <div className="flex h-60 w-full items-center justify-center">
          <div className="flex h-44 w-44 items-center justify-center rounded-full border-[28px] border-white/10 bg-slate-950/35 sm:h-52 sm:w-52">
            <div className="h-20 w-20 rounded-full bg-slate-900/80" />
          </div>
        </div>

        <div className="mt-3 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={`model-performance-overview-card-skeleton-${index}`}
              className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-4"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <SkeletonLine className="h-2.5 w-20" />
                  <SkeletonLine className="mt-2 h-6 w-12 rounded-xl" />
                </div>
                <SkeletonLine className="h-8 w-16 rounded-full" />
              </div>

              <SkeletonLine className="mt-3 h-2 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const InsightsCardSkeleton = () => (
  <section className={`${layoutCardClass} overflow-hidden`}>
    <div className="flex h-full flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6">
      <div className="border-b border-white/10 pb-5">
        <SkeletonLine className="h-8 w-44 rounded-xl" />
      </div>

      <div className="grid gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`model-performance-insight-skeleton-${index}`}
            className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-4"
          >
            <SkeletonLine className="h-2.5 w-24" />
            <SkeletonLine className="mt-3 h-7 w-32 rounded-xl" />
            <SkeletonLine className="mt-3 h-3 w-full max-w-sm" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const RoundPerformanceGridSkeleton = () => (
  <section className={`${layoutCardClass} overflow-hidden`}>
    <div className="flex flex-col gap-4 px-4 py-4 sm:px-5 sm:py-5">
      <div className="border-b border-white/10 pb-4">
        <SkeletonLine className="h-8 w-72 max-w-full rounded-xl" />
        <SkeletonLine className="mt-3 h-3 w-56 max-w-full" />
      </div>

      <div className="-mx-1 overflow-hidden px-1 pb-2">
        <div className="flex min-w-max gap-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={`model-performance-round-tile-skeleton-${index}`}
              className="w-20 shrink-0 rounded-2xl border border-white/10 bg-slate-900/40 px-3 py-3"
            >
              <SkeletonLine className="h-2.5 w-8" />
              <SkeletonLine className="mt-3 h-7 w-12 rounded-xl" />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-orange-300/20 bg-slate-900/40 px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 flex-1">
            <SkeletonLine className="h-8 w-28 rounded-xl" />
            <SkeletonLine className="mt-3 h-3 w-full max-w-xl" />
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
            <SkeletonLine className="h-2.5 w-24" />
            <SkeletonLine className="mt-3 h-10 w-20 rounded-xl" />
          </div>
        </div>

        <div className="mt-5 w-full min-w-0 rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-4">
          <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 flex-1">
              <SkeletonLine className="h-4 w-32" />
              <SkeletonLine className="mt-3 h-3 w-80 max-w-full" />
            </div>
            <SkeletonLine className="h-3 w-16 sm:ml-auto" />
          </div>

          <div className="mt-4 space-y-3">
            {Array.from({ length: 3 }).map((_, rowIndex) => (
              <div
                key={`model-performance-round-table-row-skeleton-${rowIndex}`}
                className="grid gap-3 rounded-xl border border-white/5 bg-slate-900/30 px-3 py-3 sm:grid-cols-[1.25fr_1fr_1fr_0.8fr]"
              >
                <SkeletonLine className="h-4 w-full max-w-40" />
                <SkeletonLine className="h-4 w-full max-w-32" />
                <SkeletonLine className="h-4 w-full max-w-28" />
                <SkeletonLine className="h-4 w-full max-w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ModelPerformanceSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 pt-4 text-white">
      <header className="flex flex-col items-center justify-center gap-3 text-center">
        <SkeletonLine className="h-3 w-36" />
        <SkeletonLine className="h-10 w-64 max-w-full rounded-2xl" />

        <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
          <SkeletonLine className="h-10 w-40 rounded-full" />
          <SkeletonLine className="h-10 w-40 rounded-full" />
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <KpiCardSkeleton key={`model-performance-kpi-skeleton-${index}`} />
        ))}
      </section>

      <ResearchContextSkeleton />
      <TrendChartSkeleton />

      <section className="grid gap-6 xl:grid-cols-2">
        <OverviewChartSkeleton />
        <InsightsCardSkeleton />
      </section>

      <RoundPerformanceGridSkeleton />
    </div>
  );
};

export default ModelPerformanceSkeleton;
