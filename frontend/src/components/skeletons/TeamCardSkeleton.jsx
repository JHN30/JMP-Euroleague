const TeamCardSkeleton = () => {
  return (
    <div className="relative h-full overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-px shadow-xl shadow-black/20 backdrop-blur-xl">
      <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.28),_transparent_58%)] opacity-90" />

      <div className="relative h-full overflow-hidden rounded-[1.45rem] bg-slate-900/80 animate-pulse">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-orange-400/30 via-orange-400/10 to-transparent" />

        <div className="relative z-10 flex h-full flex-col px-5 py-5">
          <div className="flex justify-center">
            <div className="h-6 w-36 rounded-full bg-white/20" />
          </div>

          <div className="mt-6 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-white/20 bg-white/15" />
          </div>

          <div className="mt-6">
            <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
              <div className="h-3 w-12 rounded-full bg-white/10" />
              <div className="mt-2 h-6 w-16 rounded-full bg-white/15" />
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-orange-300/30 bg-orange-500/20 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="h-3 w-20 rounded-full bg-orange-100/40" />
              <div className="h-6 w-10 rounded-full bg-white/15" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCardSkeleton;
