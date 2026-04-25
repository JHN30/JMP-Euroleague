import { useEffect, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiCheckCircle, FiTarget, FiTrendingUp, FiXCircle } from "react-icons/fi";

import ErrorBox from "../components/errors/ErrorBox";
import LayoutShell from "../components/layout/LayoutShell";
import PerformanceInsightsCard from "../components/performance/PerformanceInsightsCard";
import PerformanceKpiCard from "../components/performance/PerformanceKpiCard";
import PerformanceOverviewChart from "../components/performance/PerformanceOverviewChart";
import PerformanceResearchContext from "../components/performance/PerformanceResearchContext";
import PerformanceTrendChart from "../components/performance/PerformanceTrendChart";
import RoundPerformanceGrid from "../components/performance/RoundPerformanceGrid";
import ModelPerformanceSkeleton from "../components/skeletons/ModelPerformanceSkeleton";
import {
  formatPercentage,
  normalizeModelPerformanceData,
} from "../components/performance/modelPerformanceUtils";
import { useModelPerformance } from "../hooks/useModelPerformance";

const fadeInProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
};

const ModelPerformanceHeader = ({ performance }) => {
  const badgeItems = [
    {
      label: performance.seasonLabel,
      className: "border-white/10 bg-slate-900/40 text-slate-200",
    },
    {
      label: `Updated ${performance.updatedAtLabel}`,
      className: "border-white/10 bg-slate-900/40 text-slate-200",
    },
    {
      label: performance.latestRound ? `Through Round ${performance.latestRound}` : "No rounds tracked yet",
      className: "border-orange-300/20 bg-slate-900/40 text-orange-100",
    },
  ];

  return (
    <motion.header className="flex flex-col items-center justify-center gap-3 text-center" {...fadeInProps}>
      <p className="text-sm font-semibold uppercase tracking-wider text-orange-400/90">
        JMP Model Performance
      </p>
      <h1 className="text-3xl font-bold leading-tight text-slate-100">
        Check out how the model is doing this season
      </h1>

      <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
        {badgeItems.map((item) => (
          <span key={item.label} className={`rounded-full border px-4 py-2 text-sm font-medium ${item.className}`}>
            {item.label}
          </span>
        ))}
      </div>
    </motion.header>
  );
};

const ModelPerformancePage = () => {
  const {
    modelPerformance,
    modelPerformanceRoundDetailsByRound,
    loadingModelPerformance,
    loadingModelPerformanceRoundDetailsByRound,
    errorModelPerformance,
    errorModelPerformanceRoundDetailsByRound,
    fetchCurrentModelPerformance,
    fetchCurrentModelPerformanceRoundDetail,
  } = useModelPerformance();

  useEffect(() => {
    fetchCurrentModelPerformance();
  }, [fetchCurrentModelPerformance]);

  const performance = useMemo(
    () =>
      normalizeModelPerformanceData(modelPerformance ?? {}, {
        roundDetailsByRound: modelPerformanceRoundDetailsByRound,
      }),
    [modelPerformance, modelPerformanceRoundDetailsByRound]
  );

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

  if (loadingModelPerformance && !modelPerformance) {
    return (
      <LayoutShell contentClassName="max-w-[1600px]">
        <ModelPerformanceSkeleton />
      </LayoutShell>
    );
  }

  if (errorModelPerformance && !modelPerformance) {
    return (
      <LayoutShell contentClassName="max-w-[1600px]">
        <div className="flex flex-col gap-6 pt-4 text-white">
          <ModelPerformanceHeader performance={performance} />
          <motion.div {...fadeInProps}>
            <ErrorBox error={errorModelPerformance} />
          </motion.div>
        </div>
      </LayoutShell>
    );
  }

  return (
    <LayoutShell contentClassName="max-w-[1600px]">
      <div className="flex flex-col gap-6 pt-4 text-white">
        <ModelPerformanceHeader performance={performance} />

        {errorModelPerformance ? (
          <motion.div {...fadeInProps}>
            <ErrorBox error={errorModelPerformance} />
          </motion.div>
        ) : null}

        <motion.section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" {...fadeInProps}>
          {kpiItems.map((item) => (
            <div key={item.label}>
              <PerformanceKpiCard {...item} />
            </div>
          ))}
        </motion.section>

        <motion.div {...fadeInProps}>
          <PerformanceResearchContext
            overallSuccessRate={performance.overallSuccessRate}
            totalPredictions={performance.totalPredictions}
            roundCount={performance.rounds.length}
          />
        </motion.div>

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

        <RoundPerformanceGrid
          rounds={performance.rounds}
          loadingRoundDetailsByRound={loadingModelPerformanceRoundDetailsByRound}
          errorRoundDetailsByRound={errorModelPerformanceRoundDetailsByRound}
          fetchRoundDetail={fetchCurrentModelPerformanceRoundDetail}
        />
      </div>
    </LayoutShell>
  );
};

export default ModelPerformancePage;
