import mongoose from "mongoose";

const teamsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    wins: {
      type: Number,
      required: true,
      default: 0,
    },
    losses: {
      type: Number,
      required: true,
      default: 0,
    },
    winPercentage: {
      type: Number,
      required: true,
      default: 0,
    },
    pointsPlusArray: [
      {
        type: Number,
        required: true,
        default: 0,
      },
    ],
    pointsMinusArray: [
      {
        type: Number,
        required: true,
        default: 0,
      },
    ],
    pointsPlus: {
      type: Number,
      required: true,
      default: 0,
    },
    pointsMinus: {
      type: Number,
      required: true,
      default: 0,
    },
    pointsPlusMinus: {
      type: Number,
      required: true,
      default: 0,
    },
    form: [
      {
        type: String,
        default: "",
      },
    ],
    playedAgainst: [
      {
        type: String,
        default: "",
      },
    ],
    homeGround: [
      {
        type: String,
        default: "",
      },
    ],
    logoImg: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 1000,
    },
    rating2: {
      type: Number,
      default: 1000,
    },
    season: {
      type: Number,
      required: true,
      default: 2025,
    },
  },
  {
    timestamps: true, //createdAt, updatedAt
  }
);

teamsSchema.index({ season: 1, name: 1 }, { unique: true });

const Teams = mongoose.model("Teams", teamsSchema);

export default Teams;
