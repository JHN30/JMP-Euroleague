import { create } from "zustand";
import axios from "../lib/axios";

export const useTeam = create((set) => ({
  teams: { data: [] },
  loadingTeams: false,
  errorTeams: null,

  fetchTeams: async () => {
    set({ loadingTeams: true, errorTeams: null });
    try {
      const response = await axios.get("/teams");
      set({ teams: response.data, loadingTeams: false });
    } catch (error) {
      set({ loadingTeams: false, errorTeams: error.message, teams: { data: [] } });
    }
  },
  updateTeam: async (teamId, data) => {
    set({ loadingTeams: true, errorTeams: null });
    try {
      const response = await axios.put(`/teams/${teamId}`, data);
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
}));
