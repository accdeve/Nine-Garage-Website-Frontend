<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  price: string
}>()
</script>

<template>
  <div class="w-40 rounded-lg border bg-gray-200 p-3">
    <!-- Title -->
    <h3 class="text-sm font-semibold text-gray-900">
      {{ title }}
    </h3>Product

    <!-- Subtitle -->
    <p class="text-xs text-gray-700">
      {{ subtitle }}
    </p>

    <!-- Price -->
    <p class="mt-1 text-sm font-bold text-gray-900">
      {{ price }}
    </p>

    <!-- Button placeholder -->
    <UButton trailing-icon="i-lucide-arrow-right" size="md" active-color="primary" class="mt-4">Button</UButton>
  </div>
</template>
