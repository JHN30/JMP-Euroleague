const StatsCard = ({
  title,
  value,
  icon: Icon,
  color = "",
  iconColor = "text-white/90",
  accent = "bg-orange-500/15",
}) => (
  <div className={`rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 ${color}`}>
    <div className="flex min-h-[4.5rem] items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-slate-400">{title}</p>
        <h3 className="mt-2 text-2xl font-semibold leading-none text-white sm:text-[1.75rem]">{value}</h3>
      </div>

      <div
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 ${accent}`}
      >
        <Icon className={`block h-4 w-4 ${iconColor}`} />
      </div>
    </div>
  </div>
);

export default StatsCard;
