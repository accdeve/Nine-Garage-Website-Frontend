<script setup lang="ts">
import CommunityGallery from './CommunityGallery.vue';
import CommunityLeaderboard from './CommunityLeaderboard.vue';


// const itemsFilter: DropdownMenuItem[][] = [
//   [
//     { label: "Bulanan" },
//     { label: "Tahunan" },
//     { label: "All Time" },
//   ],
// ];

const carousel = [
  "https://picsum.photos/1200/600?random=1",
  "https://picsum.photos/1200/600?random=2",
  "https://picsum.photos/1200/600?random=3",
];

</script>

<template>
  <section class="min-h-screen flex justify-center px-4 py-10">
    <div class="w-full max-w-sm">
      <UBreadcrumb
        :items="[
          { label: 'Home', to: '/' },
          { label: 'Nine Partner Community', to: '/community' },
        ]"
        class="mb-4"
      />

      <UCarousel
        v-slot="{ item }"
        loop
        :items="carousel"
        :autoplay="{ delay: 2000 }"
        :ui="{ item: 'basis-full' }"
      >
        <img :src="item" class="w-full h-38.5 object-cover rounded-lg" />
      </UCarousel>

    <CommunityLeaderboard/>
    <CommunityGallery/>
    </div>
  </section>
</template>
