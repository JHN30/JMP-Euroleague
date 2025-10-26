import { pageCardClass } from "../layout/PageShell";

const barClass = "rounded-full bg-white/10 animate-pulse";

const PredictingTeamsSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Main predictor card skeleton */}
      <div className={`${pageCardClass} overflow-hidden`}>
        <div className="border-b border-white/10 px-6 py-6">
          <div className="h-3 w-36 rounded-full bg-orange-300/20 animate-pulse" />
          <div className="mt-4 space-y-2">
            <div className="h-6 w-64 rounded-full bg-white/10 animate-pulse" />
            <div className="h-4 w-80 rounded-full bg-white/5 animate-pulse" />
          </div>
        </div>

        <div className="space-y-8 px-6 py-6">
          {/* Team selects */}
          <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
            <div className="space-y-3">
              <div className="h-3 w-28 rounded-full bg-orange-200/20 animate-pulse" />
              <div className="h-12 w-full rounded-2xl bg-white/10 animate-pulse" />
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <div className="h-3 w-20 rounded-full bg-white/10 animate-pulse" />
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-400/30 to-amber-300/30 animate-pulse" />
            </div>

            <div className="space-y-3">
              <div className="h-3 w-28 rounded-full bg-orange-200/20 animate-pulse" />
              <div className="h-12 w-full rounded-2xl bg-white/10 animate-pulse" />
            </div>
          </div>

          {/* Injury inputs */}
          <div className="grid gap-6 md:grid-cols-2">
            {[0, 1].map((key) => (
              <div key={key} className="space-y-3">
                <div className="h-3 w-32 rounded-full bg-orange-200/20 animate-pulse" />
                <div className="h-12 w-full rounded-2xl bg-white/10 animate-pulse" />
              </div>
            ))}
          </div>

          {/* CTA button */}
          <div className="h-12 w-full rounded-2xl bg-gradient-to-r from-orange-500/40 via-amber-400/40 to-yellow-300/40 animate-pulse" />
        </div>
      </div>

      {/* Results skeleton */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto h-3 w-40 rounded-full bg-orange-200/30 animate-pulse" />
          <div className="mx-auto h-6 w-72 rounded-full bg-white/10 animate-pulse" />
          <div className="mx-auto h-4 w-64 rounded-full bg-white/5 animate-pulse" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[0, 1].map((key) => (
            <div key={key} className={`${pageCardClass} relative overflow-hidden`}>
              <div className={`absolute inset-0 ${key === 0 ? "bg-emerald-500/5" : "bg-sky-500/5"} animate-pulse`} />
              <div className="relative z-10 flex flex-col gap-5 px-6 py-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl bg-white/10 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-3 w-24 rounded-full bg-orange-200/30 animate-pulse" />
                    <div className="h-5 w-32 rounded-full bg-white/10 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-3 text-center">
                  <div className="mx-auto h-8 w-24 rounded-full bg-white/10 animate-pulse" />
                  <div className="mx-auto h-3 w-28 rounded-full bg-white/5 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className={`h-2 w-full ${barClass}`} />
                  <div className="mx-auto h-3 w-32 rounded-full bg-white/10 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictingTeamsSkeleton;
