import type { BookingStore } from "../types";
import { useRuntimeConfig } from "#imports";

let refreshTimeout: ReturnType<typeof setTimeout> | null = null;
let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

export const sseActions = {
  subscribeToUpdates(this: BookingStore) {
    // 1. Close existing connection if any
    this.unsubscribeFromUpdates();

    const config = useRuntimeConfig();

    // Use the latest workshop_id from state
    const workshopId = this.formData.workshop_id;
    const bookingDate = this.formData.booking_date;

    // Don't subscribe if we don't have basic info
    if (!workshopId || !bookingDate) {
      console.warn(
        "[SSE] Skipping subscription: workshopId or bookingDate missing",
        { workshopId, bookingDate },
      );
      return;
    }

    const apiBase = config.public.apiBaseUrl || "";
    const apiBaseClean = apiBase.endsWith("/") ? apiBase.slice(0, -1) : apiBase;

    // Construct URL - Menggunakan /stream sesuai informasi backend terbaru
    const url = `${apiBaseClean}/bookings/updates?workshop_id=${workshopId}&date=${bookingDate}`;

    console.log(`[SSE] Attempting connection:`, {
      url,
      workshopId,
      bookingDate,
    });

    try {
      this.sseInstance = new EventSource(url);

      this.sseInstance.onopen = () => {
        console.log(
          `[SSE] Connected to /stream for workshop ${workshopId} on ${bookingDate}`,
        );
        // Immediately fetch availability on connect to ensure we are up to date
        this.fetchAvailability();
      };

      this.sseInstance.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          console.log(`[SSE] Message received:`, payload);

          // Flexible filtering: handle both 'date' and 'booking_date'
          const updateDate = payload.booking_date || payload.date;
          const isDifferentWorkshop =
            payload.workshop_id && payload.workshop_id != workshopId;
          const isDifferentDate = updateDate && updateDate !== bookingDate;

          if (isDifferentWorkshop || isDifferentDate) {
            console.log("[SSE] Message ignored due to mismatch", {
              payload,
              current: { workshopId, bookingDate },
            });
            return;
          }

          // Any message on this stream should trigger a refresh to be safe
          console.log(
            `[SSE] Triggering refresh due to event: ${payload.status || "message"}`,
          );

          if (refreshTimeout) clearTimeout(refreshTimeout);
          refreshTimeout = setTimeout(() => {
            this.fetchAvailability();
          }, 250);
        } catch (err) {
          console.error("[SSE] Error parsing event data:", err);
          // If we can't parse it but got a message, maybe still refresh?
          this.fetchAvailability();
        }
      };

      this.sseInstance.onerror = (err) => {
        console.warn("[SSE] Connection error. Reconnecting in 2s...", err);
        this.unsubscribeFromUpdates();

        if (reconnectTimeout) clearTimeout(reconnectTimeout);
        reconnectTimeout = setTimeout(() => {
          this.subscribeToUpdates();
        }, 2000);
      };
    } catch (err) {
      console.error("[SSE] Failed to initialize EventSource:", err);
    }
  },

  unsubscribeFromUpdates(this: BookingStore) {
    if (this.sseInstance) {
      console.log("[SSE] Closing connection");
      this.sseInstance.close();
      this.sseInstance = null;
    }

    if (refreshTimeout) {
      clearTimeout(refreshTimeout);
      refreshTimeout = null;
    }

    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }
  },
};
