<script setup lang="ts">
defineProps<{
  data: {
    nama: string;
    phone: string;
    vehicle: string;
    plate: string;
    vehicleColor: string;
    date: string;
    hour: number | null;
    branch: string;
    products: string[];
    source: string;
  };
}>();

const emit = defineEmits(["submit", "close"]);
</script>

<template>
  <div class="px-8 py-6 space-y-6">
    <h3 class="text-lg font-semibold">Pastikan Data-data telah sesuai</h3>

    <div class="grid grid-cols-2 gap-y-4 text-sm">
      <div class="font-medium text-gray-600">Nama</div>
      <div>{{ data.nama }}</div>

      <div class="font-medium text-gray-600">WhatsApp</div>
      <div>{{ data.phone }}</div>

      <div class="font-medium text-gray-600">Kendaraan</div>
      <div>{{ data.vehicle }}</div>

      <div class="font-medium text-gray-600">Plat Nomor</div>
      <div>{{ data.plate }}</div>

      <div class="font-medium text-gray-600">Warna Kendaraan</div>
      <div>{{ data.vehicleColor }}</div>

      <div class="font-medium text-gray-600">Tanggal</div>
      <div>{{ data.date }}</div>

      <div class="font-medium text-gray-600">Jam</div>
      <div>{{ data.hour !== null ? `${data.hour}:00` : "-" }}</div>

      <div class="font-medium text-gray-600">Cabang</div>
      <div>{{ data.branch }}</div>

      <div class="font-medium text-gray-600">Produk</div>
      <div>{{ data.products.join(", ") }}</div>

      <div class="font-medium text-gray-600">Sumber</div>
      <div>{{ data.source }}</div>
    </div>

    <UDivider />

    <UCheckbox required>
      <template #label>
        Saya telah membaca dan menyetujui
        <a
          href="/syarat-ketentuan"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary underline"
        >
          syarat dan ketentuan
        </a>
      </template>
    </UCheckbox>

    <div class="pt-4">
      <UButton block size="lg" color="primary" @click="emit('submit')">
        Konfirmasi Booking
      </UButton>
    </div>
  </div>
</template>
