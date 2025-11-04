import { create } from "zustand";
import axios from "../lib/axios";

const extractData = (response) => response?.data?.data;
const matchEntityId = (entity, id) => (entity?._id ?? entity?.id) === id;

export const useTeam = create((set) => ({
  teams: { data: [] },
  team: { data: {} },
  loadingTeams: false,
  errorTeams: null,

  createTeam: async (payload) => {
    set({ loadingTeams: true, errorTeams: null });
    try {
      const response = await axios.post("/teams", payload);
      const createdTeam = extractData(response);

      set((state) => ({
        teams: {
          ...state.teams,
          data: createdTeam ? [...state.teams.data, createdTeam] : state.teams.data,
        },
        loadingTeams: false,
      }));
    } catch (error) {
      set({ loadingTeams: false, errorTeams: error.message });
      throw error;
    }
  },

  fetchTeams: async (season) => {
    set({ loadingTeams: true, errorTeams: null });
    try {
      const query =
        season !== undefined && season !== null && season !== "" && season !== "all"
          ? `?season=${encodeURIComponent(season)}`
          : "?season=2025";
      const response = await axios.get(`/teams${query}`);
      set({
        teams: { data: extractData(response) ?? [] },
        loadingTeams: false,
      });
    } catch (error) {
      set({ loadingTeams: false, errorTeams: error.message, teams: { data: [] } });
    }
  },

  fetchTeamById: async (teamId) => {
    set({ loadingTeams: true, errorTeams: null });
    try {
      const response = await axios.get(`/teams/${teamId}`);
      set({ team: { data: extractData(response) ?? {} }, loadingTeams: false });
    } catch (error) {
      set({ loadingTeams: false, errorTeams: error.message, team: { data: {} } });
    }
  },

  updateTeamRating: async (teamId, payload) => {
    set({ loadingTeams: true, errorTeams: null });
    try {
      const response = await axios.put(`/teams/rating2/${teamId}`, payload);
      const updatedTeam = extractData(response);

      set((state) => ({
        teams: {
          ...state.teams,
          data: updatedTeam
            ? state.teams.data.map((team) => (matchEntityId(team, teamId) ? updatedTeam : team))
            : state.teams.data,
        },
        loadingTeams: false,
      }));
    } catch (error) {
      set({ loadingTeams: false, errorTeams: error.message });
    }
  },

  updateTeam: async (teamId, payload) => {
    set({ loadingTeams: true, errorTeams: null });
    try {
      const response = await axios.put(`/teams/update/${teamId}`, payload);
      const updatedTeam = extractData(response);

      set((state) => ({
        teams: {
          ...state.teams,
          data: updatedTeam
            ? state.teams.data.map((team) => (matchEntityId(team, teamId) ? updatedTeam : team))
            : state.teams.data,
        },
        loadingTeams: false,
      }));
    } catch (error) {
      set({ loadingTeams: false, errorTeams: error.message });
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
        loadingTeams: false,
      }));
    } catch (error) {
      set({ loadingTeams: false, errorTeams: error.message });
    }
  },
}));
