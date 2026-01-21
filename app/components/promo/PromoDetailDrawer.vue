<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  price: number
  originalPrice?: number
  category?: string
}>()

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value)
</script>

<template>
  <div class="p-4 space-y-4">
    <!-- Image -->
    <div class="bg-gray-200 h-40 rounded-lg"/>

    <!-- Category -->
    <div v-if="category" class="text-xs text-gray-500">
      {{ category }}
    </div>

    <!-- Title -->
    <h3 class="font-semibold text-lg">
      {{ title }}
    </h3>

    <!-- Price -->
    <div class="flex items-center gap-2">
      <span class="font-bold text-lg">
        {{ formatRupiah(price) }}
      </span>
      <span
        v-if="originalPrice"
        class="text-sm text-gray-400 line-through"
      >
        {{ formatRupiah(originalPrice) }}
      </span>
    </div>

    <!-- Description -->
    <p v-if="description" class="text-sm text-gray-600 leading-relaxed">
      {{ description }}
    </p>

    <!-- Action -->
    <UButton block size="lg">
      Pilih Produk
    </UButton>
  </div>
</template>
