<script setup lang="ts">
import { useHomeStore } from "~/stores/home";

const homeStore = useHomeStore();
</script>

<template>
  <section v-if="homeStore.communities.length > 0" class="overflow-hidden mt-5">
    <h3 class="text-center text-2xl font-bold mb-8">
      Partner & Komunitas Kami
    </h3>

    <UMarquee :overlay="false" class="gap-8">
      <img
        v-for="(community, index) in homeStore.communities"
        :key="index"
        :src="community.logo_komunitas"
        :alt="community.name || 'Logo Komunitas'"
        class="h-16 w-auto object-contain shrink-0 grayscale hover:grayscale-0 transition-all"
      />
    </UMarquee>

    <br />

    <UMarquee reverse :overlay="false" class="gap-8">
      <img
        v-for="(community, index) in [...homeStore.communities].reverse()"
        :key="`rev-${index}`"
        :src="community.logo_komunitas"
        :alt="community.name || 'Logo Komunitas'"
        class="h-16 w-auto object-contain shrink-0 grayscale hover:grayscale-0 transition-all"
      />
    </UMarquee>
  </section>
</template>
