<script setup lang="ts">
import type { NuxtError } from '#app'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{ error: NuxtError }>()
</script>

<template>
  <div>
    <h1>{{ error.error }}</h1>
    <NuxtLink to="/">Go back home</NuxtLink>
  </div>
</template>
