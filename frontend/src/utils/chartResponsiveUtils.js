export const DEFAULT_VIEWPORT_WIDTH = 1024;
export const COMPACT_BREAKPOINT = 1024;

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

export const getResponsiveTickFont = (isCompactScreen, isTinyScreen) => ({
  size: isTinyScreen ? 9 : isCompactScreen ? 10 : 11,
});

export const getResponsiveTickPadding = (isTinyScreen, compactPadding = 4, defaultPadding = 8) =>
  isTinyScreen ? compactPadding : defaultPadding;

export const getCommonChartOptions = () => ({
  responsive: true,
  maintainAspectRatio: false,
  normalized: true,
  animation: false,
  interaction: {
    intersect: false,
    mode: "index",
  },
});

export const getCommonTooltipOptions = (overrides = {}) => ({
  backgroundColor: "rgba(15, 23, 42, 0.96)",
  borderColor: "rgba(251, 146, 60, 0.28)",
  borderWidth: 1,
  titleColor: "#fdba74",
  bodyColor: "#e2e8f0",
  cornerRadius: 14,
  ...overrides,
});

export const getCommonCategoryScale = ({ labels, isCompactScreen, isTinyScreen, stacked = false }) => ({
  stacked,
  grid: {
    display: false,
    drawBorder: false,
  },
  ticks: {
    color: "rgba(203, 213, 225, 0.8)",
    autoSkip: false,
    maxRotation: 0,
    minRotation: 0,
    padding: getResponsiveTickPadding(isTinyScreen),
    callback: (_, index) => getTickLabel({ labels, index, isCompactScreen, isTinyScreen }),
    font: getResponsiveTickFont(isCompactScreen, isTinyScreen),
  },
  border: {
    display: false,
  },
});
