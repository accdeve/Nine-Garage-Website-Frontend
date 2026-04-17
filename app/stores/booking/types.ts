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
  serviceOptions: string[];
  availability: BookingAvailability[];
  lastBooking: Booking | null;
  originalBooking: Booking | null;
  loading: boolean;
  submitting: boolean;
  error: string | null;
  success: boolean;
  openPreview: boolean;
  timeLeft: number;
  timerInterval: ReturnType<typeof setInterval> | null;
  sseInstance: EventSource | null;
  editingId: number | null;
}

export interface BookingGetters {
  isFormComplete: boolean;
  formattedTimeLeft: string;
}

export interface BookingActions {
  togglePreview(val: boolean): void;
  setServices(services: { name: string; id: number }[]): void;
  fetchInitialData(): Promise<void>;
  fetchWorkshops(): Promise<void>;
  fetchAvailability(): Promise<void>;
  requestPreview(): Promise<void>;
  cancelPreview(): Promise<void>;
  startCountdown(seconds: number): void;
  stopCountdown(): void;
  submitBooking(): Promise<boolean>;
  checkBooking(ticket: string): Promise<boolean>;
  resetForm(): void;
  subscribeToUpdates(): void;
  unsubscribeFromUpdates(): void;
}

export type BookingStore = BookingState & BookingGetters & BookingActions;
