<script setup lang="ts">
defineProps<{
  image: string
  name: string
  city: string
  comment: string
}>()
</script>

<template>
  <div class="bg-gray-100 rounded-xl p-6 w-72">
    <!-- Avatar -->
    <div class="flex items-center gap-4 mb-4">
      <img
        :src="image"
        alt="avatar"
        class="w-14 h-14 rounded-full object-cover bg-gray-300"
      >

      <div>
        <p class="font-semibold text-sm text-black">{{ name }}</p>
        <p class="text-xs text-gray-500">• {{ city }}</p>
      </div>
    </div>

    <!-- Comment -->
    <p class="text-sm text-gray-700 leading-relaxed">
      “{{ comment }}”
    </p>
  </div>
</template>
