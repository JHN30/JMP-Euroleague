import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const TINY_BREAKPOINT = 360;

const normalizeRatingHistory = (ratingHistory) => {
  if (!Array.isArray(ratingHistory)) {
    return [];
  }

  return ratingHistory.map((value) => {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : null;
  });
};

const buildRoundLabels = (length) =>
  Array.from({ length }, (_, index) => {
    if (index === 0) {
      return "Start";
    }

    return `R${index}`;
  });

const formatRatingValue = (value) => {
  if (!Number.isFinite(value)) {
    return "0";
  }

  const roundedValue = Math.round(value);
  return Math.abs(value - roundedValue) < 0.01 ? roundedValue.toString() : value.toFixed(2);
};

const getLatestRating = (history) => {
  for (let index = history.length - 1; index >= 0; index -= 1) {
    if (history[index] !== null) {
      return history[index];
    }
  }

  return 0;
};

const getChartOptions = ({ labels, isCompactScreen, isTinyScreen }) => ({
  ...getCommonChartOptions(),
  resizeDelay: 120,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: getCommonTooltipOptions({
      displayColors: false,
      padding: 10,
      callbacks: {
        title: (items) => items[0]?.label ?? "",
        label: (context) => `Rating: ${formatRatingValue(context.parsed.y)}`,
      },
    }),
  },
  scales: {
    x: getCommonCategoryScale({ labels, isCompactScreen, isTinyScreen }),
    y: {
      grid: {
        color: "rgba(148, 163, 184, 0.10)",
        drawBorder: false,
      },
      ticks: {
        color: "rgba(226, 232, 240, 0.76)",
        padding: getResponsiveTickPadding(isTinyScreen, 6, 10),
        maxTicksLimit: isTinyScreen ? 4 : isCompactScreen ? 5 : 6,
        callback: (value) => formatRatingValue(Number(value)),
        font: getResponsiveTickFont(isCompactScreen, isTinyScreen),
      },
      border: {
        display: false,
      },
    },
  },
});

const RatingGraphCard = ({ ratingHistory = [], teamName = "Team" }) => {
  const viewportWidth = useViewportWidth(DEFAULT_VIEWPORT_WIDTH);
  const normalizedHistory = normalizeRatingHistory(ratingHistory);
  const hasUsableHistory = normalizedHistory.some((value) => value !== null);

  if (!hasUsableHistory) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-6 text-center text-sm text-slate-300">
        No rating history available.
      </div>
    );
  }

  const labels = buildRoundLabels(normalizedHistory.length);
  const latestRating = getLatestRating(normalizedHistory);
  const isCompactScreen = viewportWidth <= COMPACT_BREAKPOINT;
  const isTinyScreen = viewportWidth <= TINY_BREAKPOINT;

  const data = {
    labels,
    datasets: [
      {
        label: "JMP Rating",
        data: normalizedHistory,
        borderColor: "#f97316",
        backgroundColor: "rgba(249, 115, 22, 0.08)",
        borderWidth: isTinyScreen ? 2 : 3,
        fill: true,
        tension: isTinyScreen ? 0.24 : 0.28,
        pointRadius: isCompactScreen ? 0 : 2,
        pointHoverRadius: isCompactScreen ? 4 : 5,
        pointHitRadius: isCompactScreen ? 10 : 12,
        pointBackgroundColor: "#fdba74",
        pointBorderColor: "#fff7ed",
        pointBorderWidth: isCompactScreen ? 1 : 1.25,
        spanGaps: false,
      },
    ],
  };
  const chartOptions = getChartOptions({ labels, isCompactScreen, isTinyScreen });
  const headerClassName = isCompactScreen
    ? "relative flex flex-col items-start gap-3 border-b border-white/10 pb-3"
    : "relative flex items-center justify-between gap-3 border-b border-white/10 pb-4";
  const latestBadgeClassName = isCompactScreen
    ? "w-full rounded-xl border border-orange-300/20 bg-orange-500/10 px-3 py-2 text-left"
    : "rounded-xl border border-orange-300/20 bg-orange-500/10 px-3 py-2 text-right";
  const chartHeightClassName = isTinyScreen ? "h-[220px]" : isCompactScreen ? "h-[250px]" : "h-[300px] sm:h-[360px]";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-3 sm:p-5">
      <div className={headerClassName}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-300/80">Trend</p>
          <h3 className="mt-2 text-base font-semibold text-white sm:text-xl">JMP Rating by Round</h3>
        </div>

        <div className={latestBadgeClassName}>
          <p className="text-[0.65rem] uppercase tracking-[0.25em] text-orange-200/80">Latest</p>
          <p className="mt-1 text-base font-semibold text-white">{formatRatingValue(latestRating)}</p>
        </div>
      </div>

      <div className={`relative mt-4 ${chartHeightClassName} sm:mt-5`}>
        <Line
          data={data}
          options={chartOptions}
          aria-label={`${teamName} JMP rating graph by round`}
          role="img"
        />
      </div>
    </div>
  );
};

export default RatingGraphCard;
