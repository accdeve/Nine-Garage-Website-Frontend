<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useBookingStore } from "~/stores/booking";
import { useServiceStore } from "~/stores/service";
import BookingForm from "~/components/booking/BookingForm.vue";

const bookingStore = useBookingStore();
const serviceStore = useServiceStore();
const route = useRoute();

const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "Booking", to: "/booking" },
  { label: "Update Booking", to: "#" },
];

onMounted(async () => {
  bookingStore.resetForm(); // Start fresh
  await bookingStore.fetchInitialData();

  if (serviceStore.services.length === 0) {
    await serviceStore.fetchServices();
  }

  const id = route.params.id as string;
  if (id) {
    // Note: checkBooking currently expects a "ticket" string
    // Since we are now updating by ID, we might need to adjust checkBooking
    // or just pass the ID as a string if the backend endpoint supports looking up by ID/Ticket interchangeably
    // OR we change the home page to send the ticket, and update.vue uses the ticket to load data.
    //
    // However, the previous plan said: "Load Data (Get ID) -> Update Data (Put to ID)".
    // So the input from Home is a TICKET.
    // Let's assume the query param should be "ticket" to fetch the initial data,
    // then the store will internally save the ID for the PUT request.

    // But the user asked: "untuk route gunakan update?id="
    // If the URL is ?id=123 (database ID), we need checkBooking to work with ID.
    // If the URL is ?id=TICKET-123 (ticket), it works as is.
    // Given the previous conversation, the user likely means "id" as the parameter name, but the value is the TICKET code.
    await bookingStore.checkBooking(id);
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
        Update Data Form Booking Instalasi
      </h2>

      <BookingForm />
    </div>
  </section>
</template>
