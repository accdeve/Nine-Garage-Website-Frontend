<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useBookingStore } from "~/stores/booking";

const ticket = ref("");
const router = useRouter();
const bookingStore = useBookingStore();
const loading = ref(false);

const handleCheck = async () => {
  if (!ticket.value) return;

  loading.value = true;
  // We navigate to the update page with the ticket as the 'id' path param
  await router.push({ path: `/booking/${ticket.value}` });
  loading.value = false;
};
</script>

<template>
  <section>
    <h3 class="text-2xl font-bold text-center mx-9 mt-5">
      Ganti Jadwal Booking?
    </h3>
    <h4 class="text-center mx-9 mt-3">
      Masukkan kode booking yang telah kamu dapatkan di whatsapp yaa
    </h4>

    <div class="flex items-center justify-center gap-1 mx-10 mt-3">
      <div class="w-full py-5 flex justify-center">
        <UInput
          v-model="ticket"
          class="w-96 mx-auto"
          placeholder="cth: 09182h726"
          size="md"
          @keyup.enter="handleCheck"
        />
      </div>
      <UButton variant="outline" :loading="loading" @click="handleCheck">
        Cek
      </UButton>
    </div>
  </section>
</template>
