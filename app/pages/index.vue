<script setup lang="ts">
import { useHomeStore } from "~/stores/home";
import { useProductStore } from "~/stores/product";
import { homeService } from "~/services/home/home.service";
import { productService } from "~/services/product/product.service";
import HomeProducts from "./home/HomeProducts.vue";
import HomeFindUs from "./home/HomeFindUs.vue";
import HomeFaq from "./home/HomeFaq.vue";
import HomeCarousel from "./home/HomeCarousel.vue";
import HomeWhyUs from "./home/HomeWhyUs.vue";
import HomeComments from "./home/HomeComments.vue";
import HomePartner from "./home/HomePartner.vue";
import HomeChangeBooking from "./home/HomeChangeBooking.vue";

const homeStore = useHomeStore();
const productStore = useProductStore();

// 1. Carousel - Load lazily but start immediately
const { data: carouselResponse } = useLazyAsyncData("home-carousel", () =>
  homeService.getCarousel(),
);

// 2. Products - Load lazily
const { data: productsResponse, pending: productsPending } = useLazyAsyncData(
  "home-products",
  () => productService.getProducts(),
);

// 3. Communities - Load lazily
const { data: communitiesResponse, pending: communitiesPending } =
  useLazyAsyncData("home-communities", () => homeService.getCommunities());

watch(
  carouselResponse,
  (newVal) => {
    if (newVal?.data) homeStore.carousel = newVal.data;
  },
  { immediate: true },
);

watch(
  productsResponse,
  (newVal) => {
    if (newVal) productStore.setProductsResponse(newVal);
  },
  { immediate: true },
);

watch(
  productsPending,
  (newVal) => {
    productStore.loading = newVal;
  },
  { immediate: true },
);

watch(
  communitiesResponse,
  (newVal) => {
    if (newVal?.data) homeStore.communities = newVal.data;
  },
  { immediate: true },
);

watch(
  communitiesPending,
  (newVal) => {
    homeStore.loading = newVal;
  },
  { immediate: true },
);
</script>

<template>
  <div class="">
    <HomeCarousel />
    <HomeProducts />
    <HomeChangeBooking/>
    <hr class="ml-5 mr-5 border-t-2 border-neutral-300 mt-5 mb-5" >
    <HomeFindUs />
    <HomeWhyUs />
    <HomePartner />
    <hr class="ml-5 mr-5 border-t-2 border-neutral-300 mt-15 mb-5" >
    <HomeComments />
    <hr class="ml-5 mr-5 border-t-2 border-neutral-300 mt-15 mb-5" >
    <HomeFaq />
  </div>
</template>
