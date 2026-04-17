import type { BookingStore } from "../types";

export const timerActions = {
  startCountdown(this: BookingStore, seconds: number) {
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

  stopCountdown(this: BookingStore) {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.timeLeft = 0;
  },
};
