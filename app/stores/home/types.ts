import type { Carousel } from "~/models/home/carousel";
import type { Product } from "~/models/home/product";
import type { Community } from "~/models/home/community";
import type { FAQ } from "~/models/home/faq";

export interface HomeState {
  carousel: Carousel[];
  products: Product[];
  communities: Community[];
  faqs: FAQ[];
  loading: boolean;
  error: string | null;
}
