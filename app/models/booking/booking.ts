export type AvailabilityStatus = "available" | "booked" | "locked";

export interface BookingAvailability {
  hour: string;
  status: AvailabilityStatus;
}

export interface BookingPreviewRequest {
  workshop_id: number;
  date: string;
  hour: string;
  phone: string;
}

export interface BookingFormData {
  nama: string;
  phone: string;
  vehicle: string;
  plate: string;
  vehicleColor: string;
  date: string;
  hour: string | null;
  branch: string;
  products: string[];
  source: string;
}

export interface Booking {
  id?: number;
  kode_booking: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface BookingResponse {
  status: string;
  code: number;
  message: string;
  data: Booking;
}
