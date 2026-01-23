<script setup lang="ts">
import ProductCard from "~/components/home/ProductCard.vue";

const products = [
  {
    id: 1,
    title: "Saklar",
    subtitle: "Mulai dari",
    price: "Rp18.000",
  },
  {
    id: 2,
    title: "Stop Kontak",
    subtitle: "Mulai dari",
    price: "Rp25.000",
  },
  {
    id: 3,
    title: "Lampu",
    subtitle: "Mulai dari",
    price: "Rp30.000",
  },
  {
    id: 4,
    title: "Kabel Listrik",
    subtitle: "Mulai dari",
    price: "Rp12.000",
  },
];
</script>

<template>
  <section>
    <h2 class="text-2xl font-bold text-center mx-9 my-7">
      Pilih jenis produk atau pemasangan yang kamu inginkan
    </h2>

    <div class="ml-4 pb-10">
      <div class="flex gap-4 overflow-x-auto no-scrollbar">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :title="product.title"
          :subtitle="product.subtitle"
          :price="product.price"
          class="min-w-40 shrink-0 snap-start"
        />
      </div>
    </div>

    <NuxtLink to="/booking">
      <div class="px-5 py-5">
        <UButton
          class="w-full md:max-w-md mx-auto flex justify-center px-5 py-3"
          size="md"
        >
          Booking Sekarang
        </UButton>
      </div>
    </NuxtLink>
  </section>
</template>
