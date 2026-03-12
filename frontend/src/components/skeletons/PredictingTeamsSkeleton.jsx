import { layoutCardClass } from "../layout/LayoutShell";

const PredictingTeamsSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Main predictor card skeleton */}
      <div className={`${layoutCardClass} overflow-hidden`}>
        <div className="space-y-6 px-6 py-6">
          {/* Team selects */}
          <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
            <div className="space-y-3">
              <div className="h-3 w-28 rounded-full bg-orange-200/20 animate-pulse" />
              <div className="h-10 w-full rounded-lg bg-slate-800/70 animate-pulse" />
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <div className="h-10 w-10 rounded-full bg-orange-300/20 animate-pulse" />
            </div>

            <div className="space-y-3">
              <div className="h-3 w-28 rounded-full bg-orange-200/20 animate-pulse" />
              <div className="h-10 w-full rounded-lg bg-slate-800/70 animate-pulse" />
            </div>
          </div>

          {/* Injury inputs */}
          <div className="grid gap-6 md:grid-cols-2">
            {[0, 1].map((key) => (
              <div key={key} className="space-y-3">
                <div className="h-3 w-32 rounded-full bg-orange-200/20 animate-pulse" />
                <div className="space-y-6">
                  <div className="h-10 w-full rounded-lg bg-slate-800/70 animate-pulse" />
                  <div className="h-10 w-full rounded-lg bg-slate-800/70 animate-pulse" />
                  <div className="h-10 w-full rounded-lg bg-slate-800/70 animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <div className="h-11 w-full rounded-lg bg-orange-500/40 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default PredictingTeamsSkeleton;
