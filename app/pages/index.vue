<script setup lang="ts">
import { useHomeStore } from "~/stores/home";
import { homeService } from "~/services/home/home.service";

const homeStore = useHomeStore();

// 1. Carousel - Load lazily but start immediately
const { data: carouselResponse } = useLazyAsyncData("home-carousel", () =>
  homeService.getCarousel(),
);

watch(
  carouselResponse,
  (newVal) => {
    if (newVal?.data) homeStore.carousel = newVal.data;
  },
  { immediate: true },
);
</script>

<template>
  <div class="">
    <HomeCarousel />
    <HomeProducts />

    <HomeChangeBooking />
    <HomeFindUs />
    <HomeWhyUs />

    <HomePartner />
    <hr class="ml-5 mr-5 border-t-2 border-neutral-300 mt-15 mb-5" >
    <HomeComments />
    <hr class="ml-5 mr-5 border-t-2 border-neutral-300 mt-15 mb-5" >
    <HomeFaq />
  </div>
</template>
