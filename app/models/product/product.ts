import type { Brand } from "./brand";
import type { Category } from "./category";

export interface Product {
  id: number;
  brand_id: number;
  brand: Brand;
  category_id: number;
  category: Category;
  name: string;
  slug: string;
  short_desc: string;
  desc: string;
  meta_title: string;
  meta_desc: string;
  is_active: boolean;
  image_url: string;
  created_at: string;
  updated_at: string;
}
