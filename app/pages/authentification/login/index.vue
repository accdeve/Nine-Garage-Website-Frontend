<script setup lang="ts">
definePageMeta({
  alias: ['/login']
})

const state = reactive({
  nama: "",
  phoneNumber: "",
  password: "",
});

const isFormComplete = computed(() => {
  return state.nama && state.phoneNumber && state.password;
});

const onSuccess = (e: { credential: string; claims: unknown }) => {
  console.log("success:", e.claims, e.credential.slice(0, 20) + "…");
};

const onVerified = (data: unknown) => {
  console.log("verified:", data);
};

const onError = (err: unknown) => {
  console.error("error:", err);
};
</script>
<template>
  <section class="min-h-screen flex justify-center px-6 py-10">
    <div class="w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-8">
        Form Booking Instalasi
      </h2>
      <UForm :state="state" class="space-y-5">
        <UFormField label="Nama" name="nama" type="text" required>
          <UInput v-model="state.nama" icon="i-lucide-user" class="w-full" />
        </UFormField>
        <UFormField label="Nomor WhatsApp" name="phone" type="tel" required>
          <UInput
            v-model="state.phoneNumber"
            icon="i-lucide-phone"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Password" name="phone" type="tel" required>
          <UInput
            v-model="state.password"
            icon="i-lucide-lock"
            class="w-full"
          />
        </UFormField>
        <UButton block type="button" size="lg" :disabled="!isFormComplete">
          Login
        </UButton>
        <p>Sudah punya akun</p>
        <NuxtLink>Login</NuxtLink>
        <USeparator label="or with" />
        <GoogleLoginButton
          :verify-on-server="true"
          :options="{ theme: 'filled_blue', size: 'large' }"
          @success="onSuccess"
          @verified="onVerified"
          @error="onError"
        />
      </UForm>
    </div>
  </section>
</template>
