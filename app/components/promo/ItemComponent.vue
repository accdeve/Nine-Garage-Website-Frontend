<script setup lang="ts">
import { ref } from "vue";
import PromoDetailDrawer from "~/components/promo/PromoDetailDrawer.vue";

defineProps<{
  title: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
}>();

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

const open = ref(false);
</script>


<template>
  <UDrawer v-model:open="open">
    <div class="w-full"  @click="open = true">
      <div class="relative bg-gray-200 h-36 rounded-lg mb-2">
        <div
          class="absolute top-2 right-2 flex items-center gap-1 text-xs bg-white/80 px-2 py-0.5 rounded-full"
        >
          <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
          <span>{{ category }}</span>
        </div>
      </div>

      <p class="text-sm leading-snug mb-1 line-clamp-2">
        {{ title }}
      </p>

      <div class="flex items-center gap-2">
        <span class="font-bold text-base">
          {{ formatRupiah(price) }}
        </span>

        <span v-if="originalPrice" class="text-xs text-gray-400 line-through">
          {{ formatRupiah(originalPrice) }}
        </span>
      </div>
    </div>

    <template #content>
      <PromoDetailDrawer
        :title="title"
        :description="description"
        :price="price"
        :original-price="originalPrice"
        :category="category"
      />
    </template>
  </UDrawer>
</template>
