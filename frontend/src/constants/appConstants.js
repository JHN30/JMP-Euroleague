export const DEFAULT_SEASON = "2025";

export const STORAGE_KEYS = {
  TEAMS_PAGE_SEASON: "teamsPage.selectedSeason",
};

export const RATING_CALCULATION = {
  HOME_ADVANTAGE: 0.025,
  INJURY_MULTIPLIER: 0.025,
  FORM_ADVANTAGE_MULTIPLIER: 0.05,
  MAX_INJURY_IMPACT: 0.2,
  ELO_DIVISOR: 400,
  INJURY_GROWTH_BASE: 1.8,
};

export const ELO_CHANGE = 24;

export const MATCH_DEPENDENCIES = {
  "play-in-1": ["play-in-final", "qf-1", "sf-1", "final"],
  "play-in-2": ["play-in-final", "qf-3", "sf-2", "final"],
  "play-in-final": ["qf-1", "sf-1", "final"],
  "qf-1": ["sf-1", "final"],
  "qf-2": ["sf-1", "final"],
  "qf-3": ["sf-2", "final"],
  "qf-4": ["sf-2", "final"],
  "sf-1": ["final"],
  "sf-2": ["final"],
};
