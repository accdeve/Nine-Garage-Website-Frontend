import { defineStore } from "pinia";
import type { HomeState } from "./types";
import { homeService } from "~/services/home/home.service";

export const useHomeStore = defineStore("home", {
  state: (): HomeState => ({
    carousel: [],
    communities: [],
    loading: false,
    error: null,
  }),

  getters: {},

  actions: {
    async fetchCarousel() {
      if (this.carousel.length > 0) return;
      this.loading = true;
      try {
        const response = await homeService.getCarousel();
        this.carousel = response.data;
      } catch (err) {
        this.error =
          err instanceof Error ? err.message : "An unknown error occurred";
      } finally {
        this.loading = false;
      }
    },

    async fetchCommunities() {
      if (this.communities.length > 0) return;
      this.loading = true;
      try {
        const response = await homeService.getCommunities();
        this.communities = response.data;
      } catch (err) {
        this.error =
          err instanceof Error ? err.message : "Failed to fetch communities";
      } finally {
        this.loading = false;
      }
    },
  },
});
