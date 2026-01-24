<template>
  <header class="bg-white flex justify-between items-center px-6 py-1">
    <!-- LEFT -->
    <NuxtLink to="/">
      <div class="w-20 h-20">
        <img
          src="/images/logo.png"
          alt="Logo"
          class="max-h-full object-contain"
        />
      </div>
    </NuxtLink>

    <!-- RIGHT -->
    <NuxtLink to="/login">
      <UButton leading-icon="i-lucide-user" variant="outline" size="sm"
        >Login</UButton
      >
    </NuxtLink>
  </header>
</template>
