import { FiExternalLink } from "react-icons/fi";

import { layoutCardClass } from "../layout/LayoutShell";
import { formatPercentage, getPerformanceRead } from "./modelPerformanceUtils";

const SCALE_MIN = 55;
const SCALE_MAX = 85;

const practicalBands = [
  {
    id: "below-target",
    label: "Below Target",
    rangeLabel: "< 60%",
    min: SCALE_MIN,
    max: 60,
    barClass: "bg-rose-500/70",
    markerClasses: "border-rose-300/25 bg-rose-400 text-white shadow-rose-950/30",
  },
  {
    id: "decent",
    label: "Decent",
    rangeLabel: "60-65%",
    min: 60,
    max: 65,
    barClass: "bg-amber-400/80",
    markerClasses: "border-amber-300/25 bg-amber-400 text-slate-950 shadow-amber-950/25",
  },
  {
    id: "good",
    label: "Good",
    rangeLabel: "65-70%",
    min: 65,
    max: 70,
    barClass: "bg-orange-400/85",
    markerClasses: "border-orange-300/25 bg-orange-400 text-slate-950 shadow-orange-950/30",
  },
  {
    id: "very-strong",
    label: "Very Strong",
    rangeLabel: "70-75%",
    min: 70,
    max: 75,
    barClass: "bg-emerald-400/85",
    markerClasses: "border-emerald-300/25 bg-emerald-400 text-slate-950 shadow-emerald-950/30",
  },
  {
    id: "elite",
    label: "Elite",
    rangeLabel: "75%+",
    min: 75,
    max: SCALE_MAX,
    barClass: "bg-teal-400/80",
    markerClasses: "border-teal-300/25 bg-teal-400 text-slate-950 shadow-teal-950/30",
  },
];

const scaleReferences = [
  {
    id: "holdout-reference",
    label: "66.8% hold-out ML",
    value: 66.8,
    markerClass: "bg-sky-200",
  },
  {
    id: "crowd-reference",
    label: "73.2% crowd benchmark",
    value: 73.2,
    markerClass: "bg-emerald-200",
  },
];

const researchBenchmarks = [
  {
    id: "holdout-ml",
    valueLabel: "66.8%",
    methodLabel: "Pre-game model",
    summary:
      "Giasemidis tested EuroLeague data from 2016-17 to 2018-19 and found that a realistic unseen-season test landed below the 75% cross-validation result.",
    sourceLabel: "Giasemidis 2020",
    sourceUrl: "https://arxiv.org/abs/2002.08465",
  },
  {
    id: "crowd-benchmark",
    valueLabel: "73.2%",
    methodLabel: "Basketball Crowd Benchmark",
    summary:
      "The same paper reported that collective EuroLeague fan predictions beat the ML models, making roughly 73% a useful high bar for pre-game forecasting.",
    sourceLabel: "Giasemidis 2020",
    sourceUrl: "https://arxiv.org/abs/2002.08465",
  },
  {
    id: "box-score-ceiling",
    valueLabel: "81.8%-84.1%",
    methodLabel: "ML Game-stat model",
    summary:
      "Foteinakis et al. reported 81.8% accuracy for logistic regression and 84.1% for SVM using team game-related statistics, RFE, and SHAP.",
    sourceLabel: "Foteinakis et al. 2025",
    sourceUrl: "https://doi.org/10.3390/app152312401",
  },
];

const toneMap = {
  neutral: "border-white/10 bg-slate-950/60 text-slate-100",
  caution: "border-rose-300/25 bg-rose-500/10 text-rose-100",
  steady: "border-amber-300/25 bg-amber-500/10 text-amber-50",
  good: "border-orange-300/25 bg-orange-500/10 text-orange-50",
  strong: "border-emerald-300/25 bg-emerald-500/10 text-emerald-50",
  elite: "border-teal-300/25 bg-teal-500/10 text-teal-50",
};

const clampToScale = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return SCALE_MIN;
  }

  return Math.min(Math.max(numericValue, SCALE_MIN), SCALE_MAX);
};

const getScalePosition = (value) => {
  const clampedValue = clampToScale(value);
  return ((clampedValue - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100;
};

const isBandActive = (band, successRate) => {
  if (!Number.isFinite(successRate)) {
    return false;
  }

  if (band.max === SCALE_MAX) {
    return successRate >= band.min;
  }

  return successRate >= band.min && successRate < band.max;
};

const getActiveBand = (successRate) => {
  if (!Number.isFinite(successRate)) {
    return null;
  }

  return practicalBands.find((band) => isBandActive(band, successRate)) ?? practicalBands[practicalBands.length - 1];
};

const PerformanceResearchContext = ({ overallSuccessRate = 0, totalPredictions = 0 }) => {
  const hasSample = totalPredictions > 0;
  const performanceRate = hasSample ? overallSuccessRate : Number.NaN;
  const performanceRead = getPerformanceRead(performanceRate);
  const markerPosition = getScalePosition(hasSample ? overallSuccessRate : SCALE_MIN);
  const activeBand = hasSample ? getActiveBand(overallSuccessRate) : null;
  const toneClasses = toneMap[performanceRead.tone] ?? toneMap.neutral;
  const markerClasses =
    activeBand?.markerClasses ?? "border-orange-300/25 bg-orange-400 text-slate-950 shadow-orange-950/30";

  return (
    <section className={`${layoutCardClass} overflow-hidden`}>
      <div className="flex flex-col gap-6 px-4 py-4 sm:px-6 sm:py-6">
        <div className="border-b border-white/10 pb-5">
          <h2 className="mt-2 text-2xl font-semibold text-white">How This Model Compares</h2>
          <p className="mt-2 max-w-7xl text-sm leading-6 text-slate-300">
            Published EuroLeague pre-game benchmarks land in the
            high-60s on unseen seasons, while box-score models can score higher because they use richer game-performance
            inputs.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 px-5 py-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-orange-200/80">
                  Current Read
                </p>
                <div className="mt-3 flex flex-wrap items-end gap-3">
                  <p className="text-4xl font-black leading-none text-white sm:text-5xl">
                    {hasSample ? formatPercentage(overallSuccessRate) : "--"}
                  </p>
                  <span className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${toneClasses}`}>
                    {performanceRead.label}
                  </span>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">{performanceRead.description}</p>
              </div>
            </div>

            <div className="mt-8">
              <div className="relative pt-11">
                <div className="absolute top-0 -translate-x-1/2" style={{ left: `${markerPosition}%` }}>
                  <div className={`rounded-full border px-2.5 py-1 text-xs font-semibold shadow-lg ${markerClasses}`}>
                    {hasSample ? formatPercentage(overallSuccessRate) : "No sample"}
                  </div>
                  <div
                    className={`mx-auto mt-2 h-3.5 w-3.5 rounded-full border-2 border-white shadow-sm ${
                      activeBand?.barClass ?? "bg-orange-400"
                    }`}
                  />
                </div>

                <div className="relative h-4 overflow-hidden rounded-full border border-white/10 bg-slate-950/70">
                  {practicalBands.map((band) => (
                    <div
                      key={band.id}
                      className={`absolute inset-y-0 ${band.barClass}`}
                      style={{
                        left: `${getScalePosition(band.min)}%`,
                        width: `${getScalePosition(band.max) - getScalePosition(band.min)}%`,
                      }}
                    />
                  ))}
                  {scaleReferences.map((reference) => (
                    <span
                      key={reference.id}
                      className={`absolute inset-y-0 w-1 -translate-x-1/2 rounded-full ${reference.markerClass}`}
                      style={{ left: `${getScalePosition(reference.value)}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {scaleReferences.map((reference) => (
                  <span
                    key={reference.id}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/50 px-3 py-1.5 text-xs font-medium text-slate-300"
                  >
                    <span className={`h-2 w-2 rounded-full ${reference.markerClass}`} />
                    {reference.label}
                  </span>
                ))}
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-5">
                {practicalBands.map((band) => {
                  const isActive = hasSample ? isBandActive(band, overallSuccessRate) : false;

                  return (
                    <div
                      key={band.id}
                      className={`rounded-xl border px-3 py-3 text-center ${
                        isActive ? "border-orange-300/25 bg-slate-950/70" : "border-white/10 bg-slate-950/40"
                      }`}
                    >
                      <p className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {band.rangeLabel}
                      </p>
                      <p className={`mt-2 text-sm font-semibold ${isActive ? "text-white" : "text-slate-300"}`}>
                        {band.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            {researchBenchmarks.map((benchmark) => (
              <a
                key={benchmark.id}
                href={benchmark.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-4 transition hover:border-orange-300/25 hover:bg-slate-900/60"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="inline-flex rounded-full border border-orange-200/15 bg-orange-400/10 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-orange-100">
                      {benchmark.methodLabel}
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-white">{benchmark.valueLabel}</p>
                    <p className="mt-1 text-xs leading-6 text-slate-300">{benchmark.summary}</p>
                  </div>

                  <FiExternalLink className="mt-1 h-4 w-4 shrink-0 text-orange-200/80" />
                </div>

                <p className="mt-4 text-xs font-medium text-orange-200/80">{benchmark.sourceLabel}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceResearchContext;
