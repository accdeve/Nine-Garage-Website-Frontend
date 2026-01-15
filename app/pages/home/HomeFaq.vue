<script setup lang="ts">
import FaqItem from '~/components/home/FaqComponent.vue'

const faqs = [
  {
    question: 'Apakah perlu booking terlebih dahulu?',
    answer: 'Ya, kami menyarankan booking agar tidak perlu antre dan layanan lebih maksimal.'
  },
  {
    question: 'Berapa lama proses pemasangan aksesoris?',
    answer: 'Waktu pemasangan tergantung jenis aksesoris, rata-rata 30–90 menit.'
  },
  {
    question: 'Apakah tersedia garansi pemasangan?',
    answer: 'Kami memberikan garansi pemasangan sesuai ketentuan yang berlaku.'
  }
]
</script>

<template>
  <section class="max-w-2xl mx-auto mt-8">
    <h3 class="text-center text-2xl font-bold mb-6 px-6">
      Pertanyaan yang umum diajukan
    </h3>

    <FaqItem
      v-for="(item, index) in faqs"
      :key="index"
      :question="item.question"
      :answer="item.answer"
    />
  </section>
</template>
