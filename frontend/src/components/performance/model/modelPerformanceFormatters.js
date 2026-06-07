export const formatPercentage = (value) => {
  const numericValue = Number(value);

  return `${Number.isFinite(numericValue) ? numericValue.toFixed(1) : "0.0"}%`;
};

export const getPerformanceRead = (value) => {
  const successRate = Number(value);

  if (!Number.isFinite(successRate)) {
    return {
      label: "No Sample",
      tone: "neutral",
      description: "Add prediction results to see how the model currently stacks up.",
    };
  }

  if (successRate >= 75) {
    return {
      label: "Elite",
      tone: "elite",
      description:
        "This would clear the 73% crowd benchmark and put the model in rare territory for pre-game EuroLeague prediction.",
    };
  }

  if (successRate >= 70) {
    return {
      label: "Very Strong",
      tone: "strong",
      description:
        "This is a very strong EuroLeague hit rate and close to the crowd benchmark suggested by published research.",
    };
  }

  if (successRate >= 65) {
    return {
      label: "Good",
      tone: "good",
      description: "This sits in the competitive high-60s zone reported by realistic unseen-season EuroLeague testing.",
    };
  }

  if (successRate >= 60) {
    return {
      label: "Decent",
      tone: "steady",
      description:
        "This is a respectable starting point, but there is still room to climb toward the stronger high-60s research benchmarks.",
    };
  }

  return {
    label: "Below Target",
    tone: "caution",
    description: "This is still below the level usually associated with a dependable EuroLeague prediction model.",
  };
};

export const formatSignedPoints = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "0.0";
  }

  return `${numericValue > 0 ? "+" : ""}${numericValue.toFixed(1)}`;
};

export const formatRoundLabel = (roundNumber) => `Round ${roundNumber}`;
