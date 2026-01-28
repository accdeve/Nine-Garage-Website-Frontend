export interface Booking {
  kode_booking: string;
  status?: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
}
