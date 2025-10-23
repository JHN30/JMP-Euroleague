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

export const sortTeams = (teams = [], options = {}) => {
  if (!Array.isArray(teams)) {
    return [];
  }

  const { key = "name", order = "asc", getRatingValue } = options;
  const direction = order === "asc" ? 1 : -1;

  const resolveRating = (team) => {
    if (typeof getRatingValue === "function") {
      return getRatingValue(team, key);
    }
    return getNumericValue(team, key);
  };

  const sorted = [...teams].sort((a, b) => {
    if (key === "rating" || key === "rating2") {
      // Rating sort uses rounded value as the primary comparator with deterministic tie-breakers
      const aRating = resolveRating(a);
      const bRating = resolveRating(b);
      const aRounded = Math.round(aRating);
      const bRounded = Math.round(bRating);

      if (aRounded !== bRounded) {
        return direction === 1 ? aRating - bRating : bRating - aRating;
      }

      const aDiff = getNumericValue(a, "pointsPlusMinus");
      const bDiff = getNumericValue(b, "pointsPlusMinus");
      if (aDiff !== bDiff) {
        return direction === 1 ? aDiff - bDiff : bDiff - aDiff;
      }

      const aWins = getNumericValue(a, "wins");
      const bWins = getNumericValue(b, "wins");
      if (aWins !== bWins) {
        return direction === 1 ? aWins - bWins : bWins - aWins;
      }

      return direction === 1 ? getStringValue(a, "name").localeCompare(getStringValue(b, "name")) : getStringValue(b, "name").localeCompare(getStringValue(a, "name"));
    }

    if (key === "wins") {
      const aWins = getNumericValue(a, "wins");
      const bWins = getNumericValue(b, "wins");
      const winDiff = (aWins - bWins) * direction;
      if (winDiff !== 0) {
        return winDiff;
      }

      const aDiff = getNumericValue(a, "pointsPlusMinus");
      const bDiff = getNumericValue(b, "pointsPlusMinus");
      const diffDiff = (aDiff - bDiff) * direction;
      if (diffDiff !== 0) {
        return diffDiff;
      }

      const aRating = resolveRating(a);
      const bRating = resolveRating(b);
      const ratingDiff = (aRating - bRating) * direction;
      if (ratingDiff !== 0) {
        return ratingDiff;
      }

      return direction === 1 ? getStringValue(a, "name").localeCompare(getStringValue(b, "name")) : getStringValue(b, "name").localeCompare(getStringValue(a, "name"));
    }

    let aValue;
    let bValue;
    if (NUMERIC_ACCENT_KEYS.includes(key)) {
      aValue = getNumericValue(a, key);
      bValue = getNumericValue(b, key);
      const diff = (aValue - bValue) * direction;
      if (diff !== 0) {
        return diff;
      }
      return direction === 1 ? getStringValue(a, "name").localeCompare(getStringValue(b, "name")) : getStringValue(b, "name").localeCompare(getStringValue(a, "name"));
    }

    aValue = a?.[key];
    bValue = b?.[key];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return direction === 1 ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return direction === 1 ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number") {
      return direction === 1 ? -1 : 1;
    }

    if (typeof bValue === "number") {
      return direction === 1 ? 1 : -1;
    }

    const aString = getStringValue(a, key);
    const bString = getStringValue(b, key);
    return direction === 1 ? aString.localeCompare(bString) : bString.localeCompare(aString);
  });

  return sorted;
};
