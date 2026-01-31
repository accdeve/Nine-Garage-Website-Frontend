import { workshopService } from "~/services/workshop/workshop.service";
import type { BookingStore } from "../types";
import type { Workshop } from "~/models/workshop/workshop";

export const workshopActions = {
  async fetchInitialData(this: BookingStore) {
    this.loading = true;
    try {
      await this.fetchWorkshops();
      await this.fetchAvailability();
    } catch (err: unknown) {
      console.error("Failed to fetch booking initial data", err);
    } finally {
      this.loading = false;
    }
  },

  async fetchWorkshops(this: BookingStore) {
    try {
      const response = await workshopService.getWorkshops();
      this.workshops = response.data;
      this.branches = response.data.map((w: Workshop) => w.name);

      // Set default branch if not set
      if (this.branches.length > 0 && !this.formData.branch) {
        this.formData.branch = this.branches[0] || "";
      }

      const workshop = this.workshops.find(
        (w: Workshop) => w.name === this.formData.branch,
      );
      if (workshop) {
        this.formData.workshop_id = workshop.id;
      }
    } catch (err: unknown) {
      console.error("Failed to fetch workshops", err);
    }
  },

  setProducts(this: BookingStore, products: { name: string; id: number }[]) {
    this.productOptions = products.map((p) => p.name);
  },
};
