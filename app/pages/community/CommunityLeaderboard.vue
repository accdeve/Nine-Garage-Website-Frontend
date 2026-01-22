<script setup lang="ts">
import LeaderboardComponent from "~/components/community/LeaderboardComponent.vue";
import type { TabsItem } from "@nuxt/ui";

const sourceCommunity = [
  { name: "John Doe", point: 17, avatar: "https://i.pravatar.cc/150?u=john-doe" },
  { name: "Jane Smith", point: 14, avatar: "https://i.pravatar.cc/150?u=jane-smith" },
  { name: "Michael Brown", point: 12, avatar: "https://i.pravatar.cc/150?u=michael-brown" },
  { name: "Sarah Wilson", point: 10, avatar: "https://i.pravatar.cc/150?u=sarah-wilson" },
];

const sourcePersonal = [
  { name: "Michael Brown", point: 87, avatar: "https://i.pravatar.cc/150?u=michael-brown" },
  { name: "John Doe", point: 21, avatar: "https://i.pravatar.cc/150?u=john-doe" },
  { name: "Sarah Wilson", point: 19, avatar: "https://i.pravatar.cc/150?u=sarah-wilson" },
  { name: "Jane Smith", point: 14, avatar: "https://i.pravatar.cc/150?u=jane-smith" },
];

const tabs: TabsItem[] = [
  { label: "Community", slot: "community" },
  { label: "Personal", slot: "personal" },
];
</script>

<template>
  <section>
    <h2 class="text-lg font-semibold mb-2 text-center mt-3">
      Who's top leaderboard?
    </h2>

    <div class="flex items-center gap-2 mb-4">
      <UTabs
        size="xs"
        :items="tabs"
        color="neutral"
        variant="pill"
        class="flex-1"
      >
        <!-- Community slot -->
        <template #community>
          <div class="space-y-3">
            <LeaderboardComponent
              v-for="(user, index) in sourceCommunity"
              :key="`comm-${user.name}`"
              :name="user.name"
              :point="user.point"
              :avatar="user.avatar"
              :rank="index + 1"
            />
          </div>
        </template>

        <!-- Personal slot -->
        <template #personal>
          <div class="space-y-3">
            <LeaderboardComponent
              v-for="(user, index) in sourcePersonal"
              :key="`pers-${user.name}`"
              :name="user.name"
              :point="user.point"
              :avatar="user.avatar"
              :rank="index + 1"
            />
          </div>
        </template>
      </UTabs>
    </div>
  </section>
</template>
