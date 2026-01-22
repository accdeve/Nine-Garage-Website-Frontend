<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed } from "vue";

const props = defineProps<{
  name: string;
  images: string[];
}>();

const router = useRouter();

const slug = computed(() =>
  props.name.toLowerCase().replace(/\s+/g, "-")
);

function goToDetail() {
  router.push(`/community/${slug.value}`);
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">{{ name }}</h2>

      <button
        class="text-sm text-primary hover:underline"
        @click="goToDetail"
      >
        Lihat Semua
      </button>
    </div>

    <div class="flex gap-3 overflow-x-auto pb-2">
      <div
        v-for="(img, index) in images"
        :key="index"
        class="shrink-0 rounded-lg overflow-hidden bg-gray-200"
        style="width:260px"
      >
        <img :src="img" class="h-40 w-full object-cover" loading="lazy">
      </div>
    </div>
  </div>
</template>
