import { useEffect, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiCheckCircle, FiTarget, FiTrendingUp, FiXCircle } from "react-icons/fi";

import InfoCardGrid from "../components/common/InfoCardGrid";
import RelatedPageLinks from "../components/common/RelatedPageLinks";
import ErrorBox from "../components/errors/ErrorBox";
import LayoutShell from "../components/layout/LayoutShell";
import PerformanceInsightsCard from "../components/performance/PerformanceInsightsCard";
import PerformanceKpiCard from "../components/performance/PerformanceKpiCard";
import PerformanceOverviewChart from "../components/performance/charts/PerformanceOverviewChart";
import PerformanceResearchContext from "../components/performance/PerformanceResearchContext";
import PerformanceTrendChart from "../components/performance/charts/PerformanceTrendChart";
import RoundPerformanceGrid from "../components/performance/rounds/RoundPerformanceGrid";
import ModelPerformanceSkeleton from "../components/skeletons/ModelPerformanceSkeleton";
import {
  formatPercentage,
  normalizeModelPerformanceData,
} from "../components/performance/model/modelPerformanceUtils";
import { useModelPerformance } from "../hooks/useModelPerformance";

const fadeInProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
};

const modelPerformanceLinks = [
  {
    to: "/predictor",
    label: "Run a matchup prediction",
    description: "Use the current model read for a home and away team.",
  },
  {
    to: "/about-jmp-rating",
    label: "Understand JMP Rating",
    description: "Read how the rating supports predictions and team comparison.",
  },
  {
    to: "/",
    label: "Return to standings",
    description: "Compare model results with the current EuroLeague table.",
  },
];

const modelPerformanceInfoCards = [
  {
    eyebrow: "Accuracy tracker",
    title: "What Model Performance Measures",
    description:
      "This page tracks total predictions, correct picks, wrong picks, and success rate for the current season. It turns the predictor into a measurable record, so the model can be judged by results instead of only by individual game forecasts.",
  },
  {
    eyebrow: "Round detail",
    title: "Why Round-by-Round Results Matter",
    description:
      "EuroLeague form changes quickly. Round-level tracking shows whether the model is improving, slipping, or staying steady across the season while also preserving the individual prediction results behind the headline accuracy number.",
  },
];

const ModelPerformanceHeader = ({ performance }) => {
  const badgeItems = [
    {
      label: performance.seasonLabel,
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

const getPerformanceKpiItems = (performance) => [
  {
    label: "Total Predictions",
    value: performance.totalPredictions,
    icon: FiTarget,
    tone: "neutral",
  },
  {
    label: "Correct",
    value: performance.totalCorrect,
    icon: FiCheckCircle,
    tone: "positive",
  },
  {
    label: "Wrong",
    value: performance.totalWrong,
    icon: FiXCircle,
    tone: "negative",
  },
  {
    label: "Success Rate",
    value: formatPercentage(performance.overallSuccessRate),
    icon: FiTrendingUp,
    tone: "accent",
  },
];

const ModelPerformancePageShell = ({ children }) => (
  <LayoutShell contentClassName="max-w-[1600px]">{children}</LayoutShell>
);

const ModelPerformanceContent = ({ children }) => (
  <div className="flex flex-col gap-6 pt-4 text-white">{children}</div>
);

const AnimatedErrorBox = ({ error }) => (
  <motion.div {...fadeInProps}>
    <ErrorBox error={error} />
  </motion.div>
);

const LoadingState = () => (
  <ModelPerformancePageShell>
    <ModelPerformanceSkeleton />
  </ModelPerformancePageShell>
);

const FatalErrorState = ({ performance, error }) => (
  <ModelPerformancePageShell>
    <ModelPerformanceContent>
      <ModelPerformanceHeader performance={performance} />
      <AnimatedErrorBox error={error} />
    </ModelPerformanceContent>
  </ModelPerformancePageShell>
);

const PerformanceKpiSection = ({ items }) => (
  <motion.section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" {...fadeInProps}>
    {items.map((item) => (
      <div key={item.label}>
        <PerformanceKpiCard {...item} />
      </div>
    ))}
  </motion.section>
);

const PerformanceContextSections = () => (
  <>
    <motion.div {...fadeInProps}>
      <InfoCardGrid cards={modelPerformanceInfoCards} />
    </motion.div>

    <motion.div {...fadeInProps}>
      <RelatedPageLinks links={modelPerformanceLinks} ariaLabel="Related model performance pages" />
    </motion.div>
  </>
);

const PerformanceResearchSection = ({ performance }) => (
  <motion.div {...fadeInProps}>
    <PerformanceResearchContext
      overallSuccessRate={performance.overallSuccessRate}
      totalPredictions={performance.totalPredictions}
    />
  </motion.div>
);

const PerformanceChartSections = ({ performance }) => (
  <>
    <PerformanceTrendChart
      rounds={performance.rounds}
      seasonLabel={performance.seasonLabel}
      overallSuccessRate={performance.overallSuccessRate}
      recentSuccessRate={performance.recentSuccessRate}
      recentDeltaVsSeason={performance.recentDeltaVsSeason}
      recentWindowSize={performance.recentWindowRounds.length}
    />

    <section className="grid gap-6 xl:grid-cols-2">
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
  </>
);

const PerformanceRoundDetails = ({
  performance,
  loadingRoundDetailsByRound,
  errorRoundDetailsByRound,
  fetchRoundDetail,
}) => (
  <RoundPerformanceGrid
    rounds={performance.rounds}
    loadingRoundDetailsByRound={loadingRoundDetailsByRound}
    errorRoundDetailsByRound={errorRoundDetailsByRound}
    fetchRoundDetail={fetchRoundDetail}
  />
);

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

  const kpiItems = useMemo(() => getPerformanceKpiItems(performance), [performance]);

  if (loadingModelPerformance && !modelPerformance) {
    return <LoadingState />;
  }

  if (errorModelPerformance && !modelPerformance) {
    return <FatalErrorState performance={performance} error={errorModelPerformance} />;
  }

  return (
    <ModelPerformancePageShell>
      <ModelPerformanceContent>
        <ModelPerformanceHeader performance={performance} />

        {errorModelPerformance ? <AnimatedErrorBox error={errorModelPerformance} /> : null}

        <PerformanceKpiSection items={kpiItems} />
        <PerformanceResearchSection performance={performance} />
        <PerformanceContextSections />
        <PerformanceChartSections performance={performance} />
        <PerformanceRoundDetails
          performance={performance}
          loadingRoundDetailsByRound={loadingModelPerformanceRoundDetailsByRound}
          errorRoundDetailsByRound={errorModelPerformanceRoundDetailsByRound}
          fetchRoundDetail={fetchCurrentModelPerformanceRoundDetail}
        />
      </ModelPerformanceContent>
    </ModelPerformancePageShell>
  );
};

export default ModelPerformancePage;
