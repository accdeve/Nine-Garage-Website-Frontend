import type { BookingState } from "./types";

export const getters = {
  isFormComplete: (state: BookingState) => {
    const { formData } = state;
    return !!(
      formData.customer_name &&
      formData.customer_phone &&
      formData.vehicle_model &&
      formData.vehicle_plat &&
      formData.vehicle_color &&
      formData.hour !== null &&
      formData.branch &&
      (formData.variant_items.length > 0 ||
        formData.package_items.length > 0 ||
        formData.service_items.length > 0) &&
      formData.source
    );
  },
  formattedTimeLeft: (state: BookingState) => {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  },
};
