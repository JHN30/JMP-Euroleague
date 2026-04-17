const StatsCard = ({
  title,
  value,
  color = "",
}) => (
  <div className={`rounded-xl border border-white/10 bg-white/4 px-2 py-2 ${color}`}>
    <div className="flex min-h-12 items-center justify-between gap-2">
      <div className="min-w-0">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-slate-400">{title}</p>
        <h3 className="mt-2 text-md sm:text-lg font-semibold leading-none text-white">{value}</h3>
      </div>
    </div>
  </div>
);

export default StatsCard;
