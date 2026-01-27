<script setup lang="ts">
import { shallowRef, reactive, ref, computed } from "vue";
import { today, getLocalTimeZone } from "@internationalized/date";
import HourTimeComponent from "~/components/booking/HourTimeComponent.vue";
import PreviewInputBooking from "./PreviewInputBooking.vue";

const date = shallowRef(today(getLocalTimeZone()));
const todayDate = today(getLocalTimeZone());
const selectedHour = ref<number | null>(null);

const items = [
  { label: "Home", to: "/" },
  { label: "Booking", to: "/booking" },
];

const state = reactive({
  nama: "",
  phone: "",
  vehicle: "",
  plate: "",
  vehicleColor: "",
});

const workshopBranch = ["Jl Arcadia Daan Mogot", "Jelambar"];
const defaultWorkshopBranch = ref("Jelambar");

const sourcleItem = ["Online", "Workshop"];
const defaultSourcleItem = ref("Online");

const productList = [
  "Lampu Tembak",
  "Lampu Jauh",
  ...Array.from({ length: 200 }, (_, i) => `Product ${i + 1}`),
];
const defaultProductList = ref<string[]>([]);

const openPreview = ref(false);

const isFormComplete = computed(() => {
  return (
    state.nama &&
    state.phone &&
    state.vehicle &&
    state.plate &&
    state.vehicleColor &&
    selectedHour.value !== null &&
    defaultWorkshopBranch.value &&
    defaultProductList.value.length > 0 &&
    defaultSourcleItem.value
  );
});

const previewData = computed(() => ({
  nama: state.nama,
  phone: state.phone,
  vehicle: state.vehicle,
  plate: state.plate,
  vehicleColor: state.vehicleColor,
  date: date.value.toString(),
  hour: selectedHour.value,
  branch: defaultWorkshopBranch.value,
  products: defaultProductList.value,
  source: defaultSourcleItem.value,
}));
</script>

<template>
  <section class="min-h-screen flex justify-center px-6 py-10">
    <div class="w-full max-w-md">
      <UBreadcrumb :items="items" class="mb-6" />

      <h2 class="text-2xl font-bold text-center mb-8">
        Form Booking Instalasi
      </h2>

      <UForm :state="state" class="space-y-5">
        <UFormField label="Nama" name="nama" type="text" required>
          <UInput v-model="state.nama" icon="i-lucide-user" class="w-full" />
        </UFormField>

        <UFormField label="Nomor WhatsApp" name="phone" type="tel" required>
          <UInput v-model="state.phone" icon="i-lucide-phone" class="w-full" />
        </UFormField>

        <UFormField
          icon="i-lucide-car"
          label="Nama Kendaraan"
          name="vehicle"
          required
        >
          <UInput v-model="state.vehicle" icon="i-lucide-car" class="w-full" />
        </UFormField>

        <UFormField
          icon="i-lucide-clipboard-list"
          label="Nomor Plat Kendaraan"
          name="plate"
          required
        >
          <UInput
            v-model="state.plate"
            icon="i-lucide-clipboard-list"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Warna Kendaraan" name="vehicleColor" required>
          <UInput
            v-model="state.vehicleColor"
            icon="i-lucide-paintbrush"
            class="w-full"
          />
        </UFormField>

        <div class="flex gap-1 items-start">
          <UFormField label="Tanggal Booking" required>
            <UCalendar v-model="date" size="sm" :min-value="todayDate" />
          </UFormField>

          <UFormField label="Jam Booking" required class="flex-1">
            <div class="flex flex-col gap-2 mt-4">
              <HourTimeComponent
                v-model="selectedHour"
                :start-hour="8"
                :end-hour="17"
              />
            </div>
          </UFormField>
        </div>

        <UFormField label="Cabang Bengkel" required>
          <USelectMenu
            v-model="defaultWorkshopBranch"
            :items="workshopBranch"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Nama Product" required>
          <USelectMenu
            v-model="defaultProductList"
            placeholder="Pilih Product"
            multiple
            :items="productList"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Asal Pembelian" required>
          <USelectMenu
            v-model="defaultSourcleItem"
            :items="sourcleItem"
            class="w-full"
          />
        </UFormField>

        <UDrawer v-model:open="openPreview" title="Konfirmasi Booking">
          <UButton block type="button" size="lg" :disabled="!isFormComplete">
            Preview Booking
          </UButton>
          <template #content>
            <PreviewInputBooking :data="previewData"
          /></template>
        </UDrawer>
      </UForm>
    </div>
  </section>
</template>
