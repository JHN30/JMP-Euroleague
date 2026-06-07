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

import useViewportWidth from "../../hooks/useViewportWidth";
import {
  COMPACT_BREAKPOINT,
  DEFAULT_VIEWPORT_WIDTH,
  getCommonCategoryScale,
  getCommonChartOptions,
  getCommonTooltipOptions,
  getResponsiveTickFont,
  getResponsiveTickPadding,
} from "../../utils/chartResponsiveUtils";
import { layoutCardClass } from "../layout/LayoutShell";
import { formatPercentage } from "./modelPerformanceUtils";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

const TINY_BREAKPOINT = 420;

const PerformanceTrendChart = ({
  rounds = [],
  seasonLabel = "",
  overallSuccessRate = 0,
  recentSuccessRate = 0,
  recentWindowSize = 0,
}) => {
  const viewportWidth = useViewportWidth(DEFAULT_VIEWPORT_WIDTH);

  if (rounds.length === 0) {
    return (
      <section className={`${layoutCardClass} overflow-hidden`}>
        <div className="flex min-h-80 items-center justify-center px-6 py-10 text-center text-sm text-slate-300">
          Round-level performance data is not available yet.
        </div>
      </section>
    );
  }

  const labels = rounds.map((round) => round.shortLabel);
  const isCompactScreen = viewportWidth <= COMPACT_BREAKPOINT;
  const isTinyScreen = viewportWidth <= TINY_BREAKPOINT;
  const chartHeightClassName = isTinyScreen ? "h-[300px]" : isCompactScreen ? "h-[360px]" : "h-[420px]";

  const data = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Correct",
        data: rounds.map((round) => round.correct),
        yAxisID: "yPicks",
        stack: "results",
        backgroundColor: "rgba(16, 185, 129, 0.82)",
        borderColor: "#6ee7b7",
        borderWidth: 1,
        borderRadius: 10,
        borderSkipped: false,
        maxBarThickness: isTinyScreen ? 16 : 24,
        order: 2,
      },
      {
        type: "bar",
        label: "Wrong",
        data: rounds.map((round) => round.wrong),
        yAxisID: "yPicks",
        stack: "results",
        backgroundColor: "rgba(244, 63, 94, 0.72)",
        borderColor: "#fda4af",
        borderWidth: 1,
        borderRadius: 10,
        borderSkipped: false,
        maxBarThickness: isTinyScreen ? 16 : 24,
        order: 2,
      },
      {
        type: "line",
        label: "Success Rate",
        data: rounds.map((round) => round.successRate),
        yAxisID: "yPercent",
        borderColor: "#f97316",
        backgroundColor: "rgba(249, 115, 22, 0.18)",
        borderWidth: isTinyScreen ? 2 : 3,
        tension: 0.28,
        pointRadius: isCompactScreen ? 0 : 2.5,
        pointHoverRadius: isCompactScreen ? 4 : 5,
        pointHitRadius: isCompactScreen ? 12 : 14,
        pointBackgroundColor: "#fdba74",
        pointBorderColor: "#fff7ed",
        pointBorderWidth: 1.25,
        fill: false,
        order: 1,
      },
    ],
  };

  const options = {
    ...getCommonChartOptions(),
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#cbd5e1",
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
          padding: isTinyScreen ? 12 : 18,
          font: {
            size: isTinyScreen ? 10 : 12,
          },
        },
      },
      tooltip: getCommonTooltipOptions({
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
      }),
    },
    scales: {
      x: getCommonCategoryScale({ labels, isCompactScreen, isTinyScreen, stacked: true }),
      yPicks: {
        stacked: true,
        position: "left",
        grid: {
          color: "rgba(148, 163, 184, 0.10)",
          drawBorder: false,
        },
        ticks: {
          color: "rgba(226, 232, 240, 0.76)",
          padding: getResponsiveTickPadding(isTinyScreen, 6, 10),
          stepSize: 1,
          maxTicksLimit: isTinyScreen ? 5 : 7,
          font: getResponsiveTickFont(isCompactScreen, isTinyScreen),
        },
        suggestedMax: 10,
        border: {
          display: false,
        },
      },
      yPercent: {
        position: "right",
        min: 0,
        max: 100,
        grid: {
          drawOnChartArea: false,
          drawBorder: false,
        },
        ticks: {
          color: "rgba(251, 191, 36, 0.9)",
          padding: getResponsiveTickPadding(isTinyScreen, 6, 10),
          maxTicksLimit: isTinyScreen ? 5 : 6,
          callback: (value) => `${value}%`,
          font: getResponsiveTickFont(isCompactScreen, isTinyScreen),
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <section className={`${layoutCardClass} overflow-hidden`}>
      <div className="flex flex-col gap-5 px-4 py-4 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Round-by-Round Success Rate</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              {seasonLabel} performance with correct and wrong picks stacked by round.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-orange-300/20 bg-slate-900/40 px-4 py-3">
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-orange-200/80">Overall</p>
              <p className="mt-1 text-xl font-semibold text-white">{formatPercentage(overallSuccessRate)}</p>
            </div>

            {recentWindowSize > 0 ? (
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3">
                <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Last {recentWindowSize} Rounds
                </p>
                <p className="mt-1 text-xl font-semibold text-white">{formatPercentage(recentSuccessRate)}</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className={`relative ${chartHeightClassName}`}>
          <Bar data={data} options={options} aria-label="Model performance by round" role="img" />
        </div>
      </div>
    </section>
  );
};

export default PerformanceTrendChart;
