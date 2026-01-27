<script setup lang="ts">
// import HomeSearch from "./home/HomeSearch.vue";
import HomeCarousel from "./home/HomeCarousel.vue";
import HomeProducts from "./home/HomeProducts.vue";
import HomeChangeBooking from "./home/HomeChangeBooking.vue";
import HomeFindUs from "./home/HomeFindUs.vue";
import HomeWhyUs from "./home/HomeWhyUs.vue";
import HomePartner from "./home/HomePartner.vue";
import HomeComments from "./home/HomeComments.vue";
import HomeFaq from "./home/HomeFaq.vue";
</script>

<template>
  <div class="">
    <!-- <HomeSearch /> -->
    <HomeCarousel />
    <HomeProducts />
    <hr class="ml-5 mr-5 border-t-2 border-neutral-300 mb-5 mt-5">
    <HomeChangeBooking />
    <HomeFindUs />
    <HomeWhyUs />
    <hr class="ml-5 mr-5 border-t-2 border-neutral-300 mt-15">
    <HomePartner />
    <hr class="ml-5 mr-5 border-t-2 border-neutral-300 mt-15 mb-5">
    <HomeComments />
    <hr class="ml-5 mr-5 border-t-2 border-neutral-300 mt-15 mb-5">
    <!-- <HomeArticle /> -->
    <HomeFaq />
  </div>
</template>
