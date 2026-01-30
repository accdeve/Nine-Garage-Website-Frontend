export type AvailabilityStatus = "available" | "booked" | "locked";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "no_show";

export interface BookingAvailability {
  hour: string;
  status: AvailabilityStatus;
}

export interface BookingPreviewRequest {
  workshop_id: number;
  booking_date: string;
  hour: string;
  customer_phone: string;
}

export interface BookingFormData {
  workshop_id: number;
  customer_name: string;
  customer_phone: string;
  vehicle_model: string;
  vehicle_plat: string;
  vehicle_color: string;
  booking_date: string;
  hour: string | null;
  branch: string;
  source: string;
  notes: string;
  variant_items: { variant_id: number; qty: number }[];
  package_items: { package_id: number }[];
  service_items: { service_id: number }[];
}

export interface BookingVariantItem {
  id: number;
  booking_id: number;
  variant_id: number;
  qty: number;
  created_at: string;
}

export interface BookingPackageItem {
  id: number;
  booking_id: number;
  package_id: number;
  created_at: string;
}

export interface BookingServiceItem {
  id: number;
  booking_id: number;
  service_id: number;
  created_at: string;
}

export interface Booking {
  id: number;
  booking_ticket?: number;
  customer_id?: number;
  workshop_id: number;
  customer_name: string;
  customer_phone: string;
  vehicle_plat: string;
  vehicle_model: string;
  vehicle_color: string;
  booking_date: string;
  hour: string;
  source: string;
  status: BookingStatus;
  notes?: string;
  variant_items?: BookingVariantItem[];
  package_items?: BookingPackageItem[];
  service_items?: BookingServiceItem[];
  created_at: string;
  updated_at: string;
}

export interface BookingResponse {
  status: string;
  code: number;
  message: string;
  data: Booking;
}
