import { RATING_CALCULATION } from "../constants/appConstants";

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
  // Expected form advantage (Max bonus is 5%) e.g. if team has 3 wins out of 5 matches, then formAdvantage = 3/5 = 0.6 and then expectedFormAdvantage = 0.6 * 0.05 = 0.03. 0.03 is actually 3%
  const expectedFormAdvantageA = formAdvantageA * RATING_CALCULATION.FORM_ADVANTAGE_MULTIPLIER;
  const expectedFormAdvantageB = formAdvantageB * RATING_CALCULATION.FORM_ADVANTAGE_MULTIPLIER;

  //This is added so the expected score in the end is not over or less than 100% because i can't add formAdvantage to expectedScoreA and expectedScoreB directly. I need to calculate the total formAdvantage and then divide it by 2.
  const totalFormAdvantage = (expectedFormAdvantageA + expectedFormAdvantageB) / 2;

  //Injury impact on expected score, Max impact is 20%
  const injuryImpactA = Math.min(
    (Math.pow(RATING_CALCULATION.INJURY_GROWTH_BASE, injuriesA) - 1) * injuryMultiplier,
    RATING_CALCULATION.MAX_INJURY_IMPACT
  );
  const injuryImpactB = Math.min(
    (Math.pow(RATING_CALCULATION.INJURY_GROWTH_BASE, injuriesB) - 1) * injuryMultiplier,
    RATING_CALCULATION.MAX_INJURY_IMPACT
  );

  //This is just ELO rating formula to calculate the expected score. Only here i also subtract formAdvantage
  // ELO rating formula: E_A = 1 / (1 + 10 ^ ((R_B - R_A) / 400))
  const expectedScoreAELO = 1 / (1 + 10 ** ((ratingB - ratingA) / RATING_CALCULATION.ELO_DIVISOR)) - totalFormAdvantage;
  const expectedScoreBELO = 1 / (1 + 10 ** ((ratingA - ratingB) / RATING_CALCULATION.ELO_DIVISOR)) - totalFormAdvantage;

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

export const calculateExpectedScorePlayoff = (ratingA, ratingB, formA, formB) => {
  const expectedFormAdvantageA = formA * RATING_CALCULATION.FORM_ADVANTAGE_MULTIPLIER;
  const expectedFormAdvantageB = formB * RATING_CALCULATION.FORM_ADVANTAGE_MULTIPLIER;

  const totalFormAdvantage = (expectedFormAdvantageA + expectedFormAdvantageB) / 2;

  const expectedScoreA1 = 1 / (1 + 10 ** ((ratingB - ratingA) / RATING_CALCULATION.ELO_DIVISOR)) - totalFormAdvantage;
  const expectedScoreB1 = 1 / (1 + 10 ** ((ratingA - ratingB) / RATING_CALCULATION.ELO_DIVISOR)) - totalFormAdvantage;

  const expectedScoreA = expectedScoreA1 + expectedFormAdvantageA;
  const expectedScoreB = expectedScoreB1 + expectedFormAdvantageB;

  return {
    homeTeam: expectedScoreA,
    awayTeam: expectedScoreB,
  };
};

export const calculateELOStandings = (
  ratingA,
  ratingB,
  resultA,
  homeAdvantage,
  formAdvantage,
  opponentFormAdvantage,
  k = 48
) => {
  const expectedFormAdvantage = formAdvantage * RATING_CALCULATION.FORM_ADVANTAGE_MULTIPLIER;
  const expectedOpponentFormAdvantage = opponentFormAdvantage * RATING_CALCULATION.FORM_ADVANTAGE_MULTIPLIER;

  const totalFormAdvantage = (expectedFormAdvantage + expectedOpponentFormAdvantage) / 2;

  const expectedScoreA1 = 1 / (1 + 10 ** ((ratingB - ratingA) / RATING_CALCULATION.ELO_DIVISOR)) - totalFormAdvantage;

  const expectedHomeAdvantage =
    homeAdvantage === "H" ? RATING_CALCULATION.HOME_ADVANTAGE : -RATING_CALCULATION.HOME_ADVANTAGE;

  const expectedScoreA = expectedScoreA1 + expectedHomeAdvantage + expectedFormAdvantage;

  const newRatingA = ratingA + k * (resultA - expectedScoreA);

  return newRatingA;
};
