import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
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
    },
    form: [
      {
        type: String,
        required: true,
      },
    ],
    playedAgainst: [
      {
        type: String,
        required: true,
      },
    ],
    homeGround: [
      {
        type: String,
        required: true,
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

const Team = mongoose.model("Team", teamSchema);

export default Team;
