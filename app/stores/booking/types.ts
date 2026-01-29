import type {
  BookingFormData,
  Booking,
  BookingAvailability,
} from "~/models/booking/booking";

export interface BookingState {
  formData: BookingFormData;
  branches: string[];
  sources: string[];
  productOptions: string[];
  availability: BookingAvailability[];
  lastBooking: Booking | null;
  loading: boolean;
  submitting: boolean;
  error: string | null;
  success: boolean;
  openPreview: boolean;
  timeLeft: number;
  timerInterval: any | null;
}
