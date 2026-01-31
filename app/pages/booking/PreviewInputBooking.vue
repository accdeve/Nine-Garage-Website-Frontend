<script setup lang="ts">
import { computed } from "vue";
import type { BookingFormData } from "~/models/booking/booking";
import { useProductStore } from "~/stores/product";

const props = defineProps<{
  data: BookingFormData;
}>();

const productStore = useProductStore();

const productNames = computed(() => {
  const ids = props.data.variant_items.map((v) => v.variant_id);
  const names = productStore.products
    .filter((p) => ids.includes(p.id))
    .map((p) => p.name);

  return names.length > 0 ? names.join(", ") : "Tidak ada produk";
});
</script>

<template>
  <div class="py-4 space-y-6">
    <h3 class="text-lg font-semibold text-center text-white">
      Pastikan Data-data telah sesuai
    </h3>

    <div class="grid grid-cols-2 gap-y-4 text-sm">
      <div class="font-medium text-neutral-500">Nama</div>
      <div class="text-white">{{ data.customer_name }}</div>

      <div class="font-medium text-neutral-500">WhatsApp</div>
      <div class="text-white">{{ data.customer_phone }}</div>

      <div class="font-medium text-neutral-500">Kendaraan</div>
      <div class="text-white">{{ data.vehicle_model }}</div>

      <div class="font-medium text-neutral-500">Plat Nomor</div>
      <div class="text-white">{{ data.vehicle_plat }}</div>

      <div class="font-medium text-neutral-500">Warna</div>
      <div class="text-white">{{ data.vehicle_color }}</div>

      <div class="font-medium text-neutral-500">Tanggal</div>
      <div class="text-white">{{ data.booking_date }}</div>

      <div class="font-medium text-neutral-500">Jam</div>
      <div class="text-white">
        {{ data.hour !== null ? `${data.hour}` : "00:00" }}
      </div>

      <div class="font-medium text-neutral-500">Cabang</div>
      <div class="text-white">{{ data.branch }}</div>

      <div class="font-medium text-neutral-500">Produk</div>
      <div class="text-white">
        {{ productNames }}
      </div>

      <div class="font-medium text-neutral-500">Asal</div>
      <div class="text-white capitalize">{{ data.source }}</div>

      <template v-if="data.notes">
        <div class="font-medium text-neutral-500">Catatan</div>
        <div class="text-white col-span-2 mt-1 bg-neutral-800 p-2 rounded">
          {{ data.notes }}
        </div>
      </template>
    </div>

    <UDivider />

    <p class="text-xs text-neutral-500 text-center italic">
      Dengan mengonfirmasi, Anda menyetujui syarat dan ketentuan layanan kami.
    </p>
  </div>
</template>
