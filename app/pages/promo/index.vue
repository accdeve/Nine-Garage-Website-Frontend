<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import BundlingItemComponent from "~/components/promo/BundlingItemComponent.vue";
import ItemComponent from "~/components/promo/ItemComponent.vue";

const tabs: TabsItem[] = [
  { label: "Bundling", slot: "bundling" },
  { label: "Lampu Utama", slot: "lampu" },
];

const bundlings = [
  {
    title: "Bundling Lampu Depan + Belakang",
    description: "Paket hemat lampu depan dan belakang untuk kendaraan Anda.",
    price: 250000,
    originalPrice: 300000,
    category: "Motor",
  },
  {
    title: "Bundling Lampu Depan",
    description: "Lampu depan lebih terang dan awet.",
    price: 150000,
    originalPrice: 180000,
    category: "Motor",
  },
  // …data bundling lainnya
];

const lampuItems = [
  {
    title: "Lampu Utama LED X1",
    price: 450000,
    originalPrice: 520000,
    category: "Motor",
    description: "Lampu depan LED tahan lama.",
  },
  {
    title: "Lampu Utama LED X2",
    price: 550000,
    originalPrice: 600000,
    category: "Motor",
    description: "LED X2 untuk cahaya lebih terang.",
  },
  // …data lampu lainnya
];
</script>

<template>
  <section class="min-h-screen flex justify-center px-4 py-10">
    <div class="w-full max-w-sm">
      <!-- Breadcrumb -->
      <UBreadcrumb
        :items="[
          { label: 'Home', to: '/' },
          { label: 'Promo', to: '/promo' },
        ]"
        class="mb-4"
      />

      <!-- Search -->
      <UInput
        class="w-full mb-3"
        trailing-icon="i-lucide-search"
        placeholder="Cari produk yang kamu inginkan"
      />

      <!-- Tabs dengan slot -->
      <div class="overflow-x-auto no-scrollbar">
        <UTabs :items="tabs" variant="link" class="min-w-max">
          <!-- Slot konten untuk Bundling -->
          <template #bundling>
            <div class="flex flex-col space-y-4 mt-4">
              <BundlingItemComponent
                v-for="item in bundlings"
                :key="item.title"
                :title="item.title"
                :description="item.description"
                :price="item.price"
                :original-price="item.originalPrice"
                :category="item.category"
              />
            </div>
          </template>

          <!-- Slot konten untuk Lampu Utama -->
          <template #lampu>
            <div class="grid grid-cols-2 gap-4 mt-4">
              <ItemComponent
                v-for="item in lampuItems"
                :key="item.title"
                :title="item.title"
                :price="item.price"
                :original-price="item.originalPrice"
                :category="item.category"
                :description="item.description"
              />
            </div>
          </template>
        </UTabs>
      </div>
    </div>
  </section>
</template>
