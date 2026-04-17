<template>
  <div class="space-y-8 p-4">
    <!-- Carousel Skeleton -->
    <USkeleton class="h-64 w-full rounded-xl" />

    <!-- Products Grid Skeleton -->
    <div class="space-y-4">
      <USkeleton class="h-8 w-48" />
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div v-for="i in 4" :key="i" class="space-y-2">
          <USkeleton class="h-40 w-full rounded-lg" />
          <USkeleton class="h-4 w-3/4" />
          <USkeleton class="h-4 w-1/2" />
        </div>
      </div>
    </div>

    <!-- Booking Skeleton -->
    <USkeleton class="h-24 w-full rounded-lg" />

    <!-- FAQ Skeleton -->
    <div class="space-y-3">
      <USkeleton class="h-8 w-32" />
      <div v-for="i in 3" :key="i" class="flex items-center gap-4 py-2">
        <USkeleton class="h-10 w-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Loading component using Nuxt UI Skeleton
</script>
