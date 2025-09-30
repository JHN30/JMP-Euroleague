import mongoose from "mongoose";

const teams2025Schema = new mongoose.Schema(
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
  },
  {
    timestamps: true, //createdAt, updatedAt
  }
);

const Teams2025 = mongoose.model("Teams2025", teams2025Schema);

export default Teams2025;
