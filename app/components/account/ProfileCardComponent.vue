<script setup lang="ts">
defineProps<{
  name: string
  point: number
  avatar: string
  members: string[]
}>()
</script>

<template>
  <UCard variant="outline" class="p-1 bg-neutral-100">
    <div class="flex items-start justify-between">
      <!-- Kiri -->
      <div class="flex items-center gap-2">
        <UAvatar
          :src="avatar"
          size="lg"
        />

        <div class="flex flex-col">
          <h2 class="text-base font-semibold">
            {{ name }}
          </h2>
          <p class="text-sm text-gray-500">
            {{ point }} Point
          </p>
        </div>
      </div>

      <!-- Kanan atas -->
      <UAvatarGroup>
        <UAvatar
          v-for="(member, index) in members"
          :key="index"
          :src="member"
        />
      </UAvatarGroup>
    </div>
  </UCard>
</template>
