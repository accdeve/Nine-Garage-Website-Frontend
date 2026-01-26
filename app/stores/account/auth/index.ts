import { defineStore } from "pinia";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    isAuthenticated: false,
  }),

  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated && !!state.token,
  },

  actions: {
    setUser(user: User | null) {
      this.user = user;
      this.isAuthenticated = !!user;
    },

    setToken(token: string | null) {
      this.token = token;
      if (token) {
        // Store token in localStorage for persistence
        if (process.client) {
          localStorage.setItem("auth_token", token);
        }
      } else {
        if (process.client) {
          localStorage.removeItem("auth_token");
        }
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      if (process.client) {
        localStorage.removeItem("auth_token");
      }
    },

    // Initialize auth state from localStorage
    initAuth() {
      if (process.client) {
        const token = localStorage.getItem("auth_token");
        if (token) {
          this.setToken(token);
          // TODO: Validate token with server and fetch user data
        }
      }
    },
  },
});
