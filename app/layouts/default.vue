<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import BottomNavbar from '~/components/BottomNavbar.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />

    <main class="flex-1 pb-20">
      <slot />
    </main>

    <BottomNavbar />
  </div>
</template>
