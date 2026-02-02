import { defineStore } from "pinia";
import type { ServiceState } from "./types";
import { serviceService } from "~/services/service/service.service";

export const useServiceStore = defineStore("service", {
  state: (): ServiceState => ({
    services: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchServices() {
      this.loading = true;
      this.error = null;

      try {
        const response = await serviceService.getServices();
        this.services = Array.isArray(response.data) ? response.data : [];
      } catch (err) {
        console.error("Fetch services error:", err);
        this.error =
          err instanceof Error ? err.message : "Failed to fetch services";
      } finally {
        this.loading = false;
      }
    },
  },
});
