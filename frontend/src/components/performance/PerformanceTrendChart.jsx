import { useEffect, useState } from "react";
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

import { layoutCardClass } from "../layout/LayoutShell";
import { formatPercentage, formatSignedPoints } from "./modelPerformanceUtils";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

const DEFAULT_VIEWPORT_WIDTH = typeof window === "undefined" ? 1024 : window.innerWidth;
const COMPACT_BREAKPOINT = 1024;
const TINY_BREAKPOINT = 420;

const getVisibleLabelStep = (labelCount, isTinyScreen) => {
  if (labelCount <= 6) {
    return 1;
  }

  const desiredVisibleLabels = isTinyScreen ? 4 : 6;
  return Math.max(1, Math.ceil((labelCount - 1) / (desiredVisibleLabels - 1)));
};

const getTickLabel = ({ labels, index, isCompactScreen, isTinyScreen }) => {
  if (!isCompactScreen) {
    return labels[index];
  }

  const lastIndex = labels.length - 1;
  const visibleStep = getVisibleLabelStep(labels.length, isTinyScreen);

  if (index === 0 || index === lastIndex || index % visibleStep === 0) {
    return labels[index];
  }

  return "";
};

const PerformanceTrendChart = ({
  rounds = [],
  seasonLabel = "",
  overallSuccessRate = 0,
  recentSuccessRate = 0,
  recentDeltaVsSeason = 0,
  recentWindowSize = 0,
}) => {
  const [viewportWidth, setViewportWidth] = useState(DEFAULT_VIEWPORT_WIDTH);
  const latestRoundEntry = rounds.length > 0 ? rounds[rounds.length - 1] : null;

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (rounds.length === 0) {
    return (
      <section className={`${layoutCardClass} overflow-hidden`}>
        <div className="flex min-h-[320px] items-center justify-center px-6 py-10 text-center text-sm text-slate-300">
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
    responsive: true,
    maintainAspectRatio: false,
    normalized: true,
    animation: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
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
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.96)",
        borderColor: "rgba(251, 146, 60, 0.28)",
        borderWidth: 1,
        titleColor: "#fdba74",
        bodyColor: "#e2e8f0",
        padding: 12,
        cornerRadius: 14,
        callbacks: {
          title: (items) => {
            const dataIndex = items[0]?.dataIndex ?? 0;
            return rounds[dataIndex]?.label ?? "";
          },
          label: (context) => {
            if (context.dataset.yAxisID === "yPercent") {
              return `Success Rate: ${formatPercentage(context.parsed.y)}`;
            }

            return `${context.dataset.label}: ${context.parsed.y} picks`;
          },
          afterBody: (items) => {
            const dataIndex = items[0]?.dataIndex ?? 0;
            const round = rounds[dataIndex];

            if (!round) {
              return [];
            }

            return [`Total Predictions: ${round.totalPredictions}`];
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "rgba(203, 213, 225, 0.8)",
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          padding: isTinyScreen ? 4 : 8,
          callback: (_, index) => getTickLabel({ labels, index, isCompactScreen, isTinyScreen }),
          font: {
            size: isTinyScreen ? 9 : isCompactScreen ? 10 : 11,
          },
        },
        border: {
          display: false,
        },
      },
      yPicks: {
        stacked: true,
        position: "left",
        grid: {
          color: "rgba(148, 163, 184, 0.10)",
          drawBorder: false,
        },
        ticks: {
          color: "rgba(226, 232, 240, 0.76)",
          padding: isTinyScreen ? 6 : 10,
          stepSize: 1,
          maxTicksLimit: isTinyScreen ? 5 : 7,
          font: {
            size: isTinyScreen ? 9 : isCompactScreen ? 10 : 11,
          },
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
          padding: isTinyScreen ? 6 : 10,
          maxTicksLimit: isTinyScreen ? 5 : 6,
          callback: (value) => `${value}%`,
          font: {
            size: isTinyScreen ? 9 : isCompactScreen ? 10 : 11,
          },
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-300/80">Trend Analysis</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Round-by-Round Success Rate</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              {seasonLabel} performance with correct and wrong picks stacked by round, with the orange line tracking
              success rate over time.
            </p>
          </div>

          <div className={`grid gap-3 ${recentWindowSize > 0 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            <div className="rounded-2xl border border-orange-300/20 bg-slate-900/40 px-4 py-3">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-orange-200/80">Overall</p>
              <p className="mt-2 text-2xl font-semibold text-white">{formatPercentage(overallSuccessRate)}</p>
            </div>

            {recentWindowSize > 0 ? (
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Last {recentWindowSize} Rounds
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">{formatPercentage(recentSuccessRate)}</p>
                <p className="mt-1 text-sm text-slate-300">{formatSignedPoints(recentDeltaVsSeason)} pts vs season</p>
              </div>
            ) : null}

            <div className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-400">Latest Round</p>
              <p className="mt-2 text-2xl font-semibold text-white">{latestRoundEntry?.shortLabel ?? "-"}</p>
              <p className="mt-1 text-sm text-slate-300">
                {latestRoundEntry ? formatPercentage(latestRoundEntry.successRate) : "No samples yet"}
              </p>
            </div>
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
