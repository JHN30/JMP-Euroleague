import ModelPerformance from "../models/modelPerformance.model.js";

const getModelLabel = (modelKey) => String(modelKey).replace(/[_-]+/g, " ").trim();

const calculateSuccessRate = (correct, totalPlayed) => {
  if (!totalPlayed) {
    return 0;
  }

  return correct / totalPlayed;
};

const parseBooleanFlag = (value) => value === true || value === "true";

const normalizeImportRounds = (rounds = []) => {
  const baseRounds = rounds
    .map((round) => ({
      roundNumber: Number(round.roundNumber ?? round.round),
      correct: Number(round.correct),
      wrong: Number(round.wrong),
    }))
    .sort((firstRound, secondRound) => firstRound.roundNumber - secondRound.roundNumber);

  let runningCorrect = 0;
  let runningWrong = 0;

  const normalizedRounds = baseRounds.map((round) => {
    const totalPlayed = round.correct + round.wrong;
    const successRate = calculateSuccessRate(round.correct, totalPlayed);

    runningCorrect += round.correct;
    runningWrong += round.wrong;

    const runningPlayed = runningCorrect + runningWrong;
    const totalSuccessRate = calculateSuccessRate(runningCorrect, runningPlayed);

    return {
      roundNumber: round.roundNumber,
      correct: round.correct,
      wrong: round.wrong,
      successRate,
      totalCorrect: runningCorrect,
      totalWrong: runningWrong,
      totalPlayed: runningPlayed,
      totalSuccessRate,
    };
  });

  return {
    rounds: normalizedRounds,
    latestRound: normalizedRounds.length > 0 ? normalizedRounds[normalizedRounds.length - 1].roundNumber : 0,
    totalCorrect: runningCorrect,
    totalWrong: runningWrong,
    totalPlayed: runningCorrect + runningWrong,
    overallSuccessRate: calculateSuccessRate(runningCorrect, runningCorrect + runningWrong),
  };
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

const buildImportResponse = (modelPerformance) => ({
  id: modelPerformance._id?.toString?.() ?? String(modelPerformance._id),
  seasonLabel: modelPerformance.seasonLabel,
  modelKey: modelPerformance.modelKey,
  modelLabel: modelPerformance.modelLabel || getModelLabel(modelPerformance.modelKey),
  sourceFileName: modelPerformance.sourceFileName || "",
  isActive: Boolean(modelPerformance.isActive),
  latestRound: modelPerformance.latestRound,
  totalCorrect: modelPerformance.totalCorrect,
  totalWrong: modelPerformance.totalWrong,
  totalPlayed: modelPerformance.totalPlayed,
  overallSuccessRate: modelPerformance.overallSuccessRate,
  updatedAt: modelPerformance.updatedAt,
  rounds: buildRoundResponses(modelPerformance.rounds),
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

export const importModelPerformance = async (req, res) => {
  try {
    const { seasonLabel, modelKey, modelLabel, sourceFileName, isActive, makeActive, rounds } = req.body;

    if (!seasonLabel || !modelKey) {
      return res.status(400).json({ success: false, message: "seasonLabel and modelKey are required" });
    }

    if (!Array.isArray(rounds) || rounds.length === 0) {
      return res.status(400).json({ success: false, message: "rounds must be a non-empty array" });
    }

    const normalizedImport = normalizeImportRounds(rounds);
    const trimmedSeasonLabel = String(seasonLabel).trim();
    const trimmedModelKey = String(modelKey).trim();
    const trimmedModelLabel = String(modelLabel || "").trim() || getModelLabel(trimmedModelKey);
    const trimmedSourceFileName = String(sourceFileName || "").trim();
    const hasExplicitIsActive = isActive !== undefined;
    const hasLegacyMakeActive = makeActive !== undefined;

    const existingRecord = await ModelPerformance.findOne({
      seasonLabel: trimmedSeasonLabel,
      modelKey: trimmedModelKey,
    }).select("_id isActive");

    const resolvedIsActive = hasExplicitIsActive
      ? parseBooleanFlag(isActive)
      : hasLegacyMakeActive
        ? parseBooleanFlag(makeActive)
        : Boolean(existingRecord?.isActive);

    const savedModelPerformance = await ModelPerformance.findOneAndUpdate(
      { seasonLabel: trimmedSeasonLabel, modelKey: trimmedModelKey },
      {
        $set: {
          seasonLabel: trimmedSeasonLabel,
          modelKey: trimmedModelKey,
          modelLabel: trimmedModelLabel,
          sourceFileName: trimmedSourceFileName,
          isActive: resolvedIsActive,
          rounds: normalizedImport.rounds,
          latestRound: normalizedImport.latestRound,
          totalCorrect: normalizedImport.totalCorrect,
          totalWrong: normalizedImport.totalWrong,
          totalPlayed: normalizedImport.totalPlayed,
          overallSuccessRate: normalizedImport.overallSuccessRate,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    ).lean();

    if (resolvedIsActive) {
      await ModelPerformance.updateMany(
        { _id: { $ne: savedModelPerformance._id }, isActive: true },
        { $set: { isActive: false } }
      );
    }

    const refreshedModelPerformance = await ModelPerformance.findById(savedModelPerformance._id).lean();

    return res.status(existingRecord ? 200 : 201).json({
      success: true,
      message: existingRecord ? "Model performance updated successfully" : "Model performance imported successfully",
      data: buildImportResponse(refreshedModelPerformance),
    });
  } catch (error) {
    console.log("Error in importModelPerformance:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
