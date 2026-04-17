import type { Company } from "./company";

export interface Brand {
  id: number;
  company_id: number;
  company: Company;
  parent_id: number | null;
  name: string;
  slug: string;
  desc: string;
  logo_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
