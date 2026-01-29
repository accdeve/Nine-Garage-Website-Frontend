<script setup lang="ts">
import ArticleComponent from '@/components/home/ArticleComponent.vue'

const articles = [
  {
    image: 'https://picsum.photos/seed/article1/400/300',
    title: 'Cara membuat mobil kinclong',
    description:
      'Ada banyak cara membuat mobil kinclong, dapat menggunakan poles bodi...'
  },
  {
    image: 'https://picsum.photos/seed/article2/400/300',
    title: 'Tips merawat cat mobil',
    description:
      'Perawatan cat mobil yang tepat akan membuat warna tetap awet...'
  },
  {
    image: 'https://picsum.photos/seed/article3/400/300',
    title: 'Pentingnya coating kendaraan',
    description:
      'Coating membantu melindungi cat mobil dari cuaca dan kotoran...'
  }
]
</script>

<template>
  <section class="mt-10 px-3">
    <h3 class="text-center text-2xl font-bold mb-6">
      Artikel & Tips
    </h3>

    <div class="flex gap-4 overflow-x-auto no-scrollbar ">
      <ArticleComponent
        v-for="(item, index) in articles"
        :key="index"
        :image="item.image"
        :title="item.title"
        :description="item.description"
      />
    </div>
  </section>
</template>
