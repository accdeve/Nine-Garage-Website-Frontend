<script setup lang="ts">

const faqs = [
  {
    label: 'Apakah perlu booking terlebih dahulu?',
    content: 'Ya, kami menyarankan booking agar tidak perlu antre dan layanan lebih maksimal.'
  },
  {
    label: 'Berapa lama proses pemasangan aksesoris?',
    content: 'Waktu pemasangan tergantung jenis aksesoris, rata-rata 30–90 menit.'
  },
  {
    label: 'Apakah tersedia garansi pemasangan?',
    content: 'Kami memberikan garansi pemasangan sesuai ketentuan yang berlaku.'
  }
]
</script>

<template>
  <section class="max-w-2xl mx-auto mt-5 px-4">
    <h3 class="text-center text-2xl font-bold mb-6 px-6">
      Pertanyaan yang umum diajukan
    </h3>

    <UAccordion :items="faqs" />
  </section>
</template>
