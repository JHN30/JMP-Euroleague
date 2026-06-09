import { create } from "zustand";
import axios from "../lib/axios";

const extractData = (response) => response?.data?.data;
const getErrorMessage = (error, fallback) =>
  error?.response?.data?.error || error?.response?.data?.message || error?.message || fallback;

const getNormalizedRating = (value) => {
  const numericValue = Number(value);
  if (Number.isFinite(numericValue)) {
    return numericValue;
  }

  return 0;
};

const normalizeTeam = (team) => {
  if (!team || typeof team !== "object") {
    return null;
  }

  return {
    ...team,
    rating: getNormalizedRating(team?.rating),
  };
};

const normalizeTeamList = (teams) => (Array.isArray(teams) ? teams.map(normalizeTeam).filter(Boolean) : []);

export const useTeam = create((set) => ({
  teams: { data: [] },
  team: { data: {} },
  loadingTeams: false,
  errorTeams: null,

  fetchTeams: async () => {
    set({ loadingTeams: true, errorTeams: null });
    try {
      const response = await axios.get("/teams");
      set({
        teams: { data: normalizeTeamList(extractData(response)) },
        loadingTeams: false,
      });
    } catch (error) {
      set({ loadingTeams: false, errorTeams: getErrorMessage(error, "Error fetching teams"), teams: { data: [] } });
    }
  },

  fetchTeamByIdentifier: async (teamIdentifier) => {
    const identifier = String(teamIdentifier ?? "").trim();

    set({ loadingTeams: true, errorTeams: null, team: { data: {}, identifier } });
    try {
      const response = await axios.get(`/teams/${encodeURIComponent(identifier)}`);
      set({ team: { data: normalizeTeam(extractData(response)) ?? {}, identifier }, loadingTeams: false });
    } catch (error) {
      set({
        loadingTeams: false,
        errorTeams: getErrorMessage(error, "Error fetching team"),
        team: { data: {}, identifier },
      });
    }
  },
}));
