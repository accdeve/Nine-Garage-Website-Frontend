import type { Product } from "~/models/product/product";
import type { ApiMeta } from "~/models/api";

export interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  meta: ApiMeta | null;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
}
