<script setup lang="ts">
import ProfileCardComponent from "~/components/account/ProfileCardComponent.vue";

const items = [
  { label: "Home", to: "/" },
  { label: "Account", to: "/account" },
];
</script>

<template>
  <section class="min-h-screen px-4 py-10 flex justify-center">
    <div class="w-full max-w-200 space-y-6">
      <!-- Breadcrumb -->
      <UBreadcrumb :items="items" class="mb-4" />

      <!-- AKUN -->
      <p class="text-3xl font-bold text-center m-0">
        Akun
      </p>

      <div class="mt-2">
        <ProfileCardComponent
          name="Benjamin Canac"
          :point="1500"
          avatar="https://github.com/benjamincanac.png"
          :members="[
            'https://www.sendible.com/hubfs/blog-import/2022/07-22-Jul/every-social-media-logo-and-icon-in-one-handy-place-instagram.png',
            'https://png.pngtree.com/png-vector/20230225/ourmid/pngtree-facebook-icon-social-media-logo-png-image_6618431.png',
            'https://www.pngfind.com/pngs/m/167-1672329_logos-of-social-media-apps-hd-png-download.png',
          ]"
        />
      </div>

      <!-- PENGATURAN -->
      <p class="text-xl font-semibold m-0 mt-6">
        Pengaturan
      </p>

      <div class="flex flex-col gap-2 mt-2">
        <UButton
          block
          class="py-3 px-3 rounded-2xl"
          trailing-icon="i-lucide-chevron-right"
          leading-icon="i-lucide-user"
          size="md"
        >
          Ganti Profil
        </UButton>

        <UButton
          block
          class="py-3 px-3 rounded-2xl"
          trailing-icon="i-lucide-chevron-right"
          leading-icon="i-lucide-lock"
          size="md"
        >
          Ganti Password
        </UButton>
      </div>

      <!-- AKTIFITAS -->
      <p class="text-xl font-semibold m-0 mt-6">
        Aktifitas
      </p>

      <div class="flex flex-col gap-2 mt-2">
        <UButton
          block
          class="py-3 px-3 rounded-2xl"
          trailing-icon="i-lucide-chevron-right"
          leading-icon="i-lucide-book-open"
          size="md"
        >
          Riwayat Booking
        </UButton>

        <UButton
          block
          class="py-3 px-3 rounded-2xl"
          trailing-icon="i-lucide-chevron-right"
          leading-icon="i-lucide-star"
          size="md"
        >
          Point
        </UButton>

        <UButton
          block
          class="py-3 px-3 rounded-2xl"
          trailing-icon="i-lucide-chevron-right"
          leading-icon="i-lucide-gift"
          size="md"
        >
          Kode Referal
        </UButton>

        <!-- LOGOUT -->
        <UButton
          block
          variant="outline"
          class="py-3 px-3 rounded-2xl mt-10 text-white hover:bg-red-600"
          trailing-icon="i-lucide-chevron-right"
          leading-icon="i-lucide-log-out"
          size="md"
        >
          Logout
        </UButton>
      </div>
    </div>
  </section>
</template>
