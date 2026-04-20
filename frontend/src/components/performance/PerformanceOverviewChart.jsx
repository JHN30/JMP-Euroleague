import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { layoutCardClass } from "../layout/LayoutShell";
import { formatPercentage } from "./modelPerformanceUtils";

ChartJS.register(ArcElement, Tooltip, Legend);

const PerformanceOverviewChart = ({
  totalCorrect = 0,
  totalWrong = 0,
  totalPredictions = 0,
  overallSuccessRate = 0,
}) => {
  const wrongRate = Math.max(0, 100 - overallSuccessRate);

  if (totalPredictions <= 0) {
    return (
      <section className={`${layoutCardClass} overflow-hidden`}>
        <div className="flex min-h-[320px] items-center justify-center px-6 py-10 text-center text-sm text-slate-300">
          Overall accuracy will appear here once prediction samples are available.
        </div>
      </section>
    );
  }

  const data = {
    labels: ["Correct", "Wrong"],
    datasets: [
      {
        data: [totalCorrect, totalWrong],
        backgroundColor: ["rgba(16, 185, 129, 0.86)", "rgba(244, 63, 94, 0.76)"],
        borderColor: ["#6ee7b7", "#fda4af"],
        borderWidth: 1.2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
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
          label: (context) => {
            const rawValue = Number(context.raw) || 0;
            const percentage = totalPredictions > 0 ? (rawValue / totalPredictions) * 100 : 0;
            return `${context.label}: ${rawValue} picks (${formatPercentage(percentage)})`;
          },
        },
      },
    },
  };

  return (
    <section className={`${layoutCardClass} overflow-hidden`}>
      <div className="flex h-full flex-col gap-5 px-4 py-4 sm:px-6 sm:py-6">
        <div className="border-b border-white/10 pb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-300/80">Overview</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Correct vs Wrong Picks</h2>
          <p className="mt-2 text-sm text-slate-300">
            Distribution on the left, headline performance numbers on the right.
          </p>
        </div>

        <div className="grid flex-1 gap-6 lg:grid-cols-[minmax(240px,300px)_minmax(0,1fr)] lg:items-center">
          <div className="mx-auto flex w-full max-w-[300px] flex-col items-center rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-5">
            <div className="h-[240px] w-full">
              <Doughnut data={data} options={options} aria-label="Overall correct versus wrong predictions" role="img" />
            </div>

            <div className="mt-4 grid w-full grid-cols-2 gap-3">
              <div className="rounded-xl border border-emerald-400/20 bg-slate-950/60 px-3 py-3 text-center">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-slate-400">Correct</p>
                <p className="mt-2 text-lg font-semibold text-emerald-100">{formatPercentage(overallSuccessRate)}</p>
              </div>

              <div className="rounded-xl border border-rose-400/20 bg-slate-950/60 px-3 py-3 text-center">
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-slate-400">Wrong</p>
                <p className="mt-2 text-lg font-semibold text-rose-100">{formatPercentage(wrongRate)}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-orange-300/20 bg-slate-900/40 px-5 py-5">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-orange-200/80">Accuracy Snapshot</p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-4xl font-black leading-none text-white">{formatPercentage(overallSuccessRate)}</p>
                  <p className="mt-2 text-sm text-slate-300">Overall model hit rate across all recorded picks.</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-slate-400">Total Picks</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{totalPredictions}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-400/20 bg-slate-900/40 px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-300">Correct</p>
                    <p className="mt-2 text-2xl font-semibold text-emerald-100">{totalCorrect}</p>
                  </div>
                  <span className="rounded-full border border-emerald-400/20 bg-slate-950/60 px-3 py-1.5 text-sm font-semibold text-emerald-100">
                    {formatPercentage(overallSuccessRate)}
                  </span>
                </div>

                <div className="mt-4 h-2.5 w-full rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-emerald-400" style={{ width: `${overallSuccessRate}%` }} />
                </div>
              </div>

              <div className="rounded-2xl border border-rose-400/20 bg-slate-900/40 px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-300">Wrong</p>
                    <p className="mt-2 text-2xl font-semibold text-rose-100">{totalWrong}</p>
                  </div>
                  <span className="rounded-full border border-rose-400/20 bg-slate-950/60 px-3 py-1.5 text-sm font-semibold text-rose-100">
                    {formatPercentage(wrongRate)}
                  </span>
                </div>

                <div className="mt-4 h-2.5 w-full rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-rose-400" style={{ width: `${wrongRate}%` }} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-4 text-sm text-slate-300">
              The doughnut shows how all predictions split between correct and wrong picks across the full sample.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceOverviewChart;
