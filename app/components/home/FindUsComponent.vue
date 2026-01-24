<script setup lang="ts">
defineProps<{
  address: string;
  isActive: boolean;
  imageUrl: string;
  link: string;
}>();
</script>

<template>
  <section
    class="h-full flex flex-col items-center p-4 rounded-lg hover:shadow transition"
  >
    <img :src="imageUrl" alt="" class="w-20 h-20 mb-3" >

    <p class="text-center text-sm line-clamp-3 mb-4">
      {{ address }}
    </p>

    <a :href="link" target="_blank" rel="noopener noreferrer">
      <UButton class="mt-auto" variant="solid"> Buka di Google Maps </UButton>
    </a>
  </section>
</template>
