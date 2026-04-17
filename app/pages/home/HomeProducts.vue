<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { useProductStore } from "~/stores/product";
import ProductCard from "~/components/home/ProductCard.vue";

const productStore = useProductStore();
const sentinel = ref<HTMLElement | null>(null);

// Observe the sentinel element at the end of the list
useIntersectionObserver(
  sentinel,
  (entries) => {
    const entry = entries[0];
    if (
      entry?.isIntersecting &&
      productStore.hasMore &&
      !productStore.loadingMore &&
      !productStore.loading
    ) {
      productStore.fetchProducts(true).catch((err) => {
        console.error("Infinite scroll fetch error:", err);
      });
    }
  },
  {
    rootMargin: "0px 400px 0px 0px", // Trigger when sentinel is 400px from right edge
    threshold: 0.01,
  },
);
</script>

<template>
  <section class="py-7">
    <h1 class="text-2xl font-bold text-center mx-9 mb-7">
      Pilih jenis produk atau pemasangan yang kamu inginkan
    </h1>

    <!-- 
      Persistent scroll container: 
      We keep the container even during loading to maintain scroll context and touch listeners.
    -->
    <div
      class="mb-7 overflow-x-auto no-scrollbar touch-pan-x overscroll-contain"
      style="-webkit-overflow-scrolling: touch"
    >
      <div
        class="flex gap-4 px-4 py-2 flex-nowrap"
        style="display: flex; min-width: min-content"
      >
        <!-- Initial Loading State with Skeleton inside the same container -->
        <template
          v-if="productStore.loading && productStore.products.length === 0"
        >
          <div
            v-for="i in 4"
            :key="`skeleton-${i}`"
            class="min-w-40 h-60 rounded-lg overflow-hidden bg-neutral-200 flex flex-col justify-end p-3 shrink-0 relative"
          >
            <USkeleton class="h-4 w-3/4 mb-2 bg-neutral-300" />
            <USkeleton class="h-3 w-1/2 mb-3 bg-neutral-300" />
            <USkeleton class="h-7 w-20 bg-neutral-300" />
          </div>
        </template>

        <!-- Product List -->
        <template v-else-if="productStore.products.length > 0">
          <ProductCard
            v-for="product in productStore.products"
            :key="product.id"
            :name="product.name"
            :short-desc="product.short_desc"
            :image="product.image_url"
            class="min-w-40 shrink-0"
          />

          <!-- Sentinel for Infinite Scroll & Loading More -->
          <div
            ref="sentinel"
            class="shrink-0 flex items-center justify-center transition-all duration-300"
            :class="productStore.hasMore ? 'w-24' : 'w-0 overflow-hidden'"
          >
            <div
              v-if="productStore.loadingMore"
              class="flex flex-col items-center gap-2"
            >
              <UIcon
                name="i-lucide-loader-2"
                class="animate-spin text-2xl text-primary"
              />
              <span class="text-[10px] text-neutral-400">Memuat...</span>
            </div>
          </div>
        </template>

        <!-- Empty State -->
        <div
          v-else-if="!productStore.loading"
          class="w-full text-center py-10 text-neutral-500 shrink-0"
        >
          Tidak ada produk yang tersedia.
        </div>
      </div>
    </div>

    <!-- Error State (outside scroll to make it prominent) -->
    <div v-if="productStore.error" class="py-4 text-center px-4">
      <p class="text-red-500 mb-2 text-sm">{{ productStore.error }}</p>
      <UButton
        color="primary"
        variant="outline"
        size="xs"
        @click="productStore.fetchProducts()"
      >
        Coba Lagi
      </UButton>
    </div>

    <NuxtLink to="/booking" class="block mt-4">
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
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* 
  Stabilize touch actions:
  touch-pan-x ensures the browser knows this area handles horizontal swipes.
  overscroll-contain prevents the "bounce" from propagating to the whole page.
*/
.overscroll-contain {
  overscroll-behavior-x: contain;
}
</style>
