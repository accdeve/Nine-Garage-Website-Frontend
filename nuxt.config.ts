// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: ['@nuxt/ui', '@nuxt/eslint','@pinia/nuxt','nuxt-google-auth'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  googleAuth: {
      clientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID,
      autoLoadScript: true,         
      promptOneTap: true,           
      enableServerVerify: true
  }
})