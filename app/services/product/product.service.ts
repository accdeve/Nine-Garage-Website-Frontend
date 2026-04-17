import { apiGet } from "~/utils/api";
import type { ApiResponse } from "~/models/api";
import type { Product } from "~/models/product/product";

export const productService = {
  getProducts(page: number = 1) {
    return apiGet<ApiResponse<Product[]>>("/products", {
      page,
    });
  },

  getProductBySlug(slug: string) {
    return apiGet<ApiResponse<Product>>(`/products/${slug}`);
  },
};
