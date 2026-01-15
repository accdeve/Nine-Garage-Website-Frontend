<script setup lang="ts">
defineProps<{
  address: string
  isActive: boolean
  imageUrl: string
}>()

</script>

<template>
    <section class="flex flex-col items-center space-y-4">
        <img :src="imageUrl" alt="" srcset="" class="w-20 h-20">
        <p class="text-center">{{ address }}</p>
        <UButton :active="false" variant="solid">Buka di Google Maps</UButton>
    </section>
</template>
