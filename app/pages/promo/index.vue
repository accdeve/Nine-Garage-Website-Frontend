<script setup lang="ts">
import { ref, computed } from "vue";
import type { TabsItem } from "@nuxt/ui";
import BundlingItemComponent from "~/components/promo/BundlingItemComponent.vue";
import ItemComponent from "~/components/promo/ItemComponent.vue";

const tabs: TabsItem[] = [{ label: "Bundling" }, { label: "Lampu Utama" }];

const active = ref("0");

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
];

const lampuItems = [
  {
    title: "Lampu Utama LED X1",
    price: 450000,
    originalPrice: 520000,
    category: "Motor",
    description: "Paket hemat lampu depan dan belakang untuk kendaraan Anda.",
  },
  {
    title: "Lampu Utama LED X2",
    price: 550000,
    originalPrice: 600000,
    category: "Motor",
    description: "Paket hemat lampu depan dan belakang untuk kendaraan Anda.",
  },
  {
    title: "Lampu Utama LED Pro",
    price: 750000,
    originalPrice: 820000,
    category: "Motor",
    description: "Paket hemat lampu depan dan belakang untuk kendaraan Anda.",
  },
  {
    title: "Lampu Utama LED X1",
    price: 450000,
    originalPrice: 520000,
    category: "Motor",
    description: "Paket hemat lampu depan dan belakang untuk kendaraan Anda.",
  },
  {
    title: "Lampu Utama LED X2",
    price: 550000,
    originalPrice: 600000,
    category: "Motor",
    description: "Paket hemat lampu depan dan belakang untuk kendaraan Anda.",
  },
  {
    title: "Lampu Utama LED Pro",
    price: 750000,
    originalPrice: 820000,
    category: "Motor",
    description: "Paket hemat lampu depan dan belakang untuk kendaraan Anda.",
  },
  {
    title: "Lampu Utama LED X1",
    price: 450000,
    originalPrice: 520000,
    category: "Motor",
    description: "Paket hemat lampu depan dan belakang untuk kendaraan Anda.",
  },
  {
    title: "Lampu Utama LED X2",
    price: 550000,
    originalPrice: 600000,
    category: "Motor",
    description: "Paket hemat lampu depan dan belakang untuk kendaraan Anda.",
  },
  {
    title: "Lampu Utama LED Pro",
    price: 750000,
    originalPrice: 820000,
    category: "Motor",
    description: "Paket hemat lampu depan dan belakang untuk kendaraan Anda.",
  },
];

const isBundling = computed(() => active.value === "0");
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

      <!-- Tabs -->
      <div class="overflow-x-auto no-scrollbar">
        <UTabs
          v-model="active"
          :items="tabs"
          color="neutral"
          variant="link"
          class="min-w-max"
        />
      </div>

      <div v-if="isBundling" class="flex flex-col">
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

      <div v-else class="grid grid-cols-2 gap-4">
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
    </div>
  </section>
</template>
