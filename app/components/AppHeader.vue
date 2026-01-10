<template>
  <header
    class="sticky top-0 z-50 border-b border-gray-200 dark:border-slate-800"
    :style="{ backgroundColor: appConfig.theme.primaryColor }"
  >
    <div class="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">

      <div class="flex items-center gap-3 shrink-0">
        <Logo class="h-6 w-auto" />
        <span class="text-lg font-semibold hidden md:inline">Nine Garage</span>
      </div>


      <div class="flex-1 flex justify-center px-2">
        <UInput
          icon="i-lucide-search"
          size="md"
          variant="outline"
          placeholder="Search..."
          class="max-w-xs w-full"
        />
      </div>


      <nav class="hidden md:flex items-center gap-6 shrink-0">
        <UButton
          to="/cars"
          variant="ghost"
          label="Cars"
          size="sm"
        />
        <UButton
          to="/services"
          variant="ghost"
          label="Services"
          size="sm"
        />
        <UButton
          to="/about"
          variant="ghost"
          label="About"
          size="sm"
        />
        <UButton
          to="/contact"
          variant="ghost"
          label="Contact"
          size="sm"
        />
      </nav>

      <div class="md:hidden shrink-0">
        <UButton
          icon="i-lucide-menu"
          color="primary"
          variant="ghost"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        />
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700"
      >
        <nav class="flex flex-col px-4 py-3 gap-2">
          <UButton
            to="/cars"
            variant="ghost"
            label="Cars"
            class="justify-start"
            @click="isMobileMenuOpen = false"
          />
          <UButton
            to="/services"
            variant="ghost"
            label="Services"
            class="justify-start"
            @click="isMobileMenuOpen = false"
          />
          <UButton
            to="/about"
            variant="ghost"
            label="About"
            class="justify-start"
            @click="isMobileMenuOpen = false"
          />
          <UButton
            to="/contact"
            variant="ghost"
            label="Contact"
            class="justify-start"
            @click="isMobileMenuOpen = false"
          />
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
const isMobileMenuOpen = ref(false)
</script>
