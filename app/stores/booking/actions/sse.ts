import type { BookingStore } from "../types";

export const sseActions = {
  subscribeToUpdates(this: BookingStore) {
    // 1. Close existing connection if any
    this.unsubscribeFromUpdates();

    const config = useRuntimeConfig();
    const workshopId = this.formData.workshop_id;
    const bookingDate = this.formData.booking_date;

    // Use default if workshopId is not set yet
    const targetId = workshopId || 1;

    const url = `${config.public.apiBaseUrl}/bookings/stream?workshop_id=${targetId}&date=${bookingDate}`;

    console.log(`[SSE] Connecting to: ${url}`);

    this.sseInstance = new EventSource(url);

    this.sseInstance.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data);
        console.log(`[SSE] Received update:`, update);

        const slot = this.availability.find((s) => s.hour === update.hour);
        if (slot) {
          slot.status = update.status;
        }
      } catch (err) {
        console.error("[SSE] Error parsing event data", err);
      }
    };

    this.sseInstance.onerror = (err) => {
      console.error("[SSE] Connection failed", err);
      this.unsubscribeFromUpdates();
    };
  },

  unsubscribeFromUpdates(this: BookingStore) {
    if (this.sseInstance) {
      console.log("[SSE] Closing connection");
      this.sseInstance.close();
      this.sseInstance = null;
    }
  },
};
