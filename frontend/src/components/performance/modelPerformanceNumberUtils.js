export const toSafeNumber = (value, fallback = 0) => {
  const numericValue = Number(value);

  return Number.isFinite(numericValue) ? numericValue : fallback;
};

export const toSafeCount = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return 0;
  }

  return Math.round(numericValue);
};

export const toSafeRoundNumber = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return null;
  }

  return Math.round(numericValue);
};

export const calculateSuccessRate = (correct, totalPredictions) => {
  if (!Number.isFinite(correct) || !Number.isFinite(totalPredictions) || totalPredictions <= 0) {
    return 0;
  }

  return (correct / totalPredictions) * 100;
};
