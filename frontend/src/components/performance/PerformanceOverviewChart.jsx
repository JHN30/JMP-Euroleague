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
        <div className="flex min-h-80 items-center justify-center px-6 py-10 text-center text-sm text-slate-300">
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
    layout: {
      padding: 6,
    },
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
      <div className="flex w-auto h-full flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6">
        <div className="border-b border-white/10 pb-5">
          <h2 className="text-2xl font-semibold text-white">Correct vs Wrong Picks</h2>
        </div>

        <div>
          <div className="mx-auto flex w-full flex-col items-center rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3">
            <div className="h-60 w-full">
              <Doughnut
                data={data}
                options={options}
                aria-label="Overall correct versus wrong predictions"
                role="img"
              />
            </div>

            <div className="mt-3 grid w-full grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Correct Picks */}
              <div className="rounded-2xl border border-emerald-400/20 bg-slate-900/40 px-4 py-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-300">Correct</p>
                    <p className="mt-1 text-xl font-semibold text-emerald-100">{totalCorrect}</p>
                  </div>
                  <span className="rounded-full border border-emerald-400/20 bg-slate-950/60 px-3 py-1.5 text-sm font-semibold text-emerald-100">
                    {formatPercentage(overallSuccessRate)}
                  </span>
                </div>

                <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-emerald-400" style={{ width: `${overallSuccessRate}%` }} />
                </div>
              </div>

              {/* Wrong Picks */}
              <div className="rounded-2xl border border-rose-400/20 bg-slate-900/40 px-4 py-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-300">Wrong</p>
                    <p className="mt-1 text-xl font-semibold text-rose-100">{totalWrong}</p>
                  </div>
                  <span className="rounded-full border border-rose-400/20 bg-slate-950/60 px-3 py-1.5 text-sm font-semibold text-rose-100">
                    {formatPercentage(wrongRate)}
                  </span>
                </div>

                <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-rose-400" style={{ width: `${wrongRate}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceOverviewChart;
