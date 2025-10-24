import { create } from "zustand";
import axios from "../lib/axios";

export const useTeam = create((set) => ({
  teams: { data: [] },
  team: { data: {} },
  loadingTeams: false,
  errorTeams: null,

  createTeam: async (data) => {
    set({ loadingTeams: true, errorTeams: null });
    try {
      const response = await axios.post("/teams", data);
      set((state) => ({
        teams: { ...state.teams, data: [...state.teams.data, response.data] },
        loadingTeams: false,
      }));
    } catch (error) {
      set({ loadingTeams: false, errorTeams: error.message });
    }
  },

  fetchTeams: async (season) => {
    set({ loadingTeams: true, errorTeams: null });
    try {
      const query =
        season !== undefined && season !== null && season !== "" && season !== "all"
          ? `?season=${encodeURIComponent(season)}`
          : "";
      const response = await axios.get(`/teams${query}`);
      set({ teams: response.data, loadingTeams: false });
    } catch (error) {
      set({ loadingTeams: false, errorTeams: error.message, teams: { data: [] } });
    }
  },

  fetchTeamById: async (teamId) => {
    set({ loadingTeams: true, errorTeams: null });
    try {
      const response = await axios.get(`/teams/${teamId}`);
      set({ team: response.data, loadingTeams: false });
    } catch (error) {
      set({ loadingTeams: false, errorTeams: error.message, team: { data: {} } });
    }
  },

  updateTeamRating: async (teamId, data) => {
    set({ loadingTeams: true, errorTeams: null });
    try {
      const response = await axios.put(`/teams/rating2/${teamId}`, data);
      set((state) => ({
        teams: {
          ...state.teams,
          data: state.teams.data.map((team) => (team.id === teamId ? response.data : team)),
        },
        loadingTeams: false,
      }));
    } catch (error) {
      set({ loadingTeams: false, errorTeams: error.message });
    }
  },

  updateTeam: async (teamId, data) => {
    set({ loadingTeams: true, errorTeams: null });
    try {
      const response = await axios.put(`/teams/update/${teamId}`, data);
      set((state) => ({
        teams: {
          ...state.teams,
          data: state.teams.data.map((team) => (team.id === teamId ? response.data : team)),
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
        teams: { ...state.teams, data: state.teams.data.filter((team) => team.id !== teamId) },
        loadingTeams: false,
      }));
    } catch (error) {
      set({ loadingTeams: false, errorTeams: error.message });
    }
  },
}));
