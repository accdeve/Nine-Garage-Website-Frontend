<script setup lang="ts">
import { faqItems } from "~/constants/faq";
</script>

<template>
  <section class="max-w-2xl mx-auto mt-5 px-4">
    <h3 class="text-center text-2xl font-bold mb-6 px-6">
      Pertanyaan yang umum diajukan
    </h3>

    <UAccordion :items="faqItems" />
  </section>
</template>
