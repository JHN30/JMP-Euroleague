const NUMERIC_ACCENT_KEYS = ["pointsPlus", "pointsMinus", "pointsPlusMinus"];

const getNumericValue = (team, field) => {
  const value = team?.[field];
  const numeric = Number(value);
  return Number.isNaN(numeric) ? 0 : numeric;
};

const getStringValue = (team, field) => {
  const value = team?.[field];
  if (value === null || value === undefined) {
    return "";
  }
  return String(value);
};

const applyDirection = (comparison, direction) => comparison * direction;

const compareStrings = (firstValue, secondValue, direction) =>
  applyDirection(String(firstValue).localeCompare(String(secondValue)), direction);

const compareTeamNames = (firstTeam, secondTeam, direction) =>
  compareStrings(getStringValue(firstTeam, "name"), getStringValue(secondTeam, "name"), direction);

const compareNumbers = (firstValue, secondValue, direction) => applyDirection(firstValue - secondValue, direction);

const compareNumericFields = (firstTeam, secondTeam, fields, direction) => {
  for (const field of fields) {
    const comparison = compareNumbers(getNumericValue(firstTeam, field), getNumericValue(secondTeam, field), direction);

    if (comparison !== 0) {
      return comparison;
    }
  }

  return 0;
};

const compareRating = (firstTeam, secondTeam, direction) => {
  const firstRating = getNumericValue(firstTeam, "rating");
  const secondRating = getNumericValue(secondTeam, "rating");
  const roundedComparison = Math.round(firstRating) - Math.round(secondRating);

  if (roundedComparison !== 0) {
    return compareNumbers(firstRating, secondRating, direction);
  }

  const tieBreakerComparison = compareNumericFields(firstTeam, secondTeam, ["pointsPlusMinus", "wins"], direction);

  if (tieBreakerComparison !== 0) {
    return tieBreakerComparison;
  }

  return compareTeamNames(firstTeam, secondTeam, direction);
};

const compareNumericAccent = (firstTeam, secondTeam, key, direction) => {
  const comparison = compareNumbers(getNumericValue(firstTeam, key), getNumericValue(secondTeam, key), direction);

  return comparison || compareTeamNames(firstTeam, secondTeam, direction);
};

const compareMixedValues = (firstValue, secondValue, direction) => {
  if (typeof firstValue === "number" && typeof secondValue === "number") {
    return compareNumbers(firstValue, secondValue, direction);
  }

  if (typeof firstValue === "string" && typeof secondValue === "string") {
    return compareStrings(firstValue, secondValue, direction);
  }

  if (typeof firstValue === "number") {
    return -direction;
  }

  if (typeof secondValue === "number") {
    return direction;
  }

  return null;
};

const compareByKey = (firstTeam, secondTeam, key, direction) => {
  if (key === "rating") {
    return compareRating(firstTeam, secondTeam, direction);
  }

  if (NUMERIC_ACCENT_KEYS.includes(key)) {
    return compareNumericAccent(firstTeam, secondTeam, key, direction);
  }

  return (
    compareMixedValues(firstTeam?.[key], secondTeam?.[key], direction) ??
    compareStrings(getStringValue(firstTeam, key), getStringValue(secondTeam, key), direction)
  );
};

export const sortTeams = (teams = [], options = {}) => {
  if (!Array.isArray(teams)) {
    return [];
  }

  const { key = "name", order = "asc" } = options;
  const direction = order === "asc" ? 1 : -1;

  const sorted = [...teams].sort((firstTeam, secondTeam) => compareByKey(firstTeam, secondTeam, key, direction));

  return sorted;
};
