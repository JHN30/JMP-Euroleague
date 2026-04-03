import { calculateExpectedScorePredictor } from "./calculateExpectedScore";
import { INJURY_IMPACT } from "../constants/appConstants";

const calculateTotalInjuryImpact = (injuries) => {
  return (
    (injuries.stars || 0) * INJURY_IMPACT.STAR +
    (injuries.starters || 0) * INJURY_IMPACT.STARTER +
    (injuries.keyBench || 0) * INJURY_IMPACT.KEY_BENCH
  );
};

const getRecentFormSlice = (form = [], round) => {
  if (!Array.isArray(form)) return [];
  if (form[round - 1] === undefined) {
    return [];
  }

  const startIndex = round - 5 <= 0 ? 0 : round - 5;
  const endIndex = round === 0 ? 1 : round;
  return form.slice(startIndex, endIndex);
};

const getFormAdvantage = (recentForm = []) => {
  if (!recentForm.length) return 0;
  const wins = recentForm.filter((result) => result === "W").length;
  return wins / recentForm.length;
};

const clampProbability = (value) => {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return 0;
  }

  return Math.max(0, Math.min(1, numericValue));
};

const getTeamRating = (team) => {
  const rating2Value = Number(team?.rating2);
  if (Number.isFinite(rating2Value)) {
    return rating2Value;
  }

  const ratingValue = Number(team?.rating);
  return Number.isFinite(ratingValue) ? ratingValue : 0;
};

export const handleTeamSelect = ({
  homeTeam,
  awayTeam,
  teams,
  rounds,
  homeInjuries,
  awayInjuries,
  setPredictions,
  setDisplayTeams,
  setShowResults,
}) => {
  if (!homeTeam || !awayTeam) return;

  const homeInjuryImpact = calculateTotalInjuryImpact(homeInjuries);
  const awayInjuryImpact = calculateTotalInjuryImpact(awayInjuries);

  const teamList = teams?.data ?? [];
  const roundList = rounds?.data ?? [];
  const currentRound = roundList[0]?.currentRound ?? 0;

  const homeTeamData = teamList.find((team) => team.name === homeTeam);
  const awayTeamData = teamList.find((team) => team.name === awayTeam);

  if (!homeTeamData || !awayTeamData) {
    return;
  }

  const homeRecentForm = getRecentFormSlice(homeTeamData.form, currentRound);
  const awayRecentForm = getRecentFormSlice(awayTeamData.form, currentRound);

  const homeFormAdvantage = getFormAdvantage(homeRecentForm);
  const awayFormAdvantage = getFormAdvantage(awayRecentForm);

  const prediction = calculateExpectedScorePredictor(
    getTeamRating(homeTeamData),
    getTeamRating(awayTeamData),
    homeFormAdvantage,
    awayFormAdvantage,
    homeInjuryImpact,
    awayInjuryImpact
  );

  setPredictions({
    ...prediction,
    homeTeam: clampProbability(prediction?.homeTeam),
    awayTeam: clampProbability(prediction?.awayTeam),
  });

  setDisplayTeams({
    home: homeTeam,
    away: awayTeam,
    homeData: homeTeamData,
    awayData: awayTeamData,
  });

  setShowResults(true);
};
