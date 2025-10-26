import { calculateExpectedScorePredictor } from "./calculateExpectedScore";

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

export const handleTeamSelect = ({
  homeTeam,
  awayTeam,
  teams,
  rounds,
  homeInjuries,
  awayInjuries,
  sanitizeInjuryValue,
  clampProbability,
  setHomeInjuries,
  setAwayInjuries,
  setPredictions,
  setDisplayTeams,
  setShowResults,
}) => {
  if (!homeTeam || !awayTeam) return;

  const sanitizedHomeInjuries = sanitizeInjuryValue(homeInjuries);
  const sanitizedAwayInjuries = sanitizeInjuryValue(awayInjuries);
  setHomeInjuries(String(sanitizedHomeInjuries));
  setAwayInjuries(String(sanitizedAwayInjuries));

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
    homeTeamData.rating2,
    awayTeamData.rating2,
    homeFormAdvantage,
    awayFormAdvantage,
    sanitizedHomeInjuries,
    sanitizedAwayInjuries
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
