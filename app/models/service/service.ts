export interface Service {
  id: number;
  name: string;
  short_desc: string;
  vehicle_type: "car" | "motorcycle" | "both";
  estimated_minutes: number;
  default_technician_count: number;
  warranty_months: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
