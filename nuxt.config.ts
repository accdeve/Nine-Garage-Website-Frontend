// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "nuxt-google-auth",
    "@vueuse/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: "", // Overridden by NUXT_PUBLIC_API_BASE_URL environment variable
    },
  },
  googleAuth: {
    clientId: "", // Overridden by NUXT_PUBLIC_GOOGLE_CLIENT_ID environment variable
    autoLoadScript: true,
    promptOneTap: true,
    enableServerVerify: true,
  },
});
