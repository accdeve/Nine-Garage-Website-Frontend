export interface Warehouse {
  id: number;
  parent_id: number | null;
  name: string;
  city: string;
  address: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Workshop {
  id: number;
  warehouse_id: number;
  warehouse: Warehouse;
  name: string;
  address: string;
  geo_coordinates: string;
  maps_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
