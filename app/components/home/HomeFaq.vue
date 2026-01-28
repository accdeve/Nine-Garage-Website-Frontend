<script setup lang="ts">
import { useHomeStore } from "~/stores/home";

const homeStore = useHomeStore();

const faqItems = computed(() =>
  homeStore.faqs.map((faq) => ({
    label: faq.pertanyaan,
    content: faq.jawaban,
  })),
);
</script>

<template>
  <section v-if="homeStore.faqs.length > 0" class="max-w-2xl mx-auto mt-5 px-4">
    <h3 class="text-center text-2xl font-bold mb-6 px-6">
      Pertanyaan yang umum diajukan
    </h3>

    <UAccordion :items="faqItems" />
  </section>
</template>
