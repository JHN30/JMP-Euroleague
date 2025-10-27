const TeamCardSkeleton = () => {
  return (
    <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-[1px] shadow-xl shadow-black/30">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/20 via-transparent to-amber-400/20 opacity-70 blur-2xl" />

      <div className="card card-md relative h-full overflow-hidden rounded-[1.45rem] bg-neutral animate-pulse">
        <div className="card-body items-center justify-center rounded-t-[1.2rem] bg-gradient-to-br from-orange-500 via-orange-500 to-amber-400 p-4 text-center">
          <div className="h-4 w-32 rounded-full bg-white/40" />
        </div>

        <figure className="mb-3 mt-3 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
            <div className="h-14 w-14 rounded-xl bg-white/25" />
          </div>
        </figure>
      </div>
    </div>
  );
};

export default TeamCardSkeleton;
