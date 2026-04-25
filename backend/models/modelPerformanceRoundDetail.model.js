import mongoose from "mongoose";

const modelPerformanceMatchupSchema = new mongoose.Schema(
  {
    homeTeam: {
      type: String,
      required: true,
      trim: true,
    },
    awayTeam: {
      type: String,
      required: true,
      trim: true,
    },
    pick: {
      type: String,
      required: true,
      trim: true,
    },
    winner: {
      type: String,
      required: true,
      trim: true,
    },
    result: {
      type: String,
      required: true,
      enum: ["Correct", "Incorrect"],
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    homeWin: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
    awayWin: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
    predictedWinnerProbability: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
    homeElo: {
      type: Number,
      required: true,
    },
    awayElo: {
      type: Number,
      required: true,
    },
    ratingChange: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const modelPerformanceRoundDetailSchema = new mongoose.Schema(
  {
    modelPerformanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ModelPerformance",
      required: true,
      index: true,
    },
    seasonLabel: {
      type: String,
      required: true,
      trim: true,
    },
    modelKey: {
      type: String,
      required: true,
      trim: true,
    },
    roundNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    correct: {
      type: Number,
      required: true,
      min: 0,
    },
    wrong: {
      type: Number,
      required: true,
      min: 0,
    },
    totalPlayed: {
      type: Number,
      required: true,
      min: 0,
    },
    successRate: {
      type: Number,
      required: true,
      min: 0,
    },
    matchups: {
      type: [modelPerformanceMatchupSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

modelPerformanceRoundDetailSchema.index({ modelPerformanceId: 1, roundNumber: 1 }, { unique: true });
modelPerformanceRoundDetailSchema.index({ seasonLabel: 1, modelKey: 1, roundNumber: 1 });

const ModelPerformanceRoundDetail = mongoose.model(
  "ModelPerformanceRoundDetail",
  modelPerformanceRoundDetailSchema
);

export default ModelPerformanceRoundDetail;
