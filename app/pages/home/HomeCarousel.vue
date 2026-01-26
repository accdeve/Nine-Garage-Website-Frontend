<script setup lang="ts">
const items = [
  "https://picsum.photos/1200/600?random=1",
  "https://picsum.photos/1200/600?random=2",
  "https://picsum.photos/1200/600?random=3",
  "https://picsum.photos/1200/600?random=4",
  "https://picsum.photos/1200/600?random=5",
  "https://picsum.photos/1200/600?random=6"
  ,
];
</script>

<template>
  <section>
    <UCarousel
      v-slot="{ item }"
      loop
      :autoplay="{ delay: 4000 }"
      :items="items"
      :ui="{ item: 'basis-full' }"
    >
      <img :src="item" class="w-full h-60 object-cover rounded-lg" >
    </UCarousel>
  </section>
</template>
