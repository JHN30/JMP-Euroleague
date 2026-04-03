import { RATING_CALCULATION } from "../constants/appConstants";

const toFiniteNumber = (value, fallback = 0) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : fallback;
};

export const calculateExpectedScorePredictor = (
  ratingA,
  ratingB,
  formAdvantageA,
  formAdvantageB,
  injuriesA,
  injuriesB,
  expectedHomeAdvantage = RATING_CALCULATION.HOME_ADVANTAGE,
  injuryMultiplier = RATING_CALCULATION.INJURY_MULTIPLIER
) => {
  const normalizedRatingA = toFiniteNumber(ratingA);
  const normalizedRatingB = toFiniteNumber(ratingB);
  const normalizedFormAdvantageA = toFiniteNumber(formAdvantageA);
  const normalizedFormAdvantageB = toFiniteNumber(formAdvantageB);
  const normalizedInjuriesA = toFiniteNumber(injuriesA);
  const normalizedInjuriesB = toFiniteNumber(injuriesB);

  // Expected form advantage (Max bonus is 5%) e.g. if team has 3 wins out of 5 matches, then formAdvantage = 3/5 = 0.6 and then expectedFormAdvantage = 0.6 * 0.05 = 0.03. 0.03 is actually 3%
  const expectedFormAdvantageA = normalizedFormAdvantageA * RATING_CALCULATION.FORM_ADVANTAGE_MULTIPLIER;
  const expectedFormAdvantageB = normalizedFormAdvantageB * RATING_CALCULATION.FORM_ADVANTAGE_MULTIPLIER;

  //This is added so the expected score in the end is not over or less than 100% because i can't add formAdvantage to expectedScoreA and expectedScoreB directly. I need to calculate the total formAdvantage and then divide it by 2.
  const totalFormAdvantage = (expectedFormAdvantageA + expectedFormAdvantageB) / 2;

  //Injury impact on expected score, Max impact is 20%
  const injuryImpactA = Math.min(
    (Math.pow(RATING_CALCULATION.INJURY_GROWTH_BASE, normalizedInjuriesA) - 1) * injuryMultiplier,
    RATING_CALCULATION.MAX_INJURY_IMPACT
  );
  const injuryImpactB = Math.min(
    (Math.pow(RATING_CALCULATION.INJURY_GROWTH_BASE, normalizedInjuriesB) - 1) * injuryMultiplier,
    RATING_CALCULATION.MAX_INJURY_IMPACT
  );

  //This is just ELO rating formula to calculate the expected score. Only here i also subtract formAdvantage
  // ELO rating formula: E_A = 1 / (1 + 10 ^ ((R_B - R_A) / 400))
  const expectedScoreAELO =
    1 / (1 + 10 ** ((normalizedRatingB - normalizedRatingA) / RATING_CALCULATION.ELO_DIVISOR)) - totalFormAdvantage;
  const expectedScoreBELO =
    1 / (1 + 10 ** ((normalizedRatingA - normalizedRatingB) / RATING_CALCULATION.ELO_DIVISOR)) - totalFormAdvantage;

  //Here is final result with home advantage and form advantage added
  const expectedScoreA =
    expectedScoreAELO + expectedHomeAdvantage + expectedFormAdvantageA - injuryImpactA + injuryImpactB;
  const expectedScoreB =
    expectedScoreBELO - expectedHomeAdvantage + expectedFormAdvantageB + injuryImpactA - injuryImpactB;

  return {
    homeTeam: expectedScoreA,
    awayTeam: expectedScoreB,
  };
};
