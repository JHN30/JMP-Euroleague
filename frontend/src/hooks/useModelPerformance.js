import { create } from "zustand";

import axios from "../lib/axios";

const extractData = (response) => response?.data?.data ?? null;
const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.response?.data?.error || error?.message || fallback;

export const useModelPerformance = create((set) => ({
  modelPerformance: null,
  loadingModelPerformance: false,
  errorModelPerformance: null,

  fetchCurrentModelPerformance: async () => {
    set({ loadingModelPerformance: true, errorModelPerformance: null });

    try {
      const response = await axios.get("/model-performance/current");

      set({
        modelPerformance: extractData(response),
        loadingModelPerformance: false,
      });
    } catch (error) {
      set({
        modelPerformance: null,
        loadingModelPerformance: false,
        errorModelPerformance: getErrorMessage(error, "Error fetching model performance"),
      });
    }
  },
}));
