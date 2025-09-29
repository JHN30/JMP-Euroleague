import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth";

axios.defaults.withCredentials = true;

export const useAuth = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, username) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, { email, password, username });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.error || "Error signing up", isLoading: false });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.response?.data?.error || "Error logging in", isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({ user: null, isAuthenticated: false, error: null, isLoading: false });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response.data.error || "Error verifying email", isLoading: false });
      throw error;
    }
  },

  newVerifyEmail: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/new-verify-email`);
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.response.data.error || "Error sending verification email" });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
      // If checkAuth fails, try to refresh token first
      try {
        await get().refreshToken();
        // If refresh succeeds, try checkAuth again
        const response = await axios.get(`${API_URL}/check-auth`);
        set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
      } catch (refreshError) {
        // If refresh also fails, user needs to login again
        set({ user: null, error: null, isCheckingAuth: false, isAuthenticated: false });
      }
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.error || "Error sending reset password email",
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.error || "Error resetting password",
      });
      throw error;
    }
  },

  refreshToken: async () => {
    try {
      const response = await axios.post(`${API_URL}/refresh-token`);
      set({
        isAuthenticated: true,
        user: response.data.user || get().user,
      });
      return response.data;
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
      });
      throw error;
    }
  },
}));
