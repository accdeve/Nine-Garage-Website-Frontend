import { defineStore } from "pinia";
import type { ProductState } from "./types";
import { productService } from "~/services/product/product.service";

export const useProductStore = defineStore("product", {
  state: (): ProductState => ({
    products: [],
    currentProduct: null,
    meta: null,
    loading: false,
    loadingMore: false,
    error: null,
  }),

  getters: {
    getProductById: (state) => (id: number) =>
      state.products.find((p) => p.id === id),
    hasMore: (state) => {
      if (!state.meta) return false;
      return state.meta.page < state.meta.total_page;
    },
  },

  actions: {
    async fetchProducts(isNextPage: boolean = false) {
      if (this.loading || (isNextPage && this.loadingMore)) return;

      if (isNextPage && !this.hasMore) return;

      if (isNextPage) {
        this.loadingMore = true;
      } else {
        this.loading = true;
      }

      this.error = null;

      try {
        const nextPage = isNextPage && this.meta ? this.meta.page + 1 : 1;
        const response = await productService.getProducts(nextPage);
        const responseData = Array.isArray(response.data) ? response.data : [];

        if (isNextPage) {
          const newProducts = responseData.filter(
            (newP) => !this.products.some((oldP) => oldP.id === newP.id),
          );
          this.products.push(...newProducts);
        } else {
          this.products = responseData;
        }

        if (response.meta) {
          this.meta = response.meta;
        }
      } catch (err) {
        console.error("Fetch products error:", err);
        this.error =
          err instanceof Error ? err.message : "Failed to fetch products";
      } finally {
        this.loading = false;
        this.loadingMore = false;
      }
    },

    async fetchProductBySlug(slug: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await productService.getProductBySlug(slug);
        this.currentProduct = response.data;
      } catch (err) {
        console.error("Fetch product detail error:", err);
        this.error =
          err instanceof Error ? err.message : "Failed to fetch product detail";
      } finally {
        this.loading = false;
      }
    },

    setProductsResponse(data: { data?: any[]; meta?: any } | null) {
      if (data && data.data) {
        this.products = data.data;
        if (data.meta) {
          this.meta = data.meta;
        }
      }
    },
  },
});
