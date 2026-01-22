<script setup lang="ts">
import { shallowRef, reactive, ref } from "vue";
import type { CalendarDate } from "@internationalized/date";
import { today, getLocalTimeZone } from "@internationalized/date";
import HourTimeComponent from "~/components/booking/HourTimeComponent.vue";
// import { useTimeFormatter } from "~/composables/useTimeFormatter";

const date = shallowRef<CalendarDate>(today(getLocalTimeZone()));

const selectedHour = ref<number | null>(null);

const state = reactive({
  nama: "",
  phone: "",
  vehicle: "",
  plate: "",
  vehicleColor: "",
});

const workshopBranch = ref<string[]>([
  "Jl Arcadia Daan Mogot",
  "Jelambar",
  ...Array.from({ length: 200 }, (_, i) => `Workshop Cabang ${i + 1}`),
]);
const defaultWorkshopBranch = ref("Jelambar");

const sourcleItem = ref<string[]>([
  "Online",
  "Workshop",
]);
const defaultSourcleItem = ref("Online");

const productList = ref<string[]>([
  "Lampu Tembak",
  "Lampu Jauh",
   ...Array.from({ length: 200 }, (_, i) => `Product ${i + 1}`)
]);
const defaultProductList = ref([ "Lampu Tembak",
  "Lampu Jauh"]);

const items = [
  { label: "Home", to: "/" },
  { label: "Booking", to: "/booking" },
];

const submit = () => {
  console.log({
    ...state,
    date: date.value.toString(),
    hour: selectedHour.value,
  });
};

// const { formatHour } = useTimeFormatter();
</script>

<template>
  <section class="min-h-screen flex justify-center px-4 py-10">
    <div class="w-full max-w-sm">
      <UBreadcrumb :items="items" class="mb-6" />

      <h2 class="text-2xl font-bold text-center mb-8">Form Booking Instalasi</h2>

      <UForm :state="state" class="space-y-5" @submit="submit">
        <UFormField label="Nama" name="nama" required>
          <UInput v-model="state.nama" class="w-full" />
        </UFormField>

        <UFormField label="Nomor WhatsApp" name="phone" required>
          <UInput v-model="state.phone" class="w-full" />
        </UFormField>

        <UFormField label="Nama Kendaraan" name="vehicle" required>
          <UInput v-model="state.vehicle" class="w-full" />
        </UFormField>

        <UFormField label="Nomor Plat Kendaraan" name="plate" required>
          <UInput v-model="state.plate" class="w-full" />
        </UFormField>

        <UFormField label="Warna Kendaraan" name="vehicleColor" required>
          <UInput v-model="state.vehicleColor" class="w-full" />
        </UFormField>

        <div class="flex gap-1 items-start">
          <div>
            <label class="text-sm font-medium block mb-2 text-align-left">
              Tanggal Booking
            </label>
            <UCalendar v-model="date" size="sm" />
          </div>

          <div>
            <label class="text-sm font-medium block mb-2"> Jam Booking </label>
            <div class="flex flex-col gap-2 mt-4">
              <HourTimeComponent
                v-model="selectedHour"
                :start-hour="8"
                :end-hour="17"
              />

              <!-- <p v-if="selectedHour !== null" class="text-sm text-gray-600">
                Jam yang dipilih: {{ formatHour(selectedHour) }}
              </p> -->
            </div>
          </div>
        </div>

        <label class="text-sm font-medium block mb-2 text-align-left">
          Cabang Bengkel
        </label>
        <USelectMenu v-model="defaultWorkshopBranch" :items="workshopBranch" class="w-full" />

        <label class="text-sm font-medium block mb-2 text-align-left">
          Nama Product
        </label>
        <USelectMenu v-model="defaultProductList" placeholder="Pilih Product"  multiple :items="productList" class="w-full" />

        <label class="text-sm font-medium block mb-2 text-align-left">
          Asal Pembelian
        </label>
        <USelectMenu v-model="defaultSourcleItem" :items="sourcleItem" class="w-full" />

        <UButton type="submit" block size="lg"> Kirim Booking </UButton>
      </UForm>
    </div>
  </section>
</template>
