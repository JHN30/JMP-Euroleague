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
    ratingArray: [
      {
        type: Number,
        default: 1000,
      },
    ],
    rating: {
      type: Number,
      default: 1000,
    },
  },
  {
    timestamps: true, //createdAt, updatedAt
  }
);

teamsSchema.pre('save', function(next) {
  // Only update if the array has elements
  if (this.ratingArray && this.ratingArray.length > 0) {
    // Take the last element and assign it to the next field
    this.rating = this.ratingArray[this.ratingArray.length - 1];
  }
  next();
});

teamsSchema.index({wins: -1, pointsPlusMinus: -1, pointsPlus: -1, pointsMinus: 1, name: 1 });

const Teams = mongoose.model("Teams", teamsSchema);

export default Teams;
