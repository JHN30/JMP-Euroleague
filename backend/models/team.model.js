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

const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key);

const getLatestRating = (ratingArray) => {
  if (!Array.isArray(ratingArray) || ratingArray.length === 0) {
    return null;
  }

  const latestRating = Number(ratingArray[ratingArray.length - 1]);

  return Number.isFinite(latestRating) ? latestRating : null;
};

const syncRatingFromArray = (target) => {
  const latestRating = getLatestRating(target?.ratingArray);
  if (latestRating !== null) {
    target.rating = latestRating;
  }
};

const applyRatingToTarget = (target, ratingArray) => {
  const latestRating = getLatestRating(ratingArray);

  if (latestRating === null) {
    return;
  }

  target.rating = latestRating;
};

const applyDirectRatingArrayUpdate = (update) => {
  if (hasOwn(update, "ratingArray")) {
    applyRatingToTarget(update, update.ratingArray);
  }
};

const applySetRatingArrayUpdate = (update) => {
  if (update.$set && hasOwn(update.$set, "ratingArray")) {
    applyRatingToTarget(update.$set, update.$set.ratingArray);
  }
};

const getPushedRatingValues = (pushedRating) => {
  if (pushedRating && typeof pushedRating === "object" && Array.isArray(pushedRating.$each)) {
    return pushedRating.$each;
  }

  return [pushedRating];
};

const applyPushedRatingArrayUpdate = (update) => {
  const pushedRating = update.$push?.ratingArray;

  if (pushedRating === undefined) {
    return;
  }

  const latestRating = getLatestRating(getPushedRatingValues(pushedRating));

  if (latestRating === null) {
    return;
  }

  update.$set = update.$set || {};
  update.$set.rating = latestRating;
};

const syncRatingInUpdate = (update) => {
  if (!update || Array.isArray(update)) {
    return;
  }

  applyDirectRatingArrayUpdate(update);
  applySetRatingArrayUpdate(update);
  applyPushedRatingArrayUpdate(update);
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
