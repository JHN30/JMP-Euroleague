import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import useViewportWidth from "../../../hooks/useViewportWidth";
import {
  COMPACT_BREAKPOINT,
  DEFAULT_VIEWPORT_WIDTH,
  getCommonCategoryScale,
  getCommonChartOptions,
  getCommonTooltipOptions,
  getResponsiveTickFont,
  getResponsiveTickPadding,
} from "../../../utils/chartResponsiveUtils";
import { layoutCardClass } from "../../layout/LayoutShell";
import { formatPercentage } from "../model/modelPerformanceUtils";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

const TINY_BREAKPOINT = 420;
const EMPTY_MESSAGE = "Round-level performance data is not available yet.";

const getTrendChartSettings = (viewportWidth) => {
  const isCompactScreen = viewportWidth <= COMPACT_BREAKPOINT;
  const isTinyScreen = viewportWidth <= TINY_BREAKPOINT;
  const chartHeightClassName = isTinyScreen ? "h-[300px]" : isCompactScreen ? "h-[360px]" : "h-[420px]";

  return {
    isCompactScreen,
    isTinyScreen,
    chartHeightClassName,
    barThickness: isTinyScreen ? 16 : 24,
    lineBorderWidth: isTinyScreen ? 2 : 3,
    legendPadding: isTinyScreen ? 12 : 18,
    legendFontSize: isTinyScreen ? 10 : 12,
    pointRadius: isCompactScreen ? 0 : 2.5,
    pointHoverRadius: isCompactScreen ? 4 : 5,
    pointHitRadius: isCompactScreen ? 12 : 14,
  };
};

const getRoundLabels = (rounds) => rounds.map((round) => round.shortLabel);

const getBarDataset = ({ label, data, backgroundColor, borderColor, maxBarThickness }) => ({
  type: "bar",
  label,
  data,
  yAxisID: "yPicks",
  stack: "results",
  backgroundColor,
  borderColor,
  borderWidth: 1,
  borderRadius: 10,
  borderSkipped: false,
  maxBarThickness,
  order: 2,
});

const getSuccessRateDataset = ({ rounds, settings }) => ({
  type: "line",
  label: "Success Rate",
  data: rounds.map((round) => round.successRate),
  yAxisID: "yPercent",
  borderColor: "#f97316",
  backgroundColor: "rgba(249, 115, 22, 0.18)",
  borderWidth: settings.lineBorderWidth,
  tension: 0.28,
  pointRadius: settings.pointRadius,
  pointHoverRadius: settings.pointHoverRadius,
  pointHitRadius: settings.pointHitRadius,
  pointBackgroundColor: "#fdba74",
  pointBorderColor: "#fff7ed",
  pointBorderWidth: 1.25,
  fill: false,
  order: 1,
});

const getTrendChartData = ({ rounds, labels, settings }) => ({
  labels,
  datasets: [
    getBarDataset({
      label: "Correct",
      data: rounds.map((round) => round.correct),
      backgroundColor: "rgba(16, 185, 129, 0.82)",
      borderColor: "#6ee7b7",
      maxBarThickness: settings.barThickness,
    }),
    getBarDataset({
      label: "Wrong",
      data: rounds.map((round) => round.wrong),
      backgroundColor: "rgba(244, 63, 94, 0.72)",
      borderColor: "#fda4af",
      maxBarThickness: settings.barThickness,
    }),
    getSuccessRateDataset({ rounds, settings }),
  ],
});

const getTrendTooltipOptions = (rounds) =>
  getCommonTooltipOptions({
    padding: 12,
    callbacks: {
      title: (items) => {
        const dataIndex = items[0]?.dataIndex ?? 0;
        return rounds[dataIndex]?.label ?? "";
      },
      label: (context) => {
        if (context.dataset.yAxisID === "yPercent") {
          return `Success Rate: ${formatPercentage(context.parsed.y)}`;
        }

        return `${context.dataset.label}: ${context.parsed.y}`;
      },
    },
  });

const getLegendOptions = (settings) => ({
  position: "bottom",
  labels: {
    color: "#cbd5e1",
    usePointStyle: true,
    boxWidth: 8,
    boxHeight: 8,
    padding: settings.legendPadding,
    font: {
      size: settings.legendFontSize,
    },
  },
});

const getPicksAxisOptions = (settings) => ({
  stacked: true,
  position: "left",
  grid: {
    color: "rgba(148, 163, 184, 0.10)",
    drawBorder: false,
  },
  ticks: {
    color: "rgba(226, 232, 240, 0.76)",
    padding: getResponsiveTickPadding(settings.isTinyScreen, 6, 10),
    stepSize: 1,
    maxTicksLimit: settings.isTinyScreen ? 5 : 7,
    font: getResponsiveTickFont(settings.isCompactScreen, settings.isTinyScreen),
  },
  suggestedMax: 10,
  border: {
    display: false,
  },
});

const getPercentAxisOptions = (settings) => ({
  position: "right",
  min: 0,
  max: 100,
  grid: {
    drawOnChartArea: false,
    drawBorder: false,
  },
  ticks: {
    color: "rgba(251, 191, 36, 0.9)",
    padding: getResponsiveTickPadding(settings.isTinyScreen, 6, 10),
    maxTicksLimit: settings.isTinyScreen ? 5 : 6,
    callback: (value) => `${value}%`,
    font: getResponsiveTickFont(settings.isCompactScreen, settings.isTinyScreen),
  },
  border: {
    display: false,
  },
});

const getTrendChartOptions = ({ labels, rounds, settings }) => ({
  ...getCommonChartOptions(),
  plugins: {
    legend: getLegendOptions(settings),
    tooltip: getTrendTooltipOptions(rounds),
  },
  scales: {
    x: getCommonCategoryScale({
      labels,
      isCompactScreen: settings.isCompactScreen,
      isTinyScreen: settings.isTinyScreen,
      stacked: true,
    }),
    yPicks: getPicksAxisOptions(settings),
    yPercent: getPercentAxisOptions(settings),
  },
});

const EmptyTrendChart = () => (
  <section className={`${layoutCardClass} overflow-hidden`}>
    <div className="flex min-h-80 items-center justify-center px-6 py-10 text-center text-sm text-slate-300">
      {EMPTY_MESSAGE}
    </div>
  </section>
);

const TrendMetricCard = ({ label, value, variant = "neutral" }) => {
  const cardClassName =
    variant === "highlight"
      ? "rounded-2xl border border-orange-300/20 bg-slate-900/40 px-4 py-3"
      : "rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3";
  const labelClassName = variant === "highlight" ? "text-orange-200/80" : "text-slate-400";

  return (
    <div className={cardClassName}>
      <p className={`text-[0.55rem] font-semibold uppercase tracking-[0.2em] ${labelClassName}`}>{label}</p>
      <p className="mt-1 text-xl font-semibold text-white">{formatPercentage(value)}</p>
    </div>
  );
};

const TrendChartHeader = ({ seasonLabel, overallSuccessRate, recentSuccessRate, recentWindowSize }) => (
  <div className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <h2 className="text-2xl font-semibold text-white">Round-by-Round Success Rate</h2>
      <p className="mt-2 max-w-2xl text-sm text-slate-300">
        {seasonLabel} performance with correct and wrong picks stacked by round.
      </p>
    </div>

    <div className="grid gap-3 sm:grid-cols-2">
      <TrendMetricCard label="Overall" value={overallSuccessRate} variant="highlight" />

      {recentWindowSize > 0 ? (
        <TrendMetricCard label={`Last ${recentWindowSize} Rounds`} value={recentSuccessRate} />
      ) : null}
    </div>
  </div>
);

const PerformanceTrendChart = ({
  rounds = [],
  seasonLabel = "",
  overallSuccessRate = 0,
  recentSuccessRate = 0,
  recentWindowSize = 0,
}) => {
  const viewportWidth = useViewportWidth(DEFAULT_VIEWPORT_WIDTH);

  if (rounds.length === 0) {
    return <EmptyTrendChart />;
  }

  const settings = getTrendChartSettings(viewportWidth);
  const labels = getRoundLabels(rounds);
  const data = getTrendChartData({ rounds, labels, settings });
  const options = getTrendChartOptions({ labels, rounds, settings });

  return (
    <section className={`${layoutCardClass} overflow-hidden`}>
      <div className="flex flex-col gap-5 px-4 py-4 sm:px-6 sm:py-6">
        <TrendChartHeader
          seasonLabel={seasonLabel}
          overallSuccessRate={overallSuccessRate}
          recentSuccessRate={recentSuccessRate}
          recentWindowSize={recentWindowSize}
        />

        <div className={`relative ${settings.chartHeightClassName}`}>
          <Bar data={data} options={options} aria-label="Model performance by round" role="img" />
        </div>
      </div>
    </section>
  );
};

export default PerformanceTrendChart;
