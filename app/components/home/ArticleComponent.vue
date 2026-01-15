<script setup lang="ts">
defineProps<{
  image: string
  title: string
  description: string
}>()
</script>

<template>
  <div
    class="
      w-72
      shrink-0
      bg-white
      rounded-xl
      overflow-hidden
      border
      shadow-sm
    "
  >
    <!-- Image -->
    <img
      :src="image"
      alt="article image"
      class="w-full h-40 object-cover bg-gray-200"
    >

    <!-- Content -->
    <div class="p-4">
      <h4 class="font-semibold text-sm mb-1">
        {{ title }}
      </h4>
      <p class="text-xs text-gray-600 leading-relaxed line-clamp-3">
        {{ description }}
      </p>
    </div>
  </div>
</template>
