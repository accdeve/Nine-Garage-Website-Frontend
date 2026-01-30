import type {
  Booking,
  BookingAvailability,
  BookingFormData,
} from "~/models/booking/booking";
import type { Workshop } from "~/models/workshop/workshop";

export interface BookingState {
  formData: BookingFormData;
  branches: string[];
  workshops: Workshop[];
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
  timerInterval: ReturnType<typeof setInterval> | null;
}
