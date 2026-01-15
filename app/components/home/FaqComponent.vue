<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  question: string
  answer: string
}>()

const isOpen = ref(false)
</script>

<template>
  <div class="w-full px-6">
    <!-- Header -->
    <button
      class="
        w-full
        flex
        items-start
        justify-between
        gap-4
        py-4
        text-left
      "
      @click="isOpen = !isOpen"
    >
      <!-- Question -->
      <span class="font-medium text-sm sm:text-base leading-snug">
        {{ question }}
      </span>

      <!-- Icon -->
      <span
        class="
          text-xl
          leading-none
          shrink-0
          transition-transform
          duration-200
        "
        :class="isOpen ? 'rotate-45' : ''"
      >
        +
      </span>
    </button>

    <!-- Answer -->
    <div
      v-if="isOpen"
      class="
        pb-4
        pr-6
        text-sm
        sm:text-base
        text-gray-600
        leading-relaxed
      "
    >
      {{ answer }}
    </div>

    <!-- Divider -->
    <div class="h-px bg-gray-200 w-full" />
  </div>
</template>
