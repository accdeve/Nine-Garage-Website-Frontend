<script setup lang="ts">
import { onMounted } from "vue";
import { useBookingStore } from "~/stores/booking";
import { useServiceStore } from "~/stores/service";
import BookingForm from "~/components/booking/BookingForm.vue";

const bookingStore = useBookingStore();
const serviceStore = useServiceStore();

const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "Booking", to: "/booking" },
];

onMounted(async () => {
  bookingStore.resetForm(); // Ensure clean state
  await bookingStore.fetchInitialData();

  if (serviceStore.services.length === 0) {
    await serviceStore.fetchServices();
  }
});
</script>

<template>
  <section class="min-h-screen flex justify-center px-6 py-10">
    <div class="w-full max-w-md">
      <UBreadcrumb :items="breadcrumbItems" class="mb-6" />

      <h2
        v-if="!bookingStore.success"
        class="text-2xl font-bold text-center mb-8"
      >
        Form Booking Instalasi
      </h2>

      <BookingForm />
    </div>
  </section>
</template>
