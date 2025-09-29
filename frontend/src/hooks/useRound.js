import { create } from "zustand";
import axios from "../lib/axios";

export const useRound = create((set) => ({
  rounds: { data: [] },
  loadingRounds: false,
  errorRounds: null,

  fetchRounds: async () => {
    set({ loadingRounds: true, errorRounds: null });
    try {
      const response = await axios.get("/rounds");
      set({ rounds: response.data, loadingRounds: false });
    } catch (error) {
      set({ loadingRounds: false, errorRounds: error.message, rounds: { data: [] } });
    }
  },
  updateRound: async (roundId, data) => {
    set({ loadingRounds: true, errorRounds: null });
    try {
      const response = await axios.put(`/rounds/${roundId}`, data);
      set((state) => ({
        rounds: {
          ...state.rounds,
          data: state.rounds.data.map((round) => (round.id === roundId ? response.data : round)),
        },
        loadingRounds: false,
      }));
    } catch (error) {
      set({ loadingRounds: false, errorRounds: error.message });
    }
  },
}));
