import { create } from "zustand";

import axios from "../lib/axios";

const extractData = (response) => response?.data?.data ?? null;
const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.response?.data?.error || error?.message || fallback;

export const useModelPerformance = create((set, get) => ({
  modelPerformance: null,
  modelPerformanceRoundDetailsByRound: {},
  loadingModelPerformance: false,
  loadingModelPerformanceRoundDetailsByRound: {},
  errorModelPerformance: null,
  errorModelPerformanceRoundDetailsByRound: {},

  fetchCurrentModelPerformance: async () => {
    set({ loadingModelPerformance: true, errorModelPerformance: null });

    try {
      const response = await axios.get("/model-performance/current");

      set({
        modelPerformance: extractData(response),
        modelPerformanceRoundDetailsByRound: {},
        loadingModelPerformanceRoundDetailsByRound: {},
        errorModelPerformanceRoundDetailsByRound: {},
        loadingModelPerformance: false,
      });
    } catch (error) {
      set({
        modelPerformance: null,
        modelPerformanceRoundDetailsByRound: {},
        loadingModelPerformanceRoundDetailsByRound: {},
        errorModelPerformanceRoundDetailsByRound: {},
        loadingModelPerformance: false,
        errorModelPerformance: getErrorMessage(error, "Error fetching model performance"),
      });
    }
  },

  fetchCurrentModelPerformanceRoundDetail: async (roundNumber) => {
    const normalizedRoundNumber = Math.round(Number(roundNumber));

    if (!Number.isFinite(normalizedRoundNumber) || normalizedRoundNumber <= 0) {
      return null;
    }

    const cachedRoundDetail = get().modelPerformanceRoundDetailsByRound[normalizedRoundNumber];

    if (cachedRoundDetail) {
      return cachedRoundDetail;
    }

    set((state) => ({
      loadingModelPerformanceRoundDetailsByRound: {
        ...state.loadingModelPerformanceRoundDetailsByRound,
        [normalizedRoundNumber]: true,
      },
      errorModelPerformanceRoundDetailsByRound: {
        ...state.errorModelPerformanceRoundDetailsByRound,
        [normalizedRoundNumber]: null,
      },
    }));

    try {
      const response = await axios.get(`/model-performance/current/rounds/${normalizedRoundNumber}`);
      const roundDetail = extractData(response);

      set((state) => ({
        modelPerformanceRoundDetailsByRound: {
          ...state.modelPerformanceRoundDetailsByRound,
          [normalizedRoundNumber]: roundDetail,
        },
        loadingModelPerformanceRoundDetailsByRound: {
          ...state.loadingModelPerformanceRoundDetailsByRound,
          [normalizedRoundNumber]: false,
        },
      }));

      return roundDetail;
    } catch (error) {
      set((state) => ({
        loadingModelPerformanceRoundDetailsByRound: {
          ...state.loadingModelPerformanceRoundDetailsByRound,
          [normalizedRoundNumber]: false,
        },
        errorModelPerformanceRoundDetailsByRound: {
          ...state.errorModelPerformanceRoundDetailsByRound,
          [normalizedRoundNumber]: getErrorMessage(error, "Error fetching round details"),
        },
      }));

      return null;
    }
  },
}));
