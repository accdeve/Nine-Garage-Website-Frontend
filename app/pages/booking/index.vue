<script setup lang="ts">
import { CalendarDate } from "@internationalized/date";

const valueDate = shallowRef(new CalendarDate(2026, 1, 20));

const state = reactive({
  email: "",
  phone: "",
  vehicle: "",
    plate: "",
    vehicleColor: "",
});

const items = ref([
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Booking",
    to: "/booking",
  },
]);
</script>

<template>
  <section>
    <UBreadcrumb :items="items" class="ml-5 mt-5" />

    <h2 class="text-2xl font-bold text-center mx-9 my-7">
      Form Layanan Booking
    </h2>

    <UForm :state="state" class="space-y-4">
      <UFormField label="Email" name="email" required>
        <UInput v-model="state.email" placeholder="Email" />
      </UFormField>

      <UFormField label="Nomor Whatsapp" name="phone" required>
        <UInput v-model="state.phone" placeholder="08xxxxxxxx" />
      </UFormField>

      <UFormField label="Nama Kendaraan" name="vehicle" required>
        <UInput v-model="state.vehicle" placeholder="Nama Kendaraan" />
      </UFormField>

      <UFormField label="Nomor Plat Kendaraan" name="plate" required>
        <UInput v-model="state.plate" placeholder="Nomor Plat Kendaraan" />
      </UFormField>

      <UFormField label="Warna Kendaraan" name="vehicle-color" required>
        <UInput v-model="state.vehicle" placeholder="Warna Kendaraan" />
      </UFormField>

       <UCalendar :default-value="valueDate" size="sm"/>

      <UFormField label="Cabang Bengkel" name="plate" required>
        <UInput v-model="state.plate" placeholder="Nomor Plat Kendaraan" />
      </UFormField>

      <UFormField label="Tipe Jasa" name="vehicle-color" required>
        <UInput v-model="state.vehicle" placeholder="Warna Kendaraan" />
      </UFormField>

      <UFormField label="Nama Product" name="vehicle" required>
        <UInput v-model="state.vehicle" placeholder="Nama Kendaraan" />
      </UFormField>

      <UButton type="submit" block> Kirim Booking </UButton>
    </UForm>
  </section>
</template>
