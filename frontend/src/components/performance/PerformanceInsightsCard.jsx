import { layoutCardClass } from "../layout/LayoutShell";
import { formatPercentage, formatRoundLabel } from "./modelPerformanceUtils";

const insightToneMap = {
  positive: "border-emerald-400/20 bg-slate-900/40",
  negative: "border-rose-400/20 bg-slate-900/40",
  neutral: "border-white/10 bg-slate-900/40",
  accent: "border-orange-300/20 bg-slate-900/40",
};

const InsightItem = ({ label, value, detail, tone = "neutral" }) => (
  <div className={`rounded-2xl border px-4 py-4 ${insightToneMap[tone] ?? insightToneMap.neutral}`}>
    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-400">{label}</p>
    <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    <p className="mt-2 text-sm text-slate-300">{detail}</p>
  </div>
);

const PerformanceInsightsCard = ({ bestRound, worstRound, averageCorrectPicks = 0 }) => {
  const items = [
    {
      label: "Best Round",
      value: bestRound ? formatRoundLabel(bestRound.roundNumber) : "-",
      detail: bestRound
        ? `${bestRound.correct}/${bestRound.totalPredictions} correct · ${formatPercentage(bestRound.successRate)}`
        : "No completed rounds yet",
      tone: "positive",
    },
    {
      label: "Worst Round",
      value: worstRound ? formatRoundLabel(worstRound.roundNumber) : "-",
      detail: worstRound
        ? `${worstRound.correct}/${worstRound.totalPredictions} correct · ${formatPercentage(worstRound.successRate)}`
        : "No completed rounds yet",
      tone: "negative",
    },
    {
      label: "Avg Correct / Round",
      value: averageCorrectPicks.toFixed(1),
      detail: "Useful for explaining consistency from round to round.",
      tone: "accent",
    },
  ];

  return (
    <section className={`${layoutCardClass} overflow-hidden`}>
      <div className="flex h-full flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6">
        <div className="border-b border-white/10 pb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-300/80">Insights</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Key Takeaways</h2>
        </div>

        <div className="grid flex-1 gap-3">{items.map((item) => <InsightItem key={item.label} {...item} />)}</div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-4 text-sm text-slate-300">
          These highlights are derived from the same round dataset that powers the charts and round cards below.
        </div>
      </div>
    </section>
  );
};

export default PerformanceInsightsCard;
