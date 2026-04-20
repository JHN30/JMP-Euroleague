import { useMemo } from "react";
import { FiCheckCircle, FiTarget, FiTrendingUp, FiXCircle } from "react-icons/fi";

import LayoutShell from "../components/layout/LayoutShell";
import PerformanceInsightsCard from "../components/performance/PerformanceInsightsCard";
import PerformanceKpiCard from "../components/performance/PerformanceKpiCard";
import PerformanceOverviewChart from "../components/performance/PerformanceOverviewChart";
import PerformanceResearchContext from "../components/performance/PerformanceResearchContext";
import PerformanceTrendChart from "../components/performance/PerformanceTrendChart";
import RoundPerformanceGrid from "../components/performance/RoundPerformanceGrid";
import modelPerformanceMockData from "../components/performance/modelPerformanceMockData";
import {
  formatPercentage,
  normalizeModelPerformanceData,
} from "../components/performance/modelPerformanceUtils";

const ModelPerformancePage = () => {
  const performance = useMemo(() => normalizeModelPerformanceData(modelPerformanceMockData), []);

  const kpiItems = useMemo(
    () => [
      {
        label: "Total Predictions",
        value: performance.totalPredictions,
        subtext: `${performance.rounds.length} rounds tracked`,
        icon: FiTarget,
        tone: "neutral",
      },
      {
        label: "Correct",
        value: performance.totalCorrect,
        subtext: `${formatPercentage(performance.overallSuccessRate)} hit rate`,
        icon: FiCheckCircle,
        tone: "positive",
      },
      {
        label: "Wrong",
        value: performance.totalWrong,
        subtext: `${formatPercentage(Math.max(0, 100 - performance.overallSuccessRate))} miss rate`,
        icon: FiXCircle,
        tone: "negative",
      },
      {
        label: "Success Rate",
        value: formatPercentage(performance.overallSuccessRate),
        subtext:
          performance.recentWindowRounds.length > 0
            ? `Last ${performance.recentWindowRounds.length}: ${formatPercentage(performance.recentSuccessRate)}`
            : "Waiting for completed rounds",
        icon: FiTrendingUp,
        tone: "accent",
      },
    ],
    [performance]
  );

  return (
    <LayoutShell contentClassName="max-w-[1600px]">
      <div className="flex flex-col gap-6 pt-4 text-white">
        <header className="flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-400/90">JMP Analytics Report</p>
          <h1 className="text-3xl font-bold leading-tight text-slate-100 sm:text-4xl">Model Performance</h1>
          <p className="mx-auto max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            Every round, every pick, and a transparent look at how often the model turns projections into winning
            calls.
          </p>

          <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full border border-white/10 bg-slate-900/40 px-4 py-2 text-sm font-medium text-slate-200">
              {performance.seasonLabel}
            </span>
            <span className="rounded-full border border-white/10 bg-slate-900/40 px-4 py-2 text-sm font-medium text-slate-200">
              Updated {performance.updatedAtLabel}
            </span>
            <span className="rounded-full border border-orange-300/20 bg-slate-900/40 px-4 py-2 text-sm font-medium text-orange-100">
              {performance.latestRound ? `Through Round ${performance.latestRound}` : "No rounds tracked yet"}
            </span>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiItems.map((item) => (
            <PerformanceKpiCard key={item.label} {...item} />
          ))}
        </section>

        <PerformanceResearchContext
          overallSuccessRate={performance.overallSuccessRate}
          totalPredictions={performance.totalPredictions}
          roundCount={performance.rounds.length}
        />

        <PerformanceTrendChart
          rounds={performance.rounds}
          seasonLabel={performance.seasonLabel}
          overallSuccessRate={performance.overallSuccessRate}
          recentSuccessRate={performance.recentSuccessRate}
          recentDeltaVsSeason={performance.recentDeltaVsSeason}
          recentWindowSize={performance.recentWindowRounds.length}
        />

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
          <PerformanceOverviewChart
            totalCorrect={performance.totalCorrect}
            totalWrong={performance.totalWrong}
            totalPredictions={performance.totalPredictions}
            overallSuccessRate={performance.overallSuccessRate}
          />

          <PerformanceInsightsCard
            bestRound={performance.bestRound}
            worstRound={performance.worstRound}
            averageCorrectPicks={performance.averageCorrectPicks}
          />
        </section>

        <RoundPerformanceGrid rounds={performance.rounds} />
      </div>
    </LayoutShell>
  );
};

export default ModelPerformancePage;
