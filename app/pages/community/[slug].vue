<script setup lang="ts">
import { useRoute } from "#app";
import { computed } from "vue";
import { useKomunitasStore } from "~/stores/komunitas";

const route = useRoute();
const store = useKomunitasStore();

const slug = computed(() => route.params.slug as string);
const komunitas = computed(() => store.getBySlug(slug.value));

const heights = [280, 360, 440, 520];

function getHeight(index: number) {
  return heights[index % heights.length];
}

const items = computed(() => {
  if (!komunitas.value) return [];

  return komunitas.value.images.map((src, index) => ({
    id: index,
    src,
    width: 640,
    height: getHeight(index),
  }));
});
</script>

<template>
  <section class="max-w-md mx-auto p-4">
    <UBreadcrumb
      :items="[
        { label: 'Home', to: '/' },
        { label: 'Nine Partner Community', to: '/community' },
        { label: komunitas?.name ?? 'Detail' },
      ]"
      class="mb-4"
    />

    <h1 class="text-xl font-bold mb-6">
      {{ komunitas?.name }}
    </h1>

    <UScrollArea
      v-if="komunitas"
      v-slot="{ item, index }"
      :items="items"
      orientation="vertical"
      :virtualize="{
        lanes: 2,
        gap: 12,
        estimateSize: 360
      }"
      class="w-full h-[80vh]"
    >
      <img
        :src="item.src"
        :width="item.width"
        :height="item.height"
        :loading="index > 6 ? 'lazy' : 'eager'"
        class="rounded-lg size-full object-cover"
      />
    </UScrollArea>

    <p v-else class="text-center text-gray-500">
      Data komunitas tidak ditemukan
    </p>
  </section>
</template>
