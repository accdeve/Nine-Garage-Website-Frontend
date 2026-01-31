import { bookingService } from "~/services/booking/booking.service";
import { ApiError } from "~/utils/api";
import { today, getLocalTimeZone } from "@internationalized/date";
import type { BookingStore } from "../types";
import type { Workshop } from "~/models/workshop/workshop";

export const bookingActions = {
  togglePreview(this: BookingStore, val: boolean) {
    if (!val && this.openPreview) {
      this.cancelPreview();
      return;
    }
    this.openPreview = val;
    if (!val) {
      this.stopCountdown();
    }
  },

  async requestPreview(this: BookingStore) {
    if (
      !this.formData.workshop_id ||
      !this.formData.booking_date ||
      !this.formData.hour ||
      !this.formData.customer_phone
    ) {
      this.error =
        "Silakan lengkapi data diri dan nomor WhatsApp terlebih dahulu.";
      return;
    }

    this.submitting = true;
    this.error = null;

    const workshop = this.workshops.find(
      (w: Workshop) => w.name === this.formData.branch,
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

  async cancelPreview(this: BookingStore) {
    if (!this.formData.hour) return;

    try {
      await bookingService.cancelPreviewBooking({
        workshop_id: this.formData.workshop_id,
        booking_date: this.formData.booking_date,
        hour: this.formData.hour,
        customer_phone: this.formData.customer_phone,
      });
      this.openPreview = false;
      this.stopCountdown();
    } catch (err: unknown) {
      console.error("Failed to cancel preview", err);
    }
  },

  async submitBooking(this: BookingStore) {
    this.submitting = true;
    this.error = null;
    this.success = false;

    const workshop = this.workshops.find(
      (w: Workshop) => w.name === this.formData.branch,
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

  resetForm(this: BookingStore) {
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
      (w: Workshop) => w.name === this.formData.branch,
    );
    if (workshop) {
      this.formData.workshop_id = workshop.id;
    }

    this.error = null;
    this.success = false;
    this.fetchAvailability();
  },
};
