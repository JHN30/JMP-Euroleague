const TeamCardSkeleton = () => {
  return (
    <div className="h-full min-h-[280px] overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-xl shadow-black/20 backdrop-blur-xl">
      <div className="relative h-full overflow-hidden rounded-[1.45rem] bg-slate-900/80 animate-pulse">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.45rem] border border-transparent" />
        <div className="pointer-events-none absolute inset-0 translate-x-[-120%] skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30" />

        <div className="relative z-10 flex h-full flex-col px-5 py-5">
          <div className="flex justify-center">
            <div className="h-6 w-36 rounded-full bg-white/15" />
          </div>

          <div className="mt-6 flex justify-center">
            <div className="h-24 w-24 rounded-2xl bg-white/10" />
          </div>

          <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
            <div className="h-3 w-12 rounded-full bg-white/10" />
            <div className="mt-2 h-6 w-16 rounded-full bg-white/15" />
          </div>

          <div className="mt-4 rounded-2xl border border-orange-300/30 bg-orange-500/20 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="h-3 w-20 rounded-full bg-orange-100/30" />
              <div className="h-6 w-10 rounded-full bg-white/15" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCardSkeleton;
