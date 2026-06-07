import ModelPerformance from "../models/modelPerformance.model.js";
import ModelPerformanceRoundDetail from "../models/modelPerformanceRoundDetail.model.js";

const getModelLabel = (modelKey) => String(modelKey).replace(/[_-]+/g, " ").trim();

const calculateSuccessRate = (correct, totalPlayed) => {
  if (!totalPlayed) {
    return 0;
  }

  return correct / totalPlayed;
};

const toPositiveRoundNumber = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return null;
  }

  return Math.round(numericValue);
};

const buildRoundResponses = (rounds = []) => {
  let runningCorrect = 0;
  let runningWrong = 0;

  return rounds.map((round) => {
    const correct = Number(round.correct);
    const wrong = Number(round.wrong);
    const roundNumber = Number(round.roundNumber ?? round.round);
    const roundPlayed = correct + wrong;

    runningCorrect += correct;
    runningWrong += wrong;

    const runningPlayed = runningCorrect + runningWrong;

    return {
      round: roundNumber,
      roundNumber,
      correct,
      wrong,
      successRate:
        round.successRate !== undefined ? Number(round.successRate) : calculateSuccessRate(correct, roundPlayed),
      totalCorrect: round.totalCorrect !== undefined ? Number(round.totalCorrect) : runningCorrect,
      totalWrong: round.totalWrong !== undefined ? Number(round.totalWrong) : runningWrong,
      totalPlayed: round.totalPlayed !== undefined ? Number(round.totalPlayed) : runningPlayed,
      totalSuccessRate:
        round.totalSuccessRate !== undefined
          ? Number(round.totalSuccessRate)
          : calculateSuccessRate(runningCorrect, runningPlayed),
    };
  });
};

const buildPublicResponse = (modelPerformance) => ({
  seasonLabel: modelPerformance.seasonLabel,
  modelKey: modelPerformance.modelKey,
  modelLabel: modelPerformance.modelLabel || getModelLabel(modelPerformance.modelKey),
  updatedAt: modelPerformance.updatedAt,
  latestRound: modelPerformance.latestRound,
  totalCorrect: modelPerformance.totalCorrect,
  totalWrong: modelPerformance.totalWrong,
  totalPlayed: modelPerformance.totalPlayed,
  overallSuccessRate: modelPerformance.overallSuccessRate,
  rounds: buildRoundResponses(modelPerformance.rounds),
});

const buildRoundDetailResponse = (modelPerformance, roundDetail) => ({
  seasonLabel: modelPerformance.seasonLabel,
  modelKey: modelPerformance.modelKey,
  modelLabel: modelPerformance.modelLabel || getModelLabel(modelPerformance.modelKey),
  updatedAt: modelPerformance.updatedAt,
  latestRound: modelPerformance.latestRound,
  round: roundDetail.roundNumber,
  roundNumber: roundDetail.roundNumber,
  correct: roundDetail.correct,
  wrong: roundDetail.wrong,
  totalPlayed: roundDetail.totalPlayed,
  successRate: roundDetail.successRate,
  matchups: roundDetail.matchups ?? [],
});

export const getCurrentModelPerformance = async (req, res) => {
  try {
    const modelPerformance = await ModelPerformance.findOne({ isActive: true }).sort({ updatedAt: -1 }).lean();

    if (!modelPerformance) {
      return res.status(404).json({ success: false, message: "No active model performance found" });
    }

    return res.status(200).json({ success: true, data: buildPublicResponse(modelPerformance) });
  } catch (error) {
    console.log("Error in getCurrentModelPerformance:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCurrentModelPerformanceRoundDetail = async (req, res) => {
  try {
    const roundNumber = toPositiveRoundNumber(req.params.roundNumber);

    if (!roundNumber) {
      return res.status(400).json({ success: false, message: "roundNumber must be a positive number" });
    }

    const modelPerformance = await ModelPerformance.findOne({ isActive: true }).sort({ updatedAt: -1 }).lean();

    if (!modelPerformance) {
      return res.status(404).json({ success: false, message: "No active model performance found" });
    }

    const roundDetail = await ModelPerformanceRoundDetail.findOne({
      modelPerformanceId: modelPerformance._id,
      roundNumber,
    }).lean();

    if (!roundDetail) {
      return res.status(404).json({ success: false, message: "Round detail not found" });
    }

    return res.status(200).json({
      success: true,
      data: buildRoundDetailResponse(modelPerformance, roundDetail),
    });
  } catch (error) {
    console.log("Error in getCurrentModelPerformanceRoundDetail:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
