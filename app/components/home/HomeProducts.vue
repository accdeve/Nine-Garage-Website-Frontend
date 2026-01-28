<script setup lang="ts">
import { useHomeStore } from "~/stores/home";
import ProductCard from "~/components/home/ProductCard.vue";

const homeStore = useHomeStore();
</script>

<template>
  <section v-if="homeStore.products.length > 0">
    <h1 class="text-2xl font-bold text-center mx-9 my-7">
      Pilih jenis produk atau pemasangan yang kamu inginkan
    </h1>

    <div class="ml-4 mb-5">
      <div class="flex gap-4 overflow-x-auto no-scrollbar">
        <ProductCard
          v-for="product in homeStore.products"
          :key="product.id"
          :title="product.name"
          subtitle="Mulai dari"
          :price="`Rp${product.price.toLocaleString()}`"
          :image="product.image"
          class="min-w-40 shrink-0 snap-start"
        />
      </div>
    </div>

    <NuxtLink to="/booking">
      <div class="px-5 py-0">
        <UButton
          color="primary"
          class="w-full md:max-w-md mx-auto flex justify-center px-5 py-2"
          size="md"
          trailing-icon="i-lucide-notebook"
        >
          Booking Sekarang
        </UButton>
      </div>
    </NuxtLink>
  </section>
  <section v-else class="py-10 flex flex-col items-center">
    <LoadingComponent />
    <p class="mt-4 text-neutral-500">Memuat produk...</p>
  </section>
</template>
