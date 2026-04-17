<script setup lang="ts">
import { useRoute, useRouter } from '#app'

const route = useRoute()
const router = useRouter()

const menus = [
  {
    label: 'Home',
    to: '/',
    icon: 'i-lucide-home'
  },
  {
    label: 'Booking',
    to: '/booking',
    icon: 'i-lucide-calendar'
  },
  {
    label: 'Promo',
    to: '/promo',
    icon: 'i-lucide-percent'
  },
  // {
  //   label: 'Community',
  //   to: '/community',
  //   icon: 'i-lucide-users'
  // },
  {
    label: 'Account',
    to: '/account',
    icon: 'i-lucide-user'
  }
]

function go(to: string) {
  router.push(to)
}

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200"
  >
    <div class="max-w-md mx-auto flex justify-between px-2 py-2">
      <button
        v-for="menu in menus"
        :key="menu.to"
        class="flex flex-col items-center justify-center flex-1 gap-1"
        :class="isActive(menu.to) ? 'text-primary' : 'text-gray-400'"
        @click="go(menu.to)"
      >
        <UIcon :name="menu.icon" class="text-xl" />
        <span class="text-xs font-medium">
          {{ menu.label }}
        </span>
      </button>
    </div>
  </nav>
</template>
