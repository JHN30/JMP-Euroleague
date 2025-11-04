import { create } from "zustand";
import axios from "../lib/axios";

const extractData = (response) => response?.data?.data;
const matchEntityId = (entity, id) => (entity?._id ?? entity?.id) === id;

export const useRound = create((set) => ({
  rounds: { data: [] },
  loadingRounds: false,
  errorRounds: null,

  fetchRounds: async () => {
    set({ loadingRounds: true, errorRounds: null });
    try {
      const response = await axios.get("/rounds");
      set({ rounds: { data: extractData(response) ?? [] }, loadingRounds: false });
    } catch (error) {
      set({ loadingRounds: false, errorRounds: error.message, rounds: { data: [] } });
    }
  },
  updateRound: async (roundId, payload) => {
    set({ loadingRounds: true, errorRounds: null });
    try {
      const response = await axios.put(`/rounds/${roundId}`, payload);
      const updatedRound = extractData(response);

      set((state) => ({
        rounds: {
          ...state.rounds,
          data: updatedRound
            ? state.rounds.data.map((round) => (matchEntityId(round, roundId) ? updatedRound : round))
            : state.rounds.data,
        },
        loadingRounds: false,
      }));
    } catch (error) {
      set({ loadingRounds: false, errorRounds: error.message });
    }
  },
}));
