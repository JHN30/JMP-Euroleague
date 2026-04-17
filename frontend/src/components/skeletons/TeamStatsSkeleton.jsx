import { layoutCardClass } from "../layout/LayoutShell";

const shimmer = "animate-pulse bg-white/10";

const SkeletonLine = ({ className }) => <span className={`block rounded-full ${shimmer} ${className}`} />;

const MetricCardSkeleton = ({
  className,
  labelClassName = "h-2.5 w-12",
  valueClassName = "mt-2 h-5 w-12 rounded-md sm:h-6",
  innerClassName = "",
}) => {
  return (
    <div className={className}>
      <div className={innerClassName}>
        <div className="min-w-0">
          <SkeletonLine className={labelClassName} />
          <SkeletonLine className={valueClassName} />
        </div>
      </div>
    </div>
  );
};

const RoundSkeleton = () => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/4 px-4 py-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <SkeletonLine className="h-6 w-24" />
          <SkeletonLine className="h-3 w-12" />
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col items-center gap-1 text-center sm:items-end sm:text-right">
            <SkeletonLine className="h-5 w-24" />
            <SkeletonLine className="h-2.5 w-12" />
          </div>

          <div className="flex min-w-24 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <SkeletonLine className="h-5 w-14" />
            <SkeletonLine className="mt-1 h-2.5 w-10" />
          </div>

          <div className="flex flex-1 flex-col items-center gap-1 text-center sm:items-start sm:text-left">
            <SkeletonLine className="h-5 w-24" />
            <SkeletonLine className="h-2.5 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamStatsSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 pt-4 text-white">
      <div className="flex flex-col items-center gap-2 text-center">
        <SkeletonLine className="h-3 w-32" />
        <SkeletonLine className="h-9 w-56" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)] xl:items-stretch">
        <div className={`${layoutCardClass} overflow-hidden`}>
          <div className="flex h-full flex-col items-center justify-center gap-5 px-5 py-6 text-center sm:px-6 sm:py-7">
            <div className="flex flex-col items-center gap-5 sm:flex-col sm:justify-center sm:gap-6">
              <div className="flex h-36 w-36 items-center justify-center rounded-2xl border border-orange-300/20 bg-slate-950/70 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.24)] sm:h-48 sm:w-48">
                <SkeletonLine className="h-full w-full rounded-2xl" />
              </div>
              <div className="min-w-0">
                <SkeletonLine className="h-8 w-48 rounded-2xl sm:h-10 sm:w-56" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className={`${layoutCardClass} overflow-hidden px-4 py-4 sm:px-5 sm:py-5`}>
            <div className="flex h-full flex-col gap-4">
              <div className="border-b border-white/10 pb-4">
                <SkeletonLine className="h-8 w-20" />
              </div>

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <MetricCardSkeleton
                    key={idx}
                    className="rounded-xl border border-white/10 bg-white/4 px-2 py-2"
                    innerClassName="flex min-h-12 items-center justify-between gap-2"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={`${layoutCardClass} overflow-hidden`}>
            <div className="flex flex-col gap-4 px-4 py-3.5 sm:px-6 sm:py-5">
              <div className="border-b border-white/10 pb-3.5">
                <SkeletonLine className="h-7 w-36" />
              </div>

              <div className="grid gap-2.5 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <MetricCardSkeleton
                    key={idx}
                    className="rounded-xl border border-white/10 bg-white/4 px-4 py-3"
                    valueClassName="mt-2 h-7 w-16 rounded-md sm:h-8"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStatsSkeleton;
