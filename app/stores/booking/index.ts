import { defineStore } from "pinia";
import type { BookingState } from "./types";
import { bookingService } from "~/services/booking/booking.service";
import { today, getLocalTimeZone } from "@internationalized/date";

export const useBookingStore = defineStore("booking", {
  state: (): BookingState => ({
    formData: {
      nama: "",
      phone: "",
      vehicle: "",
      plate: "",
      vehicleColor: "",
      date: today(getLocalTimeZone()).toString(),
      hour: null,
      branch: "Jelambar",
      products: [],
      source: "Online",
    },
    branches: ["Jl Arcadia Daan Mogot", "Jelambar"],
    sources: ["Online", "Workshop"],
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
  }),

  getters: {
    isFormComplete: (state) => {
      const { formData } = state;
      return !!(
        formData.nama &&
        formData.phone &&
        formData.vehicle &&
        formData.plate &&
        formData.vehicleColor &&
        formData.hour !== null &&
        formData.branch &&
        formData.products.length > 0 &&
        formData.source
      );
    },
    formattedTimeLeft: (state) => {
      const minutes = Math.floor(state.timeLeft / 60);
      const seconds = state.timeLeft % 60;
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    },
  },

  actions: {
    // UI Actions
    togglePreview(val: boolean) {
      if (val && !this.isFormComplete) return;
      this.openPreview = val;
      if (!val) {
        this.stopCountdown();
      }
    },

    setProducts(productNames: string[]) {
      this.productOptions = productNames;
    },

    async fetchInitialData() {
      this.loading = true;
      try {
        await this.fetchAvailability();
      } catch (err) {
        console.error("Failed to fetch booking initial data", err);
      } finally {
        this.loading = false;
      }
    },

    async fetchAvailability() {
      // Using default workshop_id = 1 for now
      try {
        const response = await bookingService.getAvailability(
          1,
          this.formData.date,
        );
        this.availability = response.data;
      } catch (err) {
        console.error("Failed to fetch availability", err);
      }
    },

    async requestPreview() {
      if (!this.isFormComplete || !this.formData.hour) return;

      this.submitting = true;
      this.error = null;

      try {
        await bookingService.previewBooking({
          workshop_id: 1, // Default mapping
          date: this.formData.date,
          hour: this.formData.hour,
          phone: this.formData.phone,
        });

        this.openPreview = true;
        this.startCountdown(180); // 3 minutes
      } catch (err: any) {
        if (err.statusCode === 409) {
          this.error =
            "Slot waktu ini sudah dipesan atau sedang dikunci orang lain. Silakan pilih waktu lain.";
        } else {
          this.error =
            err.message || "Gagal mengunci slot waktu. Silakan coba lagi.";
        }
        // Refresh availability to show the locked status
        this.fetchAvailability();
      } finally {
        this.submitting = false;
      }
    },

    startCountdown(seconds: number) {
      this.stopCountdown();
      this.timeLeft = seconds;
      this.timerInterval = setInterval(() => {
        this.timeLeft--;
        if (this.timeLeft <= 0) {
          this.stopCountdown();
          this.togglePreview(false);
          this.error = "Sesi preview telah berakhir. Silakan pilih kembali.";
        }
      }, 1000);
    },

    stopCountdown() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
      this.timeLeft = 0;
    },

    async submitBooking() {
      this.submitting = true;
      this.error = null;
      this.success = false;

      try {
        const response = await bookingService.submitBooking(this.formData);
        this.lastBooking = response.data;
        this.success = true;
        this.openPreview = false;
        this.stopCountdown();
        this.resetForm();
        return true;
      } catch (err) {
        this.error =
          err instanceof Error
            ? err.message
            : "Gagal membuat booking. Silakan coba lagi.";
        return false;
      } finally {
        this.submitting = false;
      }
    },

    resetForm() {
      this.formData = {
        nama: "",
        phone: "",
        vehicle: "",
        plate: "",
        vehicleColor: "",
        date: today(getLocalTimeZone()).toString(),
        hour: null,
        branch: "Jelambar",
        products: [],
        source: "Online",
      };
      this.error = null;
      this.success = false;
      this.fetchAvailability();
    },
  },
});
