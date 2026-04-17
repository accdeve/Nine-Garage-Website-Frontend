import { apiGet } from "~/utils/api";
import type { ApiResponse } from "~/models/api";
import type { Workshop } from "~/models/workshop/workshop";

export const workshopService = {
  getWorkshops() {
    return apiGet<ApiResponse<Workshop[]>>("/workshops");
  },
};
