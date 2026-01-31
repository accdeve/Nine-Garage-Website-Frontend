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
  sseInstance: EventSource | null;
}

export interface BookingGetters {
  isFormComplete: boolean;
  formattedTimeLeft: string;
}

export interface BookingActions {
  togglePreview(val: boolean): void;
  setProducts(products: { name: string; id: number }[]): void;
  fetchInitialData(): Promise<void>;
  fetchWorkshops(): Promise<void>;
  fetchAvailability(): Promise<void>;
  requestPreview(): Promise<void>;
  cancelPreview(): Promise<void>;
  startCountdown(seconds: number): void;
  stopCountdown(): void;
  submitBooking(): Promise<boolean>;
  resetForm(): void;
  subscribeToUpdates(): void;
  unsubscribeFromUpdates(): void;
}

export type BookingStore = BookingState & BookingGetters & BookingActions;
