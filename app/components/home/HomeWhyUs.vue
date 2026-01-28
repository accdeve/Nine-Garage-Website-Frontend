<script setup lang="ts">
import WhyUsComponent from "@/components/home/WhyUsComponent.vue";

const slides = [
  {
    title: "Flexible Learning",
    subtitle: "Access courses anytime, anywhere to fit your schedule.",
    iconUrl: "i-lucide-laptop",
  },
  {
    title: "Comprehensive Resources",
    subtitle:
      "Get access to a wealth of resources to support your learning journey.",
    iconUrl: "i-lucide-book-open",
  },
  {
    title: "Community Support",
    subtitle: "Join a vibrant community of learners and instructors.",
    iconUrl: "i-lucide-users",
  },
];
</script>

<template>
  <section class="">
    <h3 class="text-center text-2xl font-bold mb-8">
      Mengapa kami menjadi tempat terbaik
    </h3>

    <UCarousel
      v-slot="{ item }"
      :items="slides"
      class="w-full max-w-xs mx-auto"
      :dots="true"
      :infinite="true"
      :autoplay="true"
      :autoplay-speed="3000"
    >
      <WhyUsComponent
        :title="item.title"
        :subtitle="item.subtitle"
        :icon-url="item.iconUrl"
      />
    </UCarousel>
  </section>
</template>
