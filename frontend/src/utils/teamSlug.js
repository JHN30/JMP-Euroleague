export const getTeamSlug = (teamName = "") =>
  String(teamName)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getTeamStatsPath = (team) => {
  const identifier = getTeamSlug(team?.name) || team?._id;

  return identifier ? `/team-stats/${identifier}` : "/teams";
};
