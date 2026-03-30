const StatsCard = ({
  title,
  value,
  icon: Icon,
  color = "",
  iconColor = "text-white/20",
  accent = "bg-orange-500/30",
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-black/40 backdrop-blur-xl ${color}`}
  >
    <div className={`absolute -top-16 right-0 h-32 w-32 rounded-full blur-[110px] ${accent}`} />

    <div className="relative z-10 flex items-start justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-300/80">{title}</p>
        <h3 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{value}</h3>
      </div>
    </div>

    {/* Icon watermark */}
    <div className={`absolute -bottom-6 -right-4 opacity-30 ${iconColor} select-none pointer-events-none`}>
      <Icon className="h-28 w-28" />
    </div>
  </div>
);

export default StatsCard;
