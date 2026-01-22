<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  point: {
    type: Number,
    required: true
  },
  rank: {
    type: Number,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  }
})

const isTop = computed(() => props.rank === 1)
</script>
<template>
  <div
    :class="[
      'flex items-center justify-between rounded-xl px-4 py-3 border',
      isTop
        ? 'bg-linear-to-r from-white to-green-600 border-green-600 text-white'
        : 'border-green-600 text-green-700'
    ]"
  >
    <!-- Left content -->
    <div class="flex items-center gap-3">
      <UAvatar
        :src="avatar"
        :alt="name"
        size="md"
      />

      <div class="leading-tight">
        <p class="font-semibold">
          {{ name }}
        </p>
        <p
          class="text-sm"
          :class="isTop ? 'opacity-90' : 'opacity-70'"
        >
          {{ point }} point
        </p>
      </div>
    </div>

    <!-- Right number -->
    <div class="text-xl font-bold">
      #{{ rank }}
    </div>
  </div>
</template>


