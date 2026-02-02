import { apiGet } from "~/utils/api";
import type { ApiResponse } from "~/models/api";
import type { Service } from "~/models/service/service";

export const serviceService = {
  getServices() {
    return apiGet<ApiResponse<Service[]>>("/services");
  },
};
