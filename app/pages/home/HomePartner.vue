<script setup lang="ts">
import { useHomeStore } from "~/stores/home";

const homeStore = useHomeStore();
</script>

<template>
  <section class="overflow-hidden mt-5">
    <h3 class="text-center text-2xl font-bold mb-8">
      Partner & Komunitas Kami
    </h3>

    <!-- Loading State -->
    <div
      v-if="homeStore.loading && homeStore.communities.length === 0"
      class="flex flex-col gap-8"
    >
      <div class="flex gap-8 justify-center">
        <USkeleton
          v-for="i in 5"
          :key="i"
          class="h-20 w-20 rounded-full bg-neutral-200"
        />
      </div>
    </div>

    <!-- Data State -->
    <template v-else-if="homeStore.communities.length > 0">
      <UMarquee :overlay="false" class="gap-8">
        <div
          v-for="(community, index) in homeStore.communities"
          :key="index"
          class="h-20 w-20 rounded-full border border-neutral-200 overflow-hidden bg-white shrink-0 shadow-sm"
        >
          <img
            :src="community.logo_url"
            :alt="community.name || 'Logo Komunitas'"
            class="h-full w-full object-cover grayscale hover:grayscale-0 transition-all"
          >
        </div>
      </UMarquee>

      <br >

      <UMarquee reverse :overlay="false" class="gap-8">
        <div
          v-for="(community, index) in [...homeStore.communities].reverse()"
          :key="`rev-${index}`"
          class="h-20 w-20 rounded-full border border-neutral-200 overflow-hidden bg-white shrink-0 shadow-sm"
        >
          <img
            :src="community.logo_url"
            :alt="community.name || 'Logo Komunitas'"
            class="h-full w-full object-cover grayscale hover:grayscale-0 transition-all"
          >
        </div>
      </UMarquee>
    </template>

    <!-- Empty State -->
    <div
      v-else-if="!homeStore.loading"
      class="text-center text-neutral-400 py-4"
    >
      Belum ada komunitas yang terdaftar.
    </div>
  </section>
</template>
