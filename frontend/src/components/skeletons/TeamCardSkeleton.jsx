const TeamCardSkeleton = () => {
  return (
    <div className="card bg-neutral card-md h-full relative overflow-hidden animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-br from-base-100 via-transparent to-base-200 pointer-events-none" />

      <div className="card-body bg-orange-400/60 p-4 items-center justify-center rounded-t-md relative z-10">
        <div className="skeleton h-5 w-24 bg-white/40" />
      </div>

      <figure className="mt-2 mb-4 flex items-center justify-center relative z-10">
        <div className="skeleton w-24 h-24 rounded-full bg-base-300" />
      </figure>
    </div>
  );
};

export default TeamCardSkeleton;
