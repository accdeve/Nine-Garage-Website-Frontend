import { bookingService } from "~/services/booking/booking.service";
import type { BookingStore } from "../types";
import type { Workshop } from "~/models/workshop/workshop";

export const availabilityActions = {
  async fetchAvailability(this: BookingStore) {
    const workshop = this.workshops.find(
      (w: Workshop) => w.name === this.formData.branch,
    );

    // Default to 1 if not found, or handle error
    const workshopId = workshop ? workshop.id : 1;

    try {
      const response = await bookingService.getAvailability(
        workshopId,
        this.formData.booking_date,
      );
      this.availability = response.data;
    } catch (err: unknown) {
      console.error("Failed to fetch availability", err);
    }
  },
};
