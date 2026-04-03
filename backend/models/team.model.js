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

const getLatestRating = (ratingArray) => {
  return Number(ratingArray[ratingArray.length - 1]);
};

const syncRatingFromArray = (target) => {
  const latestRating = getLatestRating(target?.ratingArray);
  if (latestRating !== null) {
    target.rating = latestRating;
  }
};

const syncRatingInUpdate = (update) => {
  if (!update || Array.isArray(update)) {
    return;
  }

  if (Object.prototype.hasOwnProperty.call(update, "ratingArray")) {
    const latestRating = getLatestRating(update.ratingArray);
    if (latestRating !== null) {
      update.rating = latestRating;
    }
  }

  if (update.$set && Object.prototype.hasOwnProperty.call(update.$set, "ratingArray")) {
    const latestRating = getLatestRating(update.$set.ratingArray);
    if (latestRating !== null) {
      update.$set.rating = latestRating;
    }
  }

  const pushedRating = update.$push?.ratingArray;
  if (pushedRating !== undefined) {
    const pushedValues =
      pushedRating && typeof pushedRating === "object" && Array.isArray(pushedRating.$each)
        ? pushedRating.$each
        : [pushedRating];

    const latestRating = getLatestRating(pushedValues);
    if (latestRating !== null) {
      update.$set = {
        ...(update.$set || {}),
        rating: latestRating,
      };
    }
  }
};

teamsSchema.pre("save", function (next) {
  syncRatingFromArray(this);
  next();
});

teamsSchema.pre("findOneAndUpdate", function (next) {
  syncRatingInUpdate(this.getUpdate());
  next();
});

teamsSchema.pre("updateOne", function (next) {
  syncRatingInUpdate(this.getUpdate());
  next();
});

teamsSchema.pre("updateMany", function (next) {
  syncRatingInUpdate(this.getUpdate());
  next();
});

teamsSchema.index({wins: -1, pointsPlusMinus: -1, pointsPlus: -1, pointsMinus: 1, name: 1 });

const Teams = mongoose.model("Teams", teamsSchema);

export default Teams;
