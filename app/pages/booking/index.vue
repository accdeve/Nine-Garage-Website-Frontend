<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'

const date = shallowRef(new CalendarDate(2026, 1, 20))

const state = reactive({
  email: '',
  phone: '',
  vehicle: '',
  plate: '',
  vehicleColor: '',
})

const items = [
  { label: 'Home', to: '/' },
  { label: 'Booking', to: '/booking' },
]

const submit = () => {
  console.log({
    ...state,
    date: date.value.toString(),
  })
}
</script>

<template>
  <section class="min-h-screen flex justify-center px-4 py-10">
    <div class="w-full max-w-sm">
      <UBreadcrumb :items="items" class="mb-6" />

      <h2 class="text-2xl font-bold text-center mb-8">
        Form Layanan Booking
      </h2>

      <UForm :state="state" class="space-y-5" @submit="submit">
        <UFormField label="Email" name="email" required>
          <UInput v-model="state.email" class="w-full" />
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

        <div>
          <label class="text-sm font-medium block mb-2">
            Tanggal Booking
          </label>
          <UCalendar v-model="date" size="sm" />
        </div>

        <UButton type="submit" block size="lg">
          Kirim Booking
        </UButton>
      </UForm>
    </div>
  </section>
</template>
