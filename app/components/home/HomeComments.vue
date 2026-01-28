<script setup lang="ts">
import CommentComponent from '~/components/home/CommentComponent.vue';

const testimonials = [
  {
    image: 'https://picsum.photos/seed/user1/200',
    name: 'John Doea',
    city: 'Semarang',
    comment: 'Nine auto series garage ialah tempat pertama saya untuk memasang aksesoris'
  },
  {
    image: 'https://picsum.photos/seed/user2/200',
    name: 'Andi Pratama',
    city: 'Jakarta',
    comment: 'Pelayanan ramah dan hasil pemasangan sangat rapi'
  },
  {
    image: 'https://picsum.photos/seed/user3/200',
    name: 'Budi Santoso',
    city: 'Bandung',
    comment: 'Pilihan aksesoris lengkap dan berkualitas'
  }
]
</script>

<template>
  <section class="ml-4">
    <h3 class="text-center text-2xl font-bold mb-8">
      Apa Kata Mereka
    </h3>

    <div
      class="
       flex gap-2 overflow-x-auto no-scrollbar
      "
    >
      <CommentComponent
        v-for="(item, index) in testimonials"
        :key="index"
        :image="item.image"
        :name="item.name"
        :city="item.city"
        :comment="item.comment"
        class="snap-center shrink-0"
      />
    </div>
  </section>
</template>
