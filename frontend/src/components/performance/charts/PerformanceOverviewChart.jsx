import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { layoutCardClass } from "../../layout/LayoutShell";
import { formatPercentage } from "../model/modelPerformanceUtils";

ChartJS.register(ArcElement, Tooltip, Legend);

const EMPTY_MESSAGE = "Overall accuracy will appear here once prediction samples are available.";

const statToneClasses = {
  correct: {
    card: "border-emerald-400/20",
    value: "text-emerald-100",
    badge: "border-emerald-400/20 text-emerald-100",
    bar: "bg-emerald-400",
  },
  wrong: {
    card: "border-rose-400/20",
    value: "text-rose-100",
    badge: "border-rose-400/20 text-rose-100",
    bar: "bg-rose-400",
  },
};

const getWrongRate = (overallSuccessRate) => Math.max(0, 100 - overallSuccessRate);

const getOverviewChartData = ({ totalCorrect, totalWrong }) => ({
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
});

const getOverviewChartOptions = (totalPredictions) => ({
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
});

const EmptyOverviewChart = () => (
  <section className={`${layoutCardClass} overflow-hidden`}>
    <div className="flex min-h-80 items-center justify-center px-6 py-10 text-center text-sm text-slate-300">
      {EMPTY_MESSAGE}
    </div>
  </section>
);

const OverviewChartHeader = () => (
  <div className="border-b border-white/10 pb-5">
    <h2 className="text-2xl font-semibold text-white">Correct vs Wrong Picks</h2>
  </div>
);

const OverviewStatCard = ({ label, value, rate, tone }) => {
  const toneClasses = statToneClasses[tone];

  return (
    <div className={`rounded-2xl border bg-slate-900/40 px-4 py-4 ${toneClasses.card}`}>
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-300">{label}</p>
          <p className={`mt-1 text-xl font-semibold ${toneClasses.value}`}>{value}</p>
        </div>
        <span className={`rounded-full border bg-slate-950/60 px-3 py-1.5 text-sm font-semibold ${toneClasses.badge}`}>
          {formatPercentage(rate)}
        </span>
      </div>

      <div className="mt-2 h-2 w-full rounded-full bg-white/10">
        <div className={`h-full rounded-full ${toneClasses.bar}`} style={{ width: `${rate}%` }} />
      </div>
    </div>
  );
};

const OverviewStatsGrid = ({ totalCorrect, totalWrong, overallSuccessRate, wrongRate }) => (
  <div className="mt-3 grid w-full grid-cols-1 sm:grid-cols-2 gap-3">
    <OverviewStatCard label="Correct" value={totalCorrect} rate={overallSuccessRate} tone="correct" />
    <OverviewStatCard label="Wrong" value={totalWrong} rate={wrongRate} tone="wrong" />
  </div>
);

const OverviewChartPanel = ({ data, options, totalCorrect, totalWrong, overallSuccessRate, wrongRate }) => (
  <div className="mx-auto flex w-full flex-col items-center rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3">
    <div className="h-60 w-full">
      <Doughnut data={data} options={options} aria-label="Overall correct versus wrong predictions" role="img" />
    </div>

    <OverviewStatsGrid
      totalCorrect={totalCorrect}
      totalWrong={totalWrong}
      overallSuccessRate={overallSuccessRate}
      wrongRate={wrongRate}
    />
  </div>
);

const PerformanceOverviewChart = ({
  totalCorrect = 0,
  totalWrong = 0,
  totalPredictions = 0,
  overallSuccessRate = 0,
}) => {
  if (totalPredictions <= 0) {
    return <EmptyOverviewChart />;
  }

  const wrongRate = getWrongRate(overallSuccessRate);
  const data = getOverviewChartData({ totalCorrect, totalWrong });
  const options = getOverviewChartOptions(totalPredictions);

  return (
    <section className={`${layoutCardClass} overflow-hidden`}>
      <div className="flex w-auto h-full flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6">
        <OverviewChartHeader />

        <div>
          <OverviewChartPanel
            data={data}
            options={options}
            totalCorrect={totalCorrect}
            totalWrong={totalWrong}
            overallSuccessRate={overallSuccessRate}
            wrongRate={wrongRate}
          />
        </div>
      </div>
    </section>
  );
};

export default PerformanceOverviewChart;
