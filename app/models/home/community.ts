export interface Community {
  id: number;
  brand_id: number | null;
  name: string;
  address: string;
  city: string;
  logo_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
