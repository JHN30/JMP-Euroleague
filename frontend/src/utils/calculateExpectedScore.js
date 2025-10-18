export const calculateExpectedScorePredictor = (
  ratingA,
  ratingB,
  formAdvantageA,
  formAdvantageB,
  expectedHomeAdvantage = 0.025
) => {
  // Expected form advantage (Max bonus is 5%) e.g. if team has 3 wins out of 5 matches, then formAdvantage = 3/5 = 0.6 and then expectedFormAdvantage = 0.6 * 0.05 = 0.03. 0.03 is actually 3%
  const expectedFormAdvantageA = formAdvantageA * 0.05;
  const expectedFormAdvantageB = formAdvantageB * 0.05;

  //This is added so the expected score in the end is not over or less than 100% because i can't add formAdvantage to expectedScoreA and expectedScoreB directly. I need to calculate the total formAdvantage and then divide it by 2.
  const totalFormAdvantage = (expectedFormAdvantageA + expectedFormAdvantageB) / 2;

  //This is just ELO rating formula to calculate the expected score. Only here i also subtract formAdvantage
  // ELO rating formula: E_A = 1 / (1 + 10 ^ ((R_B - R_A) / 400))
  const expectedScoreA1 = 1 / (1 + 10 ** ((ratingB - ratingA) / 400)) - totalFormAdvantage;
  const expectedScoreB1 = 1 / (1 + 10 ** ((ratingA - ratingB) / 400)) - totalFormAdvantage;

  //Here is final result with home advantage and form advantage added
  const expectedScoreA = expectedScoreA1 + expectedHomeAdvantage + expectedFormAdvantageA;
  const expectedScoreB = expectedScoreB1 - expectedHomeAdvantage + expectedFormAdvantageB;

  return {
    homeTeam: expectedScoreA,
    awayTeam: expectedScoreB,
  };
};

export const calculateExpectedScorePlayoff = (ratingA, ratingB, formA, formB) => {
  const expectedFormAdvantageA = formA * 0.05;
  const expectedFormAdvantageB = formB * 0.05;

  const totalFormAdvantage = (expectedFormAdvantageA + expectedFormAdvantageB) / 2;

  const expectedScoreA1 = 1 / (1 + 10 ** ((ratingB - ratingA) / 400)) - totalFormAdvantage;
  const expectedScoreB1 = 1 / (1 + 10 ** ((ratingA - ratingB) / 400)) - totalFormAdvantage;

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
  const expectedFormAdvantage = formAdvantage * 0.05;
  const expectedOpponentFormAdvantage = opponentFormAdvantage * 0.05;

  const totalFormAdvantage = (expectedFormAdvantage + expectedOpponentFormAdvantage) / 2;

  const expectedScoreA1 = 1 / (1 + 10 ** ((ratingB - ratingA) / 400)) - totalFormAdvantage;

  const expectedHomeAdvantage = homeAdvantage === "H" ? 0.025 : -0.025;

  const expectedScoreA = expectedScoreA1 + expectedHomeAdvantage + expectedFormAdvantage;

  const newRatingA = ratingA + k * (resultA - expectedScoreA);

  return newRatingA;
};
