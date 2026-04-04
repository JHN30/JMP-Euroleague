export const RATING_CALCULATION = {
  RATING_GAP_SCALE: 82.5,
  MODEL_INTERCEPT: 0.8,
  MODEL_RATING_WEIGHT: 0.6,
  MODEL_SCORING_MARGIN_WEIGHT: -0.1,
};

const PLAYED_RESULTS = new Set(["W", "L"]);

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const toFiniteNumber = (value, fallback = 0) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : fallback;
};

export const createPredictorModelState = () => ({
  intercept: RATING_CALCULATION.MODEL_INTERCEPT,
  ratingWeight: RATING_CALCULATION.MODEL_RATING_WEIGHT,
  scoringMarginWeight: RATING_CALCULATION.MODEL_SCORING_MARGIN_WEIGHT,
});

const resolvePredictorModelState = (modelState = null) => modelState ?? createPredictorModelState();

export const playedRoundIndexesBeforeRound = (team, roundIndex) => {
  const normalizedRoundIndex = Math.max(toFiniteNumber(roundIndex), 0);
  const form = Array.isArray(team?.form) ? team.form : [];

  return form.reduce((indexes, result, index) => {
    if (index < normalizedRoundIndex && PLAYED_RESULTS.has(result)) {
      indexes.push(index);
    }
    return indexes;
  }, []);
};

export const averageScoringMarginBeforeRound = (team, roundIndex) => {
  const playedIndexes = playedRoundIndexesBeforeRound(team, roundIndex);

  if (!playedIndexes.length) {
    return 0;
  }

  const pointsPlusArray = Array.isArray(team?.pointsPlusArray) ? team.pointsPlusArray : [];
  const pointsMinusArray = Array.isArray(team?.pointsMinusArray) ? team.pointsMinusArray : [];

  const totalMargin = playedIndexes.reduce((sum, index) => {
    const pointsScored = toFiniteNumber(pointsPlusArray[index]);
    const pointsAllowed = toFiniteNumber(pointsMinusArray[index]);
    return sum + (pointsScored - pointsAllowed);
  }, 0);

  return totalMargin / playedIndexes.length;
};

export const calculateExpectedScorePredictor = (
  homeRating,
  awayRating,
  homeScoringMargin = 0,
  awayScoringMargin = 0,
  modelState = null
) => {
  const model = resolvePredictorModelState(modelState);
  const ratingGapFeature =
    (toFiniteNumber(homeRating) - toFiniteNumber(awayRating)) / RATING_CALCULATION.RATING_GAP_SCALE;
  const scoringMarginFeature = toFiniteNumber(homeScoringMargin) - toFiniteNumber(awayScoringMargin);
  const logit =
    model.intercept + model.ratingWeight * ratingGapFeature + model.scoringMarginWeight * scoringMarginFeature;
  const homeTeam = 1 / (1 + Math.exp(-clamp(logit, -35, 35)));

  return {
    homeTeam,
    awayTeam: 1 - homeTeam,
  };
};

export const calculateNextGamePrediction = ({
  homeTeam,
  awayTeam,
  homeRating,
  awayRating,
  roundIndex,
  modelState = null,
}) => {
  const homeScoringMargin = averageScoringMarginBeforeRound(homeTeam, roundIndex);
  const awayScoringMargin = averageScoringMarginBeforeRound(awayTeam, roundIndex);
  const probabilities = calculateExpectedScorePredictor(
    homeRating,
    awayRating,
    homeScoringMargin,
    awayScoringMargin,
    modelState
  );

  return {
    ...probabilities,
    homeScoringMargin,
    awayScoringMargin,
  };
};
