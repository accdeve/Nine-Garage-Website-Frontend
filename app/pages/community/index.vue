<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import { ref } from "vue";
import LeaderboardComponent from "~/components/community/LeaderboardComponent.vue";

const tabs: TabsItem[] = [{ label: "Community" }, { label: "Personal" }];
const active = ref("0");

// const itemsFilter: DropdownMenuItem[][] = [
//   [
//     { label: "Bulanan" },
//     { label: "Tahunan" },
//     { label: "All Time" },
//   ],
// ];

const items = [
  "https://picsum.photos/1200/600?random=1",
  "https://picsum.photos/1200/600?random=2",
  "https://picsum.photos/1200/600?random=3",
];

const source = [
  {
    name: "John Doe",
    point: 17,
    avatar: "https://i.pravatar.cc/150?u=john-doe",
  },
  {
    name: "Jane Smith",
    point: 14,
    avatar: "https://i.pravatar.cc/150?u=jane-smith",
  },
  {
    name: "Michael Brown",
    point: 12,
    avatar: "https://i.pravatar.cc/150?u=michael-brown",
  },
  {
    name: "Sarah Wilson",
    point: 10,
    avatar: "https://i.pravatar.cc/150?u=sarah-wilson",
  },
];
</script>

<template>
  <section class="min-h-screen flex justify-center px-4 py-10">
    <div class="w-full max-w-sm">
      <UBreadcrumb
        :items="[
          { label: 'Home', to: '/' },
          { label: 'Nine Partner Community', to: '/community' },
        ]"
        class="mb-4"
      />

      <UCarousel
        v-slot="{ item }"
        loop
        :items="items"
        :autoplay="{ delay: 2000 }"
        :ui="{ item: 'basis-full' }"
      >
        <img :src="item" class="w-full h-38.5 object-cover rounded-lg" />
      </UCarousel>

      <h2 class="text-lg font-semibold mb-2 text-center mt-3">
        Who's top leaderboard?
      </h2>

      <!-- Tabs + Filter -->
      <div class="flex items-center gap-2 mb-4">
        <UTabs
          v-model="active"
          size="xs"
          :items="tabs"
          color="neutral"
          variant="pill"
          class="flex-1"
        />
      </div>

      <!-- <UDropdownMenu :items="itemsFilter">
          <UButton
            label="Waktu"
            color="neutral"
            variant="outline"
            size="xs"
            trailing-icon="i-lucide-chevron-down"
          />
        </UDropdownMenu> -->

      <!-- Leaderboard -->
      <div class="space-y-3">
        <LeaderboardComponent
          v-for="(user, index) in source"
          :key="user.name"
          :name="user.name"
          :point="user.point"
          :avatar="user.avatar"
          :rank="index + 1"
        />
      </div>

      <h2 class="text-lg font-semibold mb-2 text-center mt-10">
        Some Moment We Felt Together
      </h2>
    </div>
  </section>
</template>
