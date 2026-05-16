const toneMap = {
  neutral: {
    card: "border-white/10 bg-slate-900/40",
    icon: "border-white/10 bg-slate-950/70 text-slate-200",
    value: "text-white",
  },
  positive: {
    card: "border-emerald-400/20 bg-slate-900/40",
    icon: "border-emerald-400/20 bg-slate-950/70 text-emerald-200",
    value: "text-emerald-100",
  },
  negative: {
    card: "border-rose-400/20 bg-slate-900/40",
    icon: "border-rose-400/20 bg-slate-950/70 text-rose-200",
    value: "text-rose-100",
  },
  accent: {
    card: "border-orange-300/20 bg-slate-900/40",
    icon: "border-orange-300/20 bg-slate-950/70 text-orange-100",
    value: "text-orange-50",
  },
};

const PerformanceKpiCard = ({ label, value, subtext, icon, tone = "neutral" }) => {
  const Icon = icon;
  const toneClasses = toneMap[tone] ?? toneMap.neutral;

  return (
    <div className={`rounded-2xl border px-4 py-4 ${toneClasses.card}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-400">{label}</p>
          <p className={`mt-3 text-3xl font-black leading-none sm:text-[2rem] ${toneClasses.value}`}>{value}</p>
          {subtext ? <p className="mt-2 text-sm text-slate-300">{subtext}</p> : null}
        </div>

        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${toneClasses.icon}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default PerformanceKpiCard;
