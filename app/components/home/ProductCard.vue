<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string;
    shortDesc: string;
    image?: string;
  }>(),
  {
    image: "https://picsum.photos/400/600?random=default",
  },
);
</script>

<template>
  <div class="relative w-40 h-60 rounded-lg overflow-hidden bg-neutral-200">
    <!-- Background image -->
    <img
      :src="props.image"
      alt=""
      class="absolute inset-0 w-full h-full object-cover"
    >

    <div
      class="absolute inset-0 bg-linear-to-t from-white/80 via-white/50 to-transparent"
    />

    <!-- Content -->
    <div class="relative z-10 h-full flex flex-col justify-end p-3">
      <h2 class="text-sm font-semibold text-neutral-900 leading-tight">
        {{ props.name }}
      </h2>

      <span class="text-xs text-neutral-600">
        {{ props.shortDesc }}
      </span>

      <UButton
        color="primary"
        variant="outline"
        trailing-icon="i-lucide-arrow-right"
        size="xs"
        class="mt-2 w-fit text-black"
      >
        Pasang
      </UButton>
    </div>
  </div>
</template>
