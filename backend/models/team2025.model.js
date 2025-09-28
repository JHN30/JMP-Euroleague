import mongoose from "mongoose";

const team2025Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
  },
  {
    timestamps: true, //createdAt, updatedAt
  }
);

const Team2025 = mongoose.model("Team2025", team2025Schema);

export default Team2025;
