import mongoose from "mongoose";

const modelPerformanceRoundSchema = new mongoose.Schema(
  {
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
    successRate: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalCorrect: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalWrong: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalPlayed: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalSuccessRate: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const modelPerformanceSchema = new mongoose.Schema(
  {
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
    modelLabel: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    rounds: {
      type: [modelPerformanceRoundSchema],
      default: [],
    },
    latestRound: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalCorrect: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalWrong: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalPlayed: {
      type: Number,
      default: 0,
      min: 0,
    },
    overallSuccessRate: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

modelPerformanceSchema.index({ seasonLabel: 1, modelKey: 1 }, { unique: true });
modelPerformanceSchema.index({ isActive: -1, updatedAt: -1 });

const ModelPerformance = mongoose.model("ModelPerformance", modelPerformanceSchema);

export default ModelPerformance;
