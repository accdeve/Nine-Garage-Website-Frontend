import { apiGet } from "~/utils/api";
import type { ApiResponse } from "~/models/api";
import type { Carousel } from "~/models/home/carousel";
import type { Community } from "~/models/home/community";

export const homeService = {
  getCarousel() {
    return apiGet<ApiResponse<Carousel[]>>("/carousels");
  },

  getCommunities() {
    return apiGet<ApiResponse<Community[]>>("/communities");
  },
};
