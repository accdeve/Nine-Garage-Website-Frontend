import type { Service } from "~/models/service/service";

export interface ServiceState {
  services: Service[];
  loading: boolean;
  error: string | null;
}
