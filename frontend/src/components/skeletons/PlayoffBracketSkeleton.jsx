const MatchupSkeleton = () => (
  <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/30">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-orange-400/20" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-32 rounded-full bg-white/10" />
        <div className="h-2.5 w-24 rounded-full bg-white/5" />
      </div>
      <div className="h-6 w-12 rounded-full bg-orange-400/15" />
    </div>
    <div className="mt-3 flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-orange-400/20" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-32 rounded-full bg-white/10" />
        <div className="h-2.5 w-24 rounded-full bg-white/5" />
      </div>
      <div className="h-6 w-12 rounded-full bg-orange-400/15" />
    </div>
  </div>
);

const PlayoffBracketSkeleton = () => {
  return (
    <div className="w-full space-y-8 px-2 py-2 text-white/70 sm:px-4 sm:py-4">
      <section className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-8 shadow-2xl shadow-black/30 backdrop-blur">
        <div className="mx-auto flex w-full flex-col items-center gap-3">
          <div className="h-4 w-40 rounded-full bg-orange-200/30" />
          <div className="h-6 w-64 rounded-full bg-white/15" />
          <div className="h-4 w-72 rounded-full bg-white/5" />
        </div>

        <div className="mt-8 space-y-5">
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

      <section className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-8 shadow-2xl shadow-black/30 backdrop-blur">
        <div className="mx-auto flex w-full flex-col items-center gap-3">
          <div className="h-4 w-44 rounded-full bg-orange-200/30" />
          <div className="h-6 w-60 rounded-full bg-white/15" />
        </div>

        <div className="mt-8 space-y-8">
          <div className="grid gap-4 lg:grid-cols-2">
            <MatchupSkeleton />
            <MatchupSkeleton />
            <MatchupSkeleton />
            <MatchupSkeleton />
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <MatchupSkeleton />
            <MatchupSkeleton />
          </div>
          <div className="max-w-md">
            <MatchupSkeleton />
          </div>
        </div>
      </section>

      <section className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-8 text-center shadow-2xl shadow-black/30 backdrop-blur">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4">
          <div className="h-4 w-36 rounded-full bg-amber-200/30" />
          <div className="h-10 w-52 rounded-full bg-white/10" />
          <div className="h-24 w-24 rounded-full bg-amber-300/20" />
          <div className="h-4 w-32 rounded-full bg-white/10" />
        </div>
      </section>
    </div>
  );
};

export default PlayoffBracketSkeleton;
