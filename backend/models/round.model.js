import mongoose from "mongoose";

const roundSchema = new mongoose.Schema(
  {
    currentRound: {
      type: Number,
      default: 1,
    },
    latestRound: {
      type: Number,
      default: 33,
    },
  },
  {
    timestamps: true, //createdAt, updatedAt
  }
);

const Round = mongoose.model("Round", roundSchema);

export default Round;
