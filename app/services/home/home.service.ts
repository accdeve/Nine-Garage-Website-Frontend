import { apiGet } from "~/utils/api";
import type { ApiResponse } from "~/models/api";
import type { Carousel } from "~/models/home/carousel";
import type { Product } from "~/models/home/product";
import type { Community } from "~/models/home/community";
import type { FAQ } from "~/models/home/faq";

export const homeService = {
  getCarousel() {
    return apiGet<ApiResponse<Carousel[]>>("/carousels");
  },

  getProducts() {
    return apiGet<ApiResponse<Product[]>>("/products");
  },

  getCommunities() {
    return apiGet<ApiResponse<Community[]>>("/communities");
  },

  getFaqs() {
    return apiGet<ApiResponse<FAQ[]>>("/faqs");
  },
};
