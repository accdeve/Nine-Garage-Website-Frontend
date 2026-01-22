<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const komunitasMap: Record<string, { name: string; images: string[] }> = {
  'komunitas-mobil-tangerang': {
    name: 'Komunitas Mobil Tangerang',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023',
      'https://images.unsplash.com/photo-1549924231-f129b911e442',
    ]
  },
  'komunitas-mobil-jakarta': {
    name: 'Komunitas Mobil Jakarta',
    images: [
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d',
      'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    ]
  },
  'komunitas-mobil-bandung': {
    name: 'Komunitas Mobil Bandung',
    images: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a',
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    ]
  },
  'komunitas-mobil-surabaya': {
    name: 'Komunitas Mobil Surabaya',
    images: [
      'https://images.unsplash.com/photo-1542362567-b07e54358753',
      'https://images.unsplash.com/photo-1504215680853-026ed2a45def',
      'https://images.unsplash.com/photo-1549924231-f129b911e442',
    ]
  },
  'komunitas-mobil-yogyakarta': {
    name: 'Komunitas Mobil Yogyakarta',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023',
      'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60',
    ]
  },
  'komunitas-mobil-bali': {
    name: 'Komunitas Mobil Bali',
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a',
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1',
    ]
  },
}

const komunitas = computed(() => {
  return komunitasMap[route.params.slug as string]
})
</script>

<template>
  <section class="max-w-md mx-auto p-4">
    <!-- Breadcrumb -->
    <UBreadcrumb
      :items="[
        { label: 'Home', to: '/' },
        { label: 'Nine Partner Community', to: '/community' },
        { label: komunitas?.name ?? 'Detail' }
      ]"
      class="mb-4"
    />

    <!-- Title -->
    <h1 class="text-xl font-bold mb-6">
      {{ komunitas?.name }}
    </h1>

    <!-- Masonry Grid -->
    <div v-if="komunitas" class="columns-2 gap-3 space-y-3">
      <div
        v-for="(img, index) in komunitas.images"
        :key="index"
        class="break-inside-avoid rounded-lg overflow-hidden bg-gray-200"
      >
        <img
          :src="img"
          class="w-full object-cover"
          :style="{ height: `${180 + (index % 3) * 60}px` }"
        />
      </div>
    </div>

    <p v-else class="text-center text-gray-500">
      Data komunitas tidak ditemukan
    </p>
  </section>
</template>
