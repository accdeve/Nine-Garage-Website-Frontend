<script setup lang="ts">
import { useHomeStore } from "~/stores/home";

const homeStore = useHomeStore();
</script>

<template>
  <section v-if="homeStore.carousel.length > 0">
    <UCarousel
      v-slot="{ item }"
      loop
      :autoplay="{ delay: 4000 }"
      :items="homeStore.carousel"
      :ui="{ item: 'basis-full' }"
    >
      <img
        :src="item.image_url"
        :alt="item.name"
        class="w-full h-60 object-cover rounded-lg"
      >
    </UCarousel>
  </section>
  <section
    v-else
    class="w-full h-60 bg-neutral-200 rounded-lg flex items-center justify-center"
  />
</template>
