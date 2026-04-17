import type { Carousel } from "~/models/home/carousel";
import type { Community } from "~/models/home/community";

export interface HomeState {
  carousel: Carousel[];
  communities: Community[];
  loading: boolean;
  error: string | null;
}
