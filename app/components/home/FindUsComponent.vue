<script setup lang="ts">
defineProps<{
  address: string;
  imageUrl: string;
  link: string;
}>();
</script>

<template>
  <section
    :class="[
      'relative flex flex-col items-center bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300',
    ]"
  >
    <!-- Gambar di atas card, full width dengan overlay -->
    <div class="w-full h-36 overflow-hidden">
      <img
        :src="imageUrl"
        alt=""
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>

    <!-- Konten di bawah gambar -->
    <div class="p-4 flex flex-col items-center text-center">
      <p class="text-gray-800 font-semibold mb-3 line-clamp-2">
        {{ address }}
      </p>

      <a :href="link" target="_blank" rel="noopener noreferrer" class="w-full">
        <UButton
          class="w-full py-2 flex justify-center text-center"
          variant="outline"
          color="primary"
        >
          Buka di Google Maps
        </UButton>
      </a>
    </div>
  </section>
</template>
