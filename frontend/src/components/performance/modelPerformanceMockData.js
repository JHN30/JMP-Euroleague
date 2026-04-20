const roundWinCounts = [
  7, 6, 7, 5, 7, 8, 6, 6, 7, 5, 6, 6, 7, 6, 8, 6, 5,
  7, 6, 6, 7, 6, 8, 6, 6, 7, 6, 5, 7, 8, 6, 7, 7, 8,
];

export const modelPerformanceMockData = {
  seasonLabel: "EuroLeague 2025/26",
  updatedAt: "2026-04-18",
  rounds: roundWinCounts.map((correct, index) => ({
    roundNumber: index + 1,
    correct,
    wrong: 10 - correct,
  })),
};

export default modelPerformanceMockData;
