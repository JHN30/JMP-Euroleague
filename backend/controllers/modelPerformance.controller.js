import ModelPerformance from "../models/modelPerformance.model.js";
import ModelPerformanceRoundDetail from "../models/modelPerformanceRoundDetail.model.js";

const getModelLabel = (modelKey) => String(modelKey).replace(/[_-]+/g, " ").trim();

const calculateSuccessRate = (correct, totalPlayed) => {
  if (!totalPlayed) {
    return 0;
  }

  return correct / totalPlayed;
};

const parseBooleanFlag = (value) => value === true || value === "true";

const createBadRequestError = (message) => {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
};

const toTrimmedString = (value) => (typeof value === "string" ? value.trim() : "");

const toFiniteNumber = (value) => {
  const numericValue = Number(value);

  return Number.isFinite(numericValue) ? numericValue : null;
};

const toPositiveRoundNumber = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return null;
  }

  return Math.round(numericValue);
};

const requireFiniteNumber = (value, fieldName, index) => {
  const numericValue = toFiniteNumber(value);

  if (numericValue === null) {
    throw createBadRequestError(`matchups[${index}].${fieldName} must be a valid number`);
  }

  return numericValue;
};

const requireProbability = (value, fieldName, index) => {
  const numericValue = requireFiniteNumber(value, fieldName, index);

  if (numericValue < 0 || numericValue > 1) {
    throw createBadRequestError(`matchups[${index}].${fieldName} must be between 0 and 1`);
  }

  return numericValue;
};

const requireString = (value, fieldName, index) => {
  const stringValue = toTrimmedString(value);

  if (!stringValue) {
    throw createBadRequestError(`matchups[${index}].${fieldName} is required`);
  }

  return stringValue;
};

const normalizeMatchupRecord = (matchup, index) => {
  const roundNumber = toPositiveRoundNumber(matchup?.round ?? matchup?.roundNumber);

  if (!roundNumber) {
    throw createBadRequestError(`matchups[${index}].round must be a positive number`);
  }

  const homeTeam = requireString(matchup?.homeTeam, "homeTeam", index);
  const awayTeam = requireString(matchup?.awayTeam, "awayTeam", index);
  const pick = requireString(matchup?.pick, "pick", index);
  const winner = requireString(matchup?.winner, "winner", index);

  if (![homeTeam, awayTeam].includes(pick)) {
    throw createBadRequestError(`matchups[${index}].pick must match homeTeam or awayTeam`);
  }

  if (![homeTeam, awayTeam].includes(winner)) {
    throw createBadRequestError(`matchups[${index}].winner must match homeTeam or awayTeam`);
  }

  const homeWin = requireProbability(matchup?.homeWin, "homeWin", index);
  const awayWin = requireProbability(matchup?.awayWin, "awayWin", index);
  const homeElo = requireFiniteNumber(matchup?.homeElo, "homeElo", index);
  const awayElo = requireFiniteNumber(matchup?.awayElo, "awayElo", index);
  const ratingChange = Math.abs(requireFiniteNumber(matchup?.ratingChange, "ratingChange", index));
  const isCorrect = pick === winner;

  return {
    roundNumber,
    matchup: {
      homeTeam,
      awayTeam,
      pick,
      winner,
      result: isCorrect ? "Correct" : "Incorrect",
      isCorrect,
      homeWin,
      awayWin,
      predictedWinnerProbability: pick === homeTeam ? homeWin : awayWin,
      homeElo,
      awayElo,
      ratingChange,
    },
  };
};

const normalizeImportMatchups = (matchups = []) => {
  const groupedMatchups = matchups.reduce((roundMap, matchup, index) => {
    const normalizedMatchup = normalizeMatchupRecord(matchup, index);
    const roundMatchups = roundMap.get(normalizedMatchup.roundNumber) ?? [];

    roundMap.set(normalizedMatchup.roundNumber, [...roundMatchups, normalizedMatchup.matchup]);
    return roundMap;
  }, new Map());

  const sortedRoundEntries = Array.from(groupedMatchups.entries()).sort(
    ([firstRoundNumber], [secondRoundNumber]) => firstRoundNumber - secondRoundNumber
  );

  let runningCorrect = 0;
  let runningWrong = 0;

  const roundDetails = sortedRoundEntries.map(([roundNumber, roundMatchups]) => {
    const correct = roundMatchups.filter((matchup) => matchup.isCorrect).length;
    const wrong = Math.max(0, roundMatchups.length - correct);
    const totalPlayed = correct + wrong;
    const successRate = calculateSuccessRate(correct, totalPlayed);

    runningCorrect += correct;
    runningWrong += wrong;

    const runningPlayed = runningCorrect + runningWrong;

    return {
      roundNumber,
      correct,
      wrong,
      totalPlayed,
      successRate,
      totalCorrect: runningCorrect,
      totalWrong: runningWrong,
      totalSuccessRate: calculateSuccessRate(runningCorrect, runningPlayed),
      matchups: roundMatchups,
    };
  });

  return {
    rounds: roundDetails.map((roundDetail) => ({
      roundNumber: roundDetail.roundNumber,
      correct: roundDetail.correct,
      wrong: roundDetail.wrong,
      successRate: roundDetail.successRate,
      totalCorrect: roundDetail.totalCorrect,
      totalWrong: roundDetail.totalWrong,
      totalPlayed: roundDetail.totalPlayed,
      totalSuccessRate: roundDetail.totalSuccessRate,
    })),
    roundDetails,
    latestRound: roundDetails.length > 0 ? roundDetails[roundDetails.length - 1].roundNumber : 0,
    totalCorrect: runningCorrect,
    totalWrong: runningWrong,
    totalPlayed: runningCorrect + runningWrong,
    overallSuccessRate: calculateSuccessRate(runningCorrect, runningCorrect + runningWrong),
  };
};

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

export const importModelPerformanceMatchups = async (req, res) => {
  try {
    const { seasonLabel, modelKey, modelLabel, sourceFileName, isActive, makeActive, matchups } = req.body;

    if (!seasonLabel || !modelKey) {
      return res.status(400).json({ success: false, message: "seasonLabel and modelKey are required" });
    }

    if (!Array.isArray(matchups) || matchups.length === 0) {
      return res.status(400).json({ success: false, message: "matchups must be a non-empty array" });
    }

    const normalizedImport = normalizeImportMatchups(matchups);
    const trimmedSeasonLabel = String(seasonLabel).trim();
    const trimmedModelKey = String(modelKey).trim();
    const trimmedModelLabel = String(modelLabel || "").trim() || getModelLabel(trimmedModelKey);
    const trimmedSourceFileName = String(sourceFileName || "").trim();
    const hasExplicitIsActive = isActive !== undefined;
    const hasLegacyMakeActive = makeActive !== undefined;

    if (!trimmedSeasonLabel || !trimmedModelKey) {
      return res.status(400).json({ success: false, message: "seasonLabel and modelKey are required" });
    }

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

    await ModelPerformanceRoundDetail.deleteMany({ modelPerformanceId: savedModelPerformance._id });

    await ModelPerformanceRoundDetail.insertMany(
      normalizedImport.roundDetails.map((roundDetail) => ({
        modelPerformanceId: savedModelPerformance._id,
        seasonLabel: trimmedSeasonLabel,
        modelKey: trimmedModelKey,
        roundNumber: roundDetail.roundNumber,
        correct: roundDetail.correct,
        wrong: roundDetail.wrong,
        totalPlayed: roundDetail.totalPlayed,
        successRate: roundDetail.successRate,
        matchups: roundDetail.matchups,
      }))
    );

    if (resolvedIsActive) {
      await ModelPerformance.updateMany(
        { _id: { $ne: savedModelPerformance._id }, isActive: true },
        { $set: { isActive: false } }
      );
    }

    const refreshedModelPerformance = await ModelPerformance.findById(savedModelPerformance._id).lean();

    return res.status(existingRecord ? 200 : 201).json({
      success: true,
      message: existingRecord
        ? "Model performance matchups updated successfully"
        : "Model performance matchups imported successfully",
      data: {
        ...buildImportResponse(refreshedModelPerformance),
        roundDetailsImported: normalizedImport.roundDetails.length,
        matchupsImported: matchups.length,
      },
    });
  } catch (error) {
    console.log("Error in importModelPerformanceMatchups:", error.message);

    if (error.statusCode === 400) {
      return res.status(400).json({ success: false, message: error.message });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};
