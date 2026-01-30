import { defineStore } from "pinia";
import type { BookingState } from "./types";
import { bookingService } from "~/services/booking/booking.service";
import { workshopService } from "~/services/workshop/workshop.service";
import { ApiError } from "~/utils/api";
import { today, getLocalTimeZone } from "@internationalized/date";

export const useBookingStore = defineStore("booking", {
  state: (): BookingState => ({
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
  }),

  getters: {
    isFormComplete: (state) => {
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

    setProducts(products: { name: string; id: number }[]) {
      this.productOptions = products.map((p) => p.name);
    },

    async fetchInitialData() {
      this.loading = true;
      try {
        await this.fetchWorkshops();
        await this.fetchAvailability();
      } catch (err: unknown) {
        console.error("Failed to fetch booking initial data", err);
      } finally {
        this.loading = false;
      }
    },

    async fetchWorkshops() {
      try {
        const response = await workshopService.getWorkshops();
        this.workshops = response.data;
        this.branches = response.data.map((w) => w.name);

        // Set default branch if not set
        if (this.branches.length > 0 && !this.formData.branch) {
          this.formData.branch = this.branches[0] || "";
        }

        const workshop = this.workshops.find(
          (w) => w.name === this.formData.branch,
        );
        if (workshop) {
          this.formData.workshop_id = workshop.id;
        }
      } catch (err: unknown) {
        console.error("Failed to fetch workshops", err);
      }
    },

    async fetchAvailability() {
      const workshop = this.workshops.find(
        (w) => w.name === this.formData.branch,
      );

      // Default to 1 if not found, or handle error
      const workshopId = workshop ? workshop.id : 1;

      try {
        const response = await bookingService.getAvailability(
          workshopId,
          this.formData.booking_date,
        );
        this.availability = response.data;
      } catch (err: unknown) {
        console.error("Failed to fetch availability", err);
      }
    },

    async requestPreview() {
      if (!this.isFormComplete || !this.formData.hour) return;

      this.submitting = true;
      this.error = null;

      const workshop = this.workshops.find(
        (w) => w.name === this.formData.branch,
      );
      if (workshop) {
        this.formData.workshop_id = workshop.id;
      }

      try {
        await bookingService.previewBooking({
          workshop_id: this.formData.workshop_id,
          booking_date: this.formData.booking_date,
          hour: this.formData.hour,
          customer_phone: this.formData.customer_phone,
        });

        this.openPreview = true;
        this.startCountdown(180); // 3 minutes
      } catch (err: unknown) {
        if (err instanceof ApiError && err.statusCode === 409) {
          this.error =
            "Slot waktu ini sudah dipesan atau sedang dikunci orang lain. Silakan pilih waktu lain.";
        } else {
          this.error =
            (err instanceof Error ? err.message : "") ||
            "Gagal mengunci slot waktu. Silakan coba lagi.";
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

      const workshop = this.workshops.find(
        (w) => w.name === this.formData.branch,
      );
      if (workshop) {
        this.formData.workshop_id = workshop.id;
      }

      try {
        const response = await bookingService.submitBooking(this.formData);
        this.lastBooking = response.data;
        this.success = true;
        this.openPreview = false;
        this.stopCountdown();
        this.resetForm();
        return true;
      } catch (err: unknown) {
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
        workshop_id: 0,
        customer_name: "",
        customer_phone: "",
        vehicle_model: "",
        vehicle_plat: "",
        vehicle_color: "",
        booking_date: today(getLocalTimeZone()).toString(),
        hour: null,
        branch: this.branches[0] || "",
        notes: "",
        variant_items: [],
        package_items: [],
        service_items: [],
        source: "website",
      };

      const workshop = this.workshops.find(
        (w) => w.name === this.formData.branch,
      );
      if (workshop) {
        this.formData.workshop_id = workshop.id;
      }

      this.error = null;
      this.success = false;
      this.fetchAvailability();
    },
  },
});
