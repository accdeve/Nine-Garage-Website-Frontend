<script setup lang="ts">
import { ref } from "vue";
import PromoDetailDrawer from "./PromoDetailDrawer.vue";

type Props = {
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category?: string;
};

defineProps<Props>();

const open = ref(false);
</script>

<template>
  <UDrawer v-model:open="open">
    <div class="w-full max-w-sm mb-4 cursor-pointer" @click="open = true">
      <div class="relative bg-gray-200 h-35 rounded-t-lg mb-3">
        <span
          v-if="category"
          class="absolute top-2 right-2 text-xs bg-gray-300 px-2 py-0.5 rounded-full font-medium"
        >
          {{ category }}
        </span>
      </div>

      <div class="flex justify-between items-start">
        <div>
          <p class="font-semibold text-sm">
            {{ title }}
          </p>
          <p class="text-xs text-gray-500">
            {{
              description.length > 40
                ? description.slice(0, 40) + "..."
                : description
            }}
          </p>
        </div>

        <div class="text-right">
          <p class="font-bold">Rp{{ price.toLocaleString("id-ID") }}</p>
          <p v-if="originalPrice" class="text-xs text-gray-400 line-through">
            Rp{{ originalPrice.toLocaleString("id-ID") }}
          </p>
        </div>
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
