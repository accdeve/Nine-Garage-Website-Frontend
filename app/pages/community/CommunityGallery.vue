<script setup lang="ts">
import GalleryComponent from "~/components/community/GalleryComponent.vue";

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



</script>
<template>
  <section>
    <h2 class="text-lg font-semibold mb-2 text-center mt-10">
      Some Moment We Felt Together
    </h2>

    <div class="p-4 space-y-8">
      <GalleryComponent
      v-for="(komunitas, index) in komunitasMap"
        :key="index"
        :name="komunitas.name"
        :images="komunitas.images"
      />
    </div>
  </section>
</template>
