import { today, getLocalTimeZone } from "@internationalized/date";
import type { BookingState } from "./types";

export const createState = (): BookingState => ({
  formData: {
    workshop_id: 0,
    customer_name: "",
    customer_phone: "",
    vehicle_model: "",
    vehicle_plat: "",
    vehicle_color: "",
    booking_date: today(getLocalTimeZone()).toString(),
    hour: null,
    branch: "",
    notes: "",
    variant_items: [],
    package_items: [],
    service_items: [],
    source: "Website",
  },
  branches: [],
  workshops: [],
  sources: ["Online", "Offline", "Website"],

  productOptions: [],
  availability: [],
  lastBooking: null,
  loading: false,
  submitting: false,
  error: null,
  success: false,
  openPreview: false,
  timeLeft: 0,
  timerInterval: null,
  sseInstance: null,
});
