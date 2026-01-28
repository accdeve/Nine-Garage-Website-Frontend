import { defineStore } from "pinia";
import type { HomeState } from "./types";
import { homeService } from "~/services/home/home.service";

export const useHomeStore = defineStore("home", {
  state: (): HomeState => ({
    carousel: [],
    products: [],
    communities: [],
    faqs: [],
    loading: false,
    error: null,
  }),

  getters: {
    hasProducts: (state) => state.products.length > 0,
    faqCount: (state) => state.faqs.length,
  },

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

    async fetchProducts() {
      if (this.products.length > 0) return;
      this.loading = true;
      try {
        const response = await homeService.getProducts();
        this.products = response.data;
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

    async fetchFaqs() {
      if (this.faqs.length > 0) return;
      this.loading = true;
      try {
        const response = await homeService.getFaqs();
        this.faqs = response.data;
      } catch (err) {
        this.error =
          err instanceof Error ? err.message : "Failed to fetch FAQs";
      } finally {
        this.loading = false;
      }
    },
  },
});
