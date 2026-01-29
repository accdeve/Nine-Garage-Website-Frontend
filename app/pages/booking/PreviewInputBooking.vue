<script setup lang="ts">
import type { BookingFormData } from "~/models/booking/booking";

defineProps<{
  data: BookingFormData;
}>();
</script>

<template>
  <div class="py-4 space-y-6">
    <h3 class="text-lg font-semibold text-center">
      Pastikan Data-data telah sesuai
    </h3>

    <div class="grid grid-cols-2 gap-y-4 text-sm">
      <div class="font-medium text-neutral-500">Nama</div>
      <div class="text-neutral-900">{{ data.nama }}</div>

      <div class="font-medium text-neutral-500">WhatsApp</div>
      <div class="text-neutral-900">{{ data.phone }}</div>

      <div class="font-medium text-neutral-500">Kendaraan</div>
      <div class="text-neutral-900">{{ data.vehicle }}</div>

      <div class="font-medium text-neutral-500">Plat Nomor</div>
      <div class="text-neutral-900">{{ data.plate }}</div>

      <div class="font-medium text-neutral-500">Warna</div>
      <div class="text-neutral-900">{{ data.vehicleColor }}</div>

      <div class="font-medium text-neutral-500">Tanggal</div>
      <div class="text-neutral-900">{{ data.date }}</div>

      <div class="font-medium text-neutral-500">Jam</div>
      <div class="text-neutral-900">
        {{ data.hour !== null ? `${data.hour}:00` : "-" }}
      </div>

      <div class="font-medium text-neutral-500">Cabang</div>
      <div class="text-neutral-900">{{ data.branch }}</div>

      <div class="font-medium text-neutral-500">Produk</div>
      <div class="text-neutral-900">{{ data.products.join(", ") }}</div>

      <div class="font-medium text-neutral-500">Asal</div>
      <div class="text-neutral-900">{{ data.source }}</div>
    </div>

    <UDivider />

    <p class="text-xs text-neutral-500 text-center italic">
      Dengan mengonfirmasi, Anda menyetujui syarat dan ketentuan layanan kami.
    </p>
  </div>
</template>
