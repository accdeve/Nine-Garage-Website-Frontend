<script setup lang="ts">
const topLogos = [
  '/images/partner/partner.png',
  '/images/partner/partner.png',
  '/images/partner/partner.png',
  '/images/partner/partner.png',
  '/images/partner/partner.png'
]

const bottomLogos = [
  '/images/partner/partner.png',
  '/images/partner/partner.png',
  '/images/partner/partner.png',
  '/images/partner/partner.png',
  '/images/partner/partner.png'
]
</script>

<template>
  <section class="overflow-hidden py-8 mt-6">
    <h3 class="text-center text-2xl font-bold mb-8">Partner Kami</h3>

    <!-- Baris atas -->
    <div class="relative overflow-hidden">
      <div class="flex whitespace-nowrap animate-marquee-smooth">
        <img v-for="(logo, index) in topLogos" :key="index" :src="logo" class="w-12 h-12 rounded-full object-cover inline-block mx-5">
        <img v-for="(logo, index) in topLogos" :key="'dup-'+index" :src="logo" class="w-12 h-12 rounded-full object-cover inline-block mx-5">
      </div>
    </div>

    <!-- Baris bawah -->
    <div class="relative overflow-hidden mt-6">
      <div class="flex whitespace-nowrap animate-marquee-smooth-reverse">
        <img v-for="(logo, index) in bottomLogos" :key="index" :src="logo" class="w-12 h-12 rounded-full object-cover inline-block mx-5">
        <img v-for="(logo, index) in bottomLogos" :key="'dup2-'+index" :src="logo" class="w-12 h-12 rounded-full object-cover inline-block mx-5">
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Smooth marquee, bergerak terus tanpa reset */
@keyframes marquee-smooth {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-smooth-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

.animate-marquee-smooth {
  animation: marquee-smooth 20s linear infinite;
}

.animate-marquee-smooth-reverse {
  animation: marquee-smooth-reverse 20s linear infinite;
}
</style>
