import { layoutCardClass } from "../layout/LayoutShell";

const MatchupSkeleton = () => (
  <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-4">
    <div className="space-y-3">
      {[0, 1].map((row) => (
        <div key={row} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3">
          <div className="h-9 w-9 rounded-full bg-orange-400/20 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-28 rounded-full bg-white/10 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PlayoffBracketSkeleton = () => {
  return (
    <div className="w-full space-y-6">
      <section className={`${layoutCardClass} px-4 py-5 sm:px-6 sm:py-6`}>
        <div className="mx-auto flex w-full flex-col items-center gap-2">
          <div className="h-3 w-20 rounded-full bg-orange-200/30 animate-pulse" />
          <div className="h-6 w-56 rounded-full bg-white/15 animate-pulse" />
        </div>

        <div className="mt-6 space-y-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <MatchupSkeleton />
            <MatchupSkeleton />
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <MatchupSkeleton />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlayoffBracketSkeleton;
