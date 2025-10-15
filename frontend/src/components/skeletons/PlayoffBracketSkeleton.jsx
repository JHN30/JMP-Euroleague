const MatchupSkeleton = () => (
  <div className="relative border border-orange-300/40 rounded-xl bg-base-100/80 p-4 md:p-6 shadow-md">
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-3 w-1/2">
        <div className="skeleton h-4 w-14 bg-orange-300/40"></div>
        <div className="skeleton h-5 w-36 bg-base-300"></div>
      </div>
      <div className="skeleton h-6 w-6 rounded-full bg-orange-300/40"></div>
      <div className="flex flex-col gap-3 w-1/2 items-end">
        <div className="skeleton h-4 w-14 bg-orange-300/40"></div>
        <div className="skeleton h-5 w-36 bg-base-300"></div>
      </div>
    </div>
  </div>
);

const PlayoffBracketSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-base-200 animate-pulse">
      <section className="relative overflow-hidden px-4 md:px-12 py-10 md:py-16">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.2),_transparent)]"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="skeleton h-10 w-64 bg-orange-400/30 mb-4"></div>
          <div className="skeleton h-4 w-80 bg-base-300 mb-6"></div>
          <div className="grid gap-4 max-w-3xl mx-auto">
            <div className="skeleton h-12 w-full bg-base-300 rounded-xl"></div>
            <div className="skeleton h-12 w-full bg-base-300 rounded-xl"></div>
          </div>
        </div>
      </section>

      <section className="relative px-4 md:px-12 pb-16">
        <div className="max-w-6xl mx-auto space-y-12">
          <div>
            <div className="skeleton h-7 w-40 bg-orange-200/40 mx-auto mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
              <MatchupSkeleton />
              <MatchupSkeleton />
              <MatchupSkeleton />
            </div>
          </div>

          <div>
            <div className="skeleton h-7 w-44 bg-orange-200/40 mx-auto mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
              <MatchupSkeleton />
              <MatchupSkeleton />
              <MatchupSkeleton />
              <MatchupSkeleton />
            </div>
          </div>

          <div>
            <div className="skeleton h-7 w-36 bg-orange-200/40 mx-auto mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
              <MatchupSkeleton />
              <MatchupSkeleton />
            </div>
          </div>

          <div>
            <div className="skeleton h-7 w-48 bg-orange-200/40 mx-auto mb-6"></div>
            <div className="max-w-md mx-auto">
              <MatchupSkeleton />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-12 pb-16">
        <div className="relative max-w-md mx-auto border-2 border-amber-300/50 rounded-2xl p-6 md:p-8 bg-base-100/10 backdrop-blur">
          <div className="skeleton h-8 w-36 bg-yellow-400/40 mx-auto mb-6"></div>
          <div className="flex flex-col items-center gap-4">
            <div className="skeleton w-20 h-20 rounded-full bg-yellow-400/30"></div>
            <div className="skeleton h-6 w-40 bg-base-300"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlayoffBracketSkeleton;
