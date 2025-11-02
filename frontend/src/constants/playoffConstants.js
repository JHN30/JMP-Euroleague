export const ELO_CHANGE = 24;
export const DEFAULT_SEASON = "2025";

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
