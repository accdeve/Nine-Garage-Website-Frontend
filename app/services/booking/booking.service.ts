import { apiGet, apiPost, apiPatch } from "~/utils/api";
import type { ApiResponse } from "~/models/api";
import type {
  BookingFormData,
  Booking,
  BookingAvailability,
  BookingPreviewRequest,
} from "~/models/booking/booking";

export const bookingService = {
  getBranches() {
    return apiGet<ApiResponse<string[]>>("/branches");
  },

  getSources() {
    return apiGet<ApiResponse<string[]>>("/sources");
  },

  getAvailability(workshopId: number, date: string) {
    return apiGet<ApiResponse<BookingAvailability[]>>(
      "/bookings/availability",
      {
        workshop_id: workshopId,
        booking_date: date,
      },
    );
  },

  getBooking(bookingTicket: string) {
    return apiGet<ApiResponse<Booking>>(`/bookings/${bookingTicket}`);
  },

  updateBooking(id: number, data: BookingFormData) {
    return apiPatch<ApiResponse<Booking>>(`/bookings/${id}`, data);
  },

  previewBooking(data: BookingPreviewRequest) {
    return apiPost<ApiResponse<null>>("/bookings/preview", data);
  },

  cancelPreviewBooking(data: BookingPreviewRequest) {
    return apiPost<ApiResponse<null>>("/bookings/cancel-preview", data);
  },

  submitBooking(data: BookingFormData) {
    return apiPost<ApiResponse<Booking>>("/bookings", data);
  },
};
