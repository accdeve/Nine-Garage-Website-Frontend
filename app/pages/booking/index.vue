<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { parseDate, today, getLocalTimeZone } from "@internationalized/date";
import HourTimeComponent from "~/components/booking/HourTimeComponent.vue";
import PreviewInputBooking from "./PreviewInputBooking.vue";
import { useBookingStore } from "~/stores/booking";
import { useProductStore } from "~/stores/product";

const bookingStore = useBookingStore();
const productStore = useProductStore();

const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "Booking", to: "/booking" },
];

const todayDate = today(getLocalTimeZone());

// Sync date between Calendar (Object) and Store (String)
const selectedDate = computed({
  get: () => parseDate(bookingStore.formData.date),
  set: (val) => {
    bookingStore.formData.date = val.toString();
  },
});

// Re-fetch availability when date changes
watch(
  () => bookingStore.formData.date,
  () => {
    bookingStore.fetchAvailability();
  },
);

// Sync products from productStore to bookingStore
watch(
  () => productStore.products,
  (newProducts) => {
    bookingStore.setProducts(newProducts.map((p) => p.name));
  },
  { immediate: true },
);

onMounted(async () => {
  bookingStore.fetchInitialData();
  if (productStore.products.length === 0) {
    await productStore.fetchProducts();
  }
});
</script>

<template>
  <section class="min-h-screen flex justify-center px-6 py-10">
    <div class="w-full max-w-md">
      <UBreadcrumb :items="breadcrumbItems" class="mb-6" />

      <h2 class="text-2xl font-bold text-center mb-8">
        Form Booking Instalasi
      </h2>

      <UForm
        :state="bookingStore.formData"
        class="space-y-5"
        @submit="() => bookingStore.requestPreview()"
      >
        <UFormField label="Nama" name="nama" required>
          <UInput
            v-model="bookingStore.formData.nama"
            icon="i-lucide-user"
            class="w-full"
            placeholder="Masukkan nama lengkap"
          />
        </UFormField>

        <UFormField label="Nomor WhatsApp" name="phone" required>
          <UInput
            v-model="bookingStore.formData.phone"
            icon="i-lucide-phone"
            class="w-full"
            placeholder="Contoh: 08123456789"
            type="tel"
          />
        </UFormField>

        <UFormField label="Nama Kendaraan" name="vehicle" required>
          <UInput
            v-model="bookingStore.formData.vehicle"
            icon="i-lucide-car"
            class="w-full"
            placeholder="Contoh: Toyota Avanza"
          />
        </UFormField>

        <UFormField label="Nomor Plat Kendaraan" name="plate" required>
          <UInput
            v-model="bookingStore.formData.plate"
            icon="i-lucide-clipboard-list"
            class="w-full"
            placeholder="Contoh: B 1234 ABC"
          />
        </UFormField>

        <UFormField label="Warna Kendaraan" name="vehicleColor" required>
          <UInput
            v-model="bookingStore.formData.vehicleColor"
            icon="i-lucide-paintbrush"
            class="w-full"
            placeholder="Masukkan warna kendaraan"
          />
        </UFormField>

        <div class="flex gap-4 items-start flex-wrap sm:flex-nowrap">
          <UFormField label="Tanggal Booking" required class="w-full sm:w-auto">
            <UCalendar
              v-model="selectedDate"
              size="sm"
              :min-value="todayDate"
            />
          </UFormField>

          <UFormField label="Jam Booking" required class="flex-1">
            <div class="flex flex-col gap-2 mt-4">
              <HourTimeComponent
                v-model="bookingStore.formData.hour"
                :availability="bookingStore.availability"
                :start-hour="8"
                :end-hour="17"
              />
            </div>
          </UFormField>
        </div>

        <UFormField label="Cabang Bengkel" required>
          <USelectMenu
            v-model="bookingStore.formData.branch"
            :items="bookingStore.branches"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Nama Product" required>
          <USelectMenu
            v-model="bookingStore.formData.products"
            placeholder="Pilih Product"
            multiple
            :items="bookingStore.productOptions"
            class="w-full"
            :loading="productStore.loading"
          />
        </UFormField>

        <UFormField label="Asal Pembelian" required>
          <USelectMenu
            v-model="bookingStore.formData.source"
            :items="bookingStore.sources"
            class="w-full"
          />
        </UFormField>

        <UDrawer
          :open="bookingStore.openPreview"
          title="Konfirmasi Booking"
          @update:open="(val) => bookingStore.togglePreview(val)"
        >
          <UButton
            block
            type="submit"
            size="lg"
            :disabled="!bookingStore.isFormComplete"
            :loading="bookingStore.submitting && !bookingStore.openPreview"
          >
            Preview Booking
          </UButton>

          <template #content>
            <div class="p-4">
              <div
                class="flex justify-between items-center mb-4 bg-primary/10 p-2 rounded-lg"
              >
                <span class="text-sm font-medium text-primary"
                  >Waktu Tersisa:</span
                >
                <span class="text-lg font-bold text-primary font-mono">{{
                  bookingStore.formattedTimeLeft
                }}</span>
              </div>

              <PreviewInputBooking :data="bookingStore.formData" />

              <div
                v-if="bookingStore.error"
                class="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm"
              >
                {{ bookingStore.error }}
              </div>

              <div class="mt-6 flex gap-3">
                <UButton
                  variant="ghost"
                  color="neutral"
                  class="flex-1 justify-center"
                  @click="() => bookingStore.togglePreview(false)"
                >
                  Kembali
                </UButton>
                <UButton
                  color="primary"
                  class="flex-1 justify-center"
                  :loading="bookingStore.submitting"
                  @click="
                    () => {
                      bookingStore.submitBooking();
                    }
                  "
                >
                  Konfirmasi & Kirim
                </UButton>
              </div>
            </div>
          </template>
        </UDrawer>
      </UForm>

      <!-- General Error Message -->
      <div
        v-if="bookingStore.error && !bookingStore.openPreview"
        class="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-center text-sm"
      >
        {{ bookingStore.error }}
      </div>
    </div>
  </section>
</template>
