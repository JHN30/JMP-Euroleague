import { create } from "zustand";
import axios from "../lib/axios";

const extractData = (response) => response?.data?.data;

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
}));
