import { create } from "zustand";
import axios from "../lib/axios";

const extractData = (response) => response?.data?.data;
const matchEntityId = (entity, id) => (entity?._id ?? entity?.id) === id;
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

  createTeam: async (payload) => {
    set({ loadingTeams: true, errorTeams: null });
    try {
      const response = await axios.post("/teams", payload);
      const createdTeam = normalizeTeam(extractData(response));

      set((state) => ({
        teams: {
          ...state.teams,
          data: createdTeam ? [...state.teams.data, createdTeam] : state.teams.data,
        },
        loadingTeams: false,
      }));
    } catch (error) {
      set({ loadingTeams: false, errorTeams: getErrorMessage(error, "Error creating team") });
      throw error;
    }
  },

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

  fetchTeamById: async (teamId) => {
    set({ loadingTeams: true, errorTeams: null });
    try {
      const response = await axios.get(`/teams/${teamId}`);
      set({ team: { data: normalizeTeam(extractData(response)) ?? {} }, loadingTeams: false });
    } catch (error) {
      set({ loadingTeams: false, errorTeams: getErrorMessage(error, "Error fetching team"), team: { data: {} } });
    }
  },

  updateTeam: async (teamId, payload) => {
    set({ loadingTeams: true, errorTeams: null });
    try {
      const response = await axios.put(`/teams/update/${teamId}`, payload);
      const updatedTeam = normalizeTeam(extractData(response));

      set((state) => ({
        teams: {
          ...state.teams,
          data: updatedTeam
            ? state.teams.data.map((team) => (matchEntityId(team, teamId) ? updatedTeam : team))
            : state.teams.data,
        },
        team: matchEntityId(state.team.data, teamId) && updatedTeam ? { data: updatedTeam } : state.team,
        loadingTeams: false,
      }));
    } catch (error) {
      set({ loadingTeams: false, errorTeams: getErrorMessage(error, "Error updating team") });
      throw error;
    }
  },

  deleteTeam: async (teamId) => {
    set({ loadingTeams: true, errorTeams: null });
    try {
      await axios.delete(`/teams/${teamId}`);
      set((state) => ({
        teams: {
          ...state.teams,
          data: state.teams.data.filter((team) => !matchEntityId(team, teamId)),
        },
        team: matchEntityId(state.team.data, teamId) ? { data: {} } : state.team,
        loadingTeams: false,
      }));
    } catch (error) {
      set({ loadingTeams: false, errorTeams: getErrorMessage(error, "Error deleting team") });
      throw error;
    }
  },
}));
