// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-toast', '@nuxt/icon', '@pinia/nuxt'],
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET, // server-only (no `public` prefix)
  }
})